export function isNotUndefined<T>(value: T | undefined): value is T {
  return typeof value !== 'undefined';
}

export function isNotNullable<T>(value: T): value is NonNullable<T> {
  return isNotUndefined(value) && value !== null;
}

export function isNotNull<T>(value: T | null): value is T {
  return value !== null;
}
