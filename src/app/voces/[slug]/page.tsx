import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PortableText, type PortableTextComponents } from "next-sanity";
import { StandardPageShell } from "@/components/SiteChrome";
import { client } from "@/sanity/lib/client";
import { sanityFetch } from "@/sanity/lib/live";
import { VOICE_QUERY, VOICE_SLUGS_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { getVoices } from "../data";
import { VoiceList } from "../VoiceList";
import listStyles from "../page.module.css";
import { VoiceModalFrame } from "./VoiceModalFrame";
import styles from "./page.module.css";

type VoicePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

type SanityImage = {
  alt?: string | null;
  caption?: string | null;
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

type VoiceAudio = {
  label?: string | null;
  url?: string | null;
  duration?: string | null;
};

type VoiceLink = {
  _key: string;
  label?: string | null;
  href?: string | null;
  kind?: string | null;
};

type Voice = {
  _id: string;
  title?: string | null;
  slug?: string | null;
  personName?: string | null;
  conversationDate?: string | null;
  titleEs?: string | null;
  titleEn?: string | null;
  dek?: string | null;
  byline?: string | null;
  publishedAt?: string | null;
  audio?: VoiceAudio | null;
  heroImage?: SanityImage | null;
  links?: VoiceLink[] | null;
  englishTranscript?: unknown[] | null;
  spanishTranscript?: unknown[] | null;
  body?: unknown[] | null;
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

function getPortableAudioSrc(value?: string | null) {
  if (!value) {
    return null;
  }

  if (value.startsWith("/")) {
    return value;
  }

  try {
    const url = new URL(value);
    const isLocalOrPreview =
      url.hostname === "localhost" ||
      url.hostname === "127.0.0.1" ||
      url.hostname.endsWith(".vercel.app");

    if (isLocalOrPreview && url.pathname.startsWith("/voces/")) {
      return `${url.pathname}${url.search}${url.hash}`;
    }
  } catch {
    return value;
  }

  return value;
}

export async function generateStaticParams() {
  const voices = await client
    .withConfig({ useCdn: false })
    .fetch<Array<{ slug: string }>>(VOICE_SLUGS_QUERY);

  return voices.map((voice) => ({
    slug: voice.slug,
  }));
}

export async function generateMetadata({
  params,
}: VoicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const { data: voice } = await sanityFetch({
    query: VOICE_QUERY,
    params: { slug },
    stega: false,
  });

  if (!voice) {
    return {
      title: "Voz not found | REF.DOM",
    };
  }

  const typedVoice = voice as Voice;
  const metadataTitle = typedVoice.titleEn ?? typedVoice.titleEs ?? typedVoice.title;

  return {
    title: `${metadataTitle} | REF.DOM`,
    description: typedVoice.dek ?? undefined,
    openGraph: {
      title: metadataTitle ?? undefined,
      description: typedVoice.dek ?? undefined,
      images: typedVoice.heroImage?.asset?.url
        ? [
            {
              url: typedVoice.heroImage.asset.url,
              alt: typedVoice.heroImage.alt ?? undefined,
            },
          ]
        : undefined,
    },
  };
}

export default async function VoicePage({ params }: VoicePageProps) {
  const { slug } = await params;
  const [{ data: voice }, voices] = await Promise.all([
    sanityFetch({
      query: VOICE_QUERY,
      params: { slug },
    }),
    getVoices(),
  ]);

  if (!voice) {
    notFound();
  }

  const typedVoice = voice as Voice;
  const imageDimensions =
    typedVoice.heroImage?.asset?.metadata?.dimensions ?? undefined;
  const imageUrl = typedVoice.heroImage
    ? urlFor(typedVoice.heroImage).width(1400).fit("max").auto("format").url()
    : null;
  const conversationDate = formatShortDate(typedVoice.conversationDate);
  const titleEs = typedVoice.titleEs ?? typedVoice.title;
  const titleEn = typedVoice.titleEn;
  const audioSrc = getPortableAudioSrc(typedVoice.audio?.url);
  const hasLinks = Array.isArray(typedVoice.links) && typedVoice.links.length > 0;
  const hasEnglishTranscript =
    Array.isArray(typedVoice.englishTranscript) &&
    typedVoice.englishTranscript.length > 0;
  const hasSpanishTranscript =
    Array.isArray(typedVoice.spanishTranscript) &&
    typedVoice.spanishTranscript.length > 0;

  return (
    <main className={styles.overlayRoute} data-voice-modal>
      <div className={styles.background} aria-hidden="true">
        <StandardPageShell active="voces" width="wide">
          <div className={listStyles.wrap}>
            <VoiceList voices={voices} />
          </div>
        </StandardPageShell>
      </div>

      <div className={styles.modalLayer}>
        <VoiceModalFrame className={styles.voice}>
        <Link className={styles.close} href="/voces" aria-label="Close">
          &times;
        </Link>

        <header className={styles.header}>
          {conversationDate || typedVoice.personName ? (
            <p className={styles.identity}>
              {[conversationDate, typedVoice.personName].filter(Boolean).join(" - ")}
            </p>
          ) : null}
          <div className={styles.titles}>
            {titleEs ? <h1>{titleEs}</h1> : null}
            {titleEn ? <p>{titleEn}</p> : null}
          </div>
        </header>

        {audioSrc ? (
          <section className={styles.audio} aria-label="Audio">
            <audio controls preload="metadata" src={audioSrc}>
              <a href={audioSrc}>
                {typedVoice.audio?.label ?? "Listen"}
              </a>
            </audio>
          </section>
        ) : null}

        {imageUrl ? (
          <figure className={styles.figure}>
            <Image
              alt={typedVoice.heroImage?.alt ?? ""}
              blurDataURL={typedVoice.heroImage?.asset?.metadata?.lqip ?? undefined}
              className={styles.image}
              height={imageDimensions?.height ?? 900}
              placeholder={
                typedVoice.heroImage?.asset?.metadata?.lqip ? "blur" : "empty"
              }
              priority
              src={imageUrl}
              width={imageDimensions?.width ?? 1400}
            />
            {typedVoice.heroImage?.caption ? (
              <figcaption>{typedVoice.heroImage.caption}</figcaption>
            ) : null}
          </figure>
        ) : null}

        {hasLinks ? (
          <nav className={styles.links} aria-label="Voice resources">
            {typedVoice.links?.map((link) =>
              link.href && link.label ? (
                <a key={link._key} href={link.href} rel="noreferrer" target="_blank">
                  {link.label}
                </a>
              ) : null
            )}
          </nav>
        ) : null}

        {hasEnglishTranscript || hasSpanishTranscript ? (
          <section className={styles.transcripts} aria-label="Transcripts">
            {hasEnglishTranscript ? (
              <div className={styles.transcript}>
                <h2>English</h2>
                <PortableText
                  value={typedVoice.englishTranscript ?? []}
                  components={portableTextComponents}
                />
              </div>
            ) : null}
            {hasSpanishTranscript ? (
              <div className={styles.transcript}>
                <h2>Español</h2>
                <PortableText
                  value={typedVoice.spanishTranscript ?? []}
                  components={portableTextComponents}
                />
              </div>
            ) : null}
          </section>
        ) : null}

        {Array.isArray(typedVoice.body) && typedVoice.body.length ? (
          <div className={styles.body}>
            <PortableText
              value={typedVoice.body}
              components={portableTextComponents}
            />
          </div>
        ) : null}
        </VoiceModalFrame>
      </div>
    </main>
  );
}
