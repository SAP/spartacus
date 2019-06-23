import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action, combineReducers, StoreModule } from '@ngrx/store';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import { AuthActions } from '../../../auth/store/actions/index';
import { UserSignUp } from '../../../model/misc.model';
import { UserAdapter } from '../../connectors/user/user.adapter';
import { UserConnector } from '../../connectors/user/user.connector';
import { UserActions } from '../actions/index';
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
  let actions$: Observable<Action>;
  let userService: UserConnector;

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
        { provide: UserAdapter, useValue: {} },
        provideMockActions(() => actions$),
      ],
    });

    effect = TestBed.get(UserRegisterEffects);
    userService = TestBed.get(UserConnector);

    spyOn(userService, 'register').and.returnValue(of({}));
    spyOn(userService, 'remove').and.returnValue(of({}));
  });

  describe('registerUser$', () => {
    it('should register user', () => {
      const action = new UserActions.RegisterUser(user);
      const loadUser = new AuthActions.LoadUserToken({
        userId: user.uid,
        password: user.password,
      });
      const completion = new UserActions.RegisterUserSuccess();

      actions$ = hot('-a', { a: action });
      const expected = cold('-(bc)', {
        b: loadUser,
        c: completion,
      });

      expect(effect.registerUser$).toBeObservable(expected);
    });
  });

  describe('removeUser$', () => {
    it('should remove user', () => {
      const action = new UserActions.RemoveUser('testUserId');
      const logout = new AuthActions.Logout();
      const completion = new UserActions.RemoveUserSuccess();

      actions$ = hot('-a', { a: action });
      const expected = cold('-(bc)', {
        b: completion,
        c: logout,
      });

      expect(effect.removeUser$).toBeObservable(expected);
    });
  });
});
