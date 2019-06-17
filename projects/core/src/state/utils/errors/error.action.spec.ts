import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ErrorAction } from './error.action';

const anError = new HttpErrorResponse({
  error: 'error',
  headers: new HttpHeaders().set('xxx', 'xxx'),
});

class AnAction extends ErrorAction {
  readonly type = 'AN-ACTION';
  constructor() {
    super(anError);
  }
}

describe('error.action', () => {
  describe('when an action provides a payload', () => {
    it('should make the payload serializable', () => {
      const errorAction = new AnAction();
      expect(errorAction).toEqual({
        type: 'AN-ACTION',
        payload: {
          ...anError,
          headers: {
            xxx: 'xxx',
          },
        },
      } as AnAction);
    });
  });
});
