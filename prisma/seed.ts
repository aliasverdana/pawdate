import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const existing = await prisma.dog.count();
  if (existing > 0) return;

  const dogs = [
    {
      name: "Luna",
      bio: "Friendly, loves sniff walks.",
      size: "M" as const,
      energy: "MED" as const,
      neighborhood: "SODERMALM" as const,
      playStyles: ["GENTLE", "CHASE"] as const,
      notes: "Prefers slow introductions.",
    },
    {
      name: "Atlas",
      bio: "High energy. Fetch specialist.",
      size: "L" as const,
      energy: "HIGH" as const,
      neighborhood: "VASASTAN" as const,
      playStyles: ["CHASE", "WRESTLE"] as const,
      notes: "No small dogs please.",
    },
  ];

  for (const d of dogs) {
    const dog = await prisma.dog.create({
      data: {
        name: d.name,
        bio: d.bio,
        size: d.size,
        energy: d.energy,
        neighborhood: d.neighborhood,
        notes: d.notes,
        playStyles: {
          create: d.playStyles.map(style => ({ style })),
        },
      },
    });

    console.log("seeded", dog.name);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
