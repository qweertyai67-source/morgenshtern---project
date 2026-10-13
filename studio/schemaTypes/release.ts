import { defineField, defineType } from "sanity";

export const releaseType = defineType({
  name: "release",
  title: "Релиз",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Название", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (rule) => rule.required() }),
    defineField({ name: "date", title: "Дата", type: "date", validation: (rule) => rule.required() }),
    defineField({ name: "format", title: "Формат", type: "string", options: { list: ["Сингл", "EP", "Альбом", "Live"] } }),
    defineField({ name: "description", title: "Описание", type: "text", rows: 3 }),
    defineField({ name: "cover", title: "Обложка", type: "image", options: { hotspot: true }, fields: [defineField({ name: "alt", title: "Alt-текст", type: "string", validation: (rule) => rule.required() })] }),
    defineField({ name: "accent", title: "Цветовая тема", type: "string", options: { list: ["signal", "mineral", "void"] } }),
    defineField({ name: "links", title: "Ссылки", type: "array", of: [{ type: "object", fields: [
      defineField({ name: "platform", title: "Платформа", type: "string" }),
      defineField({ name: "url", title: "URL", type: "url", validation: (rule) => rule.required() }),
    ] }] }),
  ],
  preview: { select: { title: "title", subtitle: "format", media: "cover" } },
});
