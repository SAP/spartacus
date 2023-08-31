import { TestBed } from '@angular/core/testing';
import {
  ASM_ENABLED_LOCAL_STORAGE_KEY,
  CsAgentAuthService,
  AsmDeepLinkService,
  AsmEnablerService,
} from '@spartacus/asm/root';
import { AsmDialogActionType } from '@spartacus/asm/customer-360/root';
import { AuthService, WindowRef, RoutingService } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { AsmComponentService } from './asm-component.service';

class MockAuthService implements Partial<AuthService> {
  logout(): void {}
}

class MockCsAgentAuthService implements Partial<CsAgentAuthService> {
  logoutCustomerSupportAgent(): Promise<void> {
    return Promise.resolve();
  }
  isCustomerEmulated(): Observable<boolean> {
    return of(false);
  }
}

const store = {};
const MockWindowRef = {
  localStorage: {
    getItem: (key: string): string => {
      return key in store ? store[key] : null;
    },
    setItem: (key: string, value: string) => {
      store[key] = `${value}`;
    },
    removeItem: (key: string): void => {
      if (key in store) {
        delete store[key];
      }
    },
  },
  location: {
    search: 'customerId=testId',
  },
};

class MockAsmDeepLinkService implements Partial<AsmDeepLinkService> {
  isEmulateInURL(): boolean {
    return true;
  }

  getSearchParameter(key: any) {
    return key;
  }

  handleNavigation() {
    return {};
  }

  getParamsInUrl() {
    return {};
  }
}

class MockAsmEnablerService implements Partial<AsmEnablerService> {
  isEmulateInURL(): boolean {
    return true;
  }
}

class MockRoutingService implements Partial<RoutingService> {
  go = () => Promise.resolve(true);
}

describe('AsmComponentService', () => {
  let authService: AuthService;
  let csAgentAuthService: CsAgentAuthService;
  let windowRef: WindowRef;
  let asmComponentService: AsmComponentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        { provide: CsAgentAuthService, useClass: MockCsAgentAuthService },
        { provide: WindowRef, useValue: MockWindowRef },
        { provice: AsmDeepLinkService, useClass: MockAsmDeepLinkService },
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: AsmEnablerService, useClass: MockAsmEnablerService },
        { provide: RoutingService, useClass: MockRoutingService },
      ],
    });

    asmComponentService = TestBed.inject(AsmComponentService);
    authService = TestBed.inject(AuthService);
    csAgentAuthService = TestBed.inject(CsAgentAuthService);
    windowRef = TestBed.inject(WindowRef);
  });

  it('should be created', () => {
    expect(asmComponentService).toBeTruthy();
  });

  describe('logoutCustomerSupportAgentAndCustomer()', () => {
    it('should logout csagent no matter the emulation state', () => {
      spyOn(csAgentAuthService, 'logoutCustomerSupportAgent').and.stub();

      asmComponentService.logoutCustomerSupportAgentAndCustomer();

      expect(csAgentAuthService.logoutCustomerSupportAgent).toHaveBeenCalled();
    });
  });

  describe('logoutCustomer()', () => {
    it('should logout customer and redirect to home.', () => {
      spyOn(authService, 'logout').and.stub();
      asmComponentService.logoutCustomer();
      expect(authService.logout).toHaveBeenCalled();
    });
  });

  describe('isCustomerEmulationSessionInProgress()', () => {
    it('should return true when user token is from an emulation session', () => {
      spyOn(csAgentAuthService, 'isCustomerEmulated').and.returnValue(of(true));
      let result = false;
      asmComponentService
        .isCustomerEmulationSessionInProgress()
        .pipe(take(1))
        .subscribe((value) => (result = value));
      expect(result).toBe(true);
    });

    it('should return false when user token is not from an emulation session', () => {
      spyOn(csAgentAuthService, 'isCustomerEmulated').and.returnValue(
        of(false)
      );
      let result = false;
      asmComponentService
        .isCustomerEmulationSessionInProgress()
        .pipe(take(1))
        .subscribe((value) => (result = value));
      expect(result).toBe(false);
    });
  });

  describe('Unload', () => {
    it('should remove local storage key to false on unload', () => {
      windowRef.localStorage.setItem(ASM_ENABLED_LOCAL_STORAGE_KEY, 'true');
      asmComponentService.unload();
      expect(
        windowRef.localStorage.getItem(ASM_ENABLED_LOCAL_STORAGE_KEY)
      ).toBeNull();
    });
  });

  describe('getSearchParameter', () => {
    it('should get parameter from search result', () => {
      expect(asmComponentService.getSearchParameter('customerId')).toEqual(
        'testId'
      );
    });
  });

  describe('isEmulatedByDeepLink and setEmulated ', () => {
    it('should emit true when user is emulated', (done) => {
      asmComponentService.setEmulatedByDeepLink(true);

      asmComponentService
        .isEmulatedByDeepLink()
        .pipe(take(1))
        .subscribe((result) => {
          expect(result).toBe(true);
          done();
        });
    });

    it('should emit false when setEmulated called with false', (done) => {
      asmComponentService.setEmulatedByDeepLink(false);
      asmComponentService
        .isEmulatedByDeepLink()
        .pipe(take(1))
        .subscribe((result) => {
          expect(result).toBe(false);
          done();
        });
    });
  });

  describe('customer 360()', () => {
    it('should handle dialog actions', () => {
      const routingService = TestBed.inject(RoutingService);
      spyOn(routingService, 'go').and.stub();

      asmComponentService.handleAsmDialogAction({
        actionType: AsmDialogActionType.NAVIGATE,
        route: '/',
        selectedUser: {},
      });

      expect(routingService.go).toHaveBeenCalledTimes(1);
      expect(routingService.go).toHaveBeenCalledWith('/');
    });
  });
});
