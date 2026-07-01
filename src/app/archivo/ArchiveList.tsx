import Link from "next/link";
import styles from "./page.module.css";

export type ArchiveListItem = {
  _id: string;
  title?: string | null;
  slug?: string | null;
  archiveDate?: string | null;
  titleEs?: string | null;
  titleEn?: string | null;
};

function getTitleEs(entry: ArchiveListItem) {
  return entry.titleEs ?? entry.title ?? "Untitled";
}

export function ArchiveList({ entries }: { entries: ArchiveListItem[] }) {
  if (!entries.length) {
    return (
      <p className={styles.empty}>
        <i>No archivo entries published yet.</i>
      </p>
    );
  }

  return (
    <ol className={styles.list}>
      {entries.map((entry) =>
        entry.slug ? (
          <li className={styles.item} key={entry._id}>
            <Link className={styles.link} href={`/archivo/${entry.slug}`}>
              <span className={styles.title}>{getTitleEs(entry)}</span>
              {entry.titleEn ? (
                <span className={styles.titleEn}>{entry.titleEn}</span>
              ) : null}
            </Link>
          </li>
        ) : null
      )}
    </ol>
  );
}
