/**
 * Merge occ fields parameters
 *
 * @param fields Fields definition as string or object
 */
export declare function mergeFields(fields: (string | object)[]): string;
/**
 * Optimize fields definition by removing not needed groups
 *
 * @param fields
 */
export declare function optimizeFields(fields?: object): object;
/**
 * Parse string field definition to an AST object
 *
 * @param fields Fields string definition
 * @param startIndex Used for recurrence
 */
export declare function parseFields(fields: string, startIndex?: number): [object, number] | object;
/**
 * Convert AST object fields definition to string representation
 *
 * @param fields
 */
export declare function stringifyFields(fields: object): string;
/**
 * Extract part of the object described by fields definition
 *
 * @param data
 * @param fields
 */
export declare function extractFields<T>(data: T, fields: string | object): T;
