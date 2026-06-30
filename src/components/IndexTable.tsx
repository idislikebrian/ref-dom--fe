"use client";

import { useMemo, useState } from "react";
import type { DirectoryEntry } from "@/types/directory";
import styles from "./IndexTable.module.css";

type IndexTableProps = {
  entries: DirectoryEntry[];
  tags: string[];
  regions: string[];
};

const ALL_TAGS = "Todas las disciplinas";
const ALL_REGIONS = "Todas las regiones";

function normalize(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export function IndexTable({ entries, tags, regions }: IndexTableProps) {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState(ALL_TAGS);
  const [activeRegion, setActiveRegion] = useState(ALL_REGIONS);

  const filteredEntries = useMemo(() => {
    const normalizedQuery = normalize(query.trim());

    return entries.filter((entry) => {
      const matchesQuery =
        normalizedQuery.length === 0 ||
        normalize(`${entry.name} ${entry.role} ${entry.bio}`).includes(
          normalizedQuery
        );
      const matchesTag =
        activeTag === ALL_TAGS || entry.tags.includes(activeTag);
      const matchesRegion =
        activeRegion === ALL_REGIONS || entry.region === activeRegion;

      return matchesQuery && matchesTag && matchesRegion;
    });
  }, [activeRegion, activeTag, entries, query]);

  return (
    <section className={styles.wrap} aria-label="Directory entries">
      <div className={styles.controls}>
        <input
          className={styles.searchInput}
          type="search"
          placeholder="Buscar nombre, rol o bio"
          aria-label="Buscar en el índice"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <button
          className={styles.filterChip}
          type="button"
          data-active={activeTag === ALL_TAGS}
          onClick={() => setActiveTag(ALL_TAGS)}
        >
          {ALL_TAGS}
        </button>
        {tags.map((tag) => (
          <button
            className={styles.filterChip}
            type="button"
            data-active={activeTag === tag}
            key={tag}
            onClick={() => setActiveTag(tag)}
          >
            {tag}
          </button>
        ))}
        <button
          className={styles.filterChip}
          type="button"
          data-active={activeRegion === ALL_REGIONS}
          onClick={() => setActiveRegion(ALL_REGIONS)}
        >
          {ALL_REGIONS}
        </button>
        {regions.map((region) => (
          <button
            className={styles.filterChip}
            type="button"
            data-active={activeRegion === region}
            key={region}
            onClick={() => setActiveRegion(region)}
          >
            {region}
          </button>
        ))}
      </div>

      <p className={styles.resultCount}>
        {filteredEntries.length}{" "}
        {filteredEntries.length === 1 ? "resultado" : "resultados"}
      </p>

      {filteredEntries.length > 0 ? (
        <table className={styles.table}>
          <thead className={styles.tableHead}>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Location</th>
              <th scope="col">Bio</th>
              <th scope="col">Tags</th>
              <th scope="col">Connect</th>
            </tr>
          </thead>
          <tbody>
            {filteredEntries.map((entry) => (
              <tr className={styles.row} key={entry.id}>
                <td>
                  <div className={styles.nameCell}>
                    <span className={styles.name}>{entry.name}</span>
                    <span className={styles.role}>{entry.role}</span>
                  </div>
                </td>
                <td>
                  <span className={styles.location}>
                    {entry.city}, {entry.country}
                  </span>
                </td>
                <td>{entry.bio}</td>
                <td>
                  <div className={styles.tagList} aria-label={`${entry.name} tags`}>
                    {entry.tags.map((tag) => (
                      <span className={styles.tag} key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </td>
                <td>
                  <a
                    aria-label={`Connect with ${entry.name} via ${entry.connect.label}`}
                    className={styles.connectBtn}
                    href={entry.connect.href}
                    rel={entry.connect.type === "social" ? "noreferrer" : undefined}
                    target={entry.connect.type === "social" ? "_blank" : undefined}
                  >
                    {entry.connect.label}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className={styles.emptyState}>
          No entries match the current search and filters.
        </div>
      )}
    </section>
  );
}
