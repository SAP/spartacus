/**
 * Error thrown when the traceparent header has an invalid length.
 * @param traceparentLength The length of the traceparent header.
 */
export class InvalidTraceparentLengthError extends Error {
  constructor(traceparentLength: number) {
    super(
      `Traceparent header has invalid length: ${traceparentLength}. Expected 55 characters.`
    );
  }
}
