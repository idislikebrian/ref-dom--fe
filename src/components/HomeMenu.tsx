"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import styles from "./HomeMenu.module.css";

const externalLinks = {
  instagram: "https://instagram.com/referencia.dom",
  photoCredit: "https://sustantivo.world"
};

export function HomeMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <div className={styles.wrap}>
      <button
        aria-expanded={isOpen}
        aria-haspopup="menu"
        className={styles.trigger}
        type="button"
        onClick={() => setIsOpen((current) => !current)}
      >
        +
      </button>

      {isOpen ? (
        <div
          aria-label="Menu"
          className={styles.popover}
          ref={panelRef}
          role="menu"
        >
          <nav className={styles.primaryLinks} aria-label="Site pages">
            <Link href="/archivo" role="menuitem">
              a. archivo
            </Link>
            <Link href="/voces" role="menuitem">
              b. voces
            </Link>
            <Link href="/indice" role="menuitem">
              c. Índice
            </Link>
          </nav>

          <nav className={styles.secondaryLinks} aria-label="External links">
            <a
              href={externalLinks.instagram}
              rel="noreferrer"
              role="menuitem"
              target="_blank"
            >
              <i>instagram</i>
            </a>
            <a
              href={externalLinks.photoCredit}
              rel="noreferrer"
              role="menuitem"
              target="_blank"
            >
              <i>photo credit</i>
            </a>
          </nav>
        </div>
      ) : null}
    </div>
  );
}
