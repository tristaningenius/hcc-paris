import {
  useLocalization,
  useShopQuery,
  Seo,
  useServerAnalytics,
  ShopifyAnalyticsConstants,
  gql,
} from '@shopify/hydrogen';
import {Suspense} from 'react';

import {Layout, NotFound} from '~/components/index.server';
import {Section, Heading, Text, Divider} from '~/components';

export default function Policy({params}) {
  const {
    language: {isoCode: languageCode},
  } = useLocalization();
  const {handle} = params;

  const policy = {
    privacyPolicy: handle === 'privacy-policy',
    termsOfService: handle === 'terms-of-service',
  };

  if (!policy.privacyPolicy && !policy.termsOfService) {
    return <NotFound />;
  }

  // The currently visited policy page key
  const activePolicy = Object.keys(policy).find((key) => policy[key]);

  const {
    data: {shop},
  } = useShopQuery({
    query: POLICIES_QUERY,
    variables: {
      languageCode,
      ...policy,
    },
  });

  const page = shop?.[activePolicy];

  if (!page) {
    return <NotFound />;
  }

  useServerAnalytics({
    shopify: {
      pageType: ShopifyAnalyticsConstants.pageType.page,
      resourceId: page.id,
    },
  });

  const translatedTitle =
    page.title === 'Privacy Policy'
      ? 'Politique de confidentialité'
      : 'Termes & conditions de vente';
  return (
    <Layout>
      <Suspense>
        <Seo type="page" data={page} />
      </Suspense>
      <Section gap="large" noDivide className="m-auto max-w-2xl">
        <div className=" flex flex-col gap-2">
          <Heading as="h1" noBorder className="mt-8">
            {translatedTitle}
          </Heading>
          <Divider color="20" />
        </div>
        <Text
          as="div"
          className="article__container"
          size="product"
          width="wide"
          dangerouslySetInnerHTML={{__html: page.body}}
        />
      </Section>
    </Layout>
  );
}

const POLICIES_QUERY = gql`
  fragment Policy on ShopPolicy {
    body
    handle
    id
    title
    url
  }

  query PoliciesQuery(
    $languageCode: LanguageCode
    $privacyPolicy: Boolean!
    $termsOfService: Boolean!
  ) @inContext(language: $languageCode) {
    shop {
      privacyPolicy @include(if: $privacyPolicy) {
        ...Policy
      }
      termsOfService @include(if: $termsOfService) {
        ...Policy
      }
    }
  }
`;
