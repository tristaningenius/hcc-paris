import {
  useCart,
  useCartLine,
  CartLineProvider,
  CartLineQuantityAdjustButton,
  CartLinePrice,
  CartLineQuantity,
  Image,
  Link,
  Money,
} from '@shopify/hydrogen';

import {Button, Heading, Icon} from '~/components';

export function CartDetails({close}) {
  const {lines, cost} = useCart();

  if (lines.length === 0) {
    return <CartEmpty close={close} />;
  }

  const isShippingFree = cost?.subtotalAmount?.amount < 50;

  return (
    <>
      <ul
        aria-labelledby="cart-contents"
        className="h-full overflow-y-scroll border-t border-trans-50 scrollbar-thin scrollbar-thumb-trans-20 hover:scrollbar-thumb-trans-50"
      >
        {lines.map((line) => {
          return (
            <CartLineProvider key={line.id} line={line}>
              <CartLineItem />
            </CartLineProvider>
          );
        })}
      </ul>
      {isShippingFree && (
        <p className="mb-4 rounded-2xl bg-tertiary-600 py-2 px-4 text-lg">
          Encore{' '}
          <span className="font-semibold">
            {Math.round(50 - cost?.subtotalAmount?.amount)} €
          </span>{' '}
          pour obtenir la livraison gratuite !
        </p>
      )}
      <section
        className={`flex shrink-0 flex-col gap-4 border-t border-neutral-600 bg-tertiary-200 pt-8 pb-4 ${
          !isShippingFree && `drop-shadow-[0px_-24px_16px_rgba(251,246,233,1)]`
        } sm:pb-6`}
      >
        <OrderSummary />
        <CartCheckoutActions />
      </section>
    </>
  );
}

function CartEmpty({close}) {
  return (
    <div className="flex h-full w-full flex-col justify-center gap-4 px-3">
      <Heading size="section" className="text-center">
        Votre panier&nbsp;est&nbsp;vide
      </Heading>
      <Button onClick={close} to="/">
        Voir la boutique
      </Button>
    </div>
  );
}
function CartLineItem() {
  const {linesRemove} = useCart();
  const {id: lineId, quantity, merchandise} = useCartLine();
  const isSelectedOption =
    merchandise?.selectedOptions[0].value === 'Default Title';

  const isGrosProduct = merchandise?.product?.vendor === 'Grossiste HHC';
  const taxAmount =
    merchandise?.product?.productType === 'Vape HHC' ? 0.8 : 1.055;

  const formattedPrice = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(merchandise?.priceV2?.amount * taxAmount);

  const productPrice = <span className="break-keep">{formattedPrice} HT</span>;

  return (
    <li key={lineId} className="flex gap-4 border-b border-trans-20 py-6">
      <div>
        <Image
          className="rounded-2xl bg-tertiary-100"
          data={merchandise.image}
          alt={merchandise.product.title}
          width={168}
          height={168}
        />
      </div>

      <div className="flex w-full flex-col justify-between">
        <div className="flex justify-between">
          <div className="flex items-center justify-start gap-2">
            <h3 className="font-semibold">
              <Link to={`/products/${merchandise.product.handle}`}>
                {merchandise.product.title}
              </Link>
            </h3>

            {!isSelectedOption
              ? (merchandise?.selectedOptions || []).map((option) => (
                  <div key={option.name} className="flex items-center gap-2">
                    <div className="h-6 w-px bg-trans-20" />
                    <span className="font-display text-xl font-light text-neutral-600">
                      {option.value}
                    </span>
                  </div>
                ))
              : null}
          </div>
          <button
            aria-label={`Retirer le produit : ${merchandise.product.title}`}
            onClick={() => linesRemove(lineId)}
            className="flex h-6 w-6 justify-center"
          >
            <Icon size="20" color="fill-trans-50" icon="close" />
          </button>
        </div>
        <div className="flex flex-row items-center justify-between">
          <div className="flex">
            <CartLineQuantityAdjust
              lineId={lineId}
              quantity={quantity}
              linesRemove={linesRemove}
            />
          </div>
          <div>
            {isGrosProduct ? (
              productPrice
            ) : (
              <CartLinePrice className="font-display text-2xl" />
            )}
          </div>
        </div>
      </div>
    </li>
  );
}
function CartLineQuantityAdjust({lineId}) {
  return (
    <div className="flex h-8 items-center justify-center gap-4 border border-trans-20">
      <CartLineQuantityAdjustButton
        adjust="decrease"
        aria-label="Decrease quantity"
        className="flex h-8 w-8 items-center justify-center"
      >
        <Icon size="20" color="fill-trans-50" icon="remove" />
      </CartLineQuantityAdjustButton>
      <CartLineQuantity
        as="label"
        htmlFor={`quantity-${lineId}`}
        className="text-sm"
      />
      <CartLineQuantityAdjustButton
        adjust="increase"
        aria-label="Increase quantity"
        className="flex h-8 w-8 items-center justify-center"
      >
        <Icon size="20" color="fill-trans-50" icon="add" />
      </CartLineQuantityAdjustButton>
    </div>
  );
}

function OrderSummary() {
  const {cost} = useCart();

  return (
    <dl className="grid grid-cols-2 gap-2">
      <dt className="font-display text-3xl ">TOTAL TTC</dt>
      <dd className="text-right font-display text-3xl">
        {cost?.subtotalAmount?.amount ? (
          <Money data={cost?.subtotalAmount} />
        ) : (
          '-'
        )}
      </dd>
      <dt className="text-xs font-semibold text-neutral-500">
        Frais de livraison{' '}
      </dt>
      <dd className="text-right text-xs text-neutral-500">
        {cost?.subtotalAmount?.amount > 50 ? (
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

function CartCheckoutActions() {
  const {checkoutUrl} = useCart();

  return (
    <Button to={checkoutUrl} width="full">
      Passer commande
    </Button>
  );
}
