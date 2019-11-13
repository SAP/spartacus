import { TestBed } from '@angular/core/testing';
import { AuthService, RoutingService, UserToken } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { AsmComponentService } from './asm-component.service';

class MockAuthService {
  logoutCustomerSupportAgent(): void {}
  logout(): void {}
  getUserToken(): Observable<UserToken> {
    return of({} as UserToken);
  }
  isCustomerEmulationToken(): boolean {
    return undefined;
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
      spyOn(authService, 'isCustomerEmulationToken').and.returnValue(true);
      spyOn(asmComponentService, 'logoutCustomer').and.stub();

      asmComponentService.logoutCustomerSupportAgentAndCustomer();

      expect(authService.logoutCustomerSupportAgent).toHaveBeenCalled();
      expect(asmComponentService.logoutCustomer).toHaveBeenCalled();
    });

    it('should logout asagent and not the customer when a regular customer session is in progress', () => {
      spyOn(authService, 'logout').and.stub();
      spyOn(authService, 'logoutCustomerSupportAgent').and.stub();
      spyOn(authService, 'getUserToken').and.returnValue(of(mockToken));
      spyOn(authService, 'isCustomerEmulationToken').and.returnValue(false);
      spyOn(asmComponentService, 'logoutCustomer').and.stub();

      asmComponentService.logoutCustomerSupportAgentAndCustomer();

      expect(authService.logoutCustomerSupportAgent).toHaveBeenCalled();
      expect(asmComponentService.logoutCustomer).not.toHaveBeenCalled();
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

  describe('isCustomerEmulationSessionInProgress()', () => {
    it('should return true when user token is from an emulation session', () => {
      spyOn(authService, 'getUserToken').and.returnValue(of(mockToken));
      spyOn(authService, 'isCustomerEmulationToken').and.returnValue(true);
      let result = false;
      asmComponentService
        .isCustomerEmulationSessionInProgress()
        .pipe(take(1))
        .subscribe(value => (result = value));
      expect(result).toBe(true);
    });

    it('should return false when user token is not from an emulation session', () => {
      spyOn(authService, 'getUserToken').and.returnValue(of(mockToken));
      spyOn(authService, 'isCustomerEmulationToken').and.returnValue(false);
      let result = false;
      asmComponentService
        .isCustomerEmulationSessionInProgress()
        .pipe(take(1))
        .subscribe(value => (result = value));
      expect(result).toBe(false);
    });
  });
});
