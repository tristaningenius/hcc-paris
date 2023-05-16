import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper';

import logoHero from '../../assets/logo-star.svg';

export function CollectionsImage({ data }) {
  const [activeName, setActiveName] = useState('FLEURS HHC');
  const [activeHandle, setActiveHandle] = useState('/collections/fleurs-hhc');
  const [domLoaded, setDomLoaded] = useState(false);
  useEffect(() => {
    setDomLoaded(true);
  }, []);

  const pagination = {
    clickable: true,
    renderCustom(index, className) {
      return '<span key="hero_slide-' + index + '" class="' + className + '"></span>';
    },
  };

  const slideChange = (swiper) => {
    let activatedIndex = swiper?.activeIndex;
    if (swiper?.slides[activatedIndex]) {
      const slide = swiper.slides[activatedIndex];
      const imgElement = slide.getElementsByTagName('img')[0];
      const anchorElement = slide.getElementsByTagName('a')[0];
      const getActiveName = imgElement ? imgElement.getAttribute('alt') : '';
      const getActiveHandle = anchorElement ? anchorElement.getAttribute('href') : '';
      setActiveName(getActiveName);
      setActiveHandle(getActiveHandle);
    }
  };

  return (
    <div className="sm:hidden">
      {domLoaded && (
        <Swiper
          onSlideChange={slideChange}
          slidesPerView="1"
          spaceBetween={12}
          loop
          className="mySwiper"
          pagination={pagination}
          modules={[Autoplay, Pagination]}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
        >
          {data.map((collection) => (
            <SwiperSlide key={collection.id}>
              <Link href={`/collections/${collection.handle}`}>
                <Image
                  src={collection.image}
                  alt={collection.title}
                  width={600}
                  height={600}
                  sizes="(max-width: 320px) 320px,
                (max-width: 640px) 640px,
                960px"
                  className="max-h-[60vh] object-cover"
                  loading="eager"
                />
              </Link>
            </SwiperSlide>
          ))}
          <div className="pt-6">
            <div className="flex items-start justify-between">
              <p className="font-display text-4xl text-trans-50">DÉCOUVREZ NOS</p>
              <Image src={logoHero} height="100%" width="100%" alt="logo HHC" className="w-8 text-neutral-600" />
            </div>
            <Link href={activeHandle}>
              <h1 className="font-display text-6xl font-semibold uppercase">{activeName}</h1>
            </Link>
          </div>
        </Swiper>
      )}
    </div>
  );
}
