import { lazy, Suspense } from 'react';

const Fallback = () => <div />;

export function Lazy({ Compo, ...props }) {
  const LazyLoaded = import.meta.env.SSR
    ? Fallback
    : lazy(() =>
        import('components').then((mod) => ({
          default: mod[Compo],
        }))
      );

  if (typeof document !== 'undefined') {
    return (
      <Suspense fallback={<Fallback />}>
        <LazyLoaded {...props} />
      </Suspense>
    );
  }
}
