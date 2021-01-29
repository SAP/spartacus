import * as AngularCore from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of, throwError } from 'rxjs';
import { UserProfileAdapter } from '../../connectors/user-profile.adapter';
import { UserProfileConnector } from '../../connectors/user-profile.connector';
import { UserProfileActions } from '../actions/index';
import * as fromEffects from './update-email.effect';

describe('Update Password Effect', () => {
  let updateEmailEffect: fromEffects.UpdateEmailEffects;
  let userProfileService: UserProfileConnector;
  let actions$: Observable<Action>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        fromEffects.UpdateEmailEffects,
        { provide: UserProfileAdapter, useValue: {} },
        provideMockActions(() => actions$),
      ],
    });

    updateEmailEffect = TestBed.inject(fromEffects.UpdateEmailEffects);
    userProfileService = TestBed.inject(UserProfileConnector);

    // avoid warnings because of incorrect error
    spyOnProperty(AngularCore, 'isDevMode').and.returnValue(() => false);
  });

  describe('updateEmail$', () => {
    it('should return UpdateEmailSuccess action', () => {
      spyOn(userProfileService, 'updateEmail').and.returnValue(of({}));

      const uid = 'test@test.com';
      const password = 'Qwe123!';
      const newUid = 'tester@sap.com';

      const action = new UserProfileActions.UpdateEmailAction({
        uid,
        password,
        newUid,
      });
      const completion = new UserProfileActions.UpdateEmailSuccessAction(
        newUid
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(updateEmailEffect.updateEmail$).toBeObservable(expected);
    });

    it('should return UpdateEmailFail action', () => {
      const error = 'error';
      spyOn(userProfileService, 'updateEmail').and.returnValue(
        throwError(error)
      );

      const uid = 'test@test.com';
      const password = 'Qwe123!';
      const newUid = 'tester@sap.com';

      const action = new UserProfileActions.UpdateEmailAction({
        uid,
        password,
        newUid,
      });
      const completion = new UserProfileActions.UpdateEmailErrorAction(
        undefined
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(updateEmailEffect.updateEmail$).toBeObservable(expected);
    });
  });
});
