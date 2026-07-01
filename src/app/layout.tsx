import type { Metadata } from "next";
import Link from "next/link";
import { SanityLive } from "@/sanity/lib/live";
import "./globals.css";
import styles from "./layout.module.css";

export const metadata: Metadata = {
  title: "REF.DOM",
  description: "A Dominican portfolio and creative index."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="page">
          <header className={styles.header}>
            <Link className={styles.brand} href="/">
              REF.DOM
            </Link>
            <nav className={styles.nav} aria-label="Primary navigation">
              <Link href="/">Portfolio</Link>
              <Link href="/indice">Índice</Link>
            </nav>
          </header>
          {children}
        </div>
        <SanityLive />
      </body>
    </html>
  );
}
