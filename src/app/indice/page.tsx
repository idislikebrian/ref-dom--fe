import { StandardPageShell } from "@/components/SiteChrome";
import { IndexTable } from "@/components/IndexTable";
import { getProfileDirectory } from "@/data/profiles";
import styles from "./page.module.css";

export const dynamic = "force-dynamic";

export default async function IndicePage() {
  const { profiles, tags, regions } = await getProfileDirectory();

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
          entries={profiles}
          tags={tags}
          regions={regions}
        />
      </div>
    </StandardPageShell>
  );
}
