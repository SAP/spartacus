import { Comparator } from './sort.model';
/**
 * Tests both values with type guard and uses comparator if both match the type.
 *
 * If either value fails the type guard, they values are considered equal.
 */
export declare function whenType<T, S extends T>(typeGuard: (value: T) => value is S, comparator: Comparator<S>): Comparator<T>;
