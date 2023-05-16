// import {Money} from '@shopify/hydrogen';

function formatPrice(price, weight) {
  const pricePerGram = Math.round((price / weight) * 100) / 100;
  return `${pricePerGram.toLocaleString('fr-FR')}`;
}

export function ProductPriceGramme({
  regularPrice,
  salePrice,
  variations,
  type,
  isDiscounted,
  isGrosProduct = false,
  collectionTitle,
}) {
  if (regularPrice < 0.01) return null;
  const taxAmount = collectionTitle === 'vapes-hhc' ? 0.8 : 1.055;
  // const taxedPrice = isGrosProduct ? regularPrice.amount * taxAmount : regularPrice.amount;
  const horsTax = isGrosProduct ?? <span>HT</span>;
  // const compareAtPriceGram = formatPrice(salePrice, weight);
  const priceGram = type === 'VARIABLE' ? variations?.nodes[0]?.regularPrice : null;
  const promoPrice = type === 'VARIABLE' ? variations?.nodes[0]?.salePrice : null;

  if (isDiscounted(regularPrice, salePrice)) {
    return type === 'VARIABLE' ? (
      <div className="flex justify-end gap-2">
        <span className="line-through">{priceGram?.replace(/&nbsp;/g, ' ')}</span>
        {/*<span className="text-primary-600">*/}
        {/*  {promoPrice?.replace(/&nbsp;/g, ' ')}*/}
        {/*  <sub>/g</sub> {horsTax}*/}
        {/*</span>*/}
      </div>
    ) : (
      <div className="flex justify-end gap-2">
        <span className="line-through">{regularPrice?.replace(/&nbsp;/g, ' ')}</span>
        {/*<span className="text-primary-600">*/}
        {/*  {salePrice?.replace(/&nbsp;/g, ' ')}*/}
        {/*  <sub>/g</sub> {horsTax}*/}
        {/*</span>*/}
      </div>
    );
  }

  return type === 'VARIABLE' ? (
    <div>
      {/*{priceGram?.replace(/&nbsp;/g, ' ')}*/}
      {/*<sub className="lowercase">/g</sub> {horsTax}*/}
    </div>
  ) : (
    <div>
      <span>{regularPrice?.replace(/&nbsp;/g, ' ')}</span>
      {horsTax}
    </div>
  );
}
