import { useRouter } from 'next/router';
import { Helmet } from 'react-helmet';
import useSite from 'hooks/use-site';
import { helmetSettingsFromMetadata } from 'lib/site';
import { AgePopup } from '../global';
import Main from 'components/Main';
import { Header } from 'components/global/Header.client';
import { Footer } from 'components/global/Footer.server';

const Layout = ({ children }) => {
  const router = useRouter();
  const { asPath } = router;

  const { homepage, metadata = {} } = useSite();

  if (!metadata.og) {
    metadata.og = {};
  }

  metadata.og.url = `${homepage}${asPath}`;

  const helmetSettings = {
    defaultTitle: metadata.title,
    titleTemplate: process.env.WORDPRESS_PLUGIN_SEO === true ? '%s' : `%s - ${metadata.title}`,
    ...helmetSettingsFromMetadata(metadata, {
      setTitle: false,
      link: [
        {
          rel: 'alternate',
          type: 'application/rss+xml',
          href: '/feed.xml',
        },
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: '/apple-touch-icon.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '16x16',
          href: '/favicon-16x16.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          href: '/favicon-32x32.png',
        },
        {
          rel: 'manifest',
          href: '/site.webmanifest',
        },
      ],
    }),
  };

  return (
    <>
      <Helmet {...helmetSettings} />

      <Header data={''} isLogged={'false'} promoMessage={''} customerEmail={''} customerIdNum={''} isPro={''} />
      <AgePopup />

      <Main>{children}</Main>

      <Footer />
    </>
  );
};

export default Layout;
