import { Comparator, SortOrder } from './sort.model';
/**
 * Sort using basic comparison. Ascending is smaller items first
 */
export declare function byComparison<T>(ordering?: SortOrder): Comparator<T>;
/**
 * Smaller objects first
 */
export declare const byComparisonAscending: Comparator<unknown>;
