export const enum Priority {
  FALLBACK = -10,
  LOW = -5,
  NORMAL = 0,
  HIGH = 5,
}

/**
 * Base interface for implementing handlers in a consistent way
 */
export interface Handler {
  /**
   * Returns true if handler can be used to handle specified condition
   */
  hasMatch?(...params): boolean;

  /**
   * Returns priority or score for specified handler.
   *
   * If multiple handlers can be used to handle specified condition, the one
   * with highest priority or score wins.
   */
  getPriority?(...params): Priority | number;
}
