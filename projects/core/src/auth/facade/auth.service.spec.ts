import { TestBed } from '@angular/core/testing';

import { Store } from '@ngrx/store';

import * as fromAuthStore from '../store';
import { ClientToken, UserToken } from '../models/token-types.model';

import { AuthService } from './auth.service';
import { AuthState } from '../store/auth-state';
import { AuthStoreModule } from '../store/auth-store.module';
import { UserAuthenticationTokenService } from '../services/user-authentication/user-authentication-token.service';
import { ClientAuthenticationTokenService } from '../services/client-authentication/client-authentication-token.service';

const mockToken = {
  userId: 'user@sap.com',
  refresh_token: 'foo'
} as UserToken;

const mockClientToken = {
  access_token: 'testToken'
} as ClientToken;

describe('AuthService', () => {
  let service: AuthService;
  let store: Store<AuthState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AuthStoreModule],
      providers: [
        AuthService,
        { provide: UserAuthenticationTokenService, useValue: {} },
        { provide: ClientAuthenticationTokenService, useValue: {} }
      ]
    });

    service = TestBed.get(AuthService);
    store = TestBed.get(Store);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should expose userToken state', () => {
    store.dispatch(new fromAuthStore.LoadUserTokenSuccess(mockToken));

    let result: UserToken;
    const subscription = service.userToken$.subscribe(token => {
      result = token;
    });
    subscription.unsubscribe();

    expect(result).toEqual(mockToken);
  });

  it('should expose clientToken', () => {
    store.dispatch(new fromAuthStore.LoadClientTokenSuccess(mockClientToken));

    let result: ClientToken;
    const subscription = service.clientToken$.subscribe(token => {
      result = token;
    });
    subscription.unsubscribe();

    expect(result).toEqual(mockClientToken);
  });

  it('should call loadClientToken() when no token is present', () => {
    spyOn(service, 'loadClientToken').and.stub();

    store.dispatch(new fromAuthStore.LoadClientTokenSuccess({} as ClientToken));
    const subscription = service.clientToken$.subscribe(_token => {});
    subscription.unsubscribe();

    expect(service.loadClientToken).toHaveBeenCalled();
  });

  it('should dispatch proper action for authorize', () => {
    spyOn(store, 'dispatch').and.stub();

    service.authorize('user', 'password');
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromAuthStore.LoadUserToken({
        userId: 'user',
        password: 'password'
      })
    );
  });

  it('should dispatch proper action for refreshUserToken', () => {
    spyOn(store, 'dispatch').and.stub();

    service.refreshUserToken(mockToken);
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromAuthStore.RefreshUserToken({
        userId: mockToken.userId,
        refreshToken: mockToken.refresh_token
      })
    );
  });

  it('should dispatch proper action for authorizeToken', () => {
    spyOn(store, 'dispatch').and.stub();

    service.authorizeWithToken(mockToken);
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromAuthStore.LoadUserTokenSuccess(mockToken)
    );
  });

  it('should dispatch proper action for login', () => {
    spyOn(store, 'dispatch').and.stub();

    service.login();
    expect(store.dispatch).toHaveBeenCalledWith(new fromAuthStore.Login());
  });

  it('should dispatch proper action for logout', () => {
    spyOn(store, 'dispatch').and.stub();

    service.logout();
    expect(store.dispatch).toHaveBeenCalledWith(new fromAuthStore.Logout());
  });

  it('should dispatch proper action for loadClientToken()', () => {
    spyOn(store, 'dispatch').and.stub();

    service.loadClientToken();
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromAuthStore.LoadClientToken()
    );
  });

  it('refresh the client toke', () => {
    store.dispatch(new fromAuthStore.LoadClientTokenSuccess(mockClientToken));

    spyOn(service, 'loadClientToken').and.stub();

    const sub = service.refreshClientToken().subscribe();
    sub.unsubscribe();

    expect(service.loadClientToken).toHaveBeenCalled();
  });
});
