import { sanityFetch } from "@/sanity/lib/live";
import { VOICES_QUERY } from "@/sanity/lib/queries";
import type { VoiceListItem } from "./VoiceList";

export async function getVoices() {
  const { data } = await sanityFetch({
    query: VOICES_QUERY,
  });

  return data as VoiceListItem[];
}
