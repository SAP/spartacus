import { HttpErrorModel, MockLoggerService } from '@spartacus/core';
import { normalizeHttpError } from './normalize-http-error';
import { isJaloError } from './occ-http-error-handlers';

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
});
