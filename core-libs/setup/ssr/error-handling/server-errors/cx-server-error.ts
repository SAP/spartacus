/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CxError } from './cx-errors';

/**
 * Data that can be attached to a {@link CxServerErrorResponse}.
 */
export interface CxServerErrorResponseData {
  message?: string;
  cause?: unknown;
}

/**
 * A base class for all Spartacus server errors.
 */
export abstract class CxServerErrorResponse extends Error {
  constructor(
    public readonly cxErrorCode: string,
    public readonly data?: CxServerErrorResponseData
  ) {
    super(data?.message, { cause: data?.cause });
  }
}

/**
 * Error produced when an unknown server error occurs.
 */
export class UnknownServerErrorResponse extends CxServerErrorResponse {
  constructor(data: CxServerErrorResponseData) {
    super(CxError.UnknownServerError, data);
  }
}

/**
 * Error produced when a CMS page is not found.
 */
export class CmsPageNotFoundServerErrorResponse extends CxServerErrorResponse {
  constructor(data: CxServerErrorResponseData) {
    super(CxError.CmsPageNotFoundServerError, data);
  }
}
