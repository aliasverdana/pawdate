-- CreateEnum
CREATE TYPE "DogSize" AS ENUM ('S', 'M', 'L');

-- CreateEnum
CREATE TYPE "EnergyLevel" AS ENUM ('LOW', 'MED', 'HIGH');

-- CreateEnum
CREATE TYPE "PlayStyle" AS ENUM ('GENTLE', 'CHASE', 'WRESTLE');

-- CreateEnum
CREATE TYPE "Neighborhood" AS ENUM ('SODERMALM', 'KUNGSHOLMEN', 'VASASTAN', 'OSTERMALM', 'NORRMALM', 'GAMLA_STAN', 'BROMMA', 'HAGERSTEN_LILJEHOLMEN', 'ENSKEDE_ARSTA_VANTOR', 'SKARPNACK');

-- CreateTable
CREATE TABLE "Dog" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "bio" TEXT NOT NULL DEFAULT '',
    "size" "DogSize" NOT NULL,
    "energy" "EnergyLevel" NOT NULL,
    "neighborhood" "Neighborhood" NOT NULL,
    "notes" TEXT NOT NULL DEFAULT '',
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Dog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DogPlayStyle" (
    "id" TEXT NOT NULL,
    "dogId" TEXT NOT NULL,
    "style" "PlayStyle" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DogPlayStyle_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Dog_neighborhood_size_energy_idx" ON "Dog"("neighborhood", "size", "energy");

-- CreateIndex
CREATE INDEX "Dog_createdAt_idx" ON "Dog"("createdAt");

-- CreateIndex
CREATE INDEX "DogPlayStyle_style_idx" ON "DogPlayStyle"("style");

-- CreateIndex
CREATE UNIQUE INDEX "DogPlayStyle_dogId_style_key" ON "DogPlayStyle"("dogId", "style");

-- AddForeignKey
ALTER TABLE "DogPlayStyle" ADD CONSTRAINT "DogPlayStyle_dogId_fkey" FOREIGN KEY ("dogId") REFERENCES "Dog"("id") ON DELETE CASCADE ON UPDATE CASCADE;
