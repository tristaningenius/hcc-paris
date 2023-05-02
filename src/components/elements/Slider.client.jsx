import {useRef, useMemo} from 'react';
import {Link} from '@shopify/hydrogen';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation} from 'swiper';

import {ProductCard, Section, Heading, Text, Md, Xl} from '~/components';
import {Icon} from './IconImport';

export function Slider({
  data,
  title,
  handle,
  i = '3',
  description,
  isPro = false,
}) {
  const swiperRef = useRef();

  const MemoizedProduct = useMemo(() => ProductCard, []);

  const md = Md();
  const xl = Xl();

  const slideNumber = xl ? '4' : md ? '3' : '2';
  const slideSpace = xl ? 24 : 16;

  const placementArray = xl
    ? [
        'left-[calc(25%-0.75rem)] w-[calc(25%+1rem)] px-4',
        'right-0 w-[calc(25%+0.25rem)] pl-4',
        'left-0 w-[calc(25%+0.25rem)] pr-4',
        'right-[calc(25%-0.75rem)] w-[calc(25%+1rem)] px-4',
      ]
    : md
    ? [
        'left-[calc(33.33%-0.75rem)] w-[calc(33%+1rem)] px-4',
        'right-0 w-[calc(33.33%+0.25rem)] pl-4',
        'left-0 w-[calc(33.33%+0.25rem)] pr-4',
      ]
    : ['undefined'];
  const sliderPlacement = placementArray[i % placementArray.length] || '';

  const filteredVendor = data?.filter((vendor) =>
    isPro ? vendor?.vendor !== 'HHC Paris' : vendor?.vendor !== 'Grossiste HHC',
  );

  return (
    <Section noDivide gap="default" className="relative">
      <div
        suppressHydrationWarning
        className={`absolute top-[-1px] bottom-0 hidden flex-col justify-between md:flex ${sliderPlacement} z-20 bg-tertiary-200 pb-[4.1rem]`}
      >
        <Text className="max-w-[260px]">{description}</Text>
        <div className="flex items-end justify-between">
          <Heading size="section" className="w-1/2">
            {handle ? (
              <Link to={`/collections/${handle}`}>{title}</Link>
            ) : (
              title
            )}
          </Heading>
          <div className="flex h-10 items-center justify-center gap-4 border border-trans-20">
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="justify-cente flex h-10 w-10 items-center justify-center"
            >
              <Icon icon="arrow_back" aria-label="Caroussel Précédent" />
            </button>
            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="flex h-10 w-10 items-center justify-center"
            >
              <Icon icon="arrow_forward" aria-label="Caroussel Suivant" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-end justify-between md:hidden">
        <Heading size="section">
          {handle ? <Link to={`/collections/${handle}`}>{title}</Link> : title}
        </Heading>
        <div className="flex h-10 items-center justify-center gap-4 border border-trans-20">
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="justify-cente flex h-10 w-10 items-center justify-center"
          >
            <Icon icon="arrow_back" aria-label="Caroussel Précédent" />
          </button>
          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="flex h-10 w-10 items-center justify-center"
          >
            <Icon icon="arrow_forward" aria-label="Caroussel Suivant" />
          </button>
        </div>
      </div>
      <div>
        <Swiper
          modules={[Navigation]}
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          loop
          slidesPerView={slideNumber}
          spaceBetween={slideSpace}
          className="mySwiper"
        >
          {filteredVendor.map((product) => (
            <SwiperSlide key={product.id}>
              <MemoizedProduct product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </Section>
  );
}
