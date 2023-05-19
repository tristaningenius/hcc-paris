import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button, LogoStar } from 'components/elements';
import { MenuModal } from 'components/elements/MenuModal.client';
import logoTextFull from '../../assets/logo-text-full.svg';
import { ModalCart } from '../Cart';
import { useCartStore } from 'components/elements/cartStore';

export function Header({ isLogged, customerEmail, customerIdNum, isPro }) {
  const [isPanierModalOpen, setIsPanierModalOpen] = useState(false);
  const [isTopBannerOpen] = useState(true);
  const cartStore = useCartStore();
  useEffect(() => {
    cartStore.fetch();
  });
  const cartValue = cartStore.cart;
  // useItemsStore((state) => state.setItems({ items: cartValue.item_count }));

  return (
    <>
      <ModalCart cart={cartValue} isOpen={isPanierModalOpen} setIsOpen={setIsPanierModalOpen} />
      <header role="banner" className="sticky top-0 z-30 w-full border-b border-trans-20 bg-tertiary-200">
        <DesktopHeader
          data={cartValue}
          isLogged={'isLogged'}
          isOpen={isPanierModalOpen}
          setIsOpen={setIsPanierModalOpen}
          promoMessage={'promoMessage'}
          isPro={'isPro'}
        />
        <MobileHeader
          data={cartValue}
          isLogged={isLogged}
          isOpen={isPanierModalOpen}
          setIsOpen={setIsPanierModalOpen}
          promoMessage={''}
          isTopBannerOpen={isTopBannerOpen}
          customerEmail={customerEmail}
          customerIdNum={customerIdNum}
          isPro={isPro}
        />
      </header>
    </>
  );
}

function MobileHeader({ data, isLogged, isOpen, setIsOpen, isTopBannerOpen, customerEmail, customerIdNum, isPro }) {
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);

  const open = () => {
    setIsOpen(!isOpen);
    setIsMenuModalOpen(false);
  };

  const toggleMenuModal = () => {
    setIsMenuModalOpen(!isMenuModalOpen);
  };

  return (
    <>
      <nav className="flex h-14 w-full items-center justify-between gap-4 px-3 font-[teko] text-2xl xl:hidden">
        <Button variant="inline" onClick={toggleMenuModal}>
          <div className="w-16 overflow-visible text-left">{isMenuModalOpen ? 'FERMER' : 'MENU'}</div>
        </Button>
        <Link href="/">
          <div onClick={() => setIsMenuModalOpen(false)} className={'pt-3'}>
            <Image src={logoTextFull} alt="Logo de HHC Paris" width="100%" height="100%" />
          </div>
        </Link>
        <Button variant="inline" onClick={open}>
          PANIER
          <CartBadge data={data} />
        </Button>
      </nav>
      <MenuModal
        isOpen={isMenuModalOpen}
        setIsOpen={setIsMenuModalOpen}
        isTopBannerOpen={isTopBannerOpen}
        closeModal={toggleMenuModal}
        data={data}
        isLogged={isLogged}
        customerEmail={customerEmail}
        customerIdNum={customerIdNum}
        isPro={isPro}
      />
    </>
  );
}
function DesktopHeader({ data, isOpen, setIsOpen, isPro }) {
  const toggleCartModal = () => setIsOpen(!isOpen);

  return (
    <div className="min-h-12 hidden w-full items-center justify-between gap-4 px-3 font-[teko] text-2xl xl:flex">
      <nav className="flex items-center gap-8">
        <Button variant="inline" to="/">
          <div className={'cursor-pointer'}>
            <LogoStar className="logo-rotate fill-primary-600" size="1.5rem" />
          </div>
        </Button>
        <ul className="mb-0 flex flex-wrap gap-4 p-0">
          <li
            className={
              'inline-block min-h-[1rem] pt-1 font-[teko] text-2xl font-medium uppercase tracking-wide text-neutral-600 hover:text-primary-600 active:text-primary-800'
            }
          >
            <Button variant="inline" to="/products">
              TOUS LES PRODUITS
            </Button>
          </li>
          <li
            className={
              'inline-block  min-h-[1rem] pt-1 font-[teko] text-2xl font-medium uppercase tracking-wide text-neutral-600 hover:text-primary-600 active:text-primary-800'
            }
          >
            <Button variant="inline" to={`/collections/vapes-hhc`}>
              VAPES-HHC
            </Button>
          </li>
          <li
            className={
              'inline-block  min-h-[1rem] pt-1 font-[teko] text-2xl font-medium uppercase tracking-wide text-neutral-600 hover:text-primary-600 active:text-primary-800'
            }
          >
            <Button variant="inline" to={`/collections/resines-hhc`}>
              RÉSINES-HHC
            </Button>
          </li>
          <li
            className={
              'inline-block  min-h-[1rem] pt-1 font-[teko] text-2xl font-medium uppercase tracking-wide text-neutral-600 hover:text-primary-600 active:text-primary-800'
            }
          >
            <Button variant="inline" to={`/collections/fleurs-hhc`}>
              FLEURS-HHC
            </Button>
          </li>
          <li
            className={
              'inline-block  min-h-[1rem] pt-1 font-[teko] text-2xl font-medium uppercase tracking-wide text-neutral-600 hover:text-primary-600 active:text-primary-800'
            }
          >
            <Button variant="inline" to={`/collections/huiles-hhc`}>
              HUILES-HHC
            </Button>
          </li>
        </ul>
      </nav>
      <div className="flex h-full flex-wrap items-center gap-4">
        {!isPro && (
          <Button
            to="/pro/registerpro"
            variant="inline"
            className={
              'inline-block min-h-[1rem] pt-1 font-[teko] text-2xl font-medium uppercase tracking-wide text-neutral-600 hover:text-primary-600 active:text-primary-800'
            }
          >
            [je suis pro]
          </Button>
        )}
        <Button to="/#home-contact" variant="inline">
          <div
            className={
              'inline-block min-h-[1rem] cursor-pointer pt-1 font-[teko] text-2xl font-medium uppercase tracking-wide text-neutral-600 hover:text-primary-600 active:text-primary-800'
            }
          >
            NOS MAGASINS
          </div>
        </Button>
        <Button to="https://checkout.hhcparis.fr/mon-compte/" variant="secondary" className="h-full">
          <div
            className={
              'inline-block min-h-[1rem] cursor-pointer pt-1 font-[teko] text-2xl font-medium uppercase tracking-wide text-neutral-600 hover:text-primary-600 active:text-primary-800'
            }
          >
            MON COMPTE
          </div>
        </Button>
        <Button variant="inline" className={'pt-0'} onClick={toggleCartModal}>
          <div>
            PANIER
            <CartBadge data={data} />
          </div>
        </Button>
      </div>
    </div>
  );
}

function CartBadge({ data }) {
  if (!data) return null;
  const { item_count } = data;
  if (!item_count) {
    return <div className={'inline'}> [0]</div>;
  }

  return <div className={'inline'}> [{item_count}]</div>;
}

// function MessageBanner({ promoMessage, setIsTopBannerOpen }) {
//   return (
//     <aside className="flex h-6 items-center gap-2 bg-neutral-600 px-4 sm:py-2">
//       <div className="w-full text-center text-xs text-tertiary-100 sm:text-base"></div>
//       <button
//         onClick={() => setIsTopBannerOpen(false)}
//         className="flex h-4 w-4 content-center items-center justify-center rounded-full bg-tertiary-200"
//       >
//         <Icon size="16" icon="close" aria-label="Ferme le message de promotion" />
//       </button>
//     </aside>
//   );
// }
