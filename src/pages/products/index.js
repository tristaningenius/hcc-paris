import Layout from '../../components/Layout';
import { NextSeo } from 'next-seo';
import { ProductsLayout } from 'components/product/ProductGrid.client';
import { Section } from 'components/elements';
import { getAllProducts, getGlobalFaq } from '../../lib/posts';
import { QuestionsProduits } from '../../components/sections/QuestionsProduits.server';

export default function AllProducts({ products, faq }) {
  return (
    <Layout>
      <NextSeo title="Tous les produits" />
      <ProductsLayout data={products} />
      <Section noDivide>
        <QuestionsProduits collectionName="produits" correspondingFaq={faq} />
      </Section>
    </Layout>
  );
}

export async function getStaticProps() {
  const { products } = await getAllProducts();
  const { faq } = await getGlobalFaq(175);

  return {
    props: {
      products,
      faq,
    },
  };
}
