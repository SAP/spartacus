import type { InspectOptions } from 'node:util';

// PRIVATE API
/**
 * Default options used for formatting log messages in NodeJS.
 *
 * They are meant to be passed to `formatWithOptions()` function from the `node:util` module
 * for logging purposes.
 */
export const DEFAULT_LOGGER_INSPECT_OPTIONS: InspectOptions = {
  /**
   * Prevent automatically breaking a long string message into multiple lines.
   * Otherwise, multi-line logs would be treated on the server as separate logs.
   */
  breakLength: Infinity,

  /**
   * Prevent the depth of the logged object to be limited to 2 (which is a NodeJS default).
   * Otherwise, the object's properties at nested levels higher than 2 would not be visible in the logs.
   *
   * The value 10 was chosen arbitrarily. It can be adjusted in the future, if needed.
   */
  depth: 10,
};
