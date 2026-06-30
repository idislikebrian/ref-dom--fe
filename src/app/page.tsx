import Image from "next/image";
import { HomeMenu } from "@/components/HomeMenu";
import styles from "./page.module.css";

const heroImage =
  "https://freight.cargo.site/w/1440/q/75/i/C2878375904602550225636932437339/dominican-drinkingbeer-referenciadominicana.jpg";

export default function Home() {
  return (
    <main className={`page-content home-route ${styles.home}`}>
      <section className={styles.frame} aria-label="Referencia Dominicana">
        <p className={styles.title}>
          &quot;Referencia Dominicana&quot;
        </p>

        <div className={styles.imageFrame}>
          <Image
            className={styles.heroImage}
            src={heroImage}
            alt="Three men seated at a table in front of a tiled wall."
            width={1440}
            height={976}
            priority
          />
        </div>

        <p className={styles.caption}>
          <span>
            Un archivo e índice de la historia y actividad cultural Dominicana.
          </span>
          <span>
            An archive and index of Dominican cultural history and activity.
          </span>
        </p>

        <p className={styles.credit}>
          by{" "}
          <a href="https://sustantivo.world" rel="noreferrer" target="_blank">
            <i>Sustantivo</i>
          </a>
        </p>

        <HomeMenu />
      </section>
    </main>
  );
}
