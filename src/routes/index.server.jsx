import {Suspense} from 'react';
import {
  CacheLong,
  gql,
  Seo,
  ShopifyAnalyticsConstants,
  useServerAnalytics,
  useShopQuery,
} from '@shopify/hydrogen';

import HeroDesktopLazy from '../components/lazyGsap/HeroDesktopLazy.client';
import {Hero} from '~/components';
import {PRODUCT_CARD_FRAGMENT} from '~/lib/fragments';
import {
  Layout,
  Loading,
  VideoHhc,
  HomeContact,
  QuestionsFrequentes,
  NosSelections,
} from '~/components/index.server';

export default function Home() {
  useServerAnalytics({
    shopify: {
      canonicalPath: '/',
      pageType: ShopifyAnalyticsConstants.pageType.home,
    },
  });

  return (
    <Layout>
      <Suspense>
        <SeoForHomepage />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <HomepageContent />
      </Suspense>
    </Layout>
  );
}

function HomepageContent() {
  const {
    data: {collections},
  } = useShopQuery({
    query: HOMEPAGE_CONTENT_QUERY,
    preload: true,
  });

  return (
    <>
      <div className="hidden h-[90vh] sm:block">
        <HeroDesktopLazy data={collections} />
      </div>
      <Hero data={collections} />
      <Suspense>
        <VideoHhc />
        <Suspense>
          <NosSelections data={collections.nodes} />
        </Suspense>
        <QuestionsFrequentes />
        <HomeContact />
      </Suspense>
    </>
  );
}

function SeoForHomepage() {
  const {
    data: {
      shop: {name, description},
    },
  } = useShopQuery({
    query: HOMEPAGE_SEO_QUERY,
    cache: CacheLong(),
    preload: true,
  });

  return (
    <Seo
      type="homepage"
      data={{
        title: name,
        description,
        titleTemplate: '%s · Le meilleur du HHC',
      }}
    />
  );
}

const HOMEPAGE_CONTENT_QUERY = gql`
  ${PRODUCT_CARD_FRAGMENT}
  query homepage {
    collections(first: 8) {
      nodes {
        title
        description
        handle
        id
        image {
          url
          width
          height
        }
        seo {
          description
        }
        products(first: 8, sortKey: BEST_SELLING) {
          nodes {
            ...ProductCard
          }
        }
      }
    }
  }
`;

const HOMEPAGE_SEO_QUERY = gql`
  query shopInfo {
    shop {
      name
      description
    }
  }
`;
