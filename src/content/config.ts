import { defineCollection, z } from 'astro:content';

const bulletins = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    publishDate: z.coerce.date(),
    image: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const homilies = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    author: z.string(),
    date: z.coerce.date(),
    contentType: z.enum(['text', 'audio', 'video']).default('text'),
    audioUrl: z.string().optional(),
    videoUrl: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { bulletins, homilies };
