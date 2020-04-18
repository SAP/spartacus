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

/**
 * Helper logic to resolve best matching handler
 *
 * Finding best match is a two step process:
 * 1. Find all matching handlers
 *    - all handlers for which hasMatch(...matchParams) will return true
 *    - all handlers without hasMatch method (implicit always match)
 * 2. Find the handler with highest priority
 *    - handler with highest getPriority(...priorityParams) will win
 *    - handler without getPriority method is treated as Priotity.NORMAL or 0
 *    - handlers with the same priority are sorted by order of providers, the handler that was provided later wins
 *
 * @param handlers - array or handler-like instancese
 * @param matchParams - array of parameters passed for hasMatch calls
 * @param priorityParams - array of parameters passed for getPriority calls
 */
export function resolveHandler<T extends Handler>(
  handlers: T[],
  matchParams?: any[],
  priorityParams?: any[]
): T | undefined {
  const matchedHandlers = (handlers ?? []).filter(
    (handler) => !handler.hasMatch || handler.hasMatch(...matchParams)
  );
  if (matchedHandlers.length > 1) {
    matchedHandlers.sort(
      (a, b) =>
        (a.getPriority ? a.getPriority(...priorityParams) : Priority.NORMAL) -
        (b.getPriority ? b.getPriority(...priorityParams) : Priority.NORMAL)
    );
  }
  return matchedHandlers[matchedHandlers.length - 1];
}
