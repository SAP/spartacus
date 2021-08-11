import { HttpHandler, HttpHeaders, HttpRequest } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { BehaviorSubject, EMPTY, of, queueScheduler } from 'rxjs';
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

class MockAuthService implements Partial<AuthService> {
  coreLogout() {
    return Promise.resolve();
  }
}

class MockAuthStorageService implements Partial<AuthStorageService> {
  getToken() {
    return of({ access_token: 'acc_token' } as AuthToken);
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
  let authStorageService: AuthStorageService;
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
    authStorageService = TestBed.inject(AuthStorageService);
    authRedirectService = TestBed.inject(AuthRedirectService);
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
      const token = new BehaviorSubject({
        access_token: `old_token`,
        refresh_token: 'ref_token',
      } as AuthToken);
      const handler = (a: any) => of(a);
      spyOn(oAuthLibWrapperService, 'refreshToken').and.callFake(() => {
        token.next({
          access_token: `new_token`,
          refresh_token: 'ref_token',
        } as AuthToken);
        return EMPTY;
      });
      spyOn(authStorageService, 'getToken').and.returnValue(
        token.asObservable().pipe(observeOn(queueScheduler))
      );
      service
        .handleExpiredAccessToken(
          new HttpRequest('GET', 'some-server/occ/cart'),
          { handle: handler } as HttpHandler
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

    it('should invoke expired refresh token handler when there is no refresh token', () => {
      const handler = jasmine.createSpy('handler', (a: any) => of(a));
      spyOn(oAuthLibWrapperService, 'refreshToken').and.callThrough();
      spyOn(service, 'handleExpiredRefreshToken').and.stub();
      spyOn(authStorageService, 'getToken').and.returnValue(
        of({
          access_token: `token`,
        } as AuthToken)
      );
      service
        .handleExpiredAccessToken(
          new HttpRequest('GET', 'some-server/occ/cart'),
          { handle: handler } as HttpHandler
        )
        .subscribe({
          complete: () => {
            // check that we didn't created new requests
            expect(handler).not.toHaveBeenCalled();
          },
        });
      expect(oAuthLibWrapperService.refreshToken).not.toHaveBeenCalled();
      expect(service.handleExpiredRefreshToken).toHaveBeenCalled();
    });

    it('should refresh token only once when method is invoked multiple times at the same time', () => {});

    it('should return when there was logout before that', () => {
      // logout should happen when no one was listening to retryToken$ (it should check the subscription for stopProcesses)
      // only after that we should invoke the expired access token handler or getToken
    });

    it('should not refresh token when the token is already different than the token used for failing refresh', () => {});
  });

  describe('handleExpiredRefreshToken', () => {
    it('should logout user, save current navigation url, and redirect to login page', () => {
      spyOn(authService, 'coreLogout').and.callThrough();
      spyOn(routingService, 'go').and.callThrough();
      spyOn(globalMessageService, 'add').and.callThrough();

      service.handleExpiredRefreshToken();

      expect(authService.coreLogout).toHaveBeenCalled();
      expect(
        authRedirectService.saveCurrentNavigationUrl
      ).toHaveBeenCalledBefore(routingService.go);
      // TODO: verify that this happens after coreLogout resolves
      expect(routingService.go).toHaveBeenCalledWith({ cxRoute: 'login' });
      expect(globalMessageService.add).toHaveBeenCalledWith(
        {
          key: 'httpHandlers.sessionExpired',
        },
        GlobalMessageType.MSG_TYPE_ERROR
      );
    });
  });

  describe('getToken', () => {
    it('should return undefined when token does not have access token', () => {});

    it('should return token when we have access token', () => {});

    it('should not emit when logout is in progress', () => {});

    it('should not emit when refresh is in progress', () => {});
  });
});
