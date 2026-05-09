import { handleCheckoutSession, handleSubscriptionDeleted } from "@/lib/payments";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

console.log(">>> STRIPE ROUTE LOADED <<<");

export const POST = async (req: NextRequest) => {
  console.log("[WEBHOOK] Received request");

  const payload = await req.text();
  const sig = req.headers.get("stripe-signature");

  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  if (!sig) {
    console.error("[WEBHOOK] Missing stripe-signature header");

    return NextResponse.json(
      { error: "Missing stripe-signature header" },
      { status: 400 }
    );
  }

  if (!endpointSecret) {
    console.error("[WEBHOOK] Missing STRIPE_WEBHOOK_SECRET");

    return NextResponse.json(
      { error: "Webhook secret not configured" },
      { status: 500 }
    );
  }

  let event: Stripe.Event;

  try {
    console.log("[WEBHOOK] Verifying signature...");

    event = stripe.webhooks.constructEvent(
      payload,
      sig,
      endpointSecret
    );

    console.log(
      "[WEBHOOK] Signature verified. Event type:",
      event.type
    );

    switch (event.type) {
      case "checkout.session.completed": {
        console.log("Chechout session completed");
        const sessionId=event.data.object.id;
        console.log(sessionId);
        const session=await stripe.checkout.sessions.retrieve(sessionId,{expand:['line_items']})

        await handleCheckoutSession({session,stripe});
        break;
      }

      case "customer.subscription.deleted": {
        const subscription =
          event.data.object as Stripe.Subscription;
          const subscriptionId=event.data.object.id;
        await handleSubscriptionDeleted({subscriptionId,stripe});
        console.log(
          "[WEBHOOK] Customer subscription deleted:",
          subscription.id
        );

        // TODO: revoke access
        break;
      }

      default:
        console.log(
          `[WEBHOOK] Unhandled event type: ${event.type}`
        );
    }

    console.log("[WEBHOOK] Event processed successfully");

    return NextResponse.json(
      { status: "success" },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("[WEBHOOK] Error:", err.message);
    console.error("[WEBHOOK] Full error:", err);

    return NextResponse.json(
      {
        error: err.message || "Webhook verification failed",
      },
      { status: 400 }
    );
  }
};