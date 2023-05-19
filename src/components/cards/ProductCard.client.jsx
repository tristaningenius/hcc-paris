import Link from 'next/link';
import Image from 'next/image';

import { ProductPriceGramme } from 'components/product';
import { OnMediaLabels } from 'components/elements';
import { isDiscounted } from 'lib/utils';

export function ProductCard({ product }) {
  const {
    regularPrice,
    salePrice,
    image,
    dateGmt,
    manageStock,
    stockQuantity,
    slug,
    tauxHhc,
    type,
    name,
    productCategories,
  } = product;
  const category = productCategories.nodes[0].name;
  const availableForSale = manageStock ? stockQuantity > 0 : true;

  const isGrosProduct = product?.vendor === 'Grossiste HHC';
  return (
    <div className={`group`}>
      <Link href={`/products/${slug}`} className="flex h-full flex-col gap-2">
        <div className={'cursor-pointer'}>
          <div className="relative grow overflow-clip">
            <OnMediaLabels
              availableForSale={availableForSale}
              price={regularPrice}
              publishedAt={dateGmt}
              compareAtPrice={salePrice}
              tauxHhc={tauxHhc}
            />
            {image ? (
              <Image
                suppressHydrationWarning
                alt={`Photographie de ${product.title}`}
                src={image?.mediaItemUrl}
                className={`ease-[cubic-bezier(0.16, 1, 0.3, 1)] aspect-[8/10] h-full w-full bg-tertiary-100 object-cover transition-all duration-500 group-hover:scale-125 ${
                  !availableForSale ? 'opacity-70' : undefined
                }`}
                width={500}
                height={500}
                sizes="(max-width: 320px) 320px,
                     (max-width: 640px) 640px,
                     960px"
              />
            ) : (
              <div
                className={`aspect-[8/10] h-full w-full bg-tertiary-100 object-cover ${
                  !availableForSale ? 'opacity-70' : undefined
                }`}
              />
            )}
          </div>
          <div className={`flex justify-between ${!availableForSale ? 'opacity-70' : undefined}`}>
            <figcaption>
              <div className="font-regular text-sm">{category}</div>
              <h3 className="font-semibold">{name}</h3>
            </figcaption>

            <div className="font-[teko] text-2xl">
              <ProductPriceGramme
                isGrosProduct={isGrosProduct}
                collectionTitle={product.productCategories.nodes[0].slug}
                variations={product.variations ?? null}
                regularPrice={regularPrice}
                salePrice={salePrice}
                isDiscounted={isDiscounted}
                type={type}
              />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
