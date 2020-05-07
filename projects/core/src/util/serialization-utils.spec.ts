import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { HttpErrorModel } from '../model/index';
import { makeErrorSerializable, UNKNOWN_ERROR } from './serialization-utils';

describe('serialization-utils', () => {
  describe('makeErrorSerializable', () => {
    describe(`when the provided argument is of a simple type`, () => {
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

      describe('and when an object with a circular dependency is provided', () => {
        it('should be able to serialize it', () => {
          const circular = {
            xxx: 'xxx',
          };
          circular['myself'] = circular;

          const mockError = new HttpErrorResponse({
            error: circular,
            headers: new HttpHeaders().set('xxx', 'xxx'),
            status: 500,
            statusText: 'Unknown error',
            url: '/xxx',
          });

          const result = makeErrorSerializable(mockError as HttpErrorResponse);
          expect(result).toEqual({
            message: mockError.message,
            error: '{"xxx":"xxx"}',
            status: mockError.status,
            statusText: mockError.statusText,
            url: mockError.url,
          } as HttpErrorModel);
        });
      });
    });

    describe('when an unknown error object is provided', () => {
      it('should return a generic error', () => {
        const error = {
          map: new Map(),
          set: new Set<string>('xxx'),
          some: {
            nested: {
              obj: () => 'xxx',
            },
          },
        };

        const result = makeErrorSerializable(error);
        expect(result).toEqual(UNKNOWN_ERROR);
      });
    });
  });
});
