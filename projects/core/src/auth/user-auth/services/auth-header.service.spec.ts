import { HttpHandler, HttpHeaders, HttpRequest } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of, timer } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { OccEndpointsService } from '../../../occ/services/occ-endpoints.service';
import { RoutingService } from '../../../routing/facade/routing.service';
import { AuthService } from '../facade/auth.service';
import { CxOAuthService } from '../facade/cx-oauth-service';
import { AuthToken } from '../models/auth-token.model';
import { AuthHeaderService } from './auth-header.service';

class MockAuthService {
  getToken() {
    return of({ access_token: 'acc_token' } as AuthToken);
  }
  logout() {}
}

class MockCxOAuthService {
  refreshToken() {}
}

class MockRoutingService {
  go() {}
}

class MockOccEndpointsService {
  getBaseEndpoint() {
    return 'some-server/occ';
  }
}

describe('AuthHeaderService', () => {
  let service: AuthHeaderService;
  let cxOAuthService: CxOAuthService;
  let authService: AuthService;
  let routingService: RoutingService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthHeaderService,
        { provide: AuthService, useClass: MockAuthService },
        { provide: CxOAuthService, useClass: MockCxOAuthService },
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: OccEndpointsService, useClass: MockOccEndpointsService },
      ],
    });

    authService = TestBed.inject(AuthService);
    service = TestBed.inject(AuthHeaderService);
    cxOAuthService = TestBed.inject(CxOAuthService);
    routingService = TestBed.inject(RoutingService);
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
      spyOn(cxOAuthService, 'refreshToken').and.callThrough();
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
          expect(cxOAuthService.refreshToken).toHaveBeenCalled();
          done();
        });
    });

    it('should invoke expired refresh token handler when there is no refresh token', (done) => {
      const handler = (a) => of(a);
      spyOn(cxOAuthService, 'refreshToken').and.callThrough();
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
          expect(cxOAuthService.refreshToken).not.toHaveBeenCalled();
          expect(service.handleExpiredRefreshToken).toHaveBeenCalled();
          done();
        });
    });
  });

  describe('handleExpiredRefreshToken', () => {
    it('should logout user and redirect to login page', () => {
      spyOn(authService, 'logout').and.callThrough();
      spyOn(routingService, 'go').and.callThrough();

      service.handleExpiredRefreshToken();

      expect(authService.logout).toHaveBeenCalled();
      expect(routingService.go).toHaveBeenCalledWith({ cxRoute: 'login' });
    });
  });
});
