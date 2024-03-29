import { CxError } from './cx-errors';

/**
 * Data that can be attached to a {@link CxServerError}.
 */
export interface CxServerErrorData {
  message?: string;
  originalError?: unknown;
}

/**
 * A base class for all Spartacus server errors.
 */
export abstract class CxServerError extends Error {
  constructor(
    public readonly cxErrorCode: string,
    public readonly data?: CxServerErrorData
  ) {
    super(data?.message);
  }
}

/**
 * Error produced when an unknown server error occurs.
 */
export class UnknownServerError extends CxServerError {
  constructor(data: CxServerErrorData) {
    super(CxError.UnknownServerError, data);
  }
}

/**
 * Error produced when a CMS page is not found.
 */
export class CmsPageNotFoundServerError extends CxServerError {
  constructor(data: CxServerErrorData) {
    super(CxError.CmsPageNotFoundServerError, data);
  }
}
