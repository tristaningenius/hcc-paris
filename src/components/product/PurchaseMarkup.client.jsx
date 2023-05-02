import {
  useProductOptions,
  BuyNowButton,
  AddToCartButton,
} from '@shopify/hydrogen';
import {useRef} from 'react';
import {gsap, Power4} from 'gsap';

export function PurchaseMarkup({quantity}) {
  const {selectedVariant} = useProductOptions();
  const isOutOfStock = !selectedVariant?.availableForSale || false;

  const addedRef = useRef(null);

  const handleAddToCart = () => {
    const tl = gsap.timeline();
    tl.to(addedRef.current, {
      duration: 0.3,
      yPercent: -50,
      ease: Power4.easeOut,
    });
    tl.to(addedRef.current, {
      delay: 1,
      duration: 0.3,
      yPercent: 0,
      ease: Power4.easeOut,
    });
  };

  return (
    <>
      <AddToCartButton
        onClick={handleAddToCart}
        type="button"
        variantId={selectedVariant.id}
        quantity={quantity}
        accessibleAddingToCartLabel="Adding item to your cart"
        disabled={isOutOfStock}
        className={`${
          isOutOfStock
            ? 'bg-primary-500'
            : 'bg-primary-600 focus:bg-primary-800 hover:bg-primary-700'
        } relative h-12 w-full items-center justify-center overflow-hidden text-center font-display text-xl font-semibold uppercase tracking-wide text-tertiary-100`}
      >
        <div ref={addedRef}>
          <div className="flex h-12 items-center justify-center">
            {isOutOfStock ? 'Rupture de stock' : 'Ajouter au panier'}
          </div>
          <div className="flex h-12 items-center justify-center">
            [{quantity}] {quantity > 1 ? 'produits' : 'produit'} ajouté
          </div>
        </div>
      </AddToCartButton>
      {isOutOfStock ? (
        <span>Bientôt disponible</span>
      ) : (
        <BuyNowButton
          variantId={selectedVariant.id}
          className="flex h-12 w-full items-center justify-center bg-neutral-600 px-6 text-center font-display text-xl font-semibold uppercase tracking-wide text-tertiary-100 focus:bg-neutral-400 hover:bg-neutral-500"
        >
          Acheter maintenant
        </BuyNowButton>
      )}
    </>
  );
}
