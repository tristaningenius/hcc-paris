import { useState } from 'react';

import { ProductPriceGramme } from './ProductPriceGramme.client';
import { isDiscounted } from 'lib/utils';
import { Section, Text, Icon } from 'components/elements';
import Link from 'next/link';
import { PurchaseMarkup } from './PurchaseMarkup.client';

export function ProductForm({ product }) {
  const [quantity, setQuantity] = useState(1);
  const [productIdPickup, setProductIdPickup] = useState(null);
  // const [pricePerGramme, setPricePerGramme] = useState(null);
  const [newPrice, setNewPrice] = useState(0);
  let variationsOutOfStock = [];
  const {
    variations,
    name,
    attributes,
    shortDescription,
    regularPrice,
    salePrice,
    productCategories,
    stockStatus,
    type,
    isGrosProduct = false,
  } = product;
  console.log(product);

  if (type === 'VARIATION') {
    variations.nodes.forEach((variation) => {
      if (variation.stockStatus === 'OUT_OF_STOCK') {
        variationsOutOfStock.push(variation.name.split('-')[1].trim().toLowerCase().replace(' ', '-'));
      }
    });
  }

  const baseRegularPrice = regularPrice.split('&')[0];
  const isPromo = isDiscounted(regularPrice, salePrice);

  const handleIncreaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const handlePriceChange = (value) => {
    variations.nodes.forEach((attribute) => {
      let variationPoid = attribute.name.split('-')[1].trim().toLowerCase().replace(' ', '-');
      let newValue = value.replace(/(?<=\d)-(?=\d)/g, '.');

      if (variationPoid === newValue) {
        let regularPriceOnlyNumberAndCommatoNumber = attribute.regularPrice.replace(/[^0-9,]/g, '');
        setNewPrice(regularPriceOnlyNumberAndCommatoNumber);
        setProductIdPickup(attribute.databaseId);
      }
    });
  };

  const formattedPrice = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(regularPrice);

  const productPrice = <span className="break-keep">{formattedPrice} HT</span>;

  return (
    <Section noDivide>
      <dl className="grid w-full grid-cols-5 items-end justify-between border-trans-20 pb-6 pt-3 max-lg:border-b lg:order-1">
        <dt className="col-span-3 font-[teko] text-xl uppercase not-italic lg:text-3xl">
          <Link href={`/collections/${productCategories.nodes[0].slug}`}>{productCategories.nodes[0].name}</Link>
        </dt>
        <dt className="col-span-3">
          <h1 className=" text-4xl font-semibold uppercase not-italic lg:text-7xl">{name}</h1>
        </dt>
        <dd className="col-span-2 text-right font-[teko] text-3xl uppercase lg:text-4xl">
          {type === 'VARIABLE' && (
            <ProductPriceGramme
              regularPrice={regularPrice}
              salePrice={salePrice}
              isDiscounted={isDiscounted}
              type={type}
              variations={variations}
              // isGrosProduct={isGrosProduct}
              collectionTitle={productCategories.nodes[0].slug}
            />
          )}
        </dd>
      </dl>
      <form className="lg:order-3">
        <div>
          {attributes?.nodes?.map(({ name, options }) => {
            if (options.length === 1) {
              return null;
            }
            return (
              <div key={name} className="border-trans-20 py-6 max-lg:border-b">
                <legend className="mb-2 text-trans-50">{name}</legend>
                <OptionRadio
                  name={name}
                  valuewithprice={options}
                  onData={handlePriceChange}
                  variationsOutOfStock={variationsOutOfStock}
                />
              </div>
            );
          })}
        </div>
        <div className="flex flex-col gap-2 py-6">
          <div className="hidden text-right font-[teko] text-5xl sm:block">
            {isGrosProduct ? (
              productPrice
            ) : (
              <>
                <span className={isPromo ? 'text-primary-600' : undefined}>
                  <span>{newPrice !== 0 ? newPrice : baseRegularPrice} €</span>
                </span>
              </>
            )}
          </div>
          <div className="flex flex-col items-start gap-4 font-[teko] text-5xl sm:flex-row">
            <div className="flex w-full flex-wrap-reverse justify-between gap-4 sm:max-w-[16rem]">
              <div className="flex w-full max-w-[16rem] items-center justify-between border border-neutral-600 pl-4 pr-4 sm:pl-8 sm:pr-8">
                <button type="button" onClick={handleDecreaseQuantity} aria-label="Diminuer la quantité de 1">
                  <Icon size="32" icon="remove" />
                </button>
                <label className="font-body text-2xl font-semibold">{quantity}</label>
                <button type="button" onClick={handleIncreaseQuantity} aria-label="Augmenter la quantité de 1">
                  <Icon size="32" icon="add" />
                </button>
              </div>
              <div className=" text-right font-[teko] text-5xl sm:hidden">
                {isGrosProduct ? (
                  productPrice
                ) : (
                  <>
                    <span className={isPromo ? 'text-primary-600' : undefined}>
                      <span>{newPrice !== 0 ? newPrice : baseRegularPrice} €</span>
                    </span>
                  </>
                )}
              </div>
            </div>
            <div className="flex w-full flex-col gap-2">
              <PurchaseMarkup
                quantity={quantity}
                productId={productIdPickup ?? product.databaseId}
                stockStatus={stockStatus}
              />
            </div>
          </div>
        </div>
      </form>
      <Text as="div" dangerouslySetInnerHTML={{ __html: shortDescription }} className="lg:order-2" width="wide" />
    </Section>
  );
}

function OptionRadio({ name, valuewithprice, onData, variationsOutOfStock }) {
  const [selectedOptions, setSelectedOption] = useState({ valuewithprice });
  // sort the variation
  let arraySort = [...valuewithprice];
  const sortedValuewithprice = arraySort.sort((a, b) => {
    const aNum = a.match(/\d+/g);
    const bNum = b.match(/\d+/g);
    if (aNum && bNum) {
      return aNum[0] - bNum[0];
    }
    return 0;
  });

  // array difference between variations and variations out of stock
  const filteredVariationsOutOfStock = sortedValuewithprice.filter((x) => !variationsOutOfStock.includes(x));

  const handleChange = (value, name) => {
    setSelectedOption(value);
    onData(value, name);
  };

  return (
    <fieldset className="flex flex-wrap gap-4 border-none">
      {filteredVariationsOutOfStock.map((value) => {
        const checked = selectedOptions === value;
        const id = `option-${name}-${value}`;

        return (
          <div key={id} className="flex items-center">
            <input
              type="radio"
              id={id}
              name={`option[${name}]`}
              value={value}
              checked={checked}
              onChange={() => handleChange(value, name)}
              className="peer hidden"
            />
            <label
              htmlFor={id}
              className="text-trans-30 cursor-pointer bg-tertiary-300 px-4 pt-1 font-[teko] text-2xl peer-checked:border peer-checked:border-trans-50  peer-checked:bg-tertiary-100 peer-checked:text-neutral-700"
            >
              {/*replace in value all "-" between two number*/}
              {value.replace(/(?<=\d)-(?=\d)/g, '.')}
            </label>
          </div>
        );
      })}
    </fieldset>
  );
}
