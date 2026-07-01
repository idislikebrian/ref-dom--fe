import {defineQuery} from 'next-sanity'

export const VOICE_SLUGS_QUERY = defineQuery(/* groq */ `
  *[_type == "voice" && defined(slug.current)]{
    "slug": slug.current
  }
`)

export const VOICES_QUERY = defineQuery(/* groq */ `
  *[_type == "voice" && defined(slug.current)]
  | order(conversationDate desc, publishedAt desc, _createdAt desc){
    _id,
    title,
    "slug": slug.current,
    personName,
    titleEs,
    titleEn
  }
`)

export const VOICE_QUERY = defineQuery(/* groq */ `
  *[_type == "voice" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    personName,
    conversationDate,
    titleEs,
    titleEn,
    dek,
    byline,
    publishedAt,
    audio,
    heroImage{
      alt,
      caption,
      asset->{
        _id,
        url,
        metadata{
          dimensions,
          lqip
        }
      }
    },
    links[]{
      _key,
      label,
      href,
      kind
    },
    englishTranscript[]{
      ...,
      markDefs[]{
        ...,
        _type == "link" => {
          href
        }
      }
    },
    spanishTranscript[]{
      ...,
      markDefs[]{
        ...,
        _type == "link" => {
          href
        }
      }
    },
    body[]{
      ...,
      markDefs[]{
        ...,
        _type == "link" => {
          href
        }
      }
    }
  }
`)

export const ARCHIVE_ENTRIES_QUERY = defineQuery(/* groq */ `
  *[_type == "archiveEntry" && defined(slug.current)]
  | order(archiveDate desc, publishedAt desc, _createdAt desc){
    _id,
    title,
    "slug": slug.current,
    archiveDate,
    titleEs,
    titleEn
  }
`)

export const ARCHIVE_SLUGS_QUERY = defineQuery(/* groq */ `
  *[_type == "archiveEntry" && defined(slug.current)]{
    "slug": slug.current
  }
`)

export const ARCHIVE_ENTRY_QUERY = defineQuery(/* groq */ `
  *[_type == "archiveEntry" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    archiveDate,
    publishedAt,
    titleEs,
    titleEn,
    dek,
    photos[]{
      _key,
      alt,
      caption,
      credit,
      asset->{
        _id,
        url,
        metadata{
          dimensions,
          lqip
        }
      }
    },
    referenceLinks[]{
      _key,
      label,
      href
    },
    spanishBody[]{
      ...,
      markDefs[]{
        ...,
        _type == "link" => {
          href
        }
      }
    },
    englishBody[]{
      ...,
      markDefs[]{
        ...,
        _type == "link" => {
          href
        }
      }
    }
  }
`)
