import UpgradeRequired from '@/components/common/upgrade-required';
import { getSubscriptionStatus, hasActivePlan } from '@/lib/user';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();

  // 1. Auth Check: If no user is logged in, send them to the sign-in page
  if (!user) {
    redirect('/sign-in');
  }

  // 2. Subscription Check: Placeholder logic for payment status
  const hasActiveSubscription =await hasActivePlan(user.emailAddresses[0].emailAddress);

  // 3. Authorization Gate: If they haven't paid, show the Upgrade UI instead of the page
  if (!hasActiveSubscription) {
    return <UpgradeRequired />;
  }

  // 4. Success: Render the actual page content
  return <>{children}</>;
}