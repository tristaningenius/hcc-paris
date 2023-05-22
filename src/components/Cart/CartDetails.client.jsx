import CoCartAPI from '@cocart/cocart-rest-api';
import Image from 'next/image';
import Link from 'next/link';
import { Button, Heading, Icon } from 'components/elements';
import { useEffect, useState } from 'react';

const CoCart = new CoCartAPI({
  url: 'https://checkout.hhcparis.fr',
  version: 'cocart/v2',
});

export function CartDetails({ close, cart }) {
  const [cart_key, setCartKey] = useState('');
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCartKey(localStorage.getItem('cart_key'));
    }
  }, []);
  if (cart.item_count === 0) {
    return <CartEmpty close={close} />;
  }
  const { id, totals, items } = cart;
  if (totals) {
    var isShippingFree = totals.subtotal / 100 < 50;
  }

  return (
    <>
      <ul
        aria-labelledby="cart-contents"
        className="scrollbar-thin scrollbar-thumb-trans-20 hover:scrollbar-thumb-trans-50 h-full overflow-y-scroll border-t border-trans-50"
      >
        {items?.map((item) => {
          return <CartLineItem key={id} item={item} cart_key={cart_key} />;
        })}
      </ul>
      {isShippingFree && (
        <div className="mb-4 rounded-2xl bg-tertiary-600 px-4 py-2 text-center text-lg">
          Encore{' '}
          <div className="inline h-auto font-semibold">{parseFloat(50 - totals.subtotal / 100).toFixed(1)} €</div> pour
          obtenir la livraison gratuite !
        </div>
      )}
      <section
        className={`flex shrink-0 flex-col gap-4 border-t border-neutral-600 bg-tertiary-200 pb-4 pt-8 ${
          !isShippingFree && `drop-shadow-[0px_-24px_16px_rgba(251,246,233,1)]`
        } sm:pb-6`}
      >
        <OrderSummary cart={cart} cart_key={cart_key} />
        <CartCheckoutActions cart_key={cart_key} />
      </section>
    </>
  );
}

function CartEmpty({ close }) {
  return (
    <div className="flex h-full w-full flex-col justify-center gap-4 px-3">
      <Heading size="section-xs" className="text-center">
        Votre panier&nbsp;est&nbsp;vide
      </Heading>
      <Button onClick={close} to="/">
        Voir la boutique
      </Button>
    </div>
  );
}
function CartLineItem({ item, cart_key }) {
  const [newQuantity, setNewQuantity] = useState(item.quantity.value);
  const [alreadyClicked, setAlreadyClicked] = useState(false);

  if (!item) return null;
  // const { id: lineId, quantity, merchandise } = useCartLine();
  // const isSelectedOption = merchandise?.selectedOptions[0].value === 'Default Title';

  // const isGrosProduct = merchandise?.product?.vendor === 'Grossiste HHC';
  // const taxAmount = merchandise?.product?.productType === 'Vape HHC' ? 0.8 : 1.055;
  const { id, item_key, price, featured_image, name, slug } = item;
  let priceDependsOnQuantity = price * newQuantity;

  const formattedPrice = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(priceDependsOnQuantity / 100);

  const productPrice = <span className="break-keep">{formattedPrice}</span>;

  return (
    <li key={id} className="myDiv flex gap-4 border-trans-20 py-6">
      <div>
        <Image className="rounded-2xl bg-tertiary-100" src={featured_image} alt={name} width={168} height={168} />
      </div>

      <div className="flex w-full flex-col justify-between">
        <div className="flex justify-between">
          <div className="flex items-center justify-start gap-2">
            <h3 className="font-semibold">
              <Link href={`/products/${slug}`}>{name}</Link>
            </h3>
            {/*{!isSelectedOption*/}
            {/*  ? (merchandise?.selectedOptions || []).map((option) => (*/}
            {/*      <div key={option.name} className="flex items-center gap-2">*/}
            {/*        <div className="h-6 w-px bg-trans-20" />*/}
            {/*        <span className="font-[teko] text-xl font-light text-neutral-600">{option.value}</span>*/}
            {/*      </div>*/}
            {/*    ))*/}
            {/*  : null}*/}
          </div>
          <button
            type={'button'}
            onClick={(event) => linesRemove(event, item_key, cart_key, alreadyClicked, setAlreadyClicked)}
            className={'buttonEvent flex h-6 w-6 justify-center'}
          >
            <Icon size="20" color="fill-trans-50" className={'buttonEvent'} icon="close" />
          </button>
        </div>
        <div className="flex flex-row items-center justify-between">
          <div className="flex">
            <CartLineQuantityAdjust
              quantity={item.quantity.value}
              setNewQuantity={setNewQuantity}
              item_key={item_key}
              cart_key={cart_key}
            />
          </div>
          <div>
            <div className="font-[teko] text-2xl">{productPrice}</div>
          </div>
        </div>
      </div>
    </li>
  );
}
function CartLineQuantityAdjust({ quantity, setNewQuantity, item_key, cart_key }) {
  const [quantityVal, setQuantityVal] = useState(quantity);

  const handleQuantityMore = () => {
    setQuantityVal(quantityVal + 1);
    setNewQuantity(quantityVal + 1);

    CoCart.post(
      `cart/item/${item_key}?cart_key=${cart_key}`,
      {
        quantity: quantityVal + 1,
      },
      true
    );
  };

  const handleQuantityLess = () => {
    if (quantityVal > 1) {
      setQuantityVal(quantityVal - 1);
      setNewQuantity(quantityVal - 1);
      CoCart.post(
        `cart/item/${item_key}?cart_key=${cart_key}`,
        {
          quantity: quantityVal - 1,
        },
        true
      );
    }
  };

  return (
    <div className="flex h-8 items-center justify-center gap-4 border border-trans-20">
      <button
        type={'button'}
        className="buttonEvent flex h-8 w-8 items-center justify-center"
        onClick={handleQuantityLess}
      >
        <Icon size="20" color="fill-trans-50" icon="remove" />
      </button>
      <label className="text-sm">{quantityVal}</label>
      <button
        type={'button'}
        className="buttonEvent flex h-8 w-8 items-center justify-center"
        onClick={handleQuantityMore}
      >
        <Icon size="20" color="fill-trans-50" icon="add" />
      </button>
    </div>
  );
}

function OrderSummary({ cart }) {
  useEffect(() => {
    const calculateTotal = () => {
      const totalSpan = document.querySelectorAll('.break-keep');
      let total = 0;
      totalSpan.forEach((span) => {
        if (span.closest('.myDiv').classList.contains('hide')) {
          total += 0;
        } else {
          const price = span.textContent.replace(/[^0-9,]/g, '').replace(',', '.');
          total += parseFloat(price);
        }
      });
      const totalTTC = document.querySelector('.totalToReplace');
      if (totalTTC) {
        totalTTC.textContent = total.toFixed(2) + ' €';
      }
    };

    calculateTotal();

    document.addEventListener('click', (e) => {
      // find the first parent who is a button

      if (
        (e.target.parentElement && e.target.parentElement.classList.contains('buttonEvent')) ||
        e.target.closest('.buttonEvent')
      ) {
        setTimeout(() => {
          calculateTotal();
        }, 1000);
      }
    });
  }, []);
  if (!cart) {
    return null;
  }
  const { totals } = cart;
  if (!totals) return null;
  return (
    <dl className="grid grid-cols-2 gap-2">
      <dt className="mt-0 font-[teko] text-3xl not-italic">TOTAL TTC</dt>
      <dd className="totalToReplace mb-0 p-0 text-right font-[teko] text-3xl">
        {((totals.total - totals.shipping_total) / 100).toFixed(2)} €
      </dd>
      <dt className="mt-0 text-xs font-semibold not-italic text-neutral-500">Frais de livraison </dt>
      <dd className="mb-0 p-0 text-right text-xs text-neutral-500">
        {totals.subtotal / 100 > 50 ? (
          'Gratuite !'
        ) : (
          <div>
            <div>Colissimo en 48h - 4,90€</div>
            <div>Chronopost en 24h - 9,90€</div>
          </div>
        )}
      </dd>
    </dl>
  );
}

function linesRemove(event, item_key, cart_key, alreadyClicked, setAlreadyClicked) {
  if (alreadyClicked) return;
  setAlreadyClicked(true);
  const div = event.target.closest('.myDiv');
  div.classList.add('hide');
  setTimeout(() => {
    div.style.display = 'none';
  }, 500);
  CoCart.delete(`cart/item/${item_key}?cart_key=${cart_key}`)
    .then(() => {
      console.log('removed');
      setAlreadyClicked(false);
    })
    .catch(() => {
      alert("une erreur s'est produite, merci de reessayer plus tard");
    });
}

function CartCheckoutActions({ cart_key }) {
  return (
    <div
      className={
        ' flex min-h-[3rem] w-full select-none items-center justify-center gap-2 bg-primary-600 px-6 pt-1 text-center font-[teko] text-2xl font-medium uppercase tracking-wide text-tertiary-100 hover:bg-primary-700 active:bg-primary-800'
      }
    >
      <Button
        variant={'secondary'}
        to={`https://checkout.hhcparis.fr/commander/?cocart-load-cart=${cart_key}`}
        width="full"
      >
        Passer commande
      </Button>
    </div>
  );
}
