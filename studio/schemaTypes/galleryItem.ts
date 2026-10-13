import { defineField, defineType } from "sanity";

export const galleryItemType = defineType({
  name: "galleryItem",
  title: "Галерея",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Название", type: "string" }),
    defineField({ name: "image", title: "Изображение", type: "image", options: { hotspot: true }, validation: (rule) => rule.required(), fields: [defineField({ name: "alt", title: "Alt-текст", type: "string", validation: (rule) => rule.required() })] }),
    defineField({ name: "caption", title: "Подпись", type: "string" }),
    defineField({ name: "credit", title: "Автор", type: "string" }),
    defineField({ name: "date", title: "Дата", type: "date" }),
  ],
  preview: { select: { title: "title", subtitle: "credit", media: "image" } },
});
