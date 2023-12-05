import { Comparator, SortOrder } from './sort.model';
/**
 * Sorts based on items being nullish or not.  Ascending is nullish items first.
 */
export declare function byNullish<T>(ordering?: SortOrder): Comparator<T>;
export declare const byNullishFirst: Comparator<unknown>;
export declare const byNullishLast: Comparator<unknown>;
