import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { HttpErrorModel } from '../model';
import { makeErrorSerializable } from './serialization-utils';

describe('serialization-utils', () => {
  describe('makeErrorSerializable', () => {
    describe(`when the provided argument is not an instance of Error nor of HttpErrorResponse`, () => {
      it('should return the same value as provided', () => {
        const error = 'xxx';
        const result = makeErrorSerializable(error);
        expect(result).toEqual(error);
      });
    });

    describe(`when the provided argument is an instance of Error`, () => {
      it('should make it serializable', () => {
        const error = new Error('xxx');
        const result = makeErrorSerializable(error);
        expect(result).toEqual(
          jasmine.objectContaining({
            message: error.message,
            type: error.name,
          })
        );
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

        const result = makeErrorSerializable(mockError as HttpErrorResponse);
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
