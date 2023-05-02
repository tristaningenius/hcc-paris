import {Money} from '@shopify/hydrogen';

function formatPrice(price, weight) {
  const pricePerGram = Math.round((price / weight) * 100) / 100;
  return `${pricePerGram.toLocaleString('fr-FR')}`;
}

export function ProductPriceGramme({
  price,
  compareAtPrice,
  weight,
  isDiscounted,
  isGrosProduct,
  collectionTitle,
}) {
  if (price.amount < 0.01) return null;
  const taxAmount = collectionTitle === 'Vape HHC' ? 0.8 : 1.055;
  const taxedPrice = isGrosProduct ? price.amount * taxAmount : price.amount;

  const horsTax = isGrosProduct ? <span>HT</span> : null;

  const compareAtPriceGram = formatPrice(compareAtPrice, weight);
  const PriceGram = formatPrice(taxedPrice, weight);

  if (isDiscounted(price, compareAtPrice)) {
    return weight > 0 ? (
      <div className="flex justify-end gap-2">
        <span className="line-through">{compareAtPriceGram}</span>
        <span className="text-primary-600">
          {PriceGram}&nbsp;€<sub>/g</sub> {horsTax}
        </span>
      </div>
    ) : (
      <div className="flex justify-end gap-2">
        <Money
          as="span"
          withoutTrailingZeros
          withoutCurrency
          data={compareAtPrice}
          className="line-through"
        />
        <span className="text-primary-600">
          <Money
            as="span"
            withoutTrailingZeros
            withoutCurrency
            data={taxedPrice}
          />
          &nbsp;€ {horsTax}
        </span>
      </div>
    );
  }

  return weight > 0 ? (
    <div>
      {PriceGram}&nbsp;€
      <sub className="lowercase">/g</sub> {horsTax}
    </div>
  ) : (
    <div>
      <span>{taxedPrice}</span>
      &nbsp;€ {horsTax}
    </div>
  );
}
