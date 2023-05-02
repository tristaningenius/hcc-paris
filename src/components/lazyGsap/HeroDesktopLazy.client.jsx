import {lazy, Suspense} from 'react';

const Fallback = () => <div>loading...</div>;
const HeroDesktop = import.meta.env.SSR
  ? Fallback
  : lazy(() =>
      import('../sections/HeroDesktop.client.jsx').then((mod) => ({
        default: mod.HeroDesktop,
      })),
    );

export default function HeroDesktopLazy(props) {
  if (typeof document !== 'undefined') {
    return (
      <Suspense>
        <HeroDesktop {...props} />
      </Suspense>
    );
  }
}
