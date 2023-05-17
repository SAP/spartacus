export abstract class Logger {
  abstract log(...args: Parameters<typeof console.log>): void;
  abstract error(...args: Parameters<typeof console.error>): void;
  abstract warn(...args: Parameters<typeof console.warn>): void;
}
