import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const profiles = [
  {
    name: "Yolanda Martínez",
    role: "Directora Creativa",
    bio: "Especialista en identidad de marca para empresas latinas en Nueva York.",
    city: "Nueva York",
    country: "Estados Unidos",
    region: "Norteamérica",
    disciplines: ["dirección creativa", "branding", "diseño"],
    instagram: "@yolandamtz",
    featured: true,
    verified: true
  },
  {
    name: "Emilio Reyes",
    role: "Fotógrafo",
    bio: "Documentalista visual enfocado en comunidades afrolatinas del Caribe.",
    city: "Santo Domingo",
    country: "República Dominicana",
    region: "Caribe",
    disciplines: ["fotografía", "documental", "dirección de arte"],
    website: "emilioreyes.com",
    verified: true
  },
  {
    name: "Carmen de la Rosa",
    role: "Cineasta",
    bio: "Directora de cortometrajes y documentales con distribución en festivales internacionales.",
    city: "Barcelona",
    country: "España",
    region: "Europa",
    disciplines: ["cine", "guión", "producción"],
    instagram: "@carmenrosa.film",
    verified: true
  },
  {
    name: "Luis Familia",
    role: "Músico y Productor",
    bio: "Productor de música electrónica que fusiona merengue y sonidos electrónicos.",
    city: "Santo Domingo",
    country: "República Dominicana",
    region: "Caribe",
    disciplines: ["música", "producción musical", "sonido"],
    instagram: "@luisfamilia"
  },
  {
    name: "Natasha Paulino",
    role: "Diseñadora de Moda",
    bio: "Colecciones inspiradas en el traje típico dominicano reinterpretado para el mundo contemporáneo.",
    city: "Miami",
    country: "Estados Unidos",
    region: "Norteamérica",
    disciplines: ["moda", "diseño textil", "dirección creativa"],
    website: "natashapaulino.com",
    featured: true,
    verified: true
  },
  {
    name: "Ricardo Taveras",
    role: "Arquitecto y Diseñador",
    bio: "Estudio de arquitectura con proyectos residenciales y culturales en el Gran Santo Domingo.",
    city: "Santo Domingo",
    country: "República Dominicana",
    region: "Caribe",
    disciplines: ["arquitectura", "diseño de interiores", "urbanismo"],
    linkedin: "ricardo-taveras",
    verified: true
  },
  {
    name: "Alicia Méndez",
    role: "Periodista Cultural",
    bio: "Cubre arte, música y política cultural para medios dominicanos e internacionales.",
    city: "Santiago de los Caballeros",
    country: "República Dominicana",
    region: "Caribe",
    disciplines: ["periodismo", "crítica cultural", "edición"],
    instagram: "@aliciamendezrd"
  },
  {
    name: "Félix Guerrero",
    role: "Ilustrador",
    bio: "Ilustración editorial y de personajes, con clientes en Nueva York, Madrid y Ciudad de México.",
    city: "Madrid",
    country: "España",
    region: "Europa",
    disciplines: ["ilustración", "diseño de personajes", "arte editorial"],
    website: "felixguerrero.art",
    instagram: "@felixguerrero",
    verified: true
  },
  {
    name: "Daniela Orozco",
    role: "Curadora de Arte",
    bio: "Curadora independiente especializada en arte contemporáneo de la diáspora caribeña.",
    city: "Londres",
    country: "Reino Unido",
    region: "Europa",
    disciplines: ["curaduría", "arte contemporáneo", "gestión cultural"],
    linkedin: "daniela-orozco-arte",
    featured: true,
    verified: true
  },
  {
    name: "Marcos Almonte",
    role: "Director de Fotografía",
    bio: "DoP para cine y publicidad. Ha trabajado en producciones en EE.UU., México y el Caribe.",
    city: "Los Ángeles",
    country: "Estados Unidos",
    region: "Norteamérica",
    disciplines: ["fotografía", "cine", "publicidad"],
    instagram: "@marcosalmonte.dop",
    website: "marcosalmonte.com",
    verified: true
  }
];

function slugify(name: string) {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "");
}

async function main() {
  console.log("Seeding profiles...");

  for (const profile of profiles) {
    await prisma.profile.upsert({
      where: { slug: slugify(profile.name) },
      update: {},
      create: {
        ...profile,
        slug: slugify(profile.name),
        featured: profile.featured ?? false,
        verified: profile.verified ?? false
      }
    });
  }

  console.log(`Seeded ${profiles.length} profiles.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
