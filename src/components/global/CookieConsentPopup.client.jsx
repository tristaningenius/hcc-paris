import { useEffect, useState, useRef } from 'react';
import { gsap, Power2 } from 'gsap';

import Cookies from 'js-cookie';
import { Heading, Button } from 'components';

export function CookieConsentPopup() {
  const [showPopup, setShowPopup] = useState(false);
  const [refused, setRefused] = useState(false);

  const consentPopupRef = useRef(null);

  const animatePopup = () => {
    gsap.to(consentPopupRef.current, {
      translateY: 0,
      duration: 0.6,
      delay: 1,
      ease: Power2.easeOut,
    });
  };

  useEffect(() => {
    const cookiesAccepted = Cookies.get('cookiesAccepted');

    if (cookiesAccepted) {
      setShowPopup(false);
    } else {
      setShowPopup(true);
      animatePopup();
    }
  }, [showPopup]);

  const handleCookieAccepte = () => {
    Cookies.set('cookiesAccepted', 'true', { expires: 365 });
    setShowPopup(false);
  };

  const handleCookieRefuse = () => {
    setRefused(!refused);
    Cookies.set('cookiesAccepted', 'false', { expires: 14 });
    setShowPopup(false);
  };

  return (
    showPopup && (
      <aside
        ref={consentPopupRef}
        className="fixed bottom-0 right-0 z-30 w-full translate-y-[120%] bg-neutral-600 max-sm:left-0	sm:bottom-8 sm:right-8 sm:max-w-sm "
      >
        <div className="p-4 sm:p-6">
          <Heading size="section-s" className="text-tertiary-100">
            Un cookie pour la route ?
          </Heading>
          <p className="text-tertiary-100">
            Nous utilisons des cookies pour personnaliser ton expérience sur notre site web.
          </p>
        </div>

        <div className="flex w-full">
          <Button onClick={handleCookieAccepte} variant="primary-small" width="full">
            J&apos;accepte les cookies
          </Button>
          <Button onClick={handleCookieRefuse} variant="secondary-small" width="full">
            Je refuse les cookies
          </Button>
        </div>
      </aside>
    )
  );
}
