export type TourDate = {
  date: string;
  city: string;
  country: string;
  href: string;
  status?: "sold-out" | "tickets";
};

export type Release = {
  year: string;
  title: string;
  type: string;
  description: string;
  href: string;
  accent: string;
};

export type SiteContent = {
  releases: Release[];
  tourDates: TourDate[];
};

export const fallbackContent: SiteContent = {
  releases: [
    {
      year: "2026",
      title: "Цветок",
      type: "Сингл",
      description: "Новая точка в более открытой и мелодичной главе артиста.",
      href: "https://open.spotify.com/artist/2lWlPk7L8WEuYAsBGDTAnE",
      accent: "signal",
    },
    {
      year: "2026",
      title: "Dead Sea Live",
      type: "Acoustic live album",
      description: "Живой сет у Мёртвого моря: голос, гитары и песни без привычной брони.",
      href: "https://www.youtube.com/watch?v=Cdvu4rNEOqc",
      accent: "mineral",
    },
    {
      year: "2025",
      title: "ALISHER",
      type: "EP · 5 треков",
      description: "Короткий рок-ориентированный релиз, где человек выходит на первый план.",
      href: "https://music.apple.com/us/album/alisher-ep/1795037761",
      accent: "void",
    },
  ],
  tourDates: [
    { date: "15 OCT", city: "MONTRÉAL", country: "CANADA", href: "https://morgenshtern.love/#tour-dates", status: "tickets" },
    { date: "17 OCT", city: "TORONTO", country: "CANADA", href: "https://morgenshtern.love/#tour-dates", status: "tickets" },
    { date: "19 OCT", city: "CALGARY", country: "CANADA", href: "https://morgenshtern.love/#tour-dates", status: "tickets" },
    { date: "20 OCT", city: "VANCOUVER", country: "CANADA", href: "https://morgenshtern.love/#tour-dates", status: "tickets" },
    { date: "22 OCT", city: "BARCELONA", country: "SPAIN", href: "https://morgenshtern.love/#tour-dates", status: "tickets" },
    { date: "25 OCT", city: "LIMASSOL", country: "CYPRUS", href: "https://morgenshtern.love/#tour-dates", status: "tickets" },
    { date: "20 DEC", city: "YEREVAN", country: "ARMENIA", href: "https://morgenshtern.love/pages/yerevan", status: "tickets" },
  ],
};
