import { Comparator, SortOrder } from './sort.model';
/**
 * Sort using basic comparison. Ascending is true first
 */
export declare function byBoolean(ordering?: SortOrder): Comparator<boolean>;
/**
 * True first
 */
export declare const byBooleanTrueFirst: Comparator<boolean>;
