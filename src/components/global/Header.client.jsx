import {useState} from 'react';
import {Link, useCart, Image} from '@shopify/hydrogen';

import {Button, LogoStar, Icon} from '~/components';
import MenuModalLazy from '../lazyGsap/MenuModalLazy.client';
import ModalCartLazy from '../lazyGsap/ModalCartLazy.client';
import logoTextFull from '../../assets/logo-text-full.svg';

export function Header({
  data,
  isLogged,
  promoMessage,
  customerEmail,
  customerIdNum,
  isPro,
}) {
  const [isPanierModalOpen, setIsPanierModalOpen] = useState(false);
  const [isTopBannerOpen, setIsTopBannerOpen] = useState(true);

  const {
    isActive: {value: isActive},
  } = promoMessage;

  return (
    <>
      <ModalCartLazy
        isOpen={isPanierModalOpen}
        setIsOpen={setIsPanierModalOpen}
      />
      <header
        role="banner"
        className="sticky top-0 z-30 w-full border-b border-trans-20 bg-tertiary-200"
      >
        {JSON.parse(isActive) && isTopBannerOpen ? (
          <MessageBanner
            promoMessage={promoMessage}
            setIsTopBannerOpen={setIsTopBannerOpen}
          />
        ) : null}
        <DesktopHeader
          data={data}
          isLogged={isLogged}
          isOpen={isPanierModalOpen}
          setIsOpen={setIsPanierModalOpen}
          promoMessage={promoMessage}
          isPro={isPro}
        />
        <MobileHeader
          data={data}
          isLogged={isLogged}
          isOpen={isPanierModalOpen}
          setIsOpen={setIsPanierModalOpen}
          promoMessage={promoMessage}
          isTopBannerOpen={isTopBannerOpen}
          customerEmail={customerEmail}
          customerIdNum={customerIdNum}
          isPro={isPro}
        />
      </header>
    </>
  );
}

function MobileHeader({
  data,
  isLogged,
  isOpen,
  setIsOpen,
  isTopBannerOpen,
  customerEmail,
  customerIdNum,
  isPro,
}) {
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
      <nav className="flex h-14 w-full items-center justify-between gap-4 px-3 font-display text-2xl xl:hidden">
        <Button variant="inline" onClick={toggleMenuModal}>
          <div className="w-16 overflow-visible text-left">
            {isMenuModalOpen ? 'FERMER' : 'MENU'}
          </div>
        </Button>
        <Link to="/" onClick={() => setIsMenuModalOpen(false)}>
          <Image
            src={logoTextFull}
            alt="Logo de HHC Paris"
            width="100%"
            height="100%"
            className="h-6"
          />
        </Link>
        <Button variant="inline" onClick={open}>
          PANIER
          <CartBadge />
        </Button>
      </nav>

      <MenuModalLazy
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
function DesktopHeader({data, isLogged, isOpen, setIsOpen, isPro}) {
  const toggleCartModal = () => setIsOpen(!isOpen);

  return (
    <div className="min-h-12 hidden w-full items-center justify-between gap-4 px-3 font-display text-2xl xl:flex">
      <nav className="flex items-center gap-8">
        <Link to="/">
          <LogoStar className="logo-rotate fill-primary-600" size="1.5rem" />
        </Link>
        <ul className="flex flex-wrap gap-4">
          <li>
            <Button variant="inline" to={`/products`}>
              Tous les produits
            </Button>
          </li>
          {data.map((collection) => {
            return (
              <li key={collection.id}>
                <Button
                  variant="inline"
                  to={`/collections/${collection.handle}`}
                >
                  {collection.title.toUpperCase()}
                </Button>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="flex h-full flex-wrap items-center gap-4">
        {!isPro && (
          <Button to="/pro/registerpro" variant="inline">
            [je suis pro]
          </Button>
        )}

        <Button to="#home-contact" variant="inline">
          NOS MAGASINS
        </Button>
        {isLogged ? (
          <Button to="/account" variant="secondary" className="h-full">
            MON COMPTE {isPro && 'PRO'}
          </Button>
        ) : (
          <Button to="/account" variant="secondary" className="h-full">
            SE CONNECTER
          </Button>
        )}
        <Button variant="inline" onClick={toggleCartModal}>
          PANIER
          <CartBadge />
        </Button>
      </div>
    </div>
  );
}

function MessageBanner({promoMessage, setIsTopBannerOpen}) {
  return (
    <aside className="flex h-6 items-center gap-2 bg-neutral-600 px-4 sm:py-2">
      <div className="w-full text-center text-xs text-tertiary-100 sm:text-base">
        <Link
          to={promoMessage?.lien?.value ? promoMessage?.value : '/'}
          className={promoMessage?.value ? 'hover:underline' : 'undefined'}
        >
          {promoMessage?.message?.value}
        </Link>
      </div>
      <button
        onClick={() => setIsTopBannerOpen(false)}
        className="flex h-4 w-4 content-center items-center justify-center rounded-full bg-tertiary-200"
      >
        <Icon
          size="16"
          icon="close"
          aria-label="Ferme le message de promotion"
        />
      </button>
    </aside>
  );
}

function CartBadge() {
  const {totalQuantity} = useCart();

  if (totalQuantity < 1) {
    return <span>[0]</span>;
  }
  return <span>[{totalQuantity}]</span>;
}
