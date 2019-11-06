import { TestBed } from '@angular/core/testing';
import { AuthService, RoutingService, UserToken } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { AsmComponentService } from './asm-component.service';

class MockAuthService {
  logoutCustomerSupportAgent(): void {}
  logout(): void {}
  getUserToken(): Observable<UserToken> {
    return of({} as UserToken);
  }
}

const mockToken = {
  access_token: 'asdfasf',
} as UserToken;

class MockRoutingService {
  go() {}
}

describe('AsmComponentService', () => {
  let authService: AuthService;
  let routingService: RoutingService;
  let asmComponentService: AsmComponentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        { provide: RoutingService, useClass: MockRoutingService },
      ],
    });

    asmComponentService = TestBed.get(AsmComponentService);
    authService = TestBed.get(AuthService);
    routingService = TestBed.get(RoutingService);
  });

  it('should be created', () => {
    expect(asmComponentService).toBeTruthy();
  });

  describe('logoutCustomerSupportAgentAndCustomer()', () => {
    it('should logout asagent and not the customer when no customer session is in progress.', () => {
      spyOn(authService, 'logout').and.stub();
      spyOn(authService, 'logoutCustomerSupportAgent').and.stub();
      spyOn(authService, 'getUserToken').and.returnValue(of({} as UserToken));
      spyOn(asmComponentService, 'logoutCustomer').and.stub();

      asmComponentService.logoutCustomerSupportAgentAndCustomer();

      expect(authService.logoutCustomerSupportAgent).toHaveBeenCalled();
      expect(asmComponentService.logoutCustomer).not.toHaveBeenCalled();
    });

    it('should logout both asagent and the customer when customer session is in progress.', () => {
      spyOn(authService, 'logout').and.stub();
      spyOn(authService, 'logoutCustomerSupportAgent').and.stub();
      spyOn(authService, 'getUserToken').and.returnValue(of(mockToken));
      spyOn(asmComponentService, 'logoutCustomer').and.stub();

      asmComponentService.logoutCustomerSupportAgentAndCustomer();

      expect(authService.logoutCustomerSupportAgent).toHaveBeenCalled();
      expect(asmComponentService.logoutCustomer).toHaveBeenCalled();
    });
  });

  describe('logoutCustomer()', () => {
    it('should logout customer and redirect to home.', () => {
      spyOn(authService, 'logout').and.stub();
      spyOn(routingService, 'go').and.stub();
      asmComponentService.logoutCustomer();
      expect(authService.logout).toHaveBeenCalled();
      expect(routingService.go).toHaveBeenCalledWith({ cxRoute: 'home' });
    });
  });
});
