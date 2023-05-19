import { gsap, Power4 } from 'gsap';
import { useEffect, useRef, useCallback } from 'react';
import { CartDetails } from './CartDetails.client';
import { IconLg } from 'components/elements';
import { useCartStore } from '../elements/cartStore';

export function ModalCart({ isOpen, setIsOpen, cart }) {
  const modalRef = useRef(null);
  const backgroundRef = useRef(null);
  const cartStore = useCartStore();

  const close = useCallback(() => {
    setIsOpen(false);
    cartStore.fetch();
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

      backgroundRef.current.removeEventListener('click', closeOnBackgroundClick);
    }
  }, [close, isOpen]);

  return (
    <>
      <div ref={backgroundRef} className="fixed left-0 top-0 z-40 hidden h-screen w-screen bg-trans-20" />
      <aside
        ref={modalRef}
        className="fixed right-0 top-0 z-50 hidden h-[100dvh] max-w-[25rem] translate-x-[500px] bg-tertiary-200"
      >
        <form className="flex h-full w-full flex-col justify-between px-3 sm:px-6">
          <div className="flex justify-between py-3 sm:py-6">
            <div className="font-[teko] text-2xl font-medium tracking-wide text-neutral-600">PANIER</div>
            <button type="button" aria-label="Fermer le panier" onClick={close} className="h-8">
              <IconLg icon="close" />
            </button>
          </div>
          <CartDetails setIsOpen={setIsOpen} close={close} cart={cart} />
        </form>
      </aside>
    </>
  );
}
