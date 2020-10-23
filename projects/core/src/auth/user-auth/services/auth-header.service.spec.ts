import { HttpHandler, HttpHeaders, HttpRequest } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of, timer } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { GlobalMessageService } from '../../../global-message/facade/global-message.service';
import { GlobalMessageType } from '../../../global-message/models/global-message.model';
import { OccEndpointsService } from '../../../occ/services/occ-endpoints.service';
import { RoutingService } from '../../../routing/facade/routing.service';
import { AuthService } from '../facade/auth.service';
import { AuthToken } from '../models/auth-token.model';
import { AuthHeaderService } from './auth-header.service';
import { OAuthLibWrapperService } from './oauth-lib-wrapper.service';

class MockAuthService implements Partial<AuthService> {
  getToken() {
    return of({ access_token: 'acc_token' } as AuthToken);
  }
  logout() {
    return Promise.resolve();
  }
}

class MockOAuthLibWrapperService implements Partial<OAuthLibWrapperService> {
  refreshToken() {}
}

class MockRoutingService implements Partial<RoutingService> {
  go() {}
}

class MockOccEndpointsService implements Partial<OccEndpointsService> {
  getBaseEndpoint() {
    return 'some-server/occ';
  }
}

class MockGlobalMessageService implements Partial<GlobalMessageService> {
  add() {}
}

describe('AuthHeaderService', () => {
  let service: AuthHeaderService;
  let oAuthLibWrapperService: OAuthLibWrapperService;
  let authService: AuthService;
  let routingService: RoutingService;
  let globalMessageService: GlobalMessageService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthHeaderService,
        { provide: AuthService, useClass: MockAuthService },
        {
          provide: OAuthLibWrapperService,
          useClass: MockOAuthLibWrapperService,
        },
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: OccEndpointsService, useClass: MockOccEndpointsService },
        { provide: GlobalMessageService, useClass: MockGlobalMessageService },
      ],
    });

    authService = TestBed.inject(AuthService);
    service = TestBed.inject(AuthHeaderService);
    oAuthLibWrapperService = TestBed.inject(OAuthLibWrapperService);
    routingService = TestBed.inject(RoutingService);
    globalMessageService = TestBed.inject(GlobalMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
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
      const handler = (a) => of(a);
      spyOn(oAuthLibWrapperService, 'refreshToken').and.callThrough();
      spyOn(authService, 'getToken').and.returnValue(
        timer(0, 100).pipe(
          take(2),
          map(
            (i) =>
              ({
                access_token: `token_${i}`,
                refresh_token: 'ref_token',
              } as AuthToken)
          )
        )
      );
      service
        .handleExpiredAccessToken(
          new HttpRequest('GET', 'some-server/occ/cart'),
          { handle: handler } as HttpHandler
        )
        .pipe(take(1))
        .subscribe((res: any) => {
          expect(res.headers.get('Authorization')).toEqual('Bearer token_1');
          expect(res.url).toEqual('some-server/occ/cart');
          expect(res.method).toEqual('GET');
          expect(oAuthLibWrapperService.refreshToken).toHaveBeenCalled();
          done();
        });
    });

    it('should invoke expired refresh token handler when there is no refresh token', (done) => {
      const handler = (a) => of(a);
      spyOn(oAuthLibWrapperService, 'refreshToken').and.callThrough();
      spyOn(service, 'handleExpiredRefreshToken').and.stub();
      spyOn(authService, 'getToken').and.returnValue(
        timer(0, 100).pipe(
          take(2),
          map(
            (i) =>
              ({
                access_token: `token_${i}`,
              } as AuthToken)
          )
        )
      );
      service
        .handleExpiredAccessToken(
          new HttpRequest('GET', 'some-server/occ/cart'),
          { handle: handler } as HttpHandler
        )
        .pipe(take(1))
        .subscribe(() => {
          expect(oAuthLibWrapperService.refreshToken).not.toHaveBeenCalled();
          expect(service.handleExpiredRefreshToken).toHaveBeenCalled();
          done();
        });
    });
  });

  describe('handleExpiredRefreshToken', () => {
    it('should logout user and redirect to login page', () => {
      spyOn(authService, 'logout').and.callThrough();
      spyOn(routingService, 'go').and.callThrough();
      spyOn(globalMessageService, 'add').and.callThrough();

      service.handleExpiredRefreshToken();

      expect(authService.logout).toHaveBeenCalled();
      expect(routingService.go).toHaveBeenCalledWith({ cxRoute: 'login' });
      expect(globalMessageService.add).toHaveBeenCalledWith(
        {
          key: 'httpHandlers.sessionExpired',
        },
        GlobalMessageType.MSG_TYPE_ERROR
      );
    });
  });
});
