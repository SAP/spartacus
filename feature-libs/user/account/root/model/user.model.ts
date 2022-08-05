export interface User {
  displayUid?: string;
  firstName?: string;
  lastName?: string;
  name?: string;
  uid?: string;
}

/**
 * Base User options, used for extensibility.
 */
export type BaseUserOptions<T> = T & { userId: string };
