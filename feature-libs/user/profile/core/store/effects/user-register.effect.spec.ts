import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action, combineReducers, StoreModule } from '@ngrx/store';
import { AuthService } from '@spartacus/core';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import { UserProfileAdapter } from '../../connectors/user-profile.adapter';
import { UserProfileConnector } from '../../connectors/user-profile.connector';
import { UserSignUp } from '../../model/user-profile.model';
import { UserProfileActions } from '../actions/index';
import * as fromStoreReducers from '../reducers/index';
import { UserRegisterEffects } from './user-register.effect';

const user: UserSignUp = {
  firstName: '',
  lastName: '',
  password: '',
  titleCode: '',
  uid: '',
};

class MockAuthService implements Partial<AuthService> {
  loginWithCredentials() {
    return Promise.resolve();
  }
  logout() {}
}

describe('UserRegister effect', () => {
  let effect: UserRegisterEffects;
  let actions$: Observable<Action>;
  let userProfileConnector: UserProfileConnector;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromStoreReducers.getReducers(),
          user: combineReducers(fromStoreReducers.getReducers()),
        }),
      ],
      providers: [
        UserRegisterEffects,
        { provide: UserProfileAdapter, useValue: {} },
        { provide: AuthService, useClass: MockAuthService },
        provideMockActions(() => actions$),
      ],
    });

    effect = TestBed.inject(UserRegisterEffects);
    userProfileConnector = TestBed.inject(UserProfileConnector);
    authService = TestBed.inject(AuthService);

    spyOn(userProfileConnector, 'register').and.returnValue(of({}));
    spyOn(userProfileConnector, 'registerGuest').and.returnValue(
      of({ uid: 'test' })
    );
    spyOn(userProfileConnector, 'remove').and.returnValue(of({}));
  });

  describe('registerUser$', () => {
    it('should register user', () => {
      const action = new UserProfileActions.RegisterUser(user);
      const completion = new UserProfileActions.RegisterUserSuccess();

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', {
        b: completion,
      });

      expect(effect.registerUser$).toBeObservable(expected);
    });
  });

  describe('registerGuest$', () => {
    it('should register guest', () => {
      spyOn(authService, 'loginWithCredentials');
      const action = new UserProfileActions.RegisterGuest({
        guid: 'guid',
        password: 'password',
      });
      const completion = new UserProfileActions.RegisterGuestSuccess();

      actions$ = hot('-a', { a: action });
      const expected = cold('-(b)', {
        b: completion,
      });

      expect(effect.registerGuest$).toBeObservable(expected);
      expect(authService.loginWithCredentials).toHaveBeenCalledWith(
        'test',
        'password'
      );
    });
  });

  describe('removeUser$', () => {
    it('should remove user', () => {
      spyOn(authService, 'logout');

      const action = new UserProfileActions.RemoveUser('testUserId');
      const completion = new UserProfileActions.RemoveUserSuccess();

      actions$ = hot('-a', { a: action });
      const expected = cold('-(b)', {
        b: completion,
      });

      expect(effect.removeUser$).toBeObservable(expected);
      expect(authService.logout).toHaveBeenCalled();
    });
  });
});
