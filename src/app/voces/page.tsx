import { StandardPageShell } from "@/components/SiteChrome";
import { getVoices } from "./data";
import { VoiceList } from "./VoiceList";
import styles from "./page.module.css";

export default async function VocesPage() {
  const voices = await getVoices();

  return (
    <StandardPageShell active="voces" width="wide">
      <div className={styles.wrap}>
        <VoiceList voices={voices} />
      </div>
    </StandardPageShell>
  );
}
