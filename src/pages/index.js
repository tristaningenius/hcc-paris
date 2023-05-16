import Layout from 'components/Layout';
import { Hero } from 'components/sections';
import { HeroDesktop } from 'components/sections/HeroDesktop.client';
import { VideoHhc, HomeContact, QuestionsFrequentes, NosSelections } from 'components/index.server';
import { getGlobalFaq, searchProducts } from '../lib/posts';

export default function Home({ categories, faq }) {
  const collections = [
    {
      id: 1,
      image:
        'https://cdn.shopify.com/s/files/1/0661/5367/7068/collections/Capture_d_ecran_2022-12-26_204129.png?v=1679596355',
      handle: 'vapes-hhc',
      title: 'vapes hhc',
    },
    {
      id: 2,
      image: 'https://cdn.shopify.com/s/files/1/0661/5367/7068/collections/resine-hhc.webp?v=1679597053',
      handle: 'resines-hhc',
      title: 'resines hhc',
    },

    {
      id: 3,
      image: 'https://cdn.shopify.com/s/files/1/0661/5367/7068/collections/fleur-hhc.webp?v=1679596402',
      handle: 'fleurs-hhc',
      title: 'fleurs hhc',
    },

    {
      id: 4,
      image: 'https://cdn.shopify.com/s/files/1/0661/5367/7068/collections/huile-hhc.webp?v=1679596330',
      handle: 'huiles-hhc',
      title: 'huiles hhc',
    },
  ];

  return (
    <Layout>
      <div className="hidden h-[90vh] sm:block">
        <HeroDesktop data={collections} />
      </div>
      <Hero data={collections} />
      <VideoHhc />
      <NosSelections data={categories} />
      <QuestionsFrequentes faq={faq} />
      <HomeContact />
    </Layout>
  );
}

export async function getStaticProps() {
  const { categories } = await searchProducts();
  const { faq } = await getGlobalFaq(596);

  return {
    props: {
      categories,
      faq,
    },
  };
}
