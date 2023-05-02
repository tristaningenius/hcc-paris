import {lazy, Suspense} from 'react';

const Fallback = () => <div>loading...</div>;
const CookieConsentPopup = import.meta.env.SSR
  ? Fallback
  : lazy(() =>
      import('../global/CookieConsentPopup.client.jsx').then((mod) => ({
        default: mod.CookieConsentPopup,
      })),
    );

export default function CookieConsentPopupLazy(props) {
  if (typeof document !== 'undefined') {
    return (
      <Suspense>
        <CookieConsentPopup {...props} />
      </Suspense>
    );
  }
}
