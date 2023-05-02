import {lazy, Suspense} from 'react';

const Fallback = () => <div>loading...</div>;
const ModalCart = import.meta.env.SSR
  ? Fallback
  : lazy(() =>
      import('../Cart/ModalCart.client.jsx').then((mod) => ({
        default: mod.ModalCart,
      })),
    );

export default function ModalCartLazy(props) {
  if (typeof document !== 'undefined') {
    return (
      <Suspense>
        <ModalCart {...props} />
      </Suspense>
    );
  }
}
