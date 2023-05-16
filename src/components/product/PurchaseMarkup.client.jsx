import CoCartAPI from '@cocart/cocart-rest-api';
import { useRef } from 'react';
import { gsap, Power4 } from 'gsap';
import { useCartStore } from '../elements/cartStore';

const CoCart = new CoCartAPI({
  url: 'https://checkout.hhcparis.fr',
  version: 'cocart/v2',
});
if (typeof window !== 'undefined') {
  var cart_key = localStorage.getItem('cart_key') || '';
}
export function PurchaseMarkup({ quantity, productId }) {
  // const { selectedVariant } = useProductOptions();
  // const isOutOfStock = product?.manageStock && product?.stockQuantity <= 0;

  const isOutOfStock = false;
  const quantityString = quantity.toString();
  const productIdString = productId.toString();
  const cartStore = useCartStore();

  const addtocart = () => {
    let data = {
      id: productIdString,
      quantity: quantityString,
    };

    CoCart.post(`cart/add-item?cart_key=${cart_key}`, data)
      .then((response) => {
        localStorage.setItem('cart_key', response.data.cart_key);
        cartStore.removeCard();
        cartStore.fetch();
        console.log('Response Data:', response.data);
      })
      .catch(() => {
        alert("Vous n’avez pas choisi de poids, merci d'en sélectionner un avant l'ajout au panier.");
      });
  };
  const addedRef = useRef(null);

  const handleAddToCart = () => {
    addtocart();
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

  const goToCart = () => {};

  return (
    <>
      <button
        onClick={handleAddToCart}
        type="button"
        className={`${
          isOutOfStock ? 'bg-primary-500' : 'bg-primary-600 hover:bg-primary-700 focus:bg-primary-800'
        } font-display relative h-12 w-full items-center justify-center overflow-hidden text-center text-xl font-semibold uppercase tracking-wide text-tertiary-100`}
      >
        <div ref={addedRef}>
          <div className="flex h-12 items-center justify-center">
            {isOutOfStock ? 'Rupture de stock' : 'Ajouter au panier'}
          </div>
          <div className="flex h-12 items-center justify-center">
            [{quantity}] {quantity > 1 ? 'produits' : 'produit'} ajouté
          </div>
        </div>
      </button>
      {isOutOfStock ? (
        <span>Bientôt disponible</span>
      ) : (
        <button
          onClick={goToCart}
          className="font-display flex h-12 w-full items-center justify-center bg-neutral-600 px-6 text-center text-xl font-semibold uppercase tracking-wide text-tertiary-100 hover:bg-neutral-500 focus:bg-neutral-400"
        >
          Acheter maintenant
        </button>
      )}
    </>
  );
}
