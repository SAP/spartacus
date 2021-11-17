import { HttpHandler, HttpHeaders, HttpRequest } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { BehaviorSubject, EMPTY, merge, of, queueScheduler } from 'rxjs';
import { observeOn, take } from 'rxjs/operators';
import { GlobalMessageService } from '../../../global-message/facade/global-message.service';
import { GlobalMessageType } from '../../../global-message/models/global-message.model';
import { OccEndpointsService } from '../../../occ/services/occ-endpoints.service';
import { RoutingService } from '../../../routing/facade/routing.service';
import { AuthService } from '../facade/auth.service';
import { AuthToken } from '../models/auth-token.model';
import { AuthHttpHeaderService } from './auth-http-header.service';
import { AuthRedirectService } from './auth-redirect.service';
import { AuthStorageService } from './auth-storage.service';
import { OAuthLibWrapperService } from './oauth-lib-wrapper.service';

const testToken: AuthToken = {
  access_token: 'acc_token',
  access_token_stored_at: '123',
};

const logoutInProgressSubject = new BehaviorSubject<boolean>(false);
const refreshInProgressSubject = new BehaviorSubject<boolean>(false);
const getTokenFromStorage = new BehaviorSubject<AuthToken | undefined>(
  testToken
);

class MockAuthService implements Partial<AuthService> {
  logoutInProgress$ = logoutInProgressSubject;
  refreshInProgress$ = refreshInProgressSubject;
  coreLogout() {
    this.setLogoutProgress(true);
    return Promise.resolve();
  }
  setLogoutProgress(progress: boolean): void {
    logoutInProgressSubject.next(progress);
  }
  setRefreshProgress(progress: boolean): void {
    refreshInProgressSubject.next(progress);
  }
}

class MockAuthStorageService implements Partial<AuthStorageService> {
  getToken() {
    return getTokenFromStorage.asObservable().pipe(observeOn(queueScheduler));
  }
}

class MockOAuthLibWrapperService implements Partial<OAuthLibWrapperService> {
  refreshToken(): void {}
}

class MockRoutingService implements Partial<RoutingService> {
  go = () => Promise.resolve(true);
}

class MockOccEndpointsService implements Partial<OccEndpointsService> {
  getBaseUrl() {
    return 'some-server/occ';
  }
}

class MockGlobalMessageService implements Partial<GlobalMessageService> {
  add() {}
}

class MockAuthRedirectService implements Partial<AuthRedirectService> {
  saveCurrentNavigationUrl = jasmine.createSpy('saveCurrentNavigationUrl');
}

