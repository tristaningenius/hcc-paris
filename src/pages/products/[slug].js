import { getProductBySlug } from '../../lib/posts';
import { Section, Heading, Text } from 'components/elements';
import Layout from 'components/Layout/Layout';
import { ProductGallery, ProductForm } from 'components/product/';
import { Accordion } from 'components/elements';

export default function Product({ product }) {
  const { description } = product;

  return (
    <Layout>
      <Section className="lg:relative lg:flex-row lg:justify-start" noDivide gap="noGap">
        <ProductGallery product={product} />
        <Section
          gap="large"
          noDivide
          className="lg:grow lg:py-10 lg:pl-10 lg:pr-6 xl:py-14 xl:pl-14 xl:pr-10 2xl:py-16 2xl:pl-16 2xl:pr-12"
        >
          <ProductForm product={product} />
          <Section noDivide className="xl:flex-row xl:justify-between xl:gap-8">
            <Heading size="section-s" className="shrink-0">
              POURQUOI ON ADORE ?
            </Heading>
            {description && (
              <Text
                as="div"
                className="styled-text_container"
                dangerouslySetInnerHTML={{
                  __html: description,
                }}
              />
            )}
          </Section>
          <Accordion data={product.accordeonProduit} type={'allProducts'} />
        </Section>
      </Section>
      {/*<QuestionsProduits collectionName={collection[0]?.title} />*/}
    </Layout>
  );
}

export async function getServerSideProps({ params }) {
  const { slug } = params;
  const { product } = await getProductBySlug(slug);
  return { props: { product } };
}
