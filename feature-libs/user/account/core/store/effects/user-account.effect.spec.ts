import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { User } from '@spartacus/user/account/core';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import { UserAccountAdapter } from '../../connectors/user-account.adapter';
import { UserAccountConnector } from '../../connectors/user-account.connector';
import { UserAccountActions } from '../actions/index';
import * as fromUserDetailsEffect from './user-account.effect';

const mockUserDetails: User = {
  displayUid: 'Display Uid',
  firstName: 'First',
  lastName: 'Last',
  uid: 'UID',
};

describe('User Details effect', () => {
  let userDetailsEffect: fromUserDetailsEffect.UserAccountEffects;
  let userAccountService: UserAccountConnector;
  let actions$: Observable<Action>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        fromUserDetailsEffect.UserAccountEffects,
        { provide: UserAccountAdapter, useValue: {} },
        provideMockActions(() => actions$),
      ],
    });

    userDetailsEffect = TestBed.inject(
      fromUserDetailsEffect.UserAccountEffects
    );
    userAccountService = TestBed.inject(UserAccountConnector);
  });

  describe('loadUserDetails$', () => {
    it('should load user details', () => {
      spyOn(userAccountService, 'get').and.returnValue(of(mockUserDetails));

      const action = new UserAccountActions.LoadUserAccount('mockName');
      const completion = new UserAccountActions.LoadUserAccountSuccess(
        mockUserDetails
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(userDetailsEffect.loadUserAccount$).toBeObservable(expected);
    });
  });
});
