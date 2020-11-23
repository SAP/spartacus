export const enum Priority {
  /**
   * Used as fallback, when there is no other matches
   */
  FALLBACK = -50,
  /**
   * Used mainly in libraries, easy overridable
   */
  LOW = -10,
  /**
   * Default priority
   */
  NORMAL = 0,
  /**
   * High priority for matches that should take precedence
   */
  HIGH = 10,
}

/**
 * Base interface for implementing applicables in a consistent way
 *
 * Applicables are mainly used to find best matching one from multi provided
 * classes, like handlers, resolvers, etc.
 */
export interface Applicable {
  /**
   * Returns true if applicable can be used to handle specified condition
   */
  hasMatch?(...params): boolean;

  /**
   * Returns priority or score for specified applicable.
   *
   * If multiple applicables can be applied to specified condition, the one
   * with highest priority or score wins.
   */
  getPriority?(...params): Priority | number;
}

/**
 * Helper logic to resolve best matching Applicable
 *
 * Finding best match is a two step process:
 * 1. Find all matching applicables
 *    - all applicables for which hasMatch(...matchParams) will return true
 *    - all applicables without hasMatch method (implicit always match)
 * 2. Find the applicable with highest priority
 *    - applicable with highest getPriority(...priorityParams) will win
 *    - applicable without getPriority method is treated as Priority.NORMAL or 0
 *    - applicables with the same priority are sorted by order of providers, the applicable that was provided later wins
 *
 * @param applicables - array or applicable-like instances
 * @param matchParams - array of parameters passed for hasMatch calls
 * @param priorityParams - array of parameters passed for getPriority calls
 */
export function resolveApplicable<T extends Applicable>(
  applicables: T[],
  matchParams: any[] = [],
  priorityParams: any[] = []
): T | undefined {
  const matchedApplicables = (applicables ?? []).filter(
    (applicable) => !applicable.hasMatch || applicable.hasMatch(...matchParams)
  );

  if (matchedApplicables.length < 2) {
    return matchedApplicables[0];
  }

  let lastPriority = -Infinity;
  return matchedApplicables.reduce((acc, curr) => {
    const currPriority = curr.getPriority
      ? curr.getPriority(...priorityParams)
      : Priority.NORMAL;
    if (lastPriority > currPriority) {
      return acc;
    }
    lastPriority = currPriority;
    return curr;
  }, undefined);
}
