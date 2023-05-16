import NextApp from 'next/app';
import { SiteContext, useSiteContext } from 'hooks/use-site';
import { getSiteMetadata } from 'lib/site';
import NextNProgress from 'nextjs-progressbar';

import '../styles/globals.css';

function App({ Component, pageProps = {}, metadata }) {
  const site = useSiteContext({
    metadata,
  });

  return (
    // <SessionProvider session={session}>
    <SiteContext.Provider value={site}>
      <NextNProgress height={4} color={'#1cf28c'} />
      <Component {...pageProps} />
    </SiteContext.Provider>
    // </SessionProvider>
  );
}

App.getInitialProps = async function (appContext) {
  const appProps = await NextApp.getInitialProps(appContext);

  // const { menus = [] } = await getAllMenus();

  return {
    ...appProps,
    metadata: await getSiteMetadata(),
  };
};

export default App;
