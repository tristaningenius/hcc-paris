import { Tag, Label } from 'components/elements';
import { isDiscounted, isNewArrival } from 'lib/utils';

export function OnMediaLabels({ availableForSale, price, compareAtPrice, publishedAt, tauxHhc }) {
  const tag = !availableForSale ? (
    <Tag variant="neutral" className="text-vertical">
      ÉPUISÉ
    </Tag>
  ) : isDiscounted(price, compareAtPrice) ? (
    <Tag variant="secondary" className="text-vertical">
      - {Math.round(((price - compareAtPrice) / price) * 100)}%
    </Tag>
  ) : isNewArrival(publishedAt) ? (
    <Tag variant="tertiary" className="text-vertical">
      NEW
    </Tag>
  ) : null;

  return (
    <>
      <div className="absolute left-[5%] top-[5%] z-10">{tag}</div>
      <div className="absolute bottom-[5%] right-[5%] z-10">
        <Label variant="outlined">HHC {tauxHhc} %</Label>
      </div>
    </>
  );
}
