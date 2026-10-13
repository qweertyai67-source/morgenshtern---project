import { defineField, defineType } from "sanity";

export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Настройки сайта",
  type: "document",
  fields: [
    defineField({ name: "artistName", title: "Имя артиста", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "headline", title: "Главный слоган", type: "string" }),
    defineField({ name: "socialLinks", title: "Социальные ссылки", type: "array", of: [{ type: "object", fields: [
      defineField({ name: "label", title: "Название", type: "string" }),
      defineField({ name: "url", title: "URL", type: "url" }),
    ] }] }),
  ],
});
