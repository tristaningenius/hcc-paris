import { useState, useEffect } from 'react';

import { Section, Text, Icon } from 'components';

export function ProductReviews({ productId }) {
  // const baseUrl = 'https://loyalty.yotpo.com/api/v2/';
  // const merchantAuth =
  //   'guid=g7Y90zVqDos8wOqzMPKFrg&api_key=x4MgxmLlCGxChnDHCVpI1Qtt';

  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(null);
  const [reviewsLenght, setReviewsLenght] = useState(null);

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: { accept: 'application/json', 'Content-Type': 'application/json' },
    };
    fetch(
      `https://api-cdn.yotpo.com/v1/widget/7DBFOCGiMxvclKCyK6jLBXokuVIqdc5rjyHpfP9n/products/${productId}/reviews.json`,
      options
    )
      .then((response) => response.json())
      .then(
        (response) => (
          setReviews(response.response.reviews),
          setRating(response.response.bottomline.average_score),
          setReviewsLenght(response.response.bottomline.total_review)
        )
      )
      .catch((err) => console.error(err));
  });

  const stars = [
    <div key="1-star">
      <Icon size="24" icon="grade" />
    </div>,
    <div key="2-star">
      <Icon size="24" icon="grade" />
      <Icon size="24" icon="grade" />
    </div>,
    <div key="3-star">
      <Icon size="24" icon="grade" />
      <Icon size="24" icon="grade" />
      <Icon size="24" icon="grade" />
    </div>,
    <div key="4-star">
      <Icon size="24" icon="grade" />
      <Icon size="24" icon="grade" />
      <Icon size="24" icon="grade" />
      <Icon size="24" icon="grade" />
    </div>,
    <div key="5-star">
      <Icon size="24" icon="grade" />
      <Icon size="24" icon="grade" />
      <Icon size="24" icon="grade" />
      <Icon size="24" icon="grade" />
      <Icon size="24" icon="grade" />
    </div>,
  ];

  return (
    <Section id="reviews" noDivide gap="large">
      <div className="flex flex-col gap-8 md:flex-row md:justify-center md:gap-20 md:py-16">
        {reviews && (
          <aside className="shrink-0 pt-4 max-sm:mx-auto">
            <div className="flex flex-wrap items-start gap-2">
              <div>{stars[rating - 1]}</div>
              <Text className="text-xl" color="sub">
                {reviewsLenght} avis
              </Text>
            </div>
          </aside>
        )}
        <div className="w-full max-w-2xl grow">
          {reviews ? (
            <ul>
              {reviews?.map((review) => {
                return (
                  <li key={review.id} className="flex gap-2 border-b border-trans-20 py-4">
                    <div>
                      <div className="flex h-12 w-12 select-none items-center justify-center rounded-full bg-neutral-600 pt-1 font-[teko] text-3xl text-tertiary-100">
                        {review.user.display_name[0]}
                      </div>
                    </div>
                    <div className="flex w-full flex-col">
                      <div className="flex flex-wrap items-center">
                        <Text size="product" weight="semibold">
                          {review.user.display_name}
                        </Text>
                        <div className="shrink-0">
                          <Icon icon="check_circle" color="fill-secondary-600 mx-1" />
                          <Text weight="medium" className="inline" color="sub">
                            Commande vérifié du {new Date(review.created_at).toLocaleDateString('fr-FR')}
                          </Text>
                        </div>
                      </div>
                      <div>{stars[review.score - 1]}</div>
                      <Text className="mb-1 mt-1 text-xl font-medium" color="second">
                        {review.content}
                      </Text>
                    </div>
                    <div className="shrink-0">Publié le {new Date(review.created_at).toLocaleDateString('fr-FR')}</div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="text-center">Pour le moment il n&apos;y a aucun avis vérifié sur ce produit</p>
          )}
        </div>
      </div>
    </Section>
  );
}
