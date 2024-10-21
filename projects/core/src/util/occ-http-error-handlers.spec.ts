import { HttpErrorModel } from '@spartacus/core';
import { normalizeHttpError } from './normalize-http-error';
import {
  isAuthorizationError,
  isJaloError,
  isServerError,
} from './occ-http-error-handlers';

class MockLoggerService {
  log(): void {}
  warn(): void {}
  error(): void {}
  info(): void {}
  debug(): void {}
}

describe('occ-http-error-handlers', () => {
  describe('when the error is jalo error', () => {
    it('should return true', () => {
      const error: Partial<HttpErrorModel> = {
        details: [{ type: 'JaloObjectNoLongerValidError' }],
      };
      const result = isJaloError(error);
      expect(result).toBeTruthy();
    });
  });
  describe('when the error is not a jalo error', () => {
    it('should return false', () => {
      const error: Partial<HttpErrorModel> = {
        details: [{ type: 'not a jalo error' }],
      };
      const result = normalizeHttpError(error, new MockLoggerService());
      expect(result).toBeFalsy();
    });
  });
  describe('when the error is server error', () => {
    it('should return true for codes between 500 and 511', () => {
      for (let errorCode = 500; errorCode <= 511; errorCode++) {
        const error: Partial<HttpErrorModel> = {
          status: errorCode,
        };
        const result = isServerError(error);
        expect(result).toBeTruthy();
      }
    });
  });
  describe('when the error is not a server error', () => {
    it('should return false for code above 511', () => {
      const error: Partial<HttpErrorModel> = {
        status: 512,
      };
      const result = isServerError(error);
      expect(result).toBeFalsy();
    });
    it('should return false for code below 500', () => {
      const error: Partial<HttpErrorModel> = {
        status: 400,
      };
      const result = isServerError(error);
      expect(result).toBeFalsy();
    });
  });
  describe('when the error is authorization error', () => {
    it('should return true', () => {
      const error: Partial<HttpErrorModel> = {
        status: 401,
      };
      const result = isAuthorizationError(error);
      expect(result).toBeTruthy();
    });
  });
  describe('when the error is not an authorization error', () => {
    it('should return false', () => {
      const error: Partial<HttpErrorModel> = {
        status: 400,
      };
      const result = isAuthorizationError(error);
      expect(result).toBeFalsy();
    });
  });
});
