import { Comparator } from './sort.model';
/**
 * Sort using specified item's property and comparator
 */
export declare function property<T, P extends keyof T>(prop: P, comparator: Comparator<T[P]>): Comparator<T>;
export declare function property<T, P1 extends keyof T, P2 extends keyof T[P1]>(prop1: P1, prop2: P2, comparator: Comparator<T[P1][P2]>): Comparator<T>;
