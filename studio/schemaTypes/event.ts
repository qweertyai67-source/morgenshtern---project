import { defineField, defineType } from "sanity";

export const eventType = defineType({
  name: "event",
  title: "Концерт",
  type: "document",
  fields: [
    defineField({ name: "city", title: "Город", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "country", title: "Страна", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "venue", title: "Площадка", type: "string" }),
    defineField({ name: "startAt", title: "Дата и время", type: "datetime", validation: (rule) => rule.required() }),
    defineField({ name: "ticketUrl", title: "Билеты", type: "url" }),
    defineField({ name: "status", title: "Статус", type: "string", initialValue: "tickets", options: { list: [
      { title: "Билеты в продаже", value: "tickets" },
      { title: "Sold out", value: "soldOut" },
      { title: "Отменён", value: "cancelled" },
    ] } }),
  ],
  preview: { select: { city: "city", venue: "venue", date: "startAt" }, prepare: ({ city, venue, date }) => ({ title: city, subtitle: [venue, date && new Date(date).toLocaleDateString("ru-RU")].filter(Boolean).join(" · ") }) },
});
