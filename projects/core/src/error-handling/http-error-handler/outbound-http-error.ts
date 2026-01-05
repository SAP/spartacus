/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Represents an outbound HTTP error that occurs when communicating with the backend.
 */
export class OutboundHttpError extends Error {
  constructor(cause: unknown) {
    super('Outbound HTTP Error', { cause });
  }
}

/**
 * Represents an outbound HTTP error specific to a CMS page not found.
 * Extends the base OutboundHttpError class.
 */
export class CmsPageNotFoundOutboundHttpError extends OutboundHttpError {
  constructor(cause: unknown) {
    super(cause);
    this.message = 'CMS Page Not Found';
  }
}
