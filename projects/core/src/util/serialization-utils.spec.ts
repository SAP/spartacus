import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { makeHttpErrorSerializable } from './serialization-utils';

fdescribe('serialization-utils', () => {
  describe('makeHttpErrorSerializable', () => {
    describe(`when the provided argument is not instance of HttpErrorResponse, or it's falsy or it doesn't contain headers property`, () => {
      it('should just return the same value', () => {
        const error = { error: 'error' } as HttpErrorResponse;
        const result = makeHttpErrorSerializable(error as HttpErrorResponse);
        expect(result).toEqual(error);
      });
    });
    describe('when the headers are present', () => {
      it('should make them serializable', () => {
        const error = new HttpErrorResponse({
          error: 'error',
          headers: new HttpHeaders().set('xxx', 'xxx'),
        });

        const result = makeHttpErrorSerializable(error as HttpErrorResponse);
        expect(result).toEqual({
          ...error,
          headers: {
            xxx: 'xxx',
          },
        });
      });
    });
  });
});
