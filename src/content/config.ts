import { defineCollection, z } from 'astro:content';

const bulletins = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    publishDate: z.coerce.date(),
    image: z.string().optional(),
    draft: z.boolean().default(false),
    priority: z.enum(['normal', 'urgent']).default('normal'),
  }),
});

const gallery = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    eventDate: z.coerce.date(),
    coverImage: z.string(),
    description: z.string(),
    photos: z.array(
      z.object({
        image: z.string(),
        caption: z.string().optional(),
        alt: z.string(),
      })
    ),
    draft: z.boolean().default(false),
  }),
});

const homilies = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    preacher: z.string(),
    date: z.coerce.date(),
    season: z.string().optional(),
    contentType: z.enum(['text', 'audio', 'video']).default('text'),
    audioUrl: z.string().optional(),
    videoUrl: z.string().optional(),
    scriptureRefs: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { bulletins, gallery, homilies };
