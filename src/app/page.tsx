import { ArtistExperience } from "@/components/artist-experience";
import { getSiteContent } from "@/sanity/lib/content";

export default async function Home() {
  const content = await getSiteContent();
  return <ArtistExperience content={content} />;
}
