/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

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
