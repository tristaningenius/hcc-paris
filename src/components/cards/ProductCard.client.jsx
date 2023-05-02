import {Link, Image} from '@shopify/hydrogen';

import {ProductPriceGramme, OnMediaLabels} from '~/components';
import {isDiscounted} from '~/lib/utils';

export function ProductCard({product, className = ''}) {
  const {
    image,
    priceV2: price,
    compareAtPriceV2: compareAtPrice,
    weight,
  } = product.variants.nodes[0];

  const {publishedAt, availableForSale, tags, productType} = product;

  const isGrosProduct = product?.vendor === 'Grossiste HHC';

  return (
    <div className={`${className} group`}>
      <Link
        to={`/products/${product.handle}`}
        className="flex h-full flex-col gap-2"
      >
        <div className="relative grow overflow-clip">
          <OnMediaLabels
            availableForSale={availableForSale}
            price={price}
            publishedAt={publishedAt}
            compareAtPrice={compareAtPrice}
            tags={tags}
          />
          {image ? (
            <Image
              suppressHydrationWarning
              alt={`Photographie de ${product.title}`}
              data={image}
              className={`ease-[cubic-bezier(0.16, 1, 0.3, 1)] aspect-[8/10] h-full w-full bg-tertiary-100 object-cover transition-all duration-500 group-hover:scale-125 ${
                !availableForSale ? 'opacity-70' : undefined
              }`}
              widths={[320, 640, 960]}
              sizes="(max-width: 320px) 320px,
                     (max-width: 640px) 640px,
                     960px"
              loaderOptions={{
                crop: 'center',
                scale: 2,
                width: 320,
                height: 400,
              }}
            />
          ) : (
            <div
              className={`aspect-[8/10] h-full w-full bg-tertiary-100 object-cover ${
                !availableForSale ? 'opacity-70' : undefined
              }`}
            />
          )}
        </div>
        <div
          className={`flex justify-between ${
            !availableForSale ? 'opacity-70' : undefined
          }`}
        >
          <figcaption>
            <div className="font-regular text-sm">{productType}</div>
            <h3 className="font-semibold">{product.title}</h3>
          </figcaption>

          <div className="font-display text-2xl">
            <ProductPriceGramme
              isGrosProduct={isGrosProduct}
              collectionTitle={product.productType}
              weight={weight}
              price={price}
              compareAtPrice={compareAtPrice}
              isDiscounted={isDiscounted}
            />
          </div>
        </div>
      </Link>
    </div>
  );
}
