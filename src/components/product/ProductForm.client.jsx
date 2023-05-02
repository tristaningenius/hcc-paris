import {useProductOptions, ProductPrice, Link} from '@shopify/hydrogen';
import {useState} from 'react';

import {ProductPriceGramme} from './ProductPriceGramme.client';
import {isDiscounted} from '~/lib/utils';
import {Section, Text, Icon, ProductRating} from '~/components';

import PurchaseMarkupLazy from '../lazyGsap/PurchaseMarkupLazy.client';

export function ProductForm({product, reviews}) {
  const {options, selectedVariant} = useProductOptions();
  const [quantity, setQuantity] = useState(1);

  const {
    priceV2: price,
    compareAtPriceV2: compareAtPrice,
    weight,
  } = selectedVariant;
  const {
    collections: {nodes: collection},
  } = product;

  const valuewithprice = product.variants.nodes;
  const isPromo = isDiscounted(price, compareAtPrice);

  const handleIncreaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const isGrosProduct = product?.vendor === 'Grossiste HHC';
  const taxAmount = product?.productType === 'Vape HHC' ? 0.8 : 1.055;

  const formattedPrice = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price.amount * taxAmount);

  const productPrice = <span className="break-keep">{formattedPrice} HT</span>;

  return (
    <Section noDivide>
      <dl className="grid w-full grid-cols-5 items-end justify-between border-trans-20 pt-3 pb-6 max-lg:border-b lg:order-1">
        <dt className="col-span-3 font-display text-xl uppercase lg:text-3xl">
          <Link to={`/collections/${collection[0]?.handle}`}>
            {product.productType}
          </Link>
        </dt>
        <dl className="col-span-2 text-right text-2xl">
          <ProductRating reviews={reviews} />
        </dl>
        <dt className="col-span-3">
          <h1 className=" text-4xl font-semibold lg:text-7xl">
            {product.title}
          </h1>
        </dt>
        <dd className="col-span-2 text-right font-display text-3xl uppercase lg:text-4xl">
          {weight > 0 && (
            <ProductPriceGramme
              price={price}
              weight={weight}
              compareAtPrice={compareAtPrice}
              isDiscounted={isDiscounted}
              isGrosProduct={isGrosProduct}
              collectionTitle={product.productType}
            />
          )}
        </dd>
      </dl>
      <form className="lg:order-3">
        <div>
          {options.map(({name, values}) => {
            if (values.length === 1) {
              return null;
            }
            return (
              <div key={name} className="border-trans-20 py-6 max-lg:border-b">
                <legend className="mb-2 text-trans-50">{name}</legend>
                <OptionRadio name={name} valuewithprice={valuewithprice} />
              </div>
            );
          })}
        </div>
        <div className="flex flex-col gap-2 py-6">
          <div className="hidden text-right font-display text-5xl sm:block">
            {isGrosProduct ? (
              productPrice
            ) : (
              <>
                <ProductPrice
                  as="span"
                  priceType="compareAt"
                  variantId={selectedVariant.id}
                  data={product}
                  withoutCurrency
                  className="mr-2 line-through"
                />
                <span className={isPromo ? 'text-primary-600' : undefined}>
                  <ProductPrice
                    as="span"
                    variantId={selectedVariant.id}
                    data={product}
                    withoutCurrency
                  />
                </span>
                &nbsp; €
              </>
            )}
          </div>
          <div className="flex flex-col items-start gap-4 font-display text-5xl sm:flex-row">
            <div className="flex w-full flex-wrap-reverse justify-between gap-4 sm:max-w-[16rem]">
              <div className="flex w-full max-w-[16rem] items-center justify-between border border-neutral-600 pl-4 pr-4 sm:pl-8 sm:pr-8">
                <button
                  type="button"
                  onClick={handleDecreaseQuantity}
                  aria-label="Diminuer la quantité de 1"
                >
                  <Icon size="32" icon="remove" />
                </button>
                <label className="font-body text-2xl font-semibold">
                  {quantity}
                </label>
                <button
                  type="button"
                  onClick={handleIncreaseQuantity}
                  aria-label="Augmenter la quantité de 1"
                >
                  <Icon size="32" icon="add" />
                </button>
              </div>
              <div className=" text-right font-display text-5xl sm:hidden">
                {isGrosProduct ? (
                  productPrice
                ) : (
                  <>
                    <ProductPrice
                      as="span"
                      priceType="compareAt"
                      variantId={selectedVariant.id}
                      data={product}
                      withoutCurrency
                      className="mr-2 line-through"
                    />
                    <span className={isPromo ? 'text-primary-600' : undefined}>
                      <ProductPrice
                        as="span"
                        variantId={selectedVariant.id}
                        data={product}
                        withoutCurrency
                      />
                      €
                    </span>
                  </>
                )}
              </div>
            </div>
            <div className="flex w-full flex-col gap-2">
              <PurchaseMarkupLazy quantity={quantity} />
            </div>
          </div>
        </div>
      </form>
      <Text
        as="div"
        dangerouslySetInnerHTML={{__html: product.descriptionHtml}}
        className="lg:order-2"
        width="wide"
      />
    </Section>
  );
}

function OptionRadio({name, valuewithprice}) {
  const {selectedOptions, setSelectedOption} = useProductOptions();

  return (
    <fieldset className="flex flex-wrap gap-4">
      {valuewithprice.map((value) => {
        const realValue = value.title;

        const checked = selectedOptions[name] === realValue;
        const id = `option-${name}-${realValue}`;

        return (
          <div key={id} className="flex items-center">
            <input
              type="radio"
              id={id}
              name={`option[${name}]`}
              value={realValue}
              checked={checked}
              onChange={() => setSelectedOption(name, realValue)}
              className="peer hidden"
            />
            <label
              htmlFor={id}
              className="text-trans-30 cursor-pointer bg-tertiary-300 px-4 pt-1 font-display text-2xl peer-checked:border peer-checked:border-trans-50  peer-checked:bg-tertiary-100 peer-checked:text-neutral-700"
            >
              {realValue}
            </label>
          </div>
        );
      })}
    </fieldset>
  );
}
