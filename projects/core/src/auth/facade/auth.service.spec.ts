import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { OCC_USER_ID_CURRENT } from '../../occ/utils/occ-constants';
import { ClientToken, UserToken } from '../models/token-types.model';
import { AuthActions } from '../store/actions/index';
import { AuthState, AUTH_FEATURE } from '../store/auth-state';
import * as fromReducers from '../store/reducers/index';
import { AuthService } from './auth.service';
import { UserIdService } from './user-id.service';

const mockToken = {
  refresh_token: 'foo',
  access_token: 'testToken-access-token',
} as UserToken;

const mockClientToken = {
  access_token: 'testToken',
} as ClientToken;

class MockUserIdService {
  getUserId(): Observable<string> {
    return of('');
  }
  clearUserId() {}
}

describe('AuthService', () => {
  let service: AuthService;
  let store: Store<AuthState>;
  let userIdService: UserIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(AUTH_FEATURE, fromReducers.getReducers()),
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
    store.dispatch(new AuthActions.LoadUserTokenSuccess(mockToken));

    let result: UserToken;
    service
      .getUserToken()
      .subscribe((token) => (result = token))
      .unsubscribe();
    expect(result).toEqual(mockToken);
  });

  it('should expose userToken state', () => {
    store.dispatch(new AuthActions.LoadUserTokenSuccess(mockToken));

    let result: UserToken;
    const subscription = service.getUserToken().subscribe((token) => {
      result = token;
    });
    subscription.unsubscribe();

    expect(result).toEqual(mockToken);
  });

  it('should expose clientToken', () => {
    store.dispatch(new AuthActions.LoadClientTokenSuccess(mockClientToken));

    let result: ClientToken;
    const subscription = service.getClientToken().subscribe((token) => {
      result = token;
    });
    subscription.unsubscribe();

    expect(result).toEqual(mockClientToken);
  });

  it('should call loadClientToken() when no token is present', () => {
    spyOn(store, 'dispatch').and.stub();

    const subscription = service.getClientToken().subscribe((_token) => {});
    subscription.unsubscribe();

    expect(store.dispatch).toHaveBeenCalledWith(
      new AuthActions.LoadClientToken()
    );
  });

  it('should dispatch proper action for authorize', () => {
    spyOn(store, 'dispatch').and.stub();

    service.authorize('user', 'password');
    expect(store.dispatch).toHaveBeenCalledWith(
      new AuthActions.LoadUserToken({
        userId: 'user',
        password: 'password',
      })
    );
  });

  it('should return a client token', () => {
    store.dispatch(new AuthActions.LoadClientTokenSuccess(mockClientToken));

    let result: ClientToken;

    service
      .getClientToken()
      .subscribe((token) => (result = token))
      .unsubscribe();
    expect(result).toEqual(mockClientToken);
  });

  it('should dispatch proper action for refreshUserToken', () => {
    spyOn(store, 'dispatch').and.stub();

    service.refreshUserToken(mockToken);
    expect(store.dispatch).toHaveBeenCalledWith(
      new AuthActions.RefreshUserToken({
        refreshToken: mockToken.refresh_token,
      })
    );
  });

  it('should dispatch proper action for authorizeToken', () => {
    spyOn(store, 'dispatch').and.stub();

    service.authorizeWithToken(mockToken);
    expect(store.dispatch).toHaveBeenCalledWith(
      new AuthActions.LoadUserTokenSuccess(mockToken)
    );
  });

  it('should dispatch proper actions for logout when user token exists', () => {
    spyOn(store, 'dispatch').and.stub();
    const testToken = { ...mockToken, userId: OCC_USER_ID_CURRENT };
    spyOn(service, 'getUserToken').and.returnValue(of(testToken));
    spyOn(userIdService, 'clearUserId').and.stub();

    service.logout();

    expect(userIdService.clearUserId).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalledWith(
      new AuthActions.ClearUserToken()
    );
    expect(store.dispatch).toHaveBeenCalledWith(new AuthActions.Logout());
    expect(store.dispatch).toHaveBeenCalledWith(
      new AuthActions.RevokeUserToken(testToken)
    );
  });

  it('should dispatch proper action for logout when user token does not exist', () => {
    spyOn(store, 'dispatch').and.stub();
    const testToken = undefined;
    spyOn(service, 'getUserToken').and.returnValue(of(testToken as UserToken));
    spyOn(userIdService, 'clearUserId').and.stub();

    service.logout();

    expect(userIdService.clearUserId).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalledWith(
      new AuthActions.ClearUserToken()
    );
    expect(store.dispatch).toHaveBeenCalledWith(new AuthActions.Logout());
    expect(store.dispatch).not.toHaveBeenCalledWith(
      new AuthActions.RevokeUserToken(testToken as UserToken)
    );
  });

  it('should dispatch proper action for refresh the client token', () => {
    store.dispatch(new AuthActions.LoadClientTokenSuccess(mockClientToken));

    spyOn(store, 'dispatch').and.stub();

    const sub = service.refreshClientToken().subscribe();
    sub.unsubscribe();

    expect(store.dispatch).toHaveBeenCalledWith(
      new AuthActions.LoadClientToken()
    );
  });

  it('should return user id from userIdService', () => {
    spyOn(userIdService, 'getUserId').and.returnValue(of('userId123'));

    let result: string;
    service
      .getOccUserId()
      .subscribe((userId) => (result = userId))
      .unsubscribe();

    expect(result).toEqual('userId123');
  });

  describe('isUserLoggedIn', () => {
    it('should return false if the userToken is not present', () => {
      spyOn(service, 'getUserToken').and.returnValue(of(null));
      let result = true;
      service
        .isUserLoggedIn()
        .subscribe((value) => (result = value))
        .unsubscribe();
      expect(result).toEqual(false);
    });
    it('should return false if the userToken is present but userToken.access_token is not', () => {
      spyOn(service, 'getUserToken').and.returnValue(of({} as UserToken));
      let result = true;
      service
        .isUserLoggedIn()
        .subscribe((value) => (result = value))
        .unsubscribe();
      expect(result).toEqual(false);
    });
    it('should return true if the userToken and userToken.access_token are present', () => {
      spyOn(service, 'getUserToken').and.returnValue(
        of({ access_token: 'xxx' } as UserToken)
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
