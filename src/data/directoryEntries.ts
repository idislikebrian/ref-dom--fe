import type { DirectoryEntry } from "@/types/directory";

export const directoryEntries: DirectoryEntry[] = [
  {
    id: "ana-marte",
    name: "Ana Marte",
    role: "Curadora y productora cultural",
    city: "Santo Domingo",
    country: "Dominican Republic",
    region: "Dominican Republic",
    bio: "Conecta artistas visuales con residencias, archivos y espacios independientes.",
    tags: ["Curaduría", "Producción", "Artes visuales"],
    connect: {
      label: "Email",
      href: "mailto:ana.marte@example.com",
      type: "email"
    }
  },
  {
    id: "luis-rosario",
    name: "Luis Rosario",
    role: "Director de fotografía",
    city: "Santiago",
    country: "Dominican Republic",
    region: "Dominican Republic",
    bio: "Trabaja en cine documental, videoclips y campañas editoriales.",
    tags: ["Cine", "Fotografía", "Dirección"],
    connect: {
      label: "Instagram",
      href: "https://instagram.com/referencia.dom",
      type: "social"
    }
  },
  {
    id: "camila-arias",
    name: "Camila Arias",
    role: "Diseñadora gráfica",
    city: "Nueva York",
    country: "United States",
    region: "U.S.",
    bio: "Desarrolla identidades visuales para sellos, festivales y proyectos editoriales.",
    tags: ["Diseño", "Branding", "Editorial"],
    connect: {
      label: "Email",
      href: "mailto:camila.arias@example.com",
      type: "email"
    }
  },
  {
    id: "mateo-perez",
    name: "Mateo Pérez",
    role: "Programador creativo",
    city: "Berlin",
    country: "Germany",
    region: "Europe",
    bio: "Construye instalaciones interactivas, herramientas web y experiencias sonoras.",
    tags: ["Tecnología", "Instalación", "Sonido"],
    connect: {
      label: "Website",
      href: "https://example.com",
      type: "social"
    }
  },
  {
    id: "yelina-cruz",
    name: "Yelina Cruz",
    role: "Gestora musical",
    city: "Madrid",
    country: "Spain",
    region: "Europe",
    bio: "Acompaña lanzamientos, giras y colaboraciones entre Caribe y Europa.",
    tags: ["Música", "Management", "Eventos"],
    connect: {
      label: "Email",
      href: "mailto:yelina.cruz@example.com",
      type: "email"
    }
  },
  {
    id: "rafael-castillo",
    name: "Rafael Castillo",
    role: "Arquitecto e investigador urbano",
    city: "Punta Cana",
    country: "Dominican Republic",
    region: "Dominican Republic",
    bio: "Investiga vivienda, hospitalidad y cultura material en territorios costeros.",
    tags: ["Arquitectura", "Investigación", "Territorio"],
    connect: {
      label: "LinkedIn",
      href: "https://linkedin.com/",
      type: "social"
    }
  },
  {
    id: "mariel-baez",
    name: "Mariel Báez",
    role: "Editora y escritora",
    city: "Ciudad de México",
    country: "Mexico",
    region: "Latin America",
    bio: "Edita ensayos, perfiles y publicaciones bilingues sobre cultura contemporanea.",
    tags: ["Escritura", "Editorial", "Traducción"],
    connect: {
      label: "Email",
      href: "mailto:mariel.baez@example.com",
      type: "email"
    }
  },
  {
    id: "nicolas-jimenez",
    name: "Nicolás Jiménez",
    role: "Ilustrador",
    city: "San Juan",
    country: "Puerto Rico",
    region: "Caribbean",
    bio: "Crea ilustración editorial, portadas y piezas para organizaciones culturales.",
    tags: ["Ilustración", "Editorial", "Cultura"],
    connect: {
      label: "Instagram",
      href: "https://instagram.com/referencia.dom",
      type: "social"
    }
  },
  {
    id: "sofia-delgado",
    name: "Sofía Delgado",
    role: "Estratega de alianzas",
    city: "Miami",
    country: "United States",
    region: "U.S.",
    bio: "Facilita patrocinios, programas públicos y alianzas para proyectos dominicanos.",
    tags: ["Alianzas", "Producción", "Comunidad"],
    connect: {
      label: "Email",
      href: "mailto:sofia.delgado@example.com",
      type: "email"
    }
  },
  {
    id: "esteban-reyes",
    name: "Esteban Reyes",
    role: "Artista sonoro",
    city: "La Romana",
    country: "Dominican Republic",
    region: "Dominican Republic",
    bio: "Produce piezas sonoras, sesiones experimentales y archivos de escucha local.",
    tags: ["Sonido", "Arte", "Archivo"],
    connect: {
      label: "Website",
      href: "https://example.com",
      type: "social"
    }
  }
];

export const directoryTags = Array.from(
  new Set(directoryEntries.flatMap((entry) => entry.tags))
).sort((a, b) => a.localeCompare(b));

export const directoryRegions = Array.from(
  new Set(directoryEntries.map((entry) => entry.region))
).sort((a, b) => a.localeCompare(b));