describe('AuthHttpHeaderService', () => {
  let service: AuthHttpHeaderService;
  let oAuthLibWrapperService: OAuthLibWrapperService;
  let authService: AuthService;
  let routingService: RoutingService;
  let globalMessageService: GlobalMessageService;
  let authRedirectService: AuthRedirectService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthHttpHeaderService,
        { provide: AuthService, useClass: MockAuthService },
        {
          provide: OAuthLibWrapperService,
          useClass: MockOAuthLibWrapperService,
        },
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: OccEndpointsService, useClass: MockOccEndpointsService },
        { provide: GlobalMessageService, useClass: MockGlobalMessageService },
        { provide: AuthStorageService, useClass: MockAuthStorageService },
        { provide: AuthRedirectService, useClass: MockAuthRedirectService },
      ],
    });

    authService = TestBed.inject(AuthService);
    service = TestBed.inject(AuthHttpHeaderService);
    oAuthLibWrapperService = TestBed.inject(OAuthLibWrapperService);
    routingService = TestBed.inject(RoutingService);
    globalMessageService = TestBed.inject(GlobalMessageService);
    authRedirectService = TestBed.inject(AuthRedirectService);

    getTokenFromStorage.next(testToken);
    logoutInProgressSubject.next(false);
    refreshInProgressSubject.next(false);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('shouldAddAuthorizationHeader', () => {
    it('should return true for occ urls', () => {
      expect(
        service.shouldAddAuthorizationHeader(
          new HttpRequest('GET', 'some-server/occ/cart')
        )
      ).toBeTrue();
    });

    it('should return false for non occ urls', () => {
      expect(
        service.shouldAddAuthorizationHeader(
          new HttpRequest('GET', 'some-server/auth')
        )
      ).toBeFalse();
    });

    it('should return false if request already have Authorization header', () => {
      expect(
        service.shouldAddAuthorizationHeader(
          new HttpRequest('GET', 'some-server/auth', {
            headers: new HttpHeaders({ Authorization: 'Bearer acc_token' }),
          })
        )
      ).toBeFalse();
    });
  });

  describe('shouldCatchError', () => {
    it('should return true for occ urls', () => {
      expect(
        service.shouldCatchError(new HttpRequest('GET', 'some-server/occ/cart'))
      ).toBeTrue();
    });

    it('should return false for non occ urls', () => {
      expect(
        service.shouldCatchError(new HttpRequest('GET', 'some-server/auth'))
      ).toBeFalse();
    });
  });

  describe('alterRequest', () => {
    it('should add Authorization header for occ calls that do not have this header', () => {
      const request = service.alterRequest(
        new HttpRequest('GET', 'some-server/occ/cart')
      );
      expect(request.headers.get('Authorization')).toEqual('Bearer acc_token');
    });

    it('should use AuthToken that is passed to this method', () => {
      const request = service.alterRequest(
        new HttpRequest('GET', 'some-server/occ/cart'),
        { access_token: 'new_token' } as AuthToken
      );
      expect(request.headers.get('Authorization')).toEqual('Bearer new_token');
    });

    it('should not change Authorization header for occ calls', () => {
      const request = service.alterRequest(
        new HttpRequest('GET', 'some-server/occ/cart', {
          headers: new HttpHeaders({ Authorization: 'Bearer diff_token' }),
        })
      );
      expect(request.headers.get('Authorization')).toEqual('Bearer diff_token');
    });

    it('should not add the header to not occ urls', () => {
      const request = service.alterRequest(
        new HttpRequest('GET', 'some-server/non-occ/cart')
      );
      expect(request.headers.has('Authorization')).toBe(false);
    });
  });

  describe('handleExpiredAccessToken', () => {
    it('should refresh the token and retry the call with new token', (done) => {
      const initialToken: AuthToken = {
        access_token: `old_token`,
        access_token_stored_at: '123',
        refresh_token: 'ref_token',
      };
      getTokenFromStorage.next(initialToken);
      const handler = (a: any) => of(a);
      spyOn(oAuthLibWrapperService, 'refreshToken').and.callFake(() => {
        getTokenFromStorage.next({
          access_token: `new_token`,
          access_token_stored_at: '456',
          refresh_token: 'ref_token',
        });
        return EMPTY;
      });
      service
        .handleExpiredAccessToken(
          new HttpRequest('GET', 'some-server/occ/cart'),
          { handle: handler } as HttpHandler,
          initialToken
        )
        .pipe(take(1))
        .subscribe((res: any) => {
          expect(res.headers.get('Authorization')).toEqual('Bearer new_token');
          expect(res.url).toEqual('some-server/occ/cart');
          expect(res.method).toEqual('GET');
          expect(oAuthLibWrapperService.refreshToken).toHaveBeenCalled();
          done();
        });
    });

    it('should invoke expired refresh token handler when there is no refresh token', (done) => {
      const initialToken: AuthToken = {
        access_token: `token`,
        access_token_stored_at: `123`,
      };
      getTokenFromStorage.next(initialToken);
      const handler = jasmine.createSpy('handler', (a: any) => of(a));
      spyOn(oAuthLibWrapperService, 'refreshToken').and.callThrough();
      spyOn(service, 'handleExpiredRefreshToken').and.callFake(() => {
        getTokenFromStorage.next({} as AuthToken);
      });
      service
        .handleExpiredAccessToken(
          new HttpRequest('GET', 'some-server/occ/cart'),
          { handle: handler } as HttpHandler,
          initialToken
        )
        .subscribe({
          complete: () => {
            // check that we didn't created new requests
            expect(handler).not.toHaveBeenCalled();
            expect(oAuthLibWrapperService.refreshToken).not.toHaveBeenCalled();
            expect(service.handleExpiredRefreshToken).toHaveBeenCalled();
            done();
          },
        });
    });

    it('should refresh token only once when method is invoked multiple times at the same time', (done) => {
      const initialToken: AuthToken = {
        access_token: `old_token`,
        access_token_stored_at: '123',
        refresh_token: 'ref_token',
      };
      getTokenFromStorage.next(initialToken);
      const handler = (a: any) => of(a);
      spyOn(oAuthLibWrapperService, 'refreshToken').and.callFake(() => {
        getTokenFromStorage.next({
          access_token: `new_token`,
          access_token_stored_at: '456',
          refresh_token: 'ref_token',
        });
      });
      const results: any[] = [];

      merge(
        service.handleExpiredAccessToken(
          new HttpRequest('GET', 'some-server/1/'),
          { handle: handler } as HttpHandler,
          initialToken
        ),
        service.handleExpiredAccessToken(
          new HttpRequest('GET', 'some-server/2/'),
          { handle: handler } as HttpHandler,
          initialToken
        )
      ).subscribe((res) => {
        results.push(res);
        if (results.length === 2) {
          results.forEach((r) =>
            expect(r.headers.get('Authorization')).toEqual('Bearer new_token')
          );
          const url1 = results.find((r) => r.url === 'some-server/1/');
          expect(url1).toBeTruthy();
          const url2 = results.find((r) => r.url === 'some-server/2/');
          expect(url2).toBeTruthy();
          expect(oAuthLibWrapperService.refreshToken).toHaveBeenCalledTimes(1);
          done();
        }
      });
    });

    it('should not attempt to refresh the token when there was a logout before the token expired', fakeAsync(() => {
      const initialToken: AuthToken = {
        access_token: `token`,
        access_token_stored_at: '123',
      };
      getTokenFromStorage.next(initialToken);
      const handler = jasmine.createSpy('handler', (a: any) => of(a));
      logoutInProgressSubject.next(true);

      spyOn(oAuthLibWrapperService, 'refreshToken').and.callThrough();

      service
        .handleExpiredAccessToken(
          new HttpRequest('GET', 'some-server/occ/cart'),
          { handle: handler } as HttpHandler,
          initialToken
        )
        .subscribe({
          complete: () => {
            expect(oAuthLibWrapperService.refreshToken).not.toHaveBeenCalled();
            expect(handler).not.toHaveBeenCalled();
          },
        });

      setTimeout(() => {
        getTokenFromStorage.next({} as AuthToken);
      }, 100);
      tick(101);
    }));

    it('should not refresh token when the given token is already different than the token used for failing refresh', (done) => {
      const initialToken: AuthToken = {
        access_token: `old_token`,
        access_token_stored_at: '123',
      };
      const handler = (a: any) => of(a);
      spyOn(oAuthLibWrapperService, 'refreshToken').and.stub();

      service
        .handleExpiredAccessToken(
          new HttpRequest('GET', 'some-server/1/'),
          { handle: handler } as HttpHandler,
          initialToken
        )
        .subscribe((res: any) => {
          expect(res.headers.get('Authorization')).toEqual(
            `Bearer ${testToken.access_token}`
          );
          expect(res.url).toEqual('some-server/1/');
          expect(res.method).toEqual('GET');
          expect(oAuthLibWrapperService.refreshToken).not.toHaveBeenCalled();
          done();
        });
    });
  });

  describe('handleExpiredRefreshToken', () => {
    function wait(): Promise<void> {
      return new Promise<void>((resolve) => {
        setTimeout(() => resolve(), 5);
      });
    }

    it('should logout user, save current navigation url, and redirect to login page', async () => {
      spyOn(authService, 'coreLogout').and.callFake(wait);
      spyOn(routingService, 'go').and.callThrough();
      spyOn(globalMessageService, 'add').and.callThrough();

      service.handleExpiredRefreshToken();

      expect(authService.coreLogout).toHaveBeenCalled();
      expect(routingService.go).not.toHaveBeenCalled();
      await wait();

      expect(
        authRedirectService.saveCurrentNavigationUrl
      ).toHaveBeenCalledBefore(routingService.go);
      expect(routingService.go).toHaveBeenCalledWith({ cxRoute: 'login' });
      expect(globalMessageService.add).toHaveBeenCalledWith(
        {
          key: 'httpHandlers.sessionExpired',
        },
        GlobalMessageType.MSG_TYPE_ERROR
      );
    });
  });

  describe('getValidToken', () => {
    it('should return undefined when token does not have access token', (done) => {
      getTokenFromStorage.next(undefined);

      service['getValidToken']({
        access_token: 'xxx',
        access_token_stored_at: '123',
      })
        .pipe(take(1))
        .subscribe((result) => {
          expect(result).toBeFalsy();
          done();
        });
    });

    it('should return token when we have access token', (done) => {
      getTokenFromStorage.next(testToken);

      service['getValidToken']({
        access_token: 'xxx',
        access_token_stored_at: '123',
      })
        .pipe(take(1))
        .subscribe((result) => {
          expect(result).toBeTruthy();
          expect(result).toEqual(testToken);
          done();
        });
    });

    it('should not emit when logout is in progress', fakeAsync(() => {
      logoutInProgressSubject.next(true);

      let emitted = false;
      service['getValidToken']({
        access_token: 'xxx',
        access_token_stored_at: '123',
      })
        .pipe(take(1))
        .subscribe(() => {
          emitted = true;
        });

      expect(emitted).toBeFalsy();
    }));

    it('should not emit when refresh is in progress', fakeAsync(() => {
      refreshInProgressSubject.next(true);

      let emitted = false;
      service['getValidToken']({
        access_token: 'xxx',
        access_token_stored_at: '123',
      })
        .pipe(take(1))
        .subscribe(() => {
          emitted = true;
        });

      expect(emitted).toBeFalsy();
    }));
  });
});
