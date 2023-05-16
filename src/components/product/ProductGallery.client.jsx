// import { MediaFile } from '@shopify/hydrogen';
import { Fragment } from 'react';
import { OnMediaLabels } from '../elements';
import Image from 'next/image';

export function ProductGallery({ product }) {
  const { dateGmt, id, stockQuantity, regularPrice, salePrice, manageStock, tauxHhc, image } = product;
  // if manageStock is false and stockQuantity >0, then the product is always available for sale
  const availableForSale = !manageStock || (manageStock && stockQuantity > 0);

  return (
    <div className="relative h-[35vh] min-w-[calc(50%-0.60rem)] grow lg:sticky lg:left-0 lg:top-4 lg:h-[80vh] lg:pt-4">
      <OnMediaLabels
        availableForSale={availableForSale}
        regularPrice={regularPrice}
        publishedAt={dateGmt}
        salePrice={salePrice}
        tauxHhc={tauxHhc}
      />
      {image ? (
        <Fragment key={id}>
          <Image
            src={image.mediaItemUrl}
            alt={product.name}
            width="100%"
            height="100%"
            layout={'fill'}
            unoptimized={true}
            className="h-full w-full object-cover"
          />
        </Fragment>
      ) : (
        <div className="h-full w-full" />
      )}
    </div>
  );
}
