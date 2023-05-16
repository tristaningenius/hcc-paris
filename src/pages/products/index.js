import Layout from '../../components/Layout';
import { NextSeo } from 'next-seo';
import { ProductsLayout } from 'components/product/ProductGrid.client';
import { getAllProducts } from '../../lib/posts';

export default function AllProducts({ products }) {
  return (
    <Layout>
      <NextSeo title="Tous les produits" />
      <ProductsLayout data={products} />
      {/*<Section noDivide>*/}
      {/*  <QuestionsProduits questionsTitle="À propos de nos produits" />*/}
      {/*</Section>*/}
    </Layout>
  );
}

export async function getStaticProps() {
  const { products } = await getAllProducts();
  // const { faq } = await getGlobalFaq(596);

  return {
    props: {
      products,
    },
  };
}
