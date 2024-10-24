import { HttpErrorModel, tryNormalizeHttpError } from '@spartacus/core';
import { isJaloError } from './occ-http-error-handlers';

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
      const result = tryNormalizeHttpError(error, new MockLoggerService());
      expect(result).toBeFalsy();
    });
  });
});
