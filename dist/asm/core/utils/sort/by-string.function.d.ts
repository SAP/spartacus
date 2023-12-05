import { Comparator, SortOrder } from './sort.model';
/**
 * Compare strings using `String.localeCompare()`.  Ascending is alphabetical (a-z)
 *
 * Note: Nullish items are treated as an empty string.
 */
export declare function byString(ordering?: SortOrder, locales?: string | Array<string>, opts?: Intl.CollatorOptions): Comparator<string>;
/**
 * Alphabetical a-z using `String.localeCompare()`
 *
 * Note: Nullish items are treated as an empty string.
 */
export declare const byStringAscending: Comparator<string>;
