import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PortableText, type PortableTextComponents } from "next-sanity";
import { StandardPageShell } from "@/components/SiteChrome";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { sanityFetch } from "@/sanity/lib/live";
import {
  ARCHIVE_ENTRY_QUERY,
  ARCHIVE_SLUGS_QUERY,
} from "@/sanity/lib/queries";
import { ArchiveList } from "../ArchiveList";
import { getArchiveEntries } from "../data";
import listStyles from "../page.module.css";
import { ArchiveCarousel, type ArchiveCarouselImage } from "./ArchiveCarousel";
import { ArchiveModalFrame } from "./ArchiveModalFrame";
import styles from "./page.module.css";

type ArchivePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

type SanityImage = {
  _key?: string | null;
  alt?: string | null;
  caption?: string | null;
  credit?: string | null;
  asset?: {
    url?: string | null;
    metadata?: {
      dimensions?: {
        width?: number | null;
        height?: number | null;
      } | null;
      lqip?: string | null;
    } | null;
  } | null;
};

type ReferenceLink = {
  _key: string;
  label?: string | null;
  href?: string | null;
};

type ArchiveEntry = {
  _id: string;
  title?: string | null;
  slug?: string | null;
  archiveDate?: string | null;
  publishedAt?: string | null;
  titleEs?: string | null;
  titleEn?: string | null;
  dek?: string | null;
  photos?: SanityImage[] | null;
  referenceLinks?: ReferenceLink[] | null;
  spanishBody?: unknown[] | null;
  englishBody?: unknown[] | null;
};

const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p>{children}</p>,
    h2: ({ children }) => <h2>{children}</h2>,
    h3: ({ children }) => <h3>{children}</h3>,
    blockquote: ({ children }) => <blockquote>{children}</blockquote>,
  },
  marks: {
    link: ({ children, value }) => {
      const href = typeof value?.href === "string" ? value.href : "";
      const isExternal = /^https?:\/\//i.test(href);

      if (!href) {
        return <>{children}</>;
      }

      return (
        <a
          href={href}
          rel={isExternal ? "noreferrer" : undefined}
          target={isExternal ? "_blank" : undefined}
        >
          {children}
        </a>
      );
    },
  },
  list: {
    bullet: ({ children }) => <ul>{children}</ul>,
    number: ({ children }) => <ol>{children}</ol>,
  },
};

function formatShortDate(value?: string | null) {
  if (!value) {
    return null;
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "2-digit",
    timeZone: "UTC",
  }).format(new Date(value));
}

export async function generateStaticParams() {
  const entries = await client
    .withConfig({ useCdn: false })
    .fetch<Array<{ slug: string }>>(ARCHIVE_SLUGS_QUERY);

  return entries.map((entry) => ({
    slug: entry.slug,
  }));
}

export async function generateMetadata({
  params,
}: ArchivePageProps): Promise<Metadata> {
  const { slug } = await params;
  const { data: entry } = await sanityFetch({
    query: ARCHIVE_ENTRY_QUERY,
    params: { slug },
    stega: false,
  });

  if (!entry) {
    return {
      title: "Archivo not found | REF.DOM",
    };
  }

  const typedEntry = entry as ArchiveEntry;
  const metadataTitle =
    typedEntry.titleEn ?? typedEntry.titleEs ?? typedEntry.title;
  const openGraphImage = typedEntry.photos?.find((photo) => photo.asset?.url);

  return {
    title: `${metadataTitle} | REF.DOM`,
    description: typedEntry.dek ?? undefined,
    openGraph: {
      title: metadataTitle ?? undefined,
      description: typedEntry.dek ?? undefined,
      images: openGraphImage?.asset?.url
        ? [
            {
              url: openGraphImage.asset.url,
              alt: openGraphImage.alt ?? undefined,
            },
          ]
        : undefined,
    },
  };
}

