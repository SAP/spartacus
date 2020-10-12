import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { OCC_USER_ID_CURRENT } from '../../../occ/utils/occ-constants';
import {
  ClientAuthState,
  CLIENT_AUTH_FEATURE,
} from '../../client-auth/store/client-auth-state';
import * as fromReducers from '../../client-auth/store/reducers/index';
import { AuthService } from '../facade/auth.service';
import { UserIdService } from '../facade/user-id.service';
import { AuthToken } from '../models/auth-token.model';
import { AuthActions } from '../store/actions';

const mockToken = {
  refresh_token: 'foo',
  access_token: 'testToken-access-token',
} as AuthToken;

class MockUserIdService {
  getUserId(): Observable<string> {
    return of('');
  }
  clearUserId() {}
}

// TODO(#8246): Fix unit tests after final implementation
describe('BasicAuthService', () => {
  let service: AuthService;
  let store: Store<ClientAuthState>;
  let userIdService: UserIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(CLIENT_AUTH_FEATURE, fromReducers.getReducers()),
      ],
      providers: [
        AuthService,
        {
          provide: UserIdService,
          useClass: MockUserIdService,
        },
      ],
    });

    service = TestBed.inject(AuthService);
    userIdService = TestBed.inject(UserIdService);
    store = TestBed.inject(Store);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a user token', () => {
    // store.dispatch(new AuthActions.SetUserTokenData(mockToken));

    let result: AuthToken;
    service
      .getToken()
      .subscribe((token) => (result = token))
      .unsubscribe();
    expect(result).toEqual(mockToken);
  });

  it('should expose userToken state', () => {
    // store.dispatch(new AuthActions.SetUserTokenData(mockToken));

    let result: AuthToken;
    const subscription = service.getToken().subscribe((token) => {
      result = token;
    });
    subscription.unsubscribe();

    expect(result).toEqual(mockToken);
  });

  it('should dispatch proper action for authorize', () => {
    spyOn(store, 'dispatch').and.stub();

    service.authorize('user', 'password');
    // expect(store.dispatch).toHaveBeenCalledWith(
    // new AuthActions.LoadUserToken({
    //   userId: 'user',
    //   password: 'password',
    // })
    // );
  });

  it('should dispatch proper action for refreshUserToken', () => {
    spyOn(store, 'dispatch').and.stub();

    // service.refreshUserToken();
    // expect(store.dispatch).toHaveBeenCalledWith(
    //   new AuthActions.RefreshUserToken({
    //     refreshToken: mockToken.refresh_token,
    //   })
    // );
  });

  it('should dispatch proper action for authorizeToken', () => {
    spyOn(store, 'dispatch').and.stub();

    // service.authorizeWithToken(mockToken);
    // expect(store.dispatch).toHaveBeenCalledWith(
    //   new AuthActions.LoadUserTokenSuccess(mockToken)
    // );
  });

  it('should dispatch proper actions for logout when user token exists', () => {
    spyOn(store, 'dispatch').and.stub();
    const testToken = { ...mockToken, userId: OCC_USER_ID_CURRENT };
    spyOn(service, 'getToken').and.returnValue(of(testToken));
    spyOn(userIdService, 'clearUserId').and.stub();

    service.logout();

    expect(userIdService.clearUserId).toHaveBeenCalled();
    // expect(store.dispatch).toHaveBeenCalledWith(
    //   new AuthActions.ClearUserToken()
    // );
    expect(store.dispatch).toHaveBeenCalledWith(new AuthActions.Logout());
    // expect(store.dispatch).toHaveBeenCalledWith(
    //   new AuthActions.RevokeUserToken(testToken)
    // );
  });

  it('should dispatch proper action for logout when user token does not exist', () => {
    spyOn(store, 'dispatch').and.stub();
    const testToken = undefined;
    spyOn(service, 'getToken').and.returnValue(of(testToken as AuthToken));
    spyOn(userIdService, 'clearUserId').and.stub();

    service.logout();

    expect(userIdService.clearUserId).toHaveBeenCalled();
    // expect(store.dispatch).toHaveBeenCalledWith(
    //   new AuthActions.ClearUserToken()
    // );
    expect(store.dispatch).toHaveBeenCalledWith(new AuthActions.Logout());
    // expect(store.dispatch).not.toHaveBeenCalledWith(
    //   new AuthActions.RevokeUserToken(testToken as UserToken)
    // );
  });

  describe('isUserLoggedIn', () => {
    it('should return false if the userToken is not present', () => {
      spyOn(service, 'getToken').and.returnValue(of(null));
      let result = true;
      service
        .isUserLoggedIn()
        .subscribe((value) => (result = value))
        .unsubscribe();
      expect(result).toEqual(false);
    });
    it('should return false if the userToken is present but userToken.access_token is not', () => {
      spyOn(service, 'getToken').and.returnValue(of({} as AuthToken));
      let result = true;
      service
        .isUserLoggedIn()
        .subscribe((value) => (result = value))
        .unsubscribe();
      expect(result).toEqual(false);
    });
    it('should return true if the userToken and userToken.access_token are present', () => {
      spyOn(service, 'getToken').and.returnValue(
        of({ access_token: 'xxx' } as AuthToken)
      );
      let result = false;
      service
        .isUserLoggedIn()
        .subscribe((value) => (result = value))
        .unsubscribe();
      expect(result).toEqual(true);
    });
  });
});
