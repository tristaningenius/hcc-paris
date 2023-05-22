import { gsap, Power2 } from 'gsap';
import { useEffect, useRef } from 'react';
import { Button } from 'components/elements';

export function MenuModal({ isOpen, closeModal }) {
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

  const collections = [
    {
      id: 1,
      image:
        'https://cdn.shopify.com/s/files/1/0661/5367/7068/collections/Capture_d_ecran_2022-12-26_204129.png?v=1679596355',
      handle: 'vapes-hhc',
      title: 'vapes hhc',
    },
    {
      id: 2,
      image: 'https://cdn.shopify.com/s/files/1/0661/5367/7068/collections/resine-hhc.webp?v=1679597053',
      handle: 'resines-hhc',
      title: 'resines hhc',
    },

    {
      id: 3,
      image: 'https://cdn.shopify.com/s/files/1/0661/5367/7068/collections/fleur-hhc.webp?v=1679596402',
      handle: 'fleurs-hhc',
      title: 'fleurs hhc',
    },

    {
      id: 4,
      image: 'https://cdn.shopify.com/s/files/1/0661/5367/7068/collections/huile-hhc.webp?v=1679596330',
      handle: 'huiles-hhc',
      title: 'huiles hhc',
    },
  ];

  const toggleMenuModal = () => closeModal(false);

  return (
    <div
      ref={modalRef}
      className="absolute z-[100] hidden h-[calc(100dvh-3.5rem)] w-screen overflow-hidden bg-tertiary-200 "
    >
      <div
        ref={modalContentRef}
        className="absolute inset-0 flex h-full w-full flex-col justify-between px-3 pb-12 pt-6"
      >
        <nav>
          <ul className="flex flex-col gap-4">
            <li className="border-b border-trans-50">
              <Button variant="inline" to={`/products`} onClick={toggleMenuModal}>
                <h1 className="inline-block min-h-[1rem] cursor-pointer pt-1 font-[teko] text-5xl  font-medium uppercase tracking-wide text-neutral-600 hover:text-primary-600 active:text-primary-800">
                  TOUS LES PRODUITS
                </h1>
              </Button>
            </li>
            {collections.map((collection) => {
              return (
                <li className="border-b border-trans-50" key={collection.id}>
                  <Button to={`/collections/${collection.handle}`} onClick={toggleMenuModal}>
                    <h1 className="inline-block min-h-[1rem] cursor-pointer pt-1 font-[teko] text-5xl font-medium uppercase tracking-wide text-neutral-600 hover:text-primary-600 active:text-primary-800">
                      {collection.title.toUpperCase()}
                    </h1>
                  </Button>
                </li>
              );
            })}
          </ul>
        </nav>
        {/*<div>*/}
        {/*  {!isLogged ? (*/}
        {/*    <div className="flex flex-col gap-2">*/}
        {/*      {!isPro && (*/}
        {/*        <div className="relative">*/}
        {/*          <div className="absolute bottom-0 left-0 w-full">*/}
        {/*            /!*<LoyaltyCard customerEmail={customerEmail} customerIdNum={customerIdNum} />*!/*/}
        {/*          </div>*/}
        {/*        </div>*/}
        {/*      )}*/}

        <Button variant="secondary" to="https://checkout.hhcparis.fr/mon-compte/" onClick={toggleMenuModal}>
          <div
            className={
              'inline-block min-h-[1rem] cursor-pointer pt-1 font-[teko] text-2xl font-medium uppercase tracking-wide text-neutral-600 hover:text-primary-600 active:text-primary-800'
            }
          >
            MON COMPTE{' '}
          </div>
        </Button>
        {/*    </div>*/}
        {/*  ) : (*/}
        {/*    <div className="flex flex-col gap-2">*/}
        {/*      <Button to="/account" onClick={toggleMenuModal}>*/}
        {/*        Se connecter*/}
        {/*      </Button>*/}
        {/*      <Button to="/account/register" variant="outlined" onClick={toggleMenuModal}>*/}
        {/*        Créer un compte*/}
        {/*      </Button>*/}
        {/*    </div>*/}
        {/*  )}*/}
        {/*</div>*/}
      </div>
    </div>
  );
}
