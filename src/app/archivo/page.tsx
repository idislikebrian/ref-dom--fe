import { StandardPageShell } from "@/components/SiteChrome";
import { ArchiveList } from "./ArchiveList";
import { getArchiveEntries } from "./data";
import styles from "./page.module.css";

export default async function ArchivoPage() {
  const entries = await getArchiveEntries();

  return (
    <StandardPageShell active="archivo" width="wide">
      <div className={styles.wrap}>
        <ArchiveList entries={entries} />
      </div>
    </StandardPageShell>
  );
}
