import {lazy, Suspense} from 'react';

const Fallback = () => <div>loading...</div>;
const MenuModal = import.meta.env.SSR
  ? Fallback
  : lazy(() =>
      import('../elements/MenuModal.client.jsx').then((mod) => ({
        default: mod.MenuModal,
      })),
    );

export default function MenuModalLazy(props) {
  if (typeof document !== 'undefined') {
    return (
      <Suspense>
        <MenuModal {...props} />
      </Suspense>
    );
  }
}
