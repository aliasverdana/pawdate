import type { Dog, DogPlayStyle } from "@prisma/client";

export function formatNeighborhood(n: string): string {
  switch (n) {
    case "SODERMALM":
      return "Södermalm";
    case "KUNGSHOLMEN":
      return "Kungsholmen";
    case "VASASTAN":
      return "Vasastan";
    case "OSTERMALM":
      return "Östermalm";
    case "NORRMALM":
      return "Norrmalm";
    case "GAMLA_STAN":
      return "Gamla Stan";
    case "BROMMA":
      return "Bromma";
    case "HAGERSTEN_LILJEHOLMEN":
      return "Hägersten-Liljeholmen";
    case "ENSKEDE_ARSTA_VANTOR":
      return "Enskede-Årsta-Vantör";
    case "SKARPNACK":
      return "Skarpnäck";
    default:
      return n;
  }
}

export function formatEnergy(e: string): string {
  if (e === "LOW") return "Low";
  if (e === "MED") return "Medium";
  if (e === "HIGH") return "High";
  return e;
}

export function formatSize(s: string): string {
  if (s === "S") return "Small";
  if (s === "M") return "Medium";
  if (s === "L") return "Large";
  return s;
}

export function formatPlayStyles(styles: DogPlayStyle[]): string[] {
  return styles.map(s => {
    if (s.style === "GENTLE") return "Gentle";
    if (s.style === "CHASE") return "Chase";
    if (s.style === "WRESTLE") return "Wrestle";
    return s.style;
  });
}

export type DogWithStyles = Dog & { playStyles: DogPlayStyle[] };
