"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  name: z.string().min(1).max(40),
  bio: z.string().max(200).optional().default(""),
  notes: z.string().max(200).optional().default(""),
  size: z.enum(["S", "M", "L"]),
  energy: z.enum(["LOW", "MED", "HIGH"]),
  neighborhood: z.enum([
    "SODERMALM",
    "KUNGSHOLMEN",
    "VASASTAN",
    "OSTERMALM",
    "NORRMALM",
    "GAMLA_STAN",
    "BROMMA",
    "HAGERSTEN_LILJEHOLMEN",
    "ENSKEDE_ARSTA_VANTOR",
    "SKARPNACK",
  ]),
  playStyles: z.array(z.enum(["GENTLE", "CHASE", "WRESTLE"]))
    .max(3)
    .optional()
    .default([]),
});

export async function createDog(formData: FormData): Promise<void> {
  const parsed = schema.safeParse({
    name: formData.get("name"),
    bio: formData.get("bio"),
    notes: formData.get("notes"),
    size: formData.get("size"),
    energy: formData.get("energy"),
    neighborhood: formData.get("neighborhood"),
    playStyles: formData.getAll("playStyles"),
  });

  if (!parsed.success) {
    // For v0 we fail silently and rely on browser validation.
    return;
  }

  const d = parsed.data;

  const user = await (await import("@/lib/auth/requireUser")).requireUser("/dogs/new");

  await prisma.dog.create({
    data: {
      ownerId: user.userId,
      name: d.name,
      bio: d.bio ?? "",
      notes: d.notes ?? "",
      size: d.size,
      energy: d.energy,
      neighborhood: d.neighborhood,
      playStyles: { create: (d.playStyles ?? []).map(style => ({ style })) },
    },
  });
}
