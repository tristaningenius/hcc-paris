import {useEffect, useRef} from 'react';
import {Link} from '@shopify/hydrogen';
import {gsap, Power4} from 'gsap';

import {LogoTextCollectionHero} from '~/components';

export function CollectionsImageDesktop({data}) {
  const collectionContainerRef = useRef([]);

  const xlBreakpoint = '(min-width: 1280px)';
  const xlGridColumns = {
    '@media': {
      [xlBreakpoint]: {
        gridTemplateColumns: `repeat(${data.length}, 1fr)`,
      },
    },
  };

  useEffect(() => {
    const collectionContainer = collectionContainerRef.current;
    gsap.to(collectionContainer, {
      translateY: 0,
      duration: 1,
      ease: Power4.easeOut,
      stagger: 0.25,
    });
  }, []);

  return (
    <section
      className={`z-20 hidden grow grid-cols-2 gap-2 sm:grid lg:grid-cols-${data.length}`}
      style={xlGridColumns}
    >
      {data.map((collection, index) => (
        <Link
          key={collection.id}
          className="overflow-hidden"
          to={`/collections/${collection.handle}`}
        >
          <div
            ref={(element) => (collectionContainerRef.current[index] = element)}
            className="group flex h-full translate-y-[100%] flex-col"
          >
            <div className="grow overflow-hidden">
              <div
                className="ease-[cubic-bezier(0.16, 1, 0.3, 1)] group h-full w-full bg-cover bg-center transition-all duration-500 hover:scale-125"
                style={{backgroundImage: `url(${collection.image.url})`}}
              />
            </div>
            <div className="ease-[cubic-bezier(0.16, 1, 0.3, 1)] h-0 pt-2 transition-all duration-500 group-hover:h-[10vw]">
              <LogoTextCollectionHero collectionHandle={collection.handle} />
            </div>
          </div>
        </Link>
      ))}
    </section>
  );
}
