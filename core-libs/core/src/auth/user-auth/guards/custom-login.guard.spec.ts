import { vi, Mock } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { Router, UrlTree } from '@angular/router';
import {
  AuthConfigService,
  AuthService,
  CSRFResponse,
  CsrfStateService,
  FederatedLoginService,
  GlobalMessageService,
  GlobalMessageType,
  SemanticPathService,
  WindowRef,
} from '@spartacus/core';
import { lastValueFrom, of, throwError } from 'rxjs';
import { provideMockFeatureToggles } from '../../../features-config/feature-toggles/testing/mock-feature-toggles';
import { CustomLoginGuard, totalRetries } from './custom-login.guard';

const mockCsrfTokenResponse: CSRFResponse = {
  token: 'csrf-token',
  headerName: 'csrf',
  parameterName: '_csrf',
};
class MockAuthService {
  getCsrfToken = vi.fn().mockReturnValue(of(mockCsrfTokenResponse));
  refreshCsrfToken = vi.fn().mockReturnValue(of(mockCsrfTokenResponse));
}
class MockRouter {
  parseUrl = vi
    .fn()
    .mockImplementation((url: string) => ({ root: url }) as unknown as UrlTree);
}
class MockSemanticPathService {
  get = vi.fn().mockImplementation((route: string) => `/${route}`);
}
class MockWindowRef {
  localStorage = mockStorage();
  location: Partial<Location> = { href: '', search: '' };
  isBrowser(): boolean {
    return true;
  }
}
class MockGlobalMessageService {
  add = vi.fn();
}
class MockAuthConfigService {
  customLoginEnabled = vi.fn().mockReturnValue(true);
}

class MockFederatedLoginService implements Partial<FederatedLoginService> {
  isLoginDomain = false;
  origin: string | undefined = undefined;
}

function mockStorage() {
  let store: Record<string, any> = {};
  return {
    getItem: (key: string) => (store[key] ? JSON.stringify(store[key]) : null),
    setItem: (key: string, value: string) => {
      store[key] = JSON.parse(value);
    },
    clear: () => {
      store = {};
    },
  };
}

