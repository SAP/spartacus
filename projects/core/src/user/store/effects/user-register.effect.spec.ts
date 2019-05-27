import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { combineReducers, StoreModule } from '@ngrx/store';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import { LoadOpenIdToken, LoadUserToken, Logout } from '../../../auth/index';
import { UserSignUp } from '../../../model/misc.model';
import { UserAccountAdapter } from '../../connectors/account/user-account.adapter';
import { UserAccountConnector } from '../../connectors/account/user-account.connector';
import * as fromStore from '../index';
import { UserRegisterEffects } from './user-register.effect';

const user: UserSignUp = {
  firstName: '',
  lastName: '',
  password: '',
  titleCode: '',
  uid: '',
};

describe('UserRegister effect', () => {
  let effect: UserRegisterEffects;
  let actions$: Observable<any>;
  let userService: UserAccountConnector;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromStore.getReducers(),
          user: combineReducers(fromStore.getReducers()),
        }),
      ],
      providers: [
        UserRegisterEffects,
        { provide: UserAccountAdapter, useValue: {} },
        provideMockActions(() => actions$),
      ],
    });

    effect = TestBed.get(UserRegisterEffects);
    userService = TestBed.get(UserAccountConnector);

    spyOn(userService, 'register').and.returnValue(of({}));
    spyOn(userService, 'remove').and.returnValue(of({}));
  });

  describe('registerUser$', () => {
    it('should register user', () => {
      const action = new fromStore.RegisterUser(user);
      const loadUser = new LoadUserToken({
        userId: user.uid,
        password: user.password,
      });
      const loadOpenIdToken = new LoadOpenIdToken({
        username: user.uid,
        password: user.password,
      });
      const completion = new fromStore.RegisterUserSuccess();

      actions$ = hot('-a', { a: action });
      const expected = cold('-(bcd)', {
        b: loadUser,
        c: loadOpenIdToken,
        d: completion,
      });

      expect(effect.registerUser$).toBeObservable(expected);
    });
  });

  describe('removeUser$', () => {
    it('should remove user', () => {
      const action = new fromStore.RemoveUser('testUserId');
      const logout = new Logout();
      const completion = new fromStore.RemoveUserSuccess();

      actions$ = hot('-a', { a: action });
      const expected = cold('-(bc)', {
        b: completion,
        c: logout,
      });

      expect(effect.removeUser$).toBeObservable(expected);
    });
  });
});
