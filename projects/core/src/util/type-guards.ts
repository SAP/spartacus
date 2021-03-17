export function isNotUndefined<T>(value: T | undefined): value is T {
  return typeof value !== 'undefined';
}

export function isNotNull<T>(value: T | null): value is T {
  return value !== null;
}

export function isPresent<T>(value: T | undefined | null): value is T {
  return isNotUndefined(value) && isNotNull(value);
}

type AugmentedRequired<T extends object, K extends keyof T = keyof T> = Omit<
  T,
  K
> &
  Required<Pick<T, K>>;

export { AugmentedRequired as Required };
