import { Comparator, SortOrder } from './sort.model';
/**
 * Compare numbers. Ascending is smaller numbers first
 */
export declare function byNumber(ordering?: SortOrder): Comparator<number>;
/**
 * Small numbers first
 */
export declare const byNumberAscending: Comparator<number>;
/**
 * Large numbers first
 */
export declare const byNumberDescending: Comparator<number>;
