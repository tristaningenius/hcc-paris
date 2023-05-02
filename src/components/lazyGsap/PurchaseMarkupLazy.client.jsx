import {lazy, Suspense} from 'react';

const Fallback = () => <div>loading...</div>;
const PurchaseMarkup = import.meta.env.SSR
  ? Fallback
  : lazy(() =>
      import('../product/PurchaseMarkup.client.jsx').then((mod) => ({
        default: mod.PurchaseMarkup,
      })),
    );

export default function PurchaseMarkupLazy(props) {
  if (typeof document !== 'undefined') {
    return (
      <Suspense>
        <PurchaseMarkup {...props} />
      </Suspense>
    );
  }
}
