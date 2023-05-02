import {defineConfig, CookieSessionStorage} from '@shopify/hydrogen/config';

export default defineConfig({
  shopify: {
    defaultCountryCode: 'FR',
    defaultLanguageCode: 'FR',
    storeDomain: Oxygen?.env?.PUBLIC_STORE_DOMAIN || 'hhcparis.myshopify.com',
    storefrontToken:
      Oxygen?.env?.PUBLIC_STOREFRONT_API_TOKEN ||
      '1fe27e1ce053c5dd8ea18ceeb9e67dff',
    privateStorefrontToken: Oxygen?.env?.PRIVATE_STOREFRONT_API_TOKEN,
    storefrontId: Oxygen?.env?.PUBLIC_STOREFRONT_ID,
    storefrontApiVersion: '2023-01',
  },
  session: CookieSessionStorage('__session', {
    path: '/',
    httpOnly: true,
    secure: import.meta.env.PROD,
    sameSite: 'Strict',
    maxAge: 60 * 60 * 24 * 30,
  }),
});
