import { TestBed } from '@angular/core/testing';
import { Router, UrlTree } from '@angular/router';
import {
  AuthService,
  CSRFResponse,
  CsrfStateService,
  GlobalMessageService,
  GlobalMessageType,
  SemanticPathService,
  WindowRef,
} from '@spartacus/core';
import { lastValueFrom, of, throwError } from 'rxjs';
import { CustomLoginGuard } from './custom-login.guard';

const mockCsrfTokenResponse: CSRFResponse = {
  token: 'csrf-token',
  headerName: 'csrf',
  parameterName: '_csrf',
};
class MockAuthService {
  getCsrfToken = jasmine.createSpy().and.returnValue(of(mockCsrfTokenResponse));
}
class MockRouter {
  parseUrl = jasmine
    .createSpy()
    .and.callFake((url: string) => ({ root: url }) as unknown as UrlTree);
}
class MockSemanticPathService {
  get = jasmine.createSpy().and.callFake((route: string) => `/${route}`);
}
class MockWindowRef {
  localStorage = mockStorage();
}
class MockGlobalMessageService {
  add = jasmine.createSpy();
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

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: Router,
          useClass: MockRouter,
        },
        {
          provide: AuthService,
          useClass: MockAuthService,
        },
        {
          provide: SemanticPathService,
          useClass: MockSemanticPathService,
        },
        {
          provide: MockGlobalMessageService,
          useClass: MockGlobalMessageService,
        },
        CsrfStateService,
        { provide: WindowRef, useClass: MockWindowRef },
        { provide: GlobalMessageService, useClass: MockGlobalMessageService },
      ],
    });
    guard = TestBed.inject(CustomLoginGuard);
    authService = TestBed.inject(AuthService);
    globalMessageService = TestBed.inject(GlobalMessageService);
    csrfStateService = TestBed.inject(CsrfStateService);
    spyOn(csrfStateService, 'set').and.callThrough();
    storage = TestBed.inject(WindowRef).localStorage as Storage;
    spyOn(storage, 'setItem').and.callThrough();

    jasmine.clock().install();
    jasmine.clock().mockDate(new Date(0));
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
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
        jasmine.any(String),
        expected
      );
    });
  });

  describe('when there is a missing session', () => {
    beforeEach(() => {
      (authService.getCsrfToken as jasmine.Spy).and.returnValue(
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
        jasmine.any(String),
        expected
      );
    });

    it('should increment count on subsequent failure calls', async () => {
      const expected = JSON.stringify({ t: 0, c: 2 });
      await lastValueFrom(guard.canActivate());
      await lastValueFrom(guard.canActivate());

      expect(storage.setItem).toHaveBeenCalledWith(
        jasmine.any(String),
        expected
      );
    });

    it('should resolve to true and reset state when session is valid on subsequent call', async () => {
      const expected = JSON.stringify({ t: 0, c: 1 });
      await lastValueFrom(guard.canActivate());

      (authService.getCsrfToken as jasmine.Spy).and.returnValue(
        of(mockCsrfTokenResponse)
      );
      const actual = await lastValueFrom(guard.canActivate());

      expect(actual).toBe(true);
      expect(storage.setItem).toHaveBeenCalledWith(
        jasmine.any(String),
        expected
      );
    });

    it('should redirect to home when reaching retry limit', async () => {
      const expected = { root: '/home' } as unknown as UrlTree;
      let actual;
      for (let i = 0; i < 3; i++) {
        actual = await lastValueFrom(guard.canActivate());
      }

      expect(actual).toEqual(expected);
      expect(globalMessageService.add).toHaveBeenCalledWith(
        { key: 'authMessages.unrecoverableError' },
        GlobalMessageType.MSG_TYPE_ERROR
      );
      expect(storage.setItem).toHaveBeenCalledWith(
        jasmine.any(String),
        JSON.stringify({ t: 0, c: 0 })
      );
    });
  });

  describe('when there is a CORS error', () => {
    beforeEach(() => {
      (authService.getCsrfToken as jasmine.Spy).and.returnValue(
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
});
