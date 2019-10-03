import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { OCC_USER_ID_ANONYMOUS } from '../../occ/utils/occ-constants';
import { ClientToken, UserToken } from '../models/token-types.model';
import { AuthActions } from '../store/actions/index';
import { AuthState, AUTH_FEATURE } from '../store/auth-state';
import * as fromReducers from '../store/reducers/index';
import { AuthService } from './auth.service';

const mockToken = {
  userId: 'user@sap.com',
  refresh_token: 'foo',
  access_token: 'testToken-access-token',
} as UserToken;

const mockClientToken = {
  access_token: 'testToken',
} as ClientToken;

describe('AuthService', () => {
  let service: AuthService;
  let store: Store<AuthState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(AUTH_FEATURE, fromReducers.getReducers()),
      ],
      providers: [AuthService],
    });

    service = TestBed.get(AuthService as Type<AuthService>);
    store = TestBed.get(Store as Type<Store<AuthState>>);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a user token', () => {
    store.dispatch(new AuthActions.LoadUserTokenSuccess(mockToken));

    let result: UserToken;
    service
      .getUserToken()
      .subscribe(token => (result = token))
      .unsubscribe();
    expect(result).toEqual(mockToken);
  });

  it('should expose userToken state', () => {
    store.dispatch(new AuthActions.LoadUserTokenSuccess(mockToken));

    let result: UserToken;
    const subscription = service.getUserToken().subscribe(token => {
      result = token;
    });
    subscription.unsubscribe();

    expect(result).toEqual(mockToken);
  });

  it('should expose clientToken', () => {
    store.dispatch(new AuthActions.LoadClientTokenSuccess(mockClientToken));

    let result: ClientToken;
    const subscription = service.getClientToken().subscribe(token => {
      result = token;
    });
    subscription.unsubscribe();

    expect(result).toEqual(mockClientToken);
  });

  it('should call loadClientToken() when no token is present', () => {
    spyOn(store, 'dispatch').and.stub();

    const subscription = service.getClientToken().subscribe(_token => {});
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
      .subscribe(token => (result = token))
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

  it('should dispatch proper action for logout', () => {
    spyOn(store, 'dispatch').and.stub();

    service.logout();
    expect(store.dispatch).toHaveBeenCalledWith(new AuthActions.Logout());
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

  it('should return anonymous userid when no user token exists', () => {
    let result: string;
    service
      .getOccUserId()
      .subscribe(token => (result = token))
      .unsubscribe();
    expect(result).toEqual(OCC_USER_ID_ANONYMOUS);
  });

  it('should return the token userid when a user token exists', () => {
    store.dispatch(new AuthActions.LoadUserTokenSuccess(mockToken));

    let result: string;
    service
      .getOccUserId()
      .subscribe(token => (result = token))
      .unsubscribe();
    expect(result).toEqual(mockToken.userId);
  });
});
