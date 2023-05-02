import {lazy, Suspense} from 'react';

const Fallback = () => <div />;
const Accordion = import.meta.env.SSR
  ? Fallback
  : lazy(() =>
      import('../elements/Accordion.client.jsx').then((mod) => ({
        default: mod.Accordion,
      })),
    );

export default function AccordionLazy(props) {
  if (typeof document !== 'undefined') {
    return (
      <Suspense>
        <Accordion {...props} />
      </Suspense>
    );
  }
}
