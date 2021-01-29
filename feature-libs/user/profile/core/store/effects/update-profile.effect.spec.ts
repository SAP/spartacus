import * as AngularCore from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { User } from '@spartacus/user/account/core';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of, throwError } from 'rxjs';
import { UserProfileAdapter } from '../../connectors/user-profile.adapter';
import { UserProfileConnector } from '../../connectors/user-profile.connector';
import { UserProfileActions } from '../actions/index';
import * as fromEffect from './update-profile.effect';

describe('User Details effect', () => {
  let userProfileEffects: fromEffect.UpdateProfileEffects;
  let userProfileConnector: UserProfileConnector;
  let actions$: Observable<Action>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        fromEffect.UpdateProfileEffects,
        { provide: UserProfileAdapter, useValue: {} },
        provideMockActions(() => actions$),
      ],
    });

    userProfileEffects = TestBed.inject(fromEffect.UpdateProfileEffects);
    userProfileConnector = TestBed.inject(UserProfileConnector);

    // avoid warnings because of incorrect error
    spyOnProperty(AngularCore, 'isDevMode').and.returnValue(() => false);
  });

  describe('updateUserProfiles$', () => {
    it('should return UpdateUserProfileSuccess ', () => {
      spyOn(userProfileConnector, 'update').and.returnValue(of({}));

      const uid = 'xxx';
      const details: User = {
        title: 'mr',
      };

      const action = new UserProfileActions.UpdateUserProfile({
        uid,
        details,
      });
      const completion = new UserProfileActions.UpdateUserProfileSuccess(
        details
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(userProfileEffects.updateUserProfile$).toBeObservable(expected);
    });

    it('should return UpdateUserProfileFail action', () => {
      const error = 'error';
      spyOn(userProfileConnector, 'update').and.returnValue(throwError(error));

      const uid = 'xxx';
      const details: User = {
        title: 'mr',
      };

      const action = new UserProfileActions.UpdateUserProfile({
        uid,
        details,
      });
      const completion = new UserProfileActions.UpdateUserProfileFail(
        undefined
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(userProfileEffects.updateUserProfile$).toBeObservable(expected);
    });
  });
});
