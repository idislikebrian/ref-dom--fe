import Link from "next/link";
import styles from "./page.module.css";

export type VoiceListItem = {
  _id: string;
  title?: string | null;
  slug?: string | null;
  personName?: string | null;
  titleEs?: string | null;
  titleEn?: string | null;
};

function getTitleEs(voice: VoiceListItem) {
  return voice.titleEs ?? voice.title ?? "Untitled";
}

export function VoiceList({ voices }: { voices: VoiceListItem[] }) {
  if (!voices.length) {
    return (
      <p className={styles.empty}>
        <i>No voces published yet.</i>
      </p>
    );
  }

  return (
    <ol className={styles.list}>
      {voices.map((voice) =>
        voice.slug ? (
          <li className={styles.item} key={voice._id}>
            <Link className={styles.link} href={`/voces/${voice.slug}`}>
              <span className={styles.person}>{voice.personName}</span>
              <span className={styles.title}>{getTitleEs(voice)}</span>
              <span className={styles.titleEn}>{voice.titleEn}</span>
            </Link>
          </li>
        ) : null
      )}
    </ol>
  );
}
