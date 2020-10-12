import { TestBed } from '@angular/core/testing';
import {
  AsmAuthService,
  AuthService,
  RoutingService,
  WindowRef,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { ASM_ENABLED_LOCAL_STORAGE_KEY } from '../asm-constants';
import { AsmComponentService } from './asm-component.service';

class MockAuthService {
  logout(): void {}
}

class MockAsmAuthService {
  logoutCustomerSupportAgent(): void {}
  isCustomerEmulated(): Observable<boolean> {
    return of(false);
  }
}

class MockRoutingService {
  go() {}
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
};

describe('AsmComponentService', () => {
  let authService: AuthService;
  let asmAuthService: AsmAuthService;
  let routingService: RoutingService;
  let windowRef: WindowRef;
  let asmComponentService: AsmComponentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        { provide: AsmAuthService, useClass: MockAsmAuthService },
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: WindowRef, useValue: MockWindowRef },
      ],
    });

    asmComponentService = TestBed.inject(AsmComponentService);
    authService = TestBed.inject(AuthService);
    asmAuthService = TestBed.inject(AsmAuthService);
    routingService = TestBed.inject(RoutingService);
    windowRef = TestBed.inject(WindowRef);
  });

  it('should be created', () => {
    expect(asmComponentService).toBeTruthy();
  });

  describe('logoutCustomerSupportAgentAndCustomer()', () => {
    it('should logout csagent no matter the emulation state', () => {
      spyOn(asmAuthService, 'logoutCustomerSupportAgent').and.stub();

      asmComponentService.logoutCustomerSupportAgentAndCustomer();

      expect(asmAuthService.logoutCustomerSupportAgent).toHaveBeenCalled();
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
      spyOn(asmAuthService, 'isCustomerEmulated').and.returnValue(of(true));
      let result = false;
      asmComponentService
        .isCustomerEmulationSessionInProgress()
        .pipe(take(1))
        .subscribe((value) => (result = value));
      expect(result).toBe(true);
    });

    it('should return false when user token is not from an emulation session', () => {
      spyOn(asmAuthService, 'isCustomerEmulated').and.returnValue(of(false));
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
});
