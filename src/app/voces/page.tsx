import { StandardPageShell } from "@/components/SiteChrome";
import styles from "../scaffold.module.css";

export default function VocesPage() {
  return (
    <StandardPageShell active="voces">
      <section className={styles.page}>
        <p>
          <i>En proceso. In process.</i>
        </p>
      </section>
    </StandardPageShell>
  );
}
