import {gsap, Power2} from 'gsap';
import {useEffect, useRef} from 'react';

import {Button, LoyaltyCard} from '~/components';

export function MenuModal({
  data,
  isLogged,
  isOpen,
  closeModal,
  customerEmail,
  customerIdNum,
  isPro,
}) {
  const modalRef = useRef(null);
  const modalContentRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('body-modal_padding');
      modalRef.current.classList.remove('hidden');
      modalRef.current.classList.add('flex');

      gsap.to(modalRef.current, {
        duration: 0.4,
        xPercent: 0,
        ease: Power2.easeOut,
      });
      gsap.to(modalContentRef.current, {
        duration: 0.4,
        xPercent: 0,
        ease: Power2.easeOut,
      });
    } else {
      document.body.classList.remove('body-modal_padding');
      gsap.to(modalRef.current, {
        duration: 0.4,
        xPercent: -100,
        ease: Power2.easeIn,
        onComplete: () => {
          modalRef.current.classList.add('hidden');
        },
      });
      gsap.to(modalContentRef.current, {
        duration: 0.4,
        xPercent: 90,
        ease: Power2.easeIn,
      });
    }
  }, [isOpen]);

  const toggleMenuModal = () => closeModal(false);

  return (
    <div
      ref={modalRef}
      className="absolute z-50 hidden h-[calc(100dvh-3.5rem)] w-screen overflow-hidden bg-tertiary-200 "
    >
      <div
        ref={modalContentRef}
        className="absolute inset-0 flex h-full w-full flex-col justify-between px-3 pb-12 pt-6"
      >
        <nav>
          <ul className="flex flex-col gap-4">
            <li className="border-b border-trans-50">
              <Button
                variant="inline"
                to={`/products`}
                onClick={toggleMenuModal}
              >
                <h1 className="text-5xl">Tous les produits</h1>
              </Button>
            </li>
            {data.map((collection) => {
              return (
                <li className="border-b border-trans-50" key={collection.id}>
                  <Button
                    variant="inline"
                    to={`/collections/${collection.handle}`}
                    onClick={toggleMenuModal}
                  >
                    <h1 className="text-5xl">
                      {collection.title.toUpperCase()}
                    </h1>
                  </Button>
                </li>
              );
            })}
          </ul>
        </nav>
        <div>
          {isLogged ? (
            <div className="flex flex-col gap-2">
              {!isPro && (
                <div className="relative">
                  <div className="absolute bottom-0 left-0 w-full">
                    <LoyaltyCard
                      customerEmail={customerEmail}
                      customerIdNum={customerIdNum}
                    />
                  </div>
                </div>
              )}

              <Button
                variant="secondary"
                to="/account"
                onClick={toggleMenuModal}
              >
                MON COMPTE {isPro && 'PRO'}
              </Button>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <Button to="/account" onClick={toggleMenuModal}>
                Se connecter
              </Button>
              <Button
                to="/account/register"
                variant="outlined"
                onClick={toggleMenuModal}
              >
                Créer un compte
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
