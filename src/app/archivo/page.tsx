import { StandardPageShell } from "@/components/SiteChrome";
import styles from "../scaffold.module.css";

export default function ArchivoPage() {
  return (
    <StandardPageShell active="archivo">
      <section className={styles.page}>
        <p>
          <i>En proceso. In process.</i>
        </p>
      </section>
    </StandardPageShell>
  );
}
