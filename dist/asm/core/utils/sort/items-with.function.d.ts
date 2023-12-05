import { Comparator } from './sort.model';
/**
 * Sort an object using multiple sort criteria
 */
export declare function itemsWith<T>(...fns: Array<Comparator<T>>): (a: T, b: T) => -1 | 0 | 1;
/**
 * Allows you to compose multiple sort comparators
 */
export declare const byMultiple: typeof itemsWith;
