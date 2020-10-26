import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action, combineReducers, StoreModule } from '@ngrx/store';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import { AuthService } from '../../../auth/user-auth/facade/auth.service';
import { UserSignUp } from '../../../model/misc.model';
import { UserAdapter } from '../../connectors/user/user.adapter';
import { UserConnector } from '../../connectors/user/user.connector';
import { UserActions } from '../actions/index';
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
  authorize() {}
  initLogout() {}
}

describe('UserRegister effect', () => {
  let effect: UserRegisterEffects;
  let actions$: Observable<Action>;
  let userConnector: UserConnector;
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
        { provide: UserAdapter, useValue: {} },
        { provide: AuthService, useClass: MockAuthService },
        provideMockActions(() => actions$),
      ],
    });

    effect = TestBed.inject(UserRegisterEffects);
    userConnector = TestBed.inject(UserConnector);
    authService = TestBed.inject(AuthService);

    spyOn(userConnector, 'register').and.returnValue(of({}));
    spyOn(userConnector, 'registerGuest').and.returnValue(of({ uid: 'test' }));
    spyOn(userConnector, 'remove').and.returnValue(of({}));
  });

  describe('registerUser$', () => {
    it('should register user', () => {
      const action = new UserActions.RegisterUser(user);
      const completion = new UserActions.RegisterUserSuccess();

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', {
        b: completion,
      });

      expect(effect.registerUser$).toBeObservable(expected);
    });
  });

  describe('registerGuest$', () => {
    it('should register guest', () => {
      spyOn(authService, 'authorize');
      const action = new UserActions.RegisterGuest({
        guid: 'guid',
        password: 'password',
      });
      const completion = new UserActions.RegisterGuestSuccess();

      actions$ = hot('-a', { a: action });
      const expected = cold('-(b)', {
        b: completion,
      });

      expect(effect.registerGuest$).toBeObservable(expected);
      expect(authService.authorize).toHaveBeenCalledWith('test', 'password');
    });
  });

  describe('removeUser$', () => {
    it('should remove user', () => {
      spyOn(authService, 'initLogout');

      const action = new UserActions.RemoveUser('testUserId');
      const completion = new UserActions.RemoveUserSuccess();

      actions$ = hot('-a', { a: action });
      const expected = cold('-(b)', {
        b: completion,
      });

      expect(effect.removeUser$).toBeObservable(expected);
      expect(authService.initLogout).toHaveBeenCalled();
    });
  });
});
