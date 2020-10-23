import { HttpHeaders, HttpRequest } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AuthService } from '../../auth/user-auth/facade/auth.service';
import { CxOAuthService } from '../../auth/user-auth/facade/cx-oauth-service';
import { AuthToken } from '../../auth/user-auth/models/auth-token.model';
import { GlobalMessageService } from '../../global-message/facade/global-message.service';
import { GlobalMessageType } from '../../global-message/models/global-message.model';
import { OccEndpointsService } from '../../occ/services/occ-endpoints.service';
import { RoutingService } from '../../routing/facade/routing.service';
import { CsAgentAuthService } from '../facade/csagent-auth.service';
import { AsmAuthHeaderService } from './asm-auth.header.service';

class MockCsAgentAuthService implements Partial<CsAgentAuthService> {
  isCustomerSupportAgentLoggedIn() {
    return of(false);
  }
  logoutCustomerSupportAgent() {
    return Promise.resolve();
  }
}

class MockAuthService implements Partial<AuthService> {
  getToken() {
    return of({ access_token: 'acc_token' } as AuthToken);
  }
  logout() {
    return Promise.resolve();
  }
}

class MockCxOAuthService implements Partial<CxOAuthService> {}

class MockRoutingService implements Partial<RoutingService> {
  go() {}
}

class MockGlobalMessageService implements Partial<GlobalMessageService> {
  add() {}
}

class MockOccEndpointsService implements Partial<OccEndpointsService> {
  getBaseEndpoint() {
    return 'some-server/occ';
  }
}

describe('AsmAuthHeaderService', () => {
  let service: AsmAuthHeaderService;
  let authService: AuthService;
  let routingService: RoutingService;
  let csAgentAuthService: CsAgentAuthService;
  let globalMessageService: GlobalMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AsmAuthHeaderService,
        { provide: CsAgentAuthService, useClass: MockCsAgentAuthService },
        { provide: AuthService, useClass: MockAuthService },
        { provide: CxOAuthService, useClass: MockCxOAuthService },
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: GlobalMessageService, useClass: MockGlobalMessageService },
        { provide: OccEndpointsService, useClass: MockOccEndpointsService },
      ],
    });

    service = TestBed.inject(AsmAuthHeaderService);
    authService = TestBed.inject(AuthService);
    routingService = TestBed.inject(RoutingService);
    csAgentAuthService = TestBed.inject(CsAgentAuthService);
    globalMessageService = TestBed.inject(GlobalMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('shouldCatchError', () => {
    it('should return true for occ calls', () => {
      expect(
        service.shouldCatchError(new HttpRequest('GET', 'some-server/occ/cart'))
      ).toBeTrue();
    });

    it('should return true for cs agent requests', () => {
      expect(
        service.shouldCatchError(
          new HttpRequest('GET', 'some-server/csagent', {
            headers: new HttpHeaders({ 'cx-use-csagent-token': 'true' }),
          })
        )
      ).toBeTrue();
    });

    it('should return false for any other requests', () => {
      expect(
        service.shouldCatchError(new HttpRequest('GET', 'some-server/auth'))
      ).toBeFalse();
    });
  });

  describe('alterRequest', () => {
    it('should add header for occ calls', () => {
      const request = service.alterRequest(
        new HttpRequest('GET', 'some-server/occ/cart')
      );
      expect(request.headers.get('Authorization')).toEqual('Bearer acc_token');
    });

    it('should add header for cs agent calls', () => {
      const request = service.alterRequest(
        new HttpRequest('GET', 'some-server/csagent', {
          headers: new HttpHeaders({ 'cx-use-csagent-token': 'true' }),
        })
      );
      expect(request.headers.get('Authorization')).toEqual('Bearer acc_token');
    });

    it('should remove cs agent header from requests', () => {
      const request = service.alterRequest(
        new HttpRequest('GET', 'some-server/csagent', {
          headers: new HttpHeaders({ 'cx-use-csagent-token': 'true' }),
        })
      );
      expect(request.headers.has('cx-use-csagent-token')).toBe(false);
    });

    it('should not do anything for other requests', () => {
      const request = service.alterRequest(
        new HttpRequest('GET', 'some-server/non-occ/cart')
      );
      expect(request.headers.has('Authorization')).toBe(false);
    });
  });

  describe('handleExpiredRefreshToken', () => {
    it('should work the same as in AuthHeaderService when there is normally logged user', () => {
      spyOn(authService, 'logout').and.callThrough();
      spyOn(routingService, 'go').and.callThrough();

      service.handleExpiredRefreshToken();

      expect(authService.logout).toHaveBeenCalled();
      expect(routingService.go).toHaveBeenCalledWith({ cxRoute: 'login' });
    });

    it('should logoutCustomerSupportAgent when cs agent is logged in', () => {
      spyOn(authService, 'logout').and.callThrough();
      spyOn(
        csAgentAuthService,
        'isCustomerSupportAgentLoggedIn'
      ).and.returnValue(of(true));
      spyOn(csAgentAuthService, 'logoutCustomerSupportAgent').and.callThrough();
      spyOn(globalMessageService, 'add').and.callThrough();

      service.handleExpiredRefreshToken();

      expect(authService.logout).not.toHaveBeenCalled();
      expect(csAgentAuthService.logoutCustomerSupportAgent).toHaveBeenCalled();
      expect(globalMessageService.add).toHaveBeenCalledWith(
        {
          key: 'asm.csagentTokenExpired',
        },
        GlobalMessageType.MSG_TYPE_ERROR
      );
    });
  });
});
