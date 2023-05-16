import Layout from '../../components/Layout';
import { getPageByUri } from '../../lib/pages';

export default function PrivacyPolicy({ page }) {
  console.log(page);
  return (
    <Layout>
      <div dangerouslySetInnerHTML={{ __html: page.content }} />
    </Layout>
  );
}

export async function getStaticProps() {
  const { page } = await getPageByUri('/privacy-policy');
  return {
    props: {
      page,
    },
  };
}
