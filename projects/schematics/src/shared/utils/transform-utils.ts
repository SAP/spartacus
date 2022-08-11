export function parseCSV(
  raw: string | undefined,
  defaultValues: string[] = []
): string {
  if (!raw) {
    return defaultValues.map((x) => `'${x}'`).join(', ');
  }

  return raw
    .split(',')
    .map((x) => `'${x}'`)
    .join(', ');
}
