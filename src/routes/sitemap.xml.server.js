import {flattenConnection, gql} from '@shopify/hydrogen';

const MAX_URLS = 250; // the google limit is 50K, however, SF API only allow querying for 250 resources each time

export async function api(request, {queryShop}) {
  const {data} = await queryShop({
    query: QUERY,
    variables: {
      language: 'FR',
      urlLimits: MAX_URLS,
    },
  });

  return new Response(shopSitemap(data, new URL(request.url).origin), {
    headers: {
      'content-type': 'application/xml',
      // Cache for 24 hours
      'cache-control': `max-age=${60 * 60 * 24}`,
    },
  });
}

function shopSitemap(data, baseUrl) {
  const productsData = flattenConnection(data.products)
    .filter(
      (product) => product.vendor !== 'Grossiste HHC' && product.onlineStoreUrl,
    )
    .map((product) => {
      const url = `${baseUrl}/products/${product.handle}`;

      const finalObject = {
        url,
        lastMod: product.updatedAt,
        changeFreq: 'daily',
      };

      if (product.featuredImage?.url) {
        finalObject.image = {
          url: product.featuredImage.url,
        };

        if (product.title) {
          finalObject.image.title = product.title;
        }

        if (product.featuredImage.altText) {
          finalObject.image.caption = product.featuredImage.altText;
        }
      }

      return finalObject;
    });

  const collectionsData = flattenConnection(data.collections)
    .filter((collection) => collection.onlineStoreUrl)
    .map((collection) => {
      const url = `${baseUrl}/collections/${collection.handle}`;

      return {
        url,
        lastMod: collection.updatedAt,
        changeFreq: 'daily',
      };
    });

  const articlesData = flattenConnection(data.articles)
    .filter((article) => article.onlineStoreUrl)
    .map((article) => {
      const url = `${baseUrl}/journal/${article.handle}`;

      return {
        url,
        lastMod: article.publishedAt,
        changeFreq: 'daily',
      };
    });

  const staticPages = [
    {
      url: `${baseUrl}/contact`,
      lastMod: '2023-03-22',
      changeFreq: 'monthly',
    },
    {
      url: `${baseUrl}/faqs`,
      lastMod: '2023-03-22',
      changeFreq: 'monthly',
    },
  ];

  const urlsDatas = [
    ...productsData,
    ...collectionsData,
    ...articlesData,
    ...staticPages,
  ];

  return `
    <urlset
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
    >
      ${urlsDatas.map((url) => renderUrlTag(url)).join('')}
    </urlset>`;
}

function renderUrlTag({url, lastMod, changeFreq, image}) {
  return `
    <url>
      <loc>${url}</loc>
      <lastmod>${lastMod}</lastmod>
      <changefreq>${changeFreq}</changefreq>
      ${
        image
          ? `
        <image:image>
          <image:loc>${image.url}</image:loc>
          <image:title>${image.title ?? ''}</image:title>
          <image:caption>${image.caption ?? ''}</image:caption>
        </image:image>`
          : ''
      }

    </url>
  `;
}

const QUERY = gql`
  query sitemaps($urlLimits: Int, $language: LanguageCode)
  @inContext(language: $language) {
    products(
      first: $urlLimits
      query: "published_status:'online_store:visible'"
    ) {
      edges {
        node {
          updatedAt
          handle
          onlineStoreUrl
          title
          vendor
          featuredImage {
            url
            altText
          }
        }
      }
    }
    collections(
      first: $urlLimits
      query: "published_status:'online_store:visible'"
    ) {
      edges {
        node {
          updatedAt
          handle
          onlineStoreUrl
        }
      }
    }
    articles(first: $urlLimits) {
      edges {
        node {
          handle
          publishedAt
          onlineStoreUrl
        }
      }
    }
  }
`;
