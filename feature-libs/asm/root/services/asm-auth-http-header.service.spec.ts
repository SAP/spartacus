import { HttpHeaders, HttpRequest } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import {
  AuthRedirectService,
  AuthService,
  AuthStorageService,
  AuthToken,
  GlobalMessageService,
  GlobalMessageType,
  OAuthLibWrapperService,
  OccEndpointsService,
  RoutingService,
} from '@spartacus/core';
import { of } from 'rxjs';
import { AsmAuthHttpHeaderService } from './asm-auth-http-header.service';
import { CsAgentAuthService } from './csagent-auth.service';

class MockCsAgentAuthService implements Partial<CsAgentAuthService> {
  isCustomerSupportAgentLoggedIn() {
    return of(false);
  }
  logoutCustomerSupportAgent() {
    return Promise.resolve();
  }
}

class MockAuthService implements Partial<AuthService> {
  setLogoutProgress(_progress: boolean): void {}
  coreLogout() {
    return Promise.resolve();
  }
}

class MockAuthStorageService implements Partial<AuthStorageService> {
  getToken() {
    return of({ access_token: 'acc_token' } as AuthToken);
  }
}

class MockOAuthLibWrapperService implements Partial<OAuthLibWrapperService> {}

class MockRoutingService implements Partial<RoutingService> {
  go = () => Promise.resolve(true);
}

class MockGlobalMessageService implements Partial<GlobalMessageService> {
  add() {}
}

class MockOccEndpointsService implements Partial<OccEndpointsService> {
  getBaseUrl() {
    return 'some-server/occ';
  }
}

class MockAuthRedirectService implements Partial<AuthRedirectService> {
  saveCurrentNavigationUrl = jasmine.createSpy('saveCurrentNavigationUrl');
}

describe('AsmAuthHttpHeaderService', () => {
  let service: AsmAuthHttpHeaderService;
  let authService: AuthService;
  let routingService: RoutingService;
  let csAgentAuthService: CsAgentAuthService;
  let globalMessageService: GlobalMessageService;
  let authRedirectService: AuthRedirectService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AsmAuthHttpHeaderService,
        { provide: CsAgentAuthService, useClass: MockCsAgentAuthService },
        { provide: AuthService, useClass: MockAuthService },
        {
          provide: OAuthLibWrapperService,
          useClass: MockOAuthLibWrapperService,
        },
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: GlobalMessageService, useClass: MockGlobalMessageService },
        { provide: OccEndpointsService, useClass: MockOccEndpointsService },
        { provide: AuthStorageService, useClass: MockAuthStorageService },
        { provide: AuthRedirectService, useClass: MockAuthRedirectService },
      ],
    });

    service = TestBed.inject(AsmAuthHttpHeaderService);
    authService = TestBed.inject(AuthService);
    routingService = TestBed.inject(RoutingService);
    csAgentAuthService = TestBed.inject(CsAgentAuthService);
    globalMessageService = TestBed.inject(GlobalMessageService);
    authRedirectService = TestBed.inject(AuthRedirectService);
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
    it('should work the same as in AuthHeaderService when there is normally logged user', async () => {
      spyOn(authService, 'coreLogout').and.callThrough();
      spyOn(routingService, 'go').and.callThrough();

      service.handleExpiredRefreshToken();
      await Promise.resolve();

      expect(authService.coreLogout).toHaveBeenCalled();
      expect(
        authRedirectService.saveCurrentNavigationUrl
      ).toHaveBeenCalledBefore(routingService.go);
      expect(routingService.go).toHaveBeenCalledWith({ cxRoute: 'login' });
    });

    it('should logoutCustomerSupportAgent when cs agent is logged in', () => {
      spyOn(authService, 'coreLogout').and.callThrough();
      spyOn(
        csAgentAuthService,
        'isCustomerSupportAgentLoggedIn'
      ).and.returnValue(of(true));
      spyOn(csAgentAuthService, 'logoutCustomerSupportAgent').and.callThrough();
      spyOn(globalMessageService, 'add').and.callThrough();
      spyOn(authService, 'setLogoutProgress').and.stub();

      service.handleExpiredRefreshToken();

      expect(authService.setLogoutProgress).toHaveBeenCalledWith(true);
      expect(authService.coreLogout).not.toHaveBeenCalled();
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
