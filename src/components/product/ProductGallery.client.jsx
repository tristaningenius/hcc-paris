import {MediaFile} from '@shopify/hydrogen';
import {Fragment} from 'react';
import {OnMediaLabels} from '~/components';

export function ProductGallery({product}) {
  const {priceV2: price, compareAtPriceV2: compareAtPrice} =
    product.variants.nodes[0];

  const {
    publishedAt,
    availableForSale,
    tags,
    media: {nodes: media},
  } = product;

  return (
    <div className="relative h-[35vh] min-w-[calc(50%-0.60rem)] grow lg:sticky lg:top-4 lg:left-0 lg:h-[80vh] lg:pt-4">
      <OnMediaLabels
        availableForSale={availableForSale}
        price={price}
        publishedAt={publishedAt}
        compareAtPrice={compareAtPrice}
        tags={tags}
      />

      {media ? (
        media.map((med) => {
          let extraProps = {};

          const data = {
            ...med,
            image: {
              ...med.image,
              altText: med.alt || 'Product image',
            },
          };

          return (
            <Fragment key={med.id || med.image.id}>
              <MediaFile
                width="100%"
                height="100%"
                tabIndex="0"
                data={data}
                options={{
                  crop: 'center',
                }}
                {...extraProps}
                className="h-full w-full object-cover"
              />
            </Fragment>
          );
        })
      ) : (
        <div className="h-full w-full" />
      )}
    </div>
  );
}
