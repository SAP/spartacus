import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { TokenResponse } from 'angular-oauth2-oidc';
import { OCC_USER_ID_CURRENT } from 'projects/core/src/occ';
import { Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { RoutingService } from '../../../routing/facade/routing.service';
import { UserIdService } from '../facade/user-id.service';
import { AuthToken } from '../models/auth-token.model';
import { AuthActions } from '../store/actions';
import { AuthRedirectService } from './auth-redirect.service';
import { AuthStorageService } from './auth-storage.service';
import { BasicAuthService } from './basic-auth.service';
import { OAuthLibWrapperService } from './oauth-lib-wrapper.service';

class MockUserIdService implements Partial<UserIdService> {
  getUserId(): Observable<string> {
    return of('');
  }
  clearUserId() {}
  setUserId() {}
}

class MockOAuthLibWrapperService implements Partial<OAuthLibWrapperService> {
  revokeAndLogout() {
    return Promise.resolve();
  }
  authorizeWithPasswordFlow() {
    return Promise.resolve({} as TokenResponse);
  }
  initLoginFlow() {}
  tryLogin() {
    return Promise.resolve(true);
  }
}

class MockAuthStorageService implements Partial<AuthStorageService> {
  getToken() {
    return of({ access_token: 'token' } as AuthToken);
  }
  getItem() {
    return 'value';
  }
}

class MockAuthRedirectService implements Partial<AuthRedirectService> {
  redirect() {}
}

class MockRoutingService implements Partial<RoutingService> {
  go() {}
}

describe('BasicAuthService', () => {
  let service: BasicAuthService;
  let routingService: RoutingService;
  let authStorageService: AuthStorageService;
  let userIdService: UserIdService;
  let oAuthLibWrapperService: OAuthLibWrapperService;
  let authRedirectService: AuthRedirectService;
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      providers: [
        BasicAuthService,
        {
          provide: UserIdService,
          useClass: MockUserIdService,
        },
        {
          provide: OAuthLibWrapperService,
          useClass: MockOAuthLibWrapperService,
        },
        { provide: AuthStorageService, useClass: MockAuthStorageService },
        { provide: AuthRedirectService, useClass: MockAuthRedirectService },
        { provide: RoutingService, useClass: MockRoutingService },
      ],
    });

    service = TestBed.inject(BasicAuthService);
    routingService = TestBed.inject(RoutingService);
    authStorageService = TestBed.inject(AuthStorageService);
    userIdService = TestBed.inject(UserIdService);
    oAuthLibWrapperService = TestBed.inject(OAuthLibWrapperService);
    authRedirectService = TestBed.inject(AuthRedirectService);
    store = TestBed.inject(Store);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('checkOAuthParamsInUrl()', () => {
    it('should login user when token is present', async () => {
      spyOn(oAuthLibWrapperService, 'tryLogin').and.callThrough();
      spyOn(userIdService, 'setUserId').and.callThrough();
      spyOn(authRedirectService, 'redirect').and.callThrough();
      spyOn(store, 'dispatch').and.callThrough();
      spyOn(authStorageService, 'getItem').and.returnValue('token');

      await service.checkOAuthParamsInUrl();

      expect(oAuthLibWrapperService.tryLogin).toHaveBeenCalled();
      expect(userIdService.setUserId).toHaveBeenCalledWith(OCC_USER_ID_CURRENT);
      expect(store.dispatch).toHaveBeenCalledWith(new AuthActions.Login());
      expect(authRedirectService.redirect).toHaveBeenCalled();
    });
  });

  describe('loginWithRedirect()', () => {
    it('should initialize login flow', () => {
      spyOn(oAuthLibWrapperService, 'initLoginFlow').and.callThrough();

      const result = service.loginWithRedirect();

      expect(result).toBeTrue();
      expect(oAuthLibWrapperService.initLoginFlow).toHaveBeenCalled();
    });
  });

  describe('authorize()', () => {
    it('should login user', async () => {
      spyOn(
        oAuthLibWrapperService,
        'authorizeWithPasswordFlow'
      ).and.callThrough();
      spyOn(userIdService, 'setUserId').and.callThrough();
      spyOn(authRedirectService, 'redirect').and.callThrough();
      spyOn(store, 'dispatch').and.callThrough();

      await service.authorize('username', 'pass');

      expect(
        oAuthLibWrapperService.authorizeWithPasswordFlow
      ).toHaveBeenCalledWith('username', 'pass');
      expect(userIdService.setUserId).toHaveBeenCalledWith(OCC_USER_ID_CURRENT);
      expect(store.dispatch).toHaveBeenCalledWith(new AuthActions.Login());
      expect(authRedirectService.redirect).toHaveBeenCalled();
    });
  });

  describe('logout()', () => {
    it('should revoke tokens and logout', async () => {
      spyOn(userIdService, 'clearUserId').and.callThrough();
      spyOn(oAuthLibWrapperService, 'revokeAndLogout').and.callThrough();
      spyOn(store, 'dispatch').and.callThrough();

      await service.logout();

      expect(userIdService.clearUserId).toHaveBeenCalled();
      expect(oAuthLibWrapperService.revokeAndLogout).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith(new AuthActions.Logout());
    });
  });

  describe('isUserLoggedIn()', () => {
    it('should return true when there is access_token', (done) => {
      service
        .isUserLoggedIn()
        .pipe(take(1))
        .subscribe((result) => {
          expect(result).toBeTrue();
          done();
        });
    });

    it('should return false when there is not access_token', (done) => {
      spyOn(authStorageService, 'getToken').and.returnValue(of(undefined));

      service
        .isUserLoggedIn()
        .pipe(take(1))
        .subscribe((result) => {
          expect(result).toBeFalse();
          done();
        });
    });
  });

  describe('initLogout()', () => {
    it('should redirect url to logout page', () => {
      spyOn(routingService, 'go').and.callThrough();

      service.initLogout();

      expect(routingService.go).toHaveBeenCalledWith({ cxRoute: 'logout' });
    });
  });
});
