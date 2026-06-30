import { StandardPageShell } from "@/components/SiteChrome";
import { IndexTable } from "@/components/IndexTable";
import {
  directoryEntries,
  directoryRegions,
  directoryTags
} from "@/data/directoryEntries";
import styles from "./page.module.css";

export default function IndicePage() {
  return (
    <StandardPageShell active="indice" width="wide">
      <div className={styles.wrap}>
        <section className={styles.header}>
          <div>
            <h1>Índice</h1>
            <p>
              A searchable directory of Dominican creative professionals and
              connectors worldwide.
            </p>
          </div>
        </section>

        <IndexTable
          entries={directoryEntries}
          tags={directoryTags}
          regions={directoryRegions}
        />
      </div>
    </StandardPageShell>
  );
}
