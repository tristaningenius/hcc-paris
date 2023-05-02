import {
  CacheLong,
  flattenConnection,
  gql,
  Seo,
  useLocalization,
  useShopQuery,
  useServerAnalytics,
  ShopifyAnalyticsConstants,
} from '@shopify/hydrogen';
import {Suspense} from 'react';

import {Layout, ArticleCard} from '~/components/index.server';
import {Heading} from '~/components';
import {getImageLoadingPriority, PAGINATION_SIZE} from '~/lib/const';

const BLOG_HANDLE = 'Journal';

export default function Blog({pageBy = PAGINATION_SIZE, response}) {
  response.cache(CacheLong());

  return (
    <Layout>
      <Seo type="page" data={{title: 'Tout les articles'}} />
      <Heading as="h1" size="page">
        Nos articles
      </Heading>
      <Suspense>
        <JournalsGrid pageBy={pageBy} />
      </Suspense>
    </Layout>
  );
}

function JournalsGrid({pageBy}) {
  const {
    language: {isoCode: languageCode},
    country: {isoCode: countryCode},
  } = useLocalization();

  const {data} = useShopQuery({
    query: BLOG_QUERY,
    variables: {
      language: languageCode,
      blogHandle: BLOG_HANDLE,
      pageBy,
    },
  });

  useServerAnalytics({
    shopify: {
      canonicalPath: `/${BLOG_HANDLE}`,
      pageType: ShopifyAnalyticsConstants.pageType.page,
    },
  });

  const rawArticles = flattenConnection(data.blog.articles);

  const articles = rawArticles.map((article) => {
    const {publishedAt} = article;
    return {
      ...article,
      publishedAt: new Intl.DateTimeFormat(`${languageCode}-${countryCode}`, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }).format(new Date(publishedAt)),
    };
  });

  if (articles.length === 0) {
    return <p>Aucun article trouvé</p>;
  }

  return (
    <ul className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {articles.map((article, i) => {
        return (
          <ArticleCard
            blogHandle={BLOG_HANDLE.toLowerCase()}
            article={article}
            key={article.id}
            loading={getImageLoadingPriority(i, 2)}
          />
        );
      })}
    </ul>
  );
}

const BLOG_QUERY = gql`
  query Blog(
    $language: LanguageCode
    $blogHandle: String!
    $pageBy: Int!
    $cursor: String
  ) @inContext(language: $language) {
    blog(handle: $blogHandle) {
      articles(first: $pageBy, after: $cursor) {
        edges {
          node {
            author: authorV2 {
              name
            }
            contentHtml
            handle
            id
            image {
              id
              altText
              url
              width
              height
            }
            publishedAt
            title
          }
        }
      }
    }
  }
`;
