import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action, combineReducers, StoreModule } from '@ngrx/store';
import { cold, hot } from 'jasmine-marbles';
import { UserIdService } from 'projects/core/src/auth/facade/user-id.service';
import { Observable, of } from 'rxjs';
import { AuthActions } from '../../../auth/store/actions/index';
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

class MockUserIdService {
  getUserId(): Observable<string> {
    return of('');
  }
  clearUserId(): void {}
}

describe('UserRegister effect', () => {
  let effect: UserRegisterEffects;
  let actions$: Observable<Action>;
  let userConnector: UserConnector;
  let userIdService: UserIdService;

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
        { provide: UserIdService, useClass: MockUserIdService },
        provideMockActions(() => actions$),
      ],
    });

    effect = TestBed.inject(UserRegisterEffects);
    userConnector = TestBed.inject(UserConnector);
    userIdService = TestBed.inject(UserIdService);

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
      const action = new UserActions.RegisterGuest({
        guid: 'guid',
        password: 'password',
      });
      const loadUser = new AuthActions.LoadUserToken({
        userId: 'test',
        password: 'password',
      });
      const completion = new UserActions.RegisterGuestSuccess();

      actions$ = hot('-a', { a: action });
      const expected = cold('-(bc)', {
        b: loadUser,
        c: completion,
      });

      expect(effect.registerGuest$).toBeObservable(expected);
    });
  });

  describe('removeUser$', () => {
    it('should remove user', () => {
      spyOn(userIdService, 'clearUserId').and.stub();
      const action = new UserActions.RemoveUser('testUserId');
      const logout = new AuthActions.Logout();
      const clearUserToken = new AuthActions.ClearUserToken();
      const completion = new UserActions.RemoveUserSuccess();

      actions$ = hot('-a', { a: action });
      const expected = cold('-(bcd)', {
        b: completion,
        c: clearUserToken,
        d: logout,
      });

      expect(effect.removeUser$).toBeObservable(expected);
      expect(userIdService.clearUserId).toHaveBeenCalled();
    });
  });
});
