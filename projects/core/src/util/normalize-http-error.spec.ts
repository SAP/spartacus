import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { HttpErrorModel } from '../model/index';
import { normalizeHttpError } from './normalize-http-error';

describe('normalizeHttpError', () => {
  describe(`when the provided argument is not HttpError`, () => {
    it('should return undefined', () => {
      const error = 'xxx';
      const result = normalizeHttpError(error);
      expect(result).toEqual(undefined);
    });
  });

  describe('when the provided error is an instance of HttpErrorResponse', () => {
    it('should make it serializable', () => {
      const mockError = new HttpErrorResponse({
        error: 'error',
        headers: new HttpHeaders().set('xxx', 'xxx'),
        status: 500,
        statusText: 'Unknown error',
        url: '/xxx',
      });

      const result = normalizeHttpError(mockError as HttpErrorResponse);
      expect(result?.message).toEqual(mockError.message);
      expect(result?.status).toEqual(mockError.status);
      expect(result?.statusText).toEqual(mockError.statusText);
      expect(result?.url).toEqual(mockError.url);
      expect(result instanceof HttpErrorModel).toBeTruthy();
    });

    it('should serialize details', () => {
      const mockError = new HttpErrorResponse({
        error: { errors: [{ message: 'errorMessage' }] },
        headers: new HttpHeaders().set('xxx', 'xxx'),
        status: 500,
        statusText: 'Unknown error',
        url: '/xxx',
      });
      const result = normalizeHttpError(mockError as HttpErrorResponse);
      expect(result?.message).toEqual(mockError.message);
      expect(result?.details).toEqual([{ message: 'errorMessage' }]);
      expect(result instanceof HttpErrorModel).toBeTruthy();
    });

    it('should normalize single error', () => {
      const mockError = new HttpErrorResponse({
        error: { error: 'errorType', error_description: 'errorMessage' },
        headers: new HttpHeaders().set('xxx', 'xxx'),
        status: 500,
        statusText: 'Unknown error',
        url: '/xxx',
      });
      const result = normalizeHttpError(mockError as HttpErrorResponse);
      expect(result?.message).toEqual(mockError.message);
      expect(result?.details).toEqual([
        { message: 'errorMessage', type: 'errorType' },
      ]);
      expect(result instanceof HttpErrorModel).toBeTruthy();
    });
  });
});
