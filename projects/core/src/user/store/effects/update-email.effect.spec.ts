import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of, throwError } from 'rxjs';
import { UserAdapter } from '../../connectors/user/user.adapter';
import { UserConnector } from '../../connectors/user/user.connector';
import { UserActions } from '../actions/index';
import * as fromEffect from './update-email.effect';

describe('Update Email Effect', () => {
  let updateEmailEffect: fromEffect.UpdateEmailEffects;
  let userService: UserConnector;
  let actions$: Observable<Action>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        fromEffect.UpdateEmailEffects,
        { provide: UserAdapter, useValue: {} },
        provideMockActions(() => actions$),
      ],
    });

    updateEmailEffect = TestBed.inject(fromEffect.UpdateEmailEffects);
    userService = TestBed.inject(UserConnector);
  });

  describe('updateEmail$', () => {
    it('should return UpdateEmailSuccess action', () => {
      spyOn(userService, 'updateEmail').and.returnValue(of({}));

      const uid = 'test@test.com';
      const password = 'Qwe123!';
      const newUid = 'tester@sap.com';

      const action = new UserActions.UpdateEmailAction({
        uid,
        password,
        newUid,
      });
      const completion = new UserActions.UpdateEmailSuccessAction(newUid);

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(updateEmailEffect.updateEmail$).toBeObservable(expected);
    });

    it('should return UpdateEmailFail action', () => {
      const error = 'error';
      spyOn(userService, 'updateEmail').and.returnValue(throwError(error));

      const uid = 'test@test.com';
      const password = 'Qwe123!';
      const newUid = 'tester@sap.com';

      const action = new UserActions.UpdateEmailAction({
        uid,
        password,
        newUid,
      });
      const completion = new UserActions.UpdateEmailErrorAction(error);

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(updateEmailEffect.updateEmail$).toBeObservable(expected);
    });
  });
});
