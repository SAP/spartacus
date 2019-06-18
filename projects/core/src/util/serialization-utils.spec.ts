import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { HttpErrorModel } from '../model';
import { makeHttpErrorSerializable } from './serialization-utils';

describe('serialization-utils', () => {
  describe('makeHttpErrorSerializable', () => {
    describe(`when the provided argument is not an instance of HttpErrorResponse, or it's falsy`, () => {
      it('should just return the same value', () => {
        const error = { error: 'error' } as HttpErrorResponse;
        const result = makeHttpErrorSerializable(error as HttpErrorResponse);
        expect(result).toEqual(error);
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

        const result = makeHttpErrorSerializable(
          mockError as HttpErrorResponse
        );
        expect(result).toEqual({
          message: mockError.message,
          error: mockError.error,
          status: mockError.status,
          statusText: mockError.statusText,
          url: mockError.url,
        } as HttpErrorModel);
      });
    });
  });
});
