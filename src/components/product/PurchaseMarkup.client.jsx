import CoCartAPI from '@cocart/cocart-rest-api';
import { useEffect, useRef, useState } from 'react';
import { gsap, Power4 } from 'gsap';
import { useCartStore } from '../elements/cartStore';

const CoCart = new CoCartAPI({
  url: 'https://checkout.hhcparis.fr',
  version: 'cocart/v2',
});

export function PurchaseMarkup({ quantity, productId }) {
  // const { selectedVariant } = useProductOptions();
  // const isOutOfStock = product?.manageStock && product?.stockQuantity <= 0;
  const [cartKey, setCartKey] = useState('');
  const isOutOfStock = false;
  let endpoint = 'cart/add-item';
  const quantityString = quantity.toString();
  const productIdString = productId.toString();
  const cartStore = useCartStore();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCartKey(localStorage.getItem('cart_key'));
    }
  }, []);

  const addtocart = () => {
    let data = {
      id: productIdString,
      quantity: quantityString,
    };

    if (cartKey) {
      endpoint += `?cart_key=${cartKey}`;
    }

    CoCart.post(endpoint, data)
      .then((response) => {
        console.log('Response Data:', response.data);
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

  const goToCart = (e) => {
    e.preventDefault();
    let endpoint = 'cart/add-item';
    if (cartKey) {
      endpoint += `?cart_key=${cartKey}`;
    }

    let data = {
      id: productIdString,
      quantity: quantityString,
    };

    CoCart.post(endpoint, data)
      .then((response) => {
        console.log('Response Data:', response.data);
        window.location.href = 'https://checkout.hhcparis.fr/commander/?cart_key=' + response.data.cart_key;
      })
      .catch(() => {
        alert("Vous n’avez pas choisi de poids, merci d'en sélectionner un avant l'ajout au panier.");
      });
  };

  return (
    <>
      <button
        onClick={(cartKey) => handleAddToCart(cartKey)}
        type="button"
        className={`${
          isOutOfStock ? 'bg-primary-500' : 'bg-primary-600 hover:bg-primary-700 focus:bg-primary-800'
        } relative h-12 w-full items-center justify-center overflow-hidden text-center font-[teko] text-xl font-semibold uppercase tracking-wide text-tertiary-100`}
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
          type={'button'}
          onClick={(e) => goToCart(e, cartKey)}
          className="flex h-12 w-full items-center justify-center bg-neutral-600 px-6 text-center font-[teko] text-xl font-semibold uppercase tracking-wide text-tertiary-100 hover:bg-neutral-500 focus:bg-neutral-400"
        >
          Acheter maintenant
        </button>
      )}
    </>
  );
}
