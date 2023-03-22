export function roll(): number {
  return randomIntBetween(1, 6);
}

export function randomIntBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min)
}