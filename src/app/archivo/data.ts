import { sanityFetch } from "@/sanity/lib/live";
import { ARCHIVE_ENTRIES_QUERY } from "@/sanity/lib/queries";
import type { ArchiveListItem } from "./ArchiveList";

export async function getArchiveEntries() {
  const { data } = await sanityFetch({
    query: ARCHIVE_ENTRIES_QUERY,
  });

  return data as ArchiveListItem[];
}
