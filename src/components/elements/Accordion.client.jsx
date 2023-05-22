import { useState, useRef } from 'react';
import { gsap, Power1 } from 'gsap';

import { Icon } from './IconImport';
import { Text } from 'components/elements';

export function Accordion({ data }) {
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
      gsap.set(contentRefs.current[index], { height: 'auto' });
      gsap.from(contentRefs.current[index], {
        height: 0,
        duration: 0.3,
        ease: Power1.easeOut,
      });
    }
  };

  return (
    <div className="w-full border-trans-50">
      {data?.map((question, i) => (
        <AccordionItem
          key={i}
          question={question}
          isActive={activeIndex === i}
          onClick={() => onTitleClick(i)}
          contentRef={(element) => (contentRefs.current[i] = element)}
        />
      ))}
    </div>
  );
}

function AccordionItem({ question, isActive, onClick, contentRef }) {
  const title = question.title;
  const content = question.content;

  return (
    <div key={title} className="border-t border-trans-50">
      <button
        className="w-full py-4 text-lg font-bold"
        onClick={onClick}
        aria-expanded={isActive}
        aria-controls={`content-${title}`}
      >
        <div className="flex items-center justify-between text-left">
          <h3>{title}</h3>
          <Icon icon={isActive ? 'remove' : 'add'} />
        </div>
      </button>
      <div ref={contentRef} id={`content-${title}`} className={`overflow-hidden${isActive ? ' h-auto' : ' h-0'}`}>
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
