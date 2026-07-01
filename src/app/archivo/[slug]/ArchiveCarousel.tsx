"use client";

import {useEffect, useState} from "react";
import Image from "next/image";
import {CaretLeft, CaretRight} from "@phosphor-icons/react";

export type ArchiveCarouselImage = {
  key: string;
  url: string;
  alt: string;
  caption?: string | null;
  credit?: string | null;
  width: number;
  height: number;
  lqip?: string | null;
};

type ArchiveCarouselProps = {
  images: ArchiveCarouselImage[];
  className?: string;
  styles: {
    carousel: string;
    photoTrack: string;
    photo: string;
    controls: string;
    control: string;
    previous: string;
    next: string;
    image: string;
    caption: string;
    credit: string;
  };
};

export function ArchiveCarousel({
  images,
  className,
  styles,
}: ArchiveCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const hasControls = images.length > 1;

  function showPreviousImage() {
    setActiveIndex((currentIndex) =>
      currentIndex === 0 ? images.length - 1 : currentIndex - 1
    );
  }

  function showNextImage() {
    setActiveIndex((currentIndex) => (currentIndex + 1) % images.length);
  }

  useEffect(() => {
    if (images.length <= 1) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % images.length);
    }, 5000);

    return () => window.clearInterval(intervalId);
  }, [images.length]);

  if (!images.length) {
    return null;
  }

  return (
    <section
      className={[styles.carousel, className].filter(Boolean).join(" ")}
      aria-label="Photo carousel"
    >
      <div
        className={styles.photoTrack}
        style={{transform: `translateX(-${activeIndex * 100}%)`}}
      >
        {images.map((image, index) => (
          <figure
            aria-hidden={index !== activeIndex}
            className={styles.photo}
            key={image.key}
          >
            <Image
              alt={image.alt}
              blurDataURL={image.lqip ?? undefined}
              className={styles.image}
              height={image.height}
              placeholder={image.lqip ? "blur" : "empty"}
              priority={index === 0}
              src={image.url}
              width={image.width}
            />
            {image.caption || image.credit ? (
              <figcaption className={styles.caption}>
                {image.caption ? <span>{image.caption}</span> : null}
                {image.credit ? (
                  <span className={styles.credit}>{image.credit}</span>
                ) : null}
              </figcaption>
            ) : null}
          </figure>
        ))}
      </div>
      {hasControls ? (
        <div className={styles.controls} aria-label="Carousel controls">
          <button
            aria-label="Previous image"
            className={[styles.control, styles.previous].join(" ")}
            onClick={showPreviousImage}
            type="button"
          >
            <CaretLeft aria-hidden="true" size={18} weight="regular" />
          </button>
          <button
            aria-label="Next image"
            className={[styles.control, styles.next].join(" ")}
            onClick={showNextImage}
            type="button"
          >
            <CaretRight aria-hidden="true" size={18} weight="regular" />
          </button>
        </div>
      ) : null}
    </section>
  );
}
