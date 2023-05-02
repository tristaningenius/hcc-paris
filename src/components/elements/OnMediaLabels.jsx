import {Tag, Label} from '~/components';
import {isDiscounted, isNewArrival} from '~/lib/utils';

export function OnMediaLabels({
  availableForSale,
  price,
  compareAtPrice,
  publishedAt,
  tags,
}) {
  const tag = !availableForSale ? (
    <Tag variant="neutral" className="text-vertical">
      ÉPUISÉ
    </Tag>
  ) : isDiscounted(price, compareAtPrice) ? (
    <Tag variant="secondary" className="text-vertical">
      -{' '}
      {Math.round(
        ((compareAtPrice?.amount - price.amount) / compareAtPrice?.amount) *
          100,
      )}
      %
    </Tag>
  ) : isNewArrival(publishedAt) ? (
    <Tag variant="tertiary" className="text-vertical">
      NEW
    </Tag>
  ) : null;

  return (
    <>
      <div className="absolute left-[5%] top-[5%] z-10">{tag}</div>
      <div className="absolute right-[5%] bottom-[5%] z-10">
        <Label variant="outlined">{tags[0]}</Label>
      </div>
    </>
  );
}
