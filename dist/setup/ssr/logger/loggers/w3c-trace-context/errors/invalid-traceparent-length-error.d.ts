/**
 * Error thrown when the traceparent header has an invalid length.
 * @param traceparentLength The length of the traceparent header.
 */
export declare class InvalidTraceparentLengthError extends Error {
    constructor(traceparentLength: number);
}
