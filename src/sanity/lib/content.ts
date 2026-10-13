import { fallbackContent, type SiteContent } from "@/data/site-content";
import { sanityClient, sanityConfigured } from "./client";

const contentQuery = `{
  "releases": *[_type == "release"] | order(date desc)[0...6] {
    "year": string::split(string(date), "-")[0],
    title,
    "type": coalesce(format, "Релиз"),
    description,
    "href": coalesce(links[0].url, "#music"),
    "accent": coalesce(accent, "signal")
  },
  "tourDates": *[_type == "event" && startAt >= now()] | order(startAt asc)[0...12] {
    "date": upper(string::split(dateTime(startAt), "T")[0]),
    city,
    country,
    "href": coalesce(ticketUrl, "https://morgenshtern.love/#tour-dates"),
    "status": select(status == "soldOut" => "sold-out", "tickets")
  }
}`;

export async function getSiteContent(): Promise<SiteContent> {
  if (!sanityConfigured) return fallbackContent;

  try {
    const content = await sanityClient.fetch<Partial<SiteContent>>(
      contentQuery,
      {},
      { next: { revalidate: 300 } },
    );

    return {
      releases: content.releases?.length ? content.releases : fallbackContent.releases,
      tourDates: content.tourDates?.length ? content.tourDates : fallbackContent.tourDates,
    };
  } catch {
    return fallbackContent;
  }
}
