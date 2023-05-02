import {gql, useShopQuery} from '@shopify/hydrogen';

import {Section, Heading, Button, Icon} from '~/components';
import AccordionLazy from '../lazyGsap/AccordionLazy.client';

export function QuestionsFrequentes() {
  const {
    data: {
      metaobjects: {nodes: faqdata},
    },
  } = useShopQuery({query: FAQ_QUERY, preload: true});

  return (
    <Section gap="large" noDivide className="my-8">
      <Heading as="h1" size="page" noBorder className="md:hidden">
        Questions Fréquentes
      </Heading>
      <div className="flex flex-col gap-8 md:flex-row-reverse md:justify-center md:gap-20">
        <div className="w-full max-w-2xl">
          <AccordionLazy data={faqdata[0].fields[0].references.nodes} />
        </div>
        <aside className="text-right">
          <h2 className="font-display text-5xl font-semibold uppercase max-md:hidden">
            Questions Fréquentes
          </h2>
          <Button className="group" variant="linkFooter" to="/faqs">
            Consultez toutes les réponses
            <Icon
              size="20"
              icon="arrow_outward"
              color="ml-1 group-hover:fill-primary-600 group-active:fill-primary-700"
            />
          </Button>
        </aside>
      </div>
    </Section>
  );
}

const FAQ_QUERY = gql`
  query metaFaq {
    metaobjects(first: 30, type: "questions_frequentes") {
      nodes {
        fields {
          key
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
