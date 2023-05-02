import {useState, useRef} from 'react';
import {gsap, Power1} from 'gsap';

import {Icon} from './IconImport';
import {Text} from '~/components';
import {Metafield} from '@shopify/hydrogen';

export function Accordion({data}) {
  const [activeIndex, setActiveIndex] = useState(-1);
  const contentRefs = useRef([]);

  const onTitleClick = (index) => {
    if (activeIndex === index) {
      setActiveIndex(-1);
      gsap.to(contentRefs.current[index], {
        height: 0,
        duration: 0.3,
        ease: Power1.easeIn,
      });
    } else {
      if (activeIndex !== -1) {
        gsap.to(contentRefs.current[activeIndex], {
          height: 0,
          duration: 0.3,
          ease: Power1.easeOut,
        });
      }

      setActiveIndex(index);
      gsap.set(contentRefs.current[index], {height: 'auto'});
      gsap.from(contentRefs.current[index], {
        height: 0,
        duration: 0.3,
        ease: Power1.easeOut,
      });
    }
  };

  return (
    <div className="w-full border-b border-trans-50">
      {data?.map((question, index) => (
        <AccordionItem
          key={question.fields[0].value}
          question={question}
          isActive={activeIndex === index}
          onClick={() => onTitleClick(index)}
          contentRef={(element) => (contentRefs.current[index] = element)}
        />
      ))}
    </div>
  );
}

function AccordionItem({question, isActive, onClick, contentRef}) {
  const title = question.fields[0].value;
  const content = question.fields[1].value;

  return (
    <div key={title} className="border-t border-trans-50">
      <button
        className="w-full py-4 text-lg font-bold"
        onClick={onClick}
        aria-expanded={isActive}
        aria-controls={`content-${title}`}
      >
        <div className="flex items-center justify-between text-left">
          <h3>{<Metafield data={question.fields[0]} />}</h3>
          <Icon icon={isActive ? 'remove' : 'add'} />
        </div>
      </button>
      <div
        ref={contentRef}
        id={`content-${title}`}
        className={`overflow-hidden${isActive ? ' h-auto' : ' h-0'}`}
      >
        <Text
          as="div"
          className="styled-text_container pb-4"
          dangerouslySetInnerHTML={{
            __html: content,
          }}
        />
      </div>
    </div>
  );
}
