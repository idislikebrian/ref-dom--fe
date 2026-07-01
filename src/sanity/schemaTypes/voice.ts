import {DocumentTextIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'
import {richTextBlock} from './richTextBlock'

export const voice = defineType({
  name: 'voice',
  title: 'Voz',
  type: 'document',
  icon: DocumentTextIcon,
  fieldsets: [
    {name: 'identity', title: 'Identity'},
    {name: 'titles', title: 'Titles'},
    {name: 'media', title: 'Media'},
    {name: 'resources', title: 'Resources'},
    {name: 'transcripts', title: 'Transcripts'},
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
      name: 'personName',
      title: 'Person name',
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
        source: 'personName',
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
      name: 'conversationDate',
      title: 'Conversation date',
      type: 'date',
      fieldset: 'identity',
    }),
    defineField({
      name: 'titleEs',
      title: 'Spanish title',
      type: 'string',
      fieldset: 'titles',
    }),
    defineField({
      name: 'titleEn',
      title: 'English title',
      type: 'string',
      fieldset: 'titles',
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
      name: 'byline',
      title: 'Byline',
      type: 'string',
      fieldset: 'identity',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      fieldset: 'identity',
    }),
    defineField({
      name: 'audio',
      title: 'Audio',
      type: 'object',
      fieldset: 'media',
      fields: [
        defineField({
          name: 'label',
          title: 'Label',
          type: 'string',
          initialValue: 'Listen',
        }),
        defineField({
          name: 'url',
          title: 'Audio path or URL',
          description:
            'Use a root-relative path for files in public, for example /voces/Voces-RichardPerez.mp3. Full https URLs also work for externally hosted audio.',
          type: 'string',
          validation: (rule) =>
            rule.custom((value) => {
              if (!value) {
                return true
              }

              if (value.startsWith('/')) {
                return true
              }

              try {
                const url = new URL(value)

                if (url.protocol === 'http:' || url.protocol === 'https:') {
                  return true
                }
              } catch {
                return 'Use a root-relative path like /voces/file.mp3 or a full https URL'
              }

              return 'Use a root-relative path like /voces/file.mp3 or a full https URL'
            }),
        }),
        defineField({
          name: 'duration',
          title: 'Duration',
          description: 'Optional display value, like 7:27.',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero image',
      type: 'image',
      fieldset: 'media',
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
      ],
    }),
    defineField({
      name: 'links',
      title: 'Resource links',
      type: 'array',
      fieldset: 'resources',
      of: [
        defineArrayMember({
          name: 'resourceLink',
          title: 'Resource link',
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
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
            defineField({
              name: 'kind',
              title: 'Kind',
              type: 'string',
              options: {
                list: [
                  {title: 'Recorded conversation', value: 'recording'},
                  {title: 'Instagram', value: 'instagram'},
                  {title: 'Website / project', value: 'website'},
                  {title: 'Other', value: 'other'},
                ],
                layout: 'radio',
              },
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
      name: 'englishTranscript',
      title: 'English transcript',
      type: 'array',
      fieldset: 'transcripts',
      of: [richTextBlock],
    }),
    defineField({
      name: 'spanishTranscript',
      title: 'Spanish transcript',
      type: 'array',
      fieldset: 'transcripts',
      of: [richTextBlock],
    }),
    defineField({
      name: 'body',
      title: 'Additional body',
      description:
        'Optional catch-all notes or essay content outside the bilingual transcript.',
      type: 'array',
      of: [richTextBlock],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'personName',
      media: 'heroImage',
    },
  },
})
