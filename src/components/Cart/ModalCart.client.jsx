import {gsap, Power4} from 'gsap';
import {useEffect, useRef, useCallback} from 'react';
import {useCart} from '@shopify/hydrogen';

import {CartDetails, IconLg} from '~/components';

export function ModalCart({isOpen, setIsOpen}) {
  const modalRef = useRef(null);
  const backgroundRef = useRef(null);

  const close = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  useEffect(() => {
    const closeOnBackgroundClick = (event) => {
      if (event.target === backgroundRef.current) {
        close();
      }
    };
    if (isOpen) {
      document.body.classList.add('body-modal_padding');

      modalRef.current.classList.remove('hidden');
      modalRef.current.classList.add('flex');
      backgroundRef.current.classList.remove('hidden');

      gsap.to(modalRef.current, {
        duration: 0.6,
        x: 0,
        ease: Power4.easeOut,
      });

      gsap.to(backgroundRef.current, {
        opacity: 1,
        duration: 0.6,
        ease: Power4.easeOut,
      });

      backgroundRef.current.addEventListener('click', closeOnBackgroundClick);
    } else {
      document.body.classList.remove('body-modal_padding');
      gsap.to(modalRef.current, {
        duration: 0.4,
        x: 500,
        ease: Power4.easeIn,
        onComplete: () => {
          modalRef.current.classList.add('hidden');
        },
      });
      gsap.to(backgroundRef.current, {
        opacity: 0,
        duration: 0.4,
        delay: 0.2,
        ease: Power4.easeIn,
        onComplete: () => {
          backgroundRef.current.classList.add('hidden');
        },
      });

      backgroundRef.current.removeEventListener(
        'click',
        closeOnBackgroundClick,
      );
    }
  }, [close, isOpen]);

  return (
    <>
      <div
        ref={backgroundRef}
        className="fixed top-0 left-0 z-40 hidden h-screen w-screen bg-trans-20"
      />
      <aside
        ref={modalRef}
        className="fixed top-0 right-0 z-50 hidden h-[100dvh] max-w-[25rem] translate-x-[500px] bg-tertiary-200"
      >
        <form className="flex h-full w-full flex-col justify-between px-3 sm:px-6">
          <div className="flex justify-between py-3 sm:py-6">
            <div className="font-display text-2xl font-medium tracking-wide text-neutral-600">
              PANIER <CartBadge />
            </div>
            <button
              type="button"
              aria-label="Fermer le panier"
              onClick={close}
              className="h-8"
            >
              <IconLg icon="close" />
            </button>
          </div>
          <CartDetails setIsOpen={setIsOpen} close={close} />
        </form>
      </aside>
    </>
  );
}

function CartBadge() {
  const {totalQuantity} = useCart();

  if (totalQuantity < 1) {
    return <span>[0]</span>;
  }
  return <span>[{totalQuantity}]</span>;
}
