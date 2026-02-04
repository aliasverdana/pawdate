-- CreateTable
CREATE TABLE "Dog" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "bio" TEXT NOT NULL DEFAULT '',
    "size" TEXT NOT NULL,
    "energy" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "notes" TEXT NOT NULL DEFAULT '',
    "isActive" BOOLEAN NOT NULL DEFAULT true
);

-- CreateTable
CREATE TABLE "DogPlayStyle" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "dogId" TEXT NOT NULL,
    "style" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "DogPlayStyle_dogId_fkey" FOREIGN KEY ("dogId") REFERENCES "Dog" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "Dog_neighborhood_size_energy_idx" ON "Dog"("neighborhood", "size", "energy");

-- CreateIndex
CREATE INDEX "Dog_createdAt_idx" ON "Dog"("createdAt");

-- CreateIndex
CREATE INDEX "DogPlayStyle_style_idx" ON "DogPlayStyle"("style");

-- CreateIndex
CREATE UNIQUE INDEX "DogPlayStyle_dogId_style_key" ON "DogPlayStyle"("dogId", "style");
