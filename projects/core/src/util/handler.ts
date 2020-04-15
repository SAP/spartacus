export const enum Priority {
  FALLBACK = -10, // used as fallback, when there was no other matches
  LOW = -5, // used mainly in libraries, easy overridable
  NORMAL = 0, // default in application
  HIGH = 5, // should take precedencee
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
