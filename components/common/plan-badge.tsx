import { getPriceIdForActiveUser } from '@/lib/user';
import { cn } from '@/lib/utils';
import { pricingPlans } from '@/utils/constants';
import { currentUser } from '@clerk/nextjs/server';
import { Crown } from 'lucide-react';
import { Badge } from '../ui/badge';

export default async function PlanBadge() {
  // 1. Fetch the authenticated user from Clerk
  const user = await currentUser();

  // 2. Guard clause: if not logged in, don't show the badge
  if (!user?.id) return null;

  // 3. Extract the email (using optional chaining for safety)
  const email = user?.emailAddresses?.[0]?.emailAddress;

  let priceId: string | null = null;

  // 4. Fetch the specific Price ID associated with the user's email
  if (email) {
    priceId = await getPriceIdForActiveUser(email);
  }

  // 5. Default state for users without a plan
  let planName = 'Buy a plan';

  // 6. Look up the plan details from your local constants
  const plan = pricingPlans.find((plan) => plan.priceId === priceId);

  if (plan) {
    planName = plan.name;
  }

  // 7. Render the plan name
  return (
    <Badge
      variant="outline"
      className={cn(
        'ml-2 bg-linear-to-r from-amber-100 to-amber-200 border-amber-300 hidden lg:flex flex-row items-center',
        !priceId && 'from-red-100 to-red-200 border-red-300'
      )}
    >
      <Crown
        className={cn(
          'w-3 h-3 mr-1 text-amber-600',
          !priceId && 'text-red-600'
        )}
      />
      {planName}
    </Badge>
  );
}
