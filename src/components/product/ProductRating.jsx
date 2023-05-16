import { Icon } from 'components';

export function ProductRating({ reviews }) {
  const stars = [
    <div key="1-star">
      <Icon size="20" icon="grade" />
    </div>,
    <div key="2-star">
      <Icon size="20" icon="grade" />
      <Icon size="20" icon="grade" />
    </div>,
    <div key="3-star">
      <Icon size="20" icon="grade" />
      <Icon size="20" icon="grade" />
      <Icon size="20" icon="grade" />
    </div>,
    <div key="4-star">
      <Icon size="20" icon="grade" />
      <Icon size="20" icon="grade" />
      <Icon size="20" icon="grade" />
      <Icon size="20" icon="grade" />
    </div>,
    <div key="5-star">
      <Icon size="20" icon="grade" />
      <Icon size="20" icon="grade" />
      <Icon size="20" icon="grade" />
      <Icon size="20" icon="grade" />
      <Icon size="20" icon="grade" />
    </div>,
  ];

  const averageReviews = reviews?.reduce((acc, review) => acc + parseFloat(review.review_rating) / reviews.length, 0);

  const roundedAverageReviews = Math.round(averageReviews) - 1;

  return (
    <a href="#reviews">
      <div
        className="flex justify-end"
        aria-labelledby={`Le produit a obtenue ${roundedAverageReviews + 1} étoile sur 5`}
      >
        <div className="shrink-0">{stars[roundedAverageReviews]}</div>

        <span className="text-base">{reviews?.length}</span>
      </div>
    </a>
  );
}
