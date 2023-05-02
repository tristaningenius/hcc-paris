import {Suspense} from 'react';
import renderHydrogen from '@shopify/hydrogen/entry-server';
import {
  FileRoutes,
  PerformanceMetrics,
  PerformanceMetricsDebug,
  Route,
  Router,
  ShopifyAnalytics,
  ShopifyProvider,
  CartProvider,
  useSession,
  useServerAnalytics,
  Seo,
} from '@shopify/hydrogen';
import {EventsListener} from '~/components';
import {NotFound, Loading} from '~/components/index.server';

function App({request}) {
  const pathname = new URL(request.normalizedUrl).pathname;
  const localeMatch = /^\/([a-z]{2})(\/|$)/i.exec(pathname);
  const countryCode = localeMatch ? localeMatch[1] : undefined;

  const {customerAccessToken} = useSession();

  const cookie = request.headers.get('cookie');
  const cookiesArray = cookie ? cookie.split('; ') : [];

  const cookiesAcceptedCookie = cookiesArray.find((cookie) =>
    cookie.startsWith('cookiesAccepted='),
  );
  const cookiesAccepted = cookiesAcceptedCookie
    ? cookiesAcceptedCookie.split('=')[1] === 'true'
    : false;

  cookiesAccepted &&
    useServerAnalytics({
      shopify: {
        isLoggedIn: !!customerAccessToken,
      },
    });

  return (
    <Suspense fallback={<Loading />}>
      {cookiesAccepted && <EventsListener />}
      <ShopifyProvider countryCode={countryCode}>
        <Seo
          type="defaultSeo"
          data={{
            title: 'HHC Paris',
            description:
              'Notre boutique en ligne de HHC Paris vous propose une large gamme de produits de qualité pour améliorer votre bien-être au quotidien.',
            titleTemplate: `%s · Le meilleur du HHC à Paris`,
          }}
        />
        <CartProvider
          countryCode={countryCode}
          customerAccessToken={customerAccessToken}
        >
          <Router>
            <FileRoutes
              basePath={countryCode ? `/${countryCode}/` : undefined}
            />
            <Route path="*" page={<NotFound />} />
          </Router>
        </CartProvider>
        <PerformanceMetrics />
        {import.meta.env.DEV && <PerformanceMetricsDebug />}
        {cookiesAccepted && <ShopifyAnalytics cookieDomain="hhcparis.fr" />}
      </ShopifyProvider>
    </Suspense>
  );
}

export default renderHydrogen(App);
