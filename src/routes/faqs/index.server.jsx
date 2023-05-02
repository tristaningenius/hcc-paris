import {useShopQuery, gql} from '@shopify/hydrogen';
import {Layout} from '~/components/index.server';
import {FaqPage} from '~/components';

export default function Faqs() {
  const {
    data: {
      metaobjects: {nodes: faqdata},
    },
  } = useShopQuery({query: FAQ_QUERY, preload: true});

  return (
    <Layout>
      <FaqPage data={faqdata} />
    </Layout>
  );
}

const FAQ_QUERY = gql`
  query metaFaq {
    metaobjects(
      first: 30
      type: "groupe_de_questions_reponse"
      sortKey: "updated_at"
    ) {
      nodes {
        fields {
          key
          value
          references(first: 10) {
            nodes {
              ... on Metaobject {
                fields {
                  value
                }
              }
            }
          }
        }
      }
    }
  }
`;
