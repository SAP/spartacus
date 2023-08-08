/**
 * Error thrown when the traceparent header has an invalid format.
 */
export class InvalidTraceparentFormatError extends Error {
  constructor() {
    super('Traceparent header has invalid format.');
  }
}