describe('CustomLoginGuard', () => {
  let guard: CustomLoginGuard;
  let authService: AuthService;
  let globalMessageService: GlobalMessageService;
  let csrfStateService: CsrfStateService;
  let storage: Storage;
  let authConfigService: AuthConfigService;
  let mockWindowRef: MockWindowRef;
  let federatedLoginService: MockFederatedLoginService;

  function createTestBed(toggles: Record<string, boolean> = {}) {
    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useClass: MockRouter },
        { provide: AuthService, useClass: MockAuthService },
        { provide: SemanticPathService, useClass: MockSemanticPathService },
        CsrfStateService,
        { provide: WindowRef, useClass: MockWindowRef },
        { provide: GlobalMessageService, useClass: MockGlobalMessageService },
        { provide: AuthConfigService, useClass: MockAuthConfigService },
        { provide: FederatedLoginService, useClass: MockFederatedLoginService },
        provideMockFeatureToggles({
          concurrentLoginPagesSupport: false,
          ...toggles,
        }),
      ],
    });
    guard = TestBed.inject(CustomLoginGuard);
    authService = TestBed.inject(AuthService);
    globalMessageService = TestBed.inject(GlobalMessageService);
    csrfStateService = TestBed.inject(CsrfStateService);
    vi.spyOn(csrfStateService, 'set');
    vi.spyOn(csrfStateService, 'setAuthReqId');
    storage = TestBed.inject(WindowRef).localStorage as Storage;
    vi.spyOn(storage, 'setItem');
    mockWindowRef = TestBed.inject(WindowRef) as unknown as MockWindowRef;
    authConfigService = TestBed.inject(AuthConfigService);
    federatedLoginService = TestBed.inject(
      FederatedLoginService
    ) as unknown as MockFederatedLoginService;
  }

  beforeEach(() => {
    createTestBed();
    vi.useFakeTimers();
    vi.setSystemTime(new Date(0));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  describe('when custom login is disabled', () => {
    beforeEach(() => {
      (authConfigService.customLoginEnabled as Mock).mockReturnValue(false);
    });

    it('should resolve to true when custom login is disabled', async () => {
      const actual = await lastValueFrom(guard.canActivate());
      expect(actual).toBe(true);
    });
  });

  describe('when SSR mode is running', () => {
    beforeEach(() => {
      vi.spyOn(mockWindowRef, 'isBrowser').mockReturnValue(false);
    });

    it('should resolve to true when SSR mode is running', async () => {
      const actual = await lastValueFrom(guard.canActivate());
      expect(actual).toBe(true);
    });
  });

  describe('when there is a valid session', () => {
    it('should resolve to true', async () => {
      const actual = await lastValueFrom(guard.canActivate());

      expect(actual).toBe(true);
    });

    it('should set the CSRF token', async () => {
      await lastValueFrom(guard.canActivate());

      expect(csrfStateService.set).toHaveBeenCalledWith(mockCsrfTokenResponse);
    });

    it('should reset counter to 0', async () => {
      const expected = JSON.stringify({ t: 0, c: 0 });
      await lastValueFrom(guard.canActivate());

      expect(storage.setItem).toHaveBeenCalledWith(
        expect.any(String),
        expected
      );
    });
  });

  describe('when there is a missing session', () => {
    beforeEach(() => {
      (authService.getCsrfToken as Mock).mockReturnValue(
        throwError(() => {
          return { status: 403 };
        })
      );
    });

    it('should issue redirect to "cxRoute:login"', async () => {
      const expected = { root: '/login' } as unknown as UrlTree;
      const actual = await lastValueFrom(guard.canActivate());

      expect(actual).toEqual(expected);
    });

    it('should set count into storage', async () => {
      const expected = JSON.stringify({ t: 0, c: 1 });
      await lastValueFrom(guard.canActivate());

      expect(storage.setItem).toHaveBeenCalledWith(
        expect.any(String),
        expected
      );
    });

    if (totalRetries > 1) {
      it('should increment count on subsequent failure calls', async () => {
        const expected = JSON.stringify({ t: 0, c: 2 });
        await lastValueFrom(guard.canActivate());
        await lastValueFrom(guard.canActivate());

        expect(storage.setItem).toHaveBeenCalledWith(
          expect.any(String),
          expected
        );
      });
    }

    it('should resolve to true and reset state when session is valid on subsequent call', async () => {
      const expected = JSON.stringify({ t: 0, c: 1 });
      await lastValueFrom(guard.canActivate());

      (authService.getCsrfToken as Mock).mockReturnValue(
        of(mockCsrfTokenResponse)
      );
      const actual = await lastValueFrom(guard.canActivate());

      expect(actual).toBe(true);
      expect(storage.setItem).toHaveBeenCalledWith(
        expect.any(String),
        expected
      );
    });

    it('should redirect to home when reaching retry limit', async () => {
      const expected = { root: '/home' } as unknown as UrlTree;
      let actual;
      for (let i = 0; i <= totalRetries; i++) {
        actual = await lastValueFrom(guard.canActivate());
      }

      expect(actual).toEqual(expected);
      expect(globalMessageService.add).toHaveBeenCalledWith(
        { key: 'authMessages.unrecoverableError' },
        GlobalMessageType.MSG_TYPE_ERROR
      );
      expect(storage.setItem).toHaveBeenCalledWith(
        expect.any(String),
        JSON.stringify({ t: 0, c: 0 })
      );
    });

    describe('when on a federated login', () => {
      const mockOriginatingDomain = 'https://storefront.de';

      beforeEach(() => {
        federatedLoginService.isLoginDomain = true;
        federatedLoginService.origin = mockOriginatingDomain;
      });

      it('should redirect to the origin login URL', async () => {
        await lastValueFrom(guard.canActivate());

        expect(mockWindowRef.location.href).toEqual(
          `${mockOriginatingDomain}/login`
        );
      });

      it('should prevent activation', async () => {
        const expected = false;
        const actual = await lastValueFrom(guard.canActivate());

        expect(actual).toEqual(expected);
      });

      it('should proceed to login route if origin is undefined', async () => {
        federatedLoginService.origin = undefined;
        const expected = { root: '/login' } as unknown as UrlTree;
        const actual = await lastValueFrom(guard.canActivate());

        expect(actual).toEqual(expected);
      });
    });
  });

  describe('when there is a CORS error', () => {
    beforeEach(() => {
      (authService.getCsrfToken as Mock).mockReturnValue(
        throwError(() => {
          return { status: 0 };
        })
      );
    });

    it('should issue redirect to "cxRoute:login"', async () => {
      const expected = { root: '/login' } as unknown as UrlTree;
      const actual = await lastValueFrom(guard.canActivate());

      expect(actual).toEqual(expected);
    });
  });

  describe('when concurrentLoginPagesSupport is enabled', () => {
    beforeEach(() => {
      TestBed.resetTestingModule();
      createTestBed({ concurrentLoginPagesSupport: true });
      vi.useFakeTimers();
      vi.setSystemTime(new Date(0));
    });

    describe('when auth_req_id is present in the URL', () => {
      beforeEach(() => {
        mockWindowRef.location = { href: '', search: '?auth_req_id=req-abc' };
      });

      it('should call refreshCsrfToken (not getCsrfToken) with the auth_req_id', async () => {
        await lastValueFrom(guard.canActivate());

        expect(authService.refreshCsrfToken).toHaveBeenCalledWith('req-abc');
        expect(authService.getCsrfToken).not.toHaveBeenCalled();
      });

      it('should store auth_req_id in CsrfStateService on success', async () => {
        await lastValueFrom(guard.canActivate());

        expect(csrfStateService.setAuthReqId).toHaveBeenCalledWith('req-abc');
      });

      describe('when CSRF fetch fails (retry path)', () => {
        beforeEach(() => {
          (authService.refreshCsrfToken as Mock).mockReturnValue(
            throwError(() => ({ status: 403 }))
          );
        });

        it('should include auth_req_id in the retry redirect URL', async () => {
          const actual = await lastValueFrom(guard.canActivate());

          expect(actual).toEqual({ root: '/login?auth_req_id=req-abc' });
        });

        describe('when on a federated login domain', () => {
          beforeEach(() => {
            federatedLoginService.isLoginDomain = true;
            federatedLoginService.origin = 'https://storefront.de';
          });

          it('should include auth_req_id in the federated redirect URL', async () => {
            await lastValueFrom(guard.canActivate());

            expect(mockWindowRef.location.href).toContain(
              'auth_req_id=req-abc'
            );
          });
        });

        it('should redirect to home (no auth_req_id) when retry limit is exhausted', async () => {
          let actual;
          for (let i = 0; i <= totalRetries; i++) {
            actual = await lastValueFrom(guard.canActivate());
          }

          expect(actual).toEqual({ root: '/home' });
        });
      });
    });

    describe('when auth_req_id is absent from the URL', () => {
      beforeEach(() => {
        mockWindowRef.location = { href: '', search: '' };
      });

      it('should call refreshCsrfToken with undefined', async () => {
        await lastValueFrom(guard.canActivate());

        expect(authService.refreshCsrfToken).toHaveBeenCalledWith(undefined);
      });

      it('should store undefined in CsrfStateService', async () => {
        await lastValueFrom(guard.canActivate());

        expect(csrfStateService.setAuthReqId).toHaveBeenCalledWith(undefined);
      });

      it('should NOT call getCsrfToken', async () => {
        await lastValueFrom(guard.canActivate());

        expect(authService.getCsrfToken).not.toHaveBeenCalled();
      });
    });
  });

  describe('when concurrentLoginPagesSupport is disabled', () => {
    it('should call getCsrfToken (not refreshCsrfToken) and not call setAuthReqId', async () => {
      await lastValueFrom(guard.canActivate());

      expect(authService.getCsrfToken).toHaveBeenCalled();
      expect(authService.refreshCsrfToken).not.toHaveBeenCalled();
      expect(csrfStateService.setAuthReqId).not.toHaveBeenCalled();
    });
  });
});
