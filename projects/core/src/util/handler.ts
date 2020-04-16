export const enum Priority {
  FALLBACK = -50, // used as fallback, when there is no other matches
  LOW = -10, // used mainly in libraries, easy overridable
  NORMAL = 0, // default in application
  HIGH = 10, // should take precedence
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
