import {lazy, Suspense} from 'react';

const Fallback = () => <div>loading...</div>;
const LoyaltyCard = import.meta.env.SSR
  ? Fallback
  : lazy(() =>
      import('../elements/LoyaltyCard.client.jsx').then((mod) => ({
        default: mod.LoyaltyCard,
      })),
    );

export default function LoyaltyCardLazy(props) {
  if (typeof document !== 'undefined') {
    return (
      <Suspense>
        <LoyaltyCard {...props} />
      </Suspense>
    );
  }
}
