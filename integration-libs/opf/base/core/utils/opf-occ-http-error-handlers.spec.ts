import { HttpErrorModel } from '@spartacus/core';
import {
  isAuthorizationError,
  isHttp500Error,
} from './opf-occ-http-error-handlers';

describe('Http Error Utils', () => {
  describe('isHttp500Error', () => {
    it('returns true for HTTP 500 error', () => {
      const error: HttpErrorModel = { status: 500 };
      expect(isHttp500Error(error)).toBe(true);
    });

    it('returns false for non-500 status code', () => {
      const error: HttpErrorModel = { status: 400 };
      expect(isHttp500Error(error)).toBe(false);
    });
  });

  describe('isAuthorizationError', () => {
    it('returns true for 401 status code', () => {
      const error: HttpErrorModel = { status: 401 };
      expect(isAuthorizationError(error)).toBe(true);
    });

    it('returns false for non-401 status code', () => {
      const error: HttpErrorModel = { status: 403 };
      expect(isAuthorizationError(error)).toBe(false);
    });
  });
});
