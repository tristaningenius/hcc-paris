import {
  useLocalization,
  useShopQuery,
  Seo,
  gql,
  Image,
  CacheLong,
  useServerAnalytics,
  ShopifyAnalyticsConstants,
} from '@shopify/hydrogen';
import {Suspense} from 'react';

import {Layout, NotFound} from '~/components/index.server';
import {Section, Divider, Text, Heading, ShareButtons} from '~/components';
import {ATTR_LOADING_EAGER} from '~/lib/const';

const BLOG_HANDLE = 'journal';

export default function Post({params, response}) {
  response.cache(CacheLong());
  const {
    language: {isoCode: languageCode},
    country: {isoCode: countryCode},
  } = useLocalization();

  const {handle} = params;
  const {data} = useShopQuery({
    query: ARTICLE_QUERY,
    variables: {
      language: languageCode,
      blogHandle: BLOG_HANDLE,
      articleHandle: handle,
    },
  });

  useServerAnalytics({
    shopify: {
      canonicalPath: `/${BLOG_HANDLE}/${handle}`,
      pageType: ShopifyAnalyticsConstants.pageType.article,
    },
  });

  if (!data?.blog?.articleByHandle) {
    return <NotFound type="Article" />;
  }

  const {title, publishedAt, contentHtml, metafield} =
    data.blog.articleByHandle;
  const formattedDate = new Intl.DateTimeFormat(
    `${languageCode}-${countryCode}`,
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    },
  ).format(new Date(publishedAt));

  return (
    <Layout>
      <Suspense>
        <Seo type="page" data={data.blog.articleByHandle} />
      </Suspense>

      <div className="mt-8 flex justify-center gap-24 xl:gap-32">
        <aside className="shrink-0 max-lg:hidden">
          <nav className="sticky top-20 left-0 flex flex-col pt-20">
            {metafield?.references.nodes.map((ancre, index) => {
              return (
                <a
                  href={`#${ancre.fields[1].value}`}
                  className="max-w-md text-xl target:text-primary-700 hover:text-primary-600 active:text-primary-800"
                  key={ancre.fields[1].value}
                >
                  {index + 1}. {ancre.fields[0].value}
                </a>
              );
            })}
          </nav>
        </aside>
        <Section gap="large" noDivide className="smooth_container max-w-2xl">
          <div className="flex flex-col gap-2">
            <Heading as="h1" noBorder>
              {title}
            </Heading>
            <Text color="sub" size="product">
              Publié le {formattedDate}
            </Text>
            <Divider color="20" />
          </div>
          <ShareButtons url={`hhcparis.fr/journal/${handle}`} text={title} />
          {data.blog.articleByHandle.image && (
            <Image
              data={data.blog.articleByHandle.image}
              className="max-h-[40vh] w-full object-cover"
              widths={[400, 800, 1200]}
              width="100px"
              height="100%"
              loading={ATTR_LOADING_EAGER}
              loaderOptions={{
                scale: 2,
                crop: 'center',
              }}
              alt={data.blog.articleByHandle.image.altText || title}
            />
          )}
          <Text
            as="div"
            className="article__container"
            size="product"
            width="wide"
            dangerouslySetInnerHTML={{__html: contentHtml}}
          />
          <Divider color="20" />
          <ShareButtons url={`hhcparis.fr/journal/${handle}`} text={title} />
        </Section>
      </div>
    </Layout>
  );
}

const ARTICLE_QUERY = gql`
  query ArticleDetails(
    $language: LanguageCode
    $blogHandle: String!
    $articleHandle: String!
  ) @inContext(language: $language) {
    blog(handle: $blogHandle) {
      articleByHandle(handle: $articleHandle) {
        title
        contentHtml
        publishedAt
        seo {
          title
          description
        }
        image {
          id
          altText
          url
          width
          height
        }
        metafield(namespace: "custom", key: "les_ancres") {
          references(first: 10) {
            nodes {
              ... on Metaobject {
                fields {
                  value
                }
              }
            }
          }
        }
      }
    }
  }
`;
