import {DocumentTextIcon, LinkIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'
import {richTextBlock} from './richTextBlock'

const carouselImage = defineArrayMember({
  name: 'carouselImage',
  title: 'Carousel image',
  type: 'image',
  options: {
    hotspot: true,
  },
  fields: [
    defineField({
      name: 'alt',
      title: 'Alternative text',
      type: 'string',
      validation: (rule) =>
        rule.custom((alt, context) => {
          const image = context.parent as {_type?: string; asset?: unknown}

          if (image?.asset && !alt) {
            return 'Describe the image for screen readers'
          }

          return true
        }),
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
    }),
    defineField({
      name: 'credit',
      title: 'Credit',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'caption',
      subtitle: 'credit',
      media: 'asset',
    },
    prepare({title, subtitle, media}) {
      return {
        title: title || 'Carousel image',
        subtitle,
        media,
      }
    },
  },
})

export const archiveEntry = defineType({
  name: 'archiveEntry',
  title: 'Archivo',
  type: 'document',
  icon: DocumentTextIcon,
  fieldsets: [
    {name: 'identity', title: 'Identity'},
    {name: 'titles', title: 'Titles'},
    {name: 'media', title: 'Media'},
    {name: 'resources', title: 'Resources'},
    {name: 'content', title: 'Content'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Internal title',
      description: 'Used in Studio lists and as a metadata fallback.',
      type: 'string',
      fieldset: 'identity',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      fieldset: 'identity',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) =>
        rule.required().custom((slug) => {
          if (!slug?.current) {
            return 'Required'
          }

          if (!/^[a-z0-9-]+$/.test(slug.current)) {
            return 'Use lowercase letters, numbers, and hyphens only'
          }

          return true
        }),
    }),
    defineField({
      name: 'archiveDate',
      title: 'Archive date',
      description:
        'Optional date for the source material, event, or historical moment.',
      type: 'date',
      fieldset: 'identity',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      fieldset: 'identity',
    }),
    defineField({
      name: 'titleEs',
      title: 'Spanish title',
      type: 'string',
      fieldset: 'titles',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'titleEn',
      title: 'English title',
      type: 'string',
      fieldset: 'titles',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'dek',
      title: 'Intro / excerpt',
      type: 'text',
      rows: 3,
      fieldset: 'titles',
      validation: (rule) =>
        rule.max(220).warning('Keep the intro short enough for page previews.'),
    }),
    defineField({
      name: 'photos',
      title: 'Photo carousel',
      description:
        'Add the images in the order they should appear in the carousel.',
      type: 'array',
      fieldset: 'media',
      of: [carouselImage],
      validation: (rule) =>
        rule.required().min(1),
    }),
    defineField({
      name: 'referenceLinks',
      title: 'Reference links',
      description:
        'Optional links shown below the carousel, for example listen here / escucha aqui.',
      type: 'array',
      fieldset: 'resources',
      of: [
        defineArrayMember({
          name: 'referenceLink',
          title: 'Reference link',
          type: 'object',
          icon: LinkIcon,
          fields: [
            defineField({
              name: 'label',
              title: 'Link text',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'href',
              title: 'URL',
              type: 'url',
              validation: (rule) =>
                rule.required().uri({
                  scheme: ['http', 'https', 'mailto'],
                }),
            }),
          ],
          preview: {
            select: {
              title: 'label',
              subtitle: 'href',
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'spanishBody',
      title: 'Spanish body',
      type: 'array',
      fieldset: 'content',
      of: [richTextBlock],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'englishBody',
      title: 'English body',
      type: 'array',
      fieldset: 'content',
      of: [richTextBlock],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'titleEs',
      media: 'photos.0',
    },
  },
})