export default async function ArchiveEntryPage({ params }: ArchivePageProps) {
  const { slug } = await params;
  const [{ data: entry }, entries] = await Promise.all([
    sanityFetch({
      query: ARCHIVE_ENTRY_QUERY,
      params: { slug },
    }),
    getArchiveEntries(),
  ]);

  if (!entry) {
    notFound();
  }

  const typedEntry = entry as ArchiveEntry;
  const titleEs = typedEntry.titleEs ?? typedEntry.title;
  const titleEn = typedEntry.titleEn;
  const displayTitle = titleEs ?? titleEn;
  const archiveDate = formatShortDate(typedEntry.archiveDate);
  const photos = Array.isArray(typedEntry.photos) ? typedEntry.photos : [];
  const carouselImages = photos.reduce<ArchiveCarouselImage[]>(
    (images, photo, index) => {
      if (!photo.asset) {
        return images;
      }

      const imageDimensions = photo.asset.metadata?.dimensions ?? undefined;
      const imageUrl = urlFor(photo).width(1200).fit("max").auto("format").url();

      images.push({
        key: photo._key ?? photo.asset.url ?? String(index),
        url: imageUrl,
        alt: photo.alt ?? "",
        caption: photo.caption,
        credit: photo.credit,
        width: imageDimensions?.width ?? 1200,
        height: imageDimensions?.height ?? 900,
        lqip: photo.asset.metadata?.lqip,
      });

      return images;
    },
    []
  );
  const referenceLinks = Array.isArray(typedEntry.referenceLinks)
    ? typedEntry.referenceLinks.filter((link) => link.href && link.label)
    : [];
  const hasSpanishBody =
    Array.isArray(typedEntry.spanishBody) && typedEntry.spanishBody.length > 0;
  const hasEnglishBody =
    Array.isArray(typedEntry.englishBody) && typedEntry.englishBody.length > 0;

  return (
    <main className={styles.overlayRoute} data-archive-modal>
      <div className={styles.background} aria-hidden="true">
        <StandardPageShell active="archivo" width="wide">
          <div className={listStyles.wrap}>
            <ArchiveList entries={entries} />
          </div>
        </StandardPageShell>
      </div>

      <div className={styles.modalLayer}>
        <ArchiveModalFrame className={styles.archive}>
          <Link className={styles.close} href="/archivo" aria-label="Close">
            &times;
          </Link>

          <div className={styles.layout}>
            <aside className={styles.mediaColumn}>
              <ArchiveCarousel
                images={carouselImages}
                styles={{
                  carousel: styles.carousel,
                  photoTrack: styles.photoTrack,
                  photo: styles.photo,
                  controls: styles.controls,
                  control: styles.control,
                  previous: styles.previous,
                  next: styles.next,
                  image: styles.image,
                  caption: styles.caption,
                  credit: styles.credit,
                }}
              />

              {referenceLinks.length ? (
                <nav
                  className={styles.referenceLinks}
                  aria-label="Archive references"
                >
                  {referenceLinks.map((link) => (
                    <a
                      href={link.href ?? ""}
                      key={link._key}
                      rel="noreferrer"
                      target="_blank"
                    >
                      {link.label}
                    </a>
                  ))}
                </nav>
              ) : null}
            </aside>

            <section className={styles.textColumn} aria-label="Article text">
              <header className={styles.header}>
                {archiveDate ? (
                  <p className={styles.identity}>{archiveDate}</p>
                ) : null}
                {displayTitle ? <h1>{displayTitle}</h1> : null}
                {typedEntry.dek ? (
                  <p className={styles.dek}>{typedEntry.dek}</p>
                ) : null}
              </header>

              {hasEnglishBody ? (
                <div className={styles.bodyContent}>
                  <PortableText
                    value={typedEntry.englishBody ?? []}
                    components={portableTextComponents}
                  />
                </div>
              ) : null}
              {hasEnglishBody && hasSpanishBody ? (
                <p className={styles.languageBreak}>--</p>
              ) : null}
              {hasSpanishBody ? (
                <div className={styles.bodyContent}>
                  <PortableText
                    value={typedEntry.spanishBody ?? []}
                    components={portableTextComponents}
                  />
                </div>
              ) : null}
            </section>
          </div>
        </ArchiveModalFrame>
      </div>
    </main>
  );
}
