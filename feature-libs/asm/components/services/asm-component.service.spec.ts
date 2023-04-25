import { TestBed } from '@angular/core/testing';
import { AsmDialogActionType } from '@spartacus/asm/customer-360/root';
import {
  ASM_ENABLED_LOCAL_STORAGE_KEY,
  CsAgentAuthService,
} from '@spartacus/asm/root';
import {
  AuthService,
  GlobalMessageEntities,
  GlobalMessageService,
  GlobalMessageType,
  RoutingService,
  Translatable,
  WindowRef,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { AsmComponentService } from './asm-component.service';

describe('AsmComponentService', () => {
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

    startCustomerEmulationSession(): void {}
  }

  const store: { [k: string]: string } = {};
  const MockWindowRef = {
    localStorage: {
      getItem: (key: string): string | null => {
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

  class MockGlobalMessageService implements Partial<GlobalMessageService> {
    get(): Observable<GlobalMessageEntities> {
      return of({});
    }
    add(_: string | Translatable, __: GlobalMessageType, ___?: number): void {}
    remove(_: GlobalMessageType, __?: number): void {}
  }

  class MockRoutingService implements Partial<RoutingService> {
    go = () => Promise.resolve(true);
  }

  let authService: AuthService;
  let csAgentAuthService: CsAgentAuthService;
  let windowRef: WindowRef;
  let asmComponentService: AsmComponentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        { provide: CsAgentAuthService, useClass: MockCsAgentAuthService },
        { provide: GlobalMessageService, useClass: MockGlobalMessageService },
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: WindowRef, useValue: MockWindowRef },
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
      const localStorage = windowRef.localStorage as Storage;
      localStorage.setItem(ASM_ENABLED_LOCAL_STORAGE_KEY, 'true');

      asmComponentService.unload();

      expect(localStorage.getItem(ASM_ENABLED_LOCAL_STORAGE_KEY)).toBeNull();
    });
  });

  describe('startCustomerEmulationSession()', () => {
    let globalMessageService: GlobalMessageService;

    beforeEach(() => {
      globalMessageService = TestBed.inject(GlobalMessageService);

      spyOn(csAgentAuthService, 'startCustomerEmulationSession').and.stub();
      spyOn(globalMessageService, 'add').and.stub();
    });

    it('should start a customer emulation session', () => {
      const result =
        asmComponentService.startCustomerEmulationSession('customer001');

      expect(result).toBe(true);

      expect(globalMessageService.add).not.toHaveBeenCalled();

      expect(
        csAgentAuthService.startCustomerEmulationSession
      ).toHaveBeenCalledTimes(1);
      expect(
        csAgentAuthService.startCustomerEmulationSession
      ).toHaveBeenCalledWith('customer001');
    });

    it('should warn there is no customer to emulate when trying to start a session', () => {
      const result =
        asmComponentService.startCustomerEmulationSession(undefined);

      expect(result).toBe(false);

      expect(
        csAgentAuthService.startCustomerEmulationSession
      ).not.toHaveBeenCalled();

      expect(globalMessageService.add).toHaveBeenCalledTimes(1);
      expect(globalMessageService.add).toHaveBeenCalledWith(
        { key: 'asm.error.noCustomerId' },
        GlobalMessageType.MSG_TYPE_ERROR
      );
    });
  });

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
