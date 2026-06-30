import Link from "next/link";
import { CurrentDate } from "./CurrentDate";
import styles from "./SiteChrome.module.css";

type NavigationKey = "archivo" | "voces" | "indice";

type SiteNavigationProps = {
  active?: NavigationKey;
};

type StandardPageShellProps = SiteNavigationProps & {
  children: React.ReactNode;
  width?: "standard" | "wide";
};

const instagramHref = "https://instagram.com/referencia.dom";

export function SiteHeader() {
  return (
    <header className={styles.header}>
      <Link className={styles.title} href="/">
        &quot;Referencia Dominicana&quot;
      </Link>
      <p>
        <span>
          Un archivo e índice de la historia y actividad cultural Dominicana.
        </span>
        <span>
          An archive and index of Dominican cultural history and activity.
        </span>
      </p>
      <CurrentDate />
    </header>
  );
}

export function SiteNavigation({ active }: SiteNavigationProps) {
  return (
    <nav className={styles.navigation} aria-label="Site sections">
      <Link data-active={active === "archivo"} href="/archivo">
        a. archivo
      </Link>
      <span>/</span>
      <Link data-active={active === "voces"} href="/voces">
        b. voces
      </Link>
      <span>/</span>
      <Link data-active={active === "indice"} href="/indice">
        c. índice
      </Link>
      <span>/</span>
      <a href={instagramHref} rel="noreferrer" target="_blank">
        d. instagram
      </a>
    </nav>
  );
}

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      by{" "}
      <a href="https://sustantivo.world" rel="noreferrer" target="_blank">
        <i>Sustantivo</i>
      </a>
    </footer>
  );
}

export function StandardPageShell({
  active,
  children,
  width = "standard"
}: StandardPageShellProps) {
  return (
    <div className={`standard-page-shell ${styles.shell}`}>
      <SiteHeader />
      <main className={styles.content}>
        <div className={styles.contentInner} data-width={width}>
          <SiteNavigation active={active} />
          {children}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
