import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const profiles = [
  {
    name: "Hulda Guzmán",
    role: "Pintora",
    bio: "Pintora figurativa conocida por sus paisajes tropicales y escenas de realismo mágico. Vive y trabaja entre Santo Domingo y Samaná.",
    city: "Santo Domingo",
    country: "República Dominicana",
    region: "Caribe",
    disciplines: ["pintura", "arte contemporáneo"],
    instagram: "huldaguzman",
    featured: true,
    verified: true
  },
  {
    name: "Joiri Minaya",
    role: "Artista Multidisciplinaria",
    bio: "Artista dominicano-estadounidense cuyo trabajo desestabiliza las representaciones de una identidad tropical imaginada, a través de fotografía, video, instalación y performance.",
    city: "Nueva York",
    country: "Estados Unidos",
    region: "Norteamérica",
    disciplines: ["arte multidisciplinario", "fotografía", "performance", "instalación"],
    instagram: "joiriminaya",
    featured: true,
    verified: true
  },
  {
    name: "Engel Leonardo",
    role: "Artista y Diseñador",
    bio: "Artista multidisciplinario cuya obra aborda la arquitectura, la artesanía tradicional, la naturaleza y la cultura popular del Caribe. Nacido en Baní, vive y trabaja en Santo Domingo.",
    city: "Santo Domingo",
    country: "República Dominicana",
    region: "Caribe",
    disciplines: ["escultura", "instalación", "diseño", "arte contemporáneo"],
    instagram: "engel.leonardo",
    verified: true
  },
  {
    name: "Madeline Jiménez Santil",
    role: "Artista Multidisciplinaria",
    bio: "Artista cuya práctica explora las relaciones entre cuerpo, materia y geometría, cuestionando lo exótico y la migración. Vive y trabaja entre Ciudad de México y Santo Domingo.",
    city: "Santo Domingo",
    country: "República Dominicana",
    region: "Caribe",
    disciplines: ["dibujo", "escultura", "performance", "instalación"],
    instagram: "madelinesantil",
    verified: true
  },
  {
    name: "Firelei Báez",
    role: "Artista Visual",
    bio: "Conocida por sus intrincadas obras sobre papel y lienzo y su escultura a gran escala, que exploran las historias de la diáspora africana y caribeña. Nacida en Santiago, vive y trabaja en Nueva York.",
    city: "Nueva York",
    country: "Estados Unidos",
    region: "Norteamérica",
    disciplines: ["pintura", "dibujo", "instalación", "arte contemporáneo"],
    instagram: "fireleibaez",
    featured: true,
    verified: true
  },
  {
    name: "Tania Marmolejo",
    role: "Pintora",
    bio: "Pintora dominico-sueco-estadounidense conocida por sus retratos femeninos a gran escala que exploran la emoción y la identidad. Vive y trabaja en Nueva York.",
    city: "Nueva York",
    country: "Estados Unidos",
    region: "Norteamérica",
    disciplines: ["pintura", "ilustración", "diseño"],
    instagram: "tanitam",
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

  await prisma.profile.deleteMany({});

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
