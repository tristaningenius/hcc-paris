import {defineConfig} from 'vite';
import hydrogen from '@shopify/hydrogen/plugin';

export default defineConfig({
  plugins: [hydrogen()],
  resolve: {
    alias: [{find: /^~\/(.*)/, replacement: '/src/$1'}],
  },
  optimizeDeps: {
    include: [
      'swiper/react',
      'react-use',
      '@emailjs/browser',
      'js-cookie',
      'swiper',
      'react-share',
      'gsap',
    ],
  },
});
