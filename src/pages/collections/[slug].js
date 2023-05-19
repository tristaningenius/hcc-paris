import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { NextSeo } from 'next-seo';
import { Section } from 'components/elements';
import { QuestionsProduits } from 'components/sections/QuestionsProduits.server';
import { getGlobalFaq, searchProducts } from '../../lib/posts';
import ProductGridByCollection from 'components/product/ProductGridByCollection.client';

const CollectionPage = ({ categories, faqFlowers, faqVapes, faqResins, faqOil }) => {
  const router = useRouter();
  const { slug } = router.query;
  const collection = categories.find((category) => category.slug === slug);
  const correspondingFaq = {
    'fleurs-hhc': faqFlowers,
    'vapes-hhc': faqVapes,
    'resines-hhc': faqResins,
    'huiles-hhc': faqOil,
  };

  // Use the slug value to fetch data or perform any other logic

  return (
    <Layout>
      <NextSeo title={slug} />
      <ProductGridByCollection collection={collection} />
      <Section noDivide>
        <QuestionsProduits collectionName={slug} correspondingFaq={correspondingFaq[slug]} />
      </Section>
    </Layout>
  );
};

export default CollectionPage;

export async function getStaticPaths() {
  return {
    paths: [
      { params: { slug: 'fleurs-hhc' } },
      { params: { slug: 'vapes-hhc' } },
      { params: { slug: 'resines-hhc' } },
      { params: { slug: 'huiles-hhc' } },
    ],
    fallback: false,
  };
}

export async function getStaticProps() {
  // params contains the post `slug`.
  // If the route is like /posts/1, then params.slug is 1
  const faqFlowers = await getGlobalFaq(180);
  const faqVapes = await getGlobalFaq(178);
  const faqResins = await getGlobalFaq(179);
  const faqOil = await getGlobalFaq(176);
  const { categories } = await searchProducts();
  return {
    props: {
      categories,
      faqFlowers,
      faqVapes,
      faqResins,
      faqOil,
    },
  };
}
