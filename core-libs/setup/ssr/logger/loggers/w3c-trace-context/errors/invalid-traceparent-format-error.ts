/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Error thrown when the traceparent header has an invalid format.
 */
export class InvalidTraceparentFormatError extends Error {
  constructor() {
    super('Traceparent header has invalid format.');
  }
}
