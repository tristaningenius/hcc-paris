import Layout from '../../components/Layout';
import { getPageByUri } from '../../lib/pages';
export default function TermsOfService({ page }) {
  console.log(page);
  return (
    <Layout>
      <div dangerouslySetInnerHTML={{ __html: page.content }} />
    </Layout>
  );
}

export async function getStaticProps() {
  const { page } = await getPageByUri('/termes-et-conditions-de-ventes');
  return {
    props: {
      page,
    },
  };
}
