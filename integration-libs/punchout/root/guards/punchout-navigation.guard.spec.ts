import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import {
  AuthService,
  CmsActivatedRouteSnapshot,
  Config,
  GlobalMessageService,
  GlobalMessageType,
  RoutingConfigService,
  RoutingService,
} from '@spartacus/core';
import { of } from 'rxjs';
import { vi } from 'vitest';
import { firstValueFrom } from 'rxjs';
import {
  defaultPunchoutNavigationGuardConfig,
  PunchoutNavigationGuardConfig,
} from '../config';
import { PunchoutFacade } from '../facade';
import { PunchOutOperation, PunchoutSession, PunchoutState } from '../model';
import { PunchoutStoreService } from '../services';
import { PunchoutNavigationGuard } from './punchout-navigation.guard';

describe('PunchoutNavigationGuard', () => {
  let guard: PunchoutNavigationGuard;
  let authService: any;
  let punchoutStoreService: any;
  let punchoutFacade: any;
  let routingService: any;
  let routingConfigService: any;
  let globalMessageService: any;
  let punchoutNavigationGuardConfig: any;

  const mockRoute = {
    url: [{ path: 'cart' }],
    data: { cxRoute: 'cart' },
  } as unknown as CmsActivatedRouteSnapshot;

  beforeEach(() => {
    const config = JSON.parse(
      JSON.stringify(defaultPunchoutNavigationGuardConfig)
    );

    TestBed.configureTestingModule({
      providers: [
        PunchoutNavigationGuard,
        {
          provide: AuthService,
          useValue: { isUserLoggedIn: vi.fn() },
        },
        {
          provide: PunchoutStoreService,
          useValue: { getPunchoutState: vi.fn() },
        },
        {
          provide: PunchoutFacade,
          useValue: { requestPunchoutSession: vi.fn() },
        },
        {
          provide: RoutingService,
          useValue: { go: vi.fn() },
        },
        {
          provide: GlobalMessageService,
          useValue: { add: vi.fn() },
        },
        {
          provide: Router,
          useValue: {},
        },
        {
          provide: PunchoutNavigationGuardConfig,
          useValue: config,
        },
        {
          provide: Config,
          useValue: config,
        },
        {
          provide: RoutingConfigService,
          useValue: { getRouteName: vi.fn() },
        },
      ],
    });

    guard = TestBed.inject(PunchoutNavigationGuard);
    authService = TestBed.inject(AuthService);
    punchoutStoreService = TestBed.inject(PunchoutStoreService);
    punchoutFacade = TestBed.inject(PunchoutFacade);
    routingService = TestBed.inject(RoutingService);
    routingConfigService = TestBed.inject(RoutingConfigService);
    globalMessageService = TestBed.inject(GlobalMessageService);
    punchoutNavigationGuardConfig = TestBed.inject(
      PunchoutNavigationGuardConfig
    );
  });

  it('should allow access for allowed cxRoute in EDIT mode', async () => {
    authService.isUserLoggedIn.mockReturnValue(of(true));

    const state: PunchoutState = {
      punchoutSessionId: 'session123',
      punchoutSession: {
        punchOutOperation: PunchOutOperation.EDIT,
      } as PunchoutSession,
    };
    punchoutStoreService.getPunchoutState.mockReturnValue(of(state));

    const result = await firstValueFrom(
      guard.canActivate(mockRoute, {} as any)
    );
    expect(result).toBeTruthy();
    expect(globalMessageService.add).not.toHaveBeenCalled();
    expect(routingService.go).not.toHaveBeenCalled();
  });

  it('should allow access for an allowed routeName', async () => {
    authService.isUserLoggedIn.mockReturnValue(of(true));

    const state: PunchoutState = {
      punchoutSessionId: 'session123',
      punchoutSession: {
        punchOutOperation: PunchOutOperation.EDIT,
      } as PunchoutSession,
    };
    punchoutStoreService.getPunchoutState.mockReturnValue(of(state));
    routingConfigService.getRouteName.mockReturnValue('punchoutSession');

    const result = await firstValueFrom(
      guard.canActivate(
        {
          url: [],
          data: { cxRoute: undefined },
        } as unknown as CmsActivatedRouteSnapshot,
        {} as any
      )
    );
    expect(result).toBeTruthy();
    expect(globalMessageService.add).not.toHaveBeenCalled();
    expect(routingService.go).not.toHaveBeenCalled();
  });

  it('should show warning message with logout cxRoute', async () => {
    authService.isUserLoggedIn.mockReturnValue(of(true));

    const state: PunchoutState = {
      punchoutSessionId: 'session123',
      punchoutSession: undefined,
    };
    punchoutStoreService.getPunchoutState.mockReturnValue(of(state));

    const result = await firstValueFrom(
      guard.canActivate(
        {
          url: ['product', '123'],
          data: { cxRoute: 'logout' },
        } as unknown as CmsActivatedRouteSnapshot,
        {} as any
      )
    );
    expect(result).toBeTruthy();
    expect(globalMessageService.add).toHaveBeenCalled();
    expect(routingService.go).not.toHaveBeenCalled();
  });

  it('should block access for disallowed route in INSPECT mode', async () => {
    authService.isUserLoggedIn.mockReturnValue(of(true));

    const state: PunchoutState = {
      punchoutSessionId: 'session123',
      punchoutSession: {
        punchOutOperation: PunchOutOperation.INSPECT,
      } as PunchoutSession,
    };
    punchoutStoreService.getPunchoutState.mockReturnValue(of(state));

    const result = await firstValueFrom(
      guard.canActivate(mockRoute, {} as any)
    );
    expect(result).toBeFalsy();
    expect(globalMessageService.add).toHaveBeenCalledWith(
      { key: 'punchout.noSufficientPermissions' },
      GlobalMessageType.MSG_TYPE_WARNING
    );
    expect(routingService.go).toHaveBeenCalledWith({
      cxRoute: 'punchoutInspect',
    });
  });

  it('should allow access if no punchout session exists', async () => {
    authService.isUserLoggedIn.mockReturnValue(of(false));

    const result = await firstValueFrom(
      guard.canActivate(mockRoute, {} as any)
    );
    expect(result).toBeTruthy();
  });

  it('should handle punchout session fallback from facade', async () => {
    authService.isUserLoggedIn.mockReturnValue(of(true));

    const state: PunchoutState = {
      punchoutSessionId: 'session123',
      punchoutSession: undefined,
    };
    punchoutStoreService.getPunchoutState.mockReturnValue(of(state));
    punchoutFacade.requestPunchoutSession.mockReturnValue(
      of({ punchOutOperation: PunchOutOperation.EDIT } as PunchoutSession)
    );

    const result = await firstValueFrom(
      guard.canActivate(mockRoute, {} as any)
    );
    expect(result).toBeTruthy();
  });

  it('should handle errors and allow access by default', async () => {
    authService.isUserLoggedIn.mockReturnValue(of(true));
    punchoutStoreService.getPunchoutState.mockReturnValue(
      of({} as PunchoutState)
    );
    punchoutFacade.requestPunchoutSession.mockImplementation(() => {
      throw new Error('Test error');
    });

    const result = await firstValueFrom(
      guard.canActivate(mockRoute, {} as any)
    );
    expect(result).toBeTruthy();
  });

  describe('isAllowedCxRoute', () => {
    it('should return true if cxRoute is in allowedCxRoutesForEdit', () => {
      const cxRoute = 'brand';
      const result = (guard as any).isAllowedCxRoute(
        cxRoute,
        PunchOutOperation.EDIT
      );
      expect(result).toBe(true);
    });

    it('should return false if cxRoute is not in allowedCxRoutesForEdit', () => {
      const cxRoute = 'notAllowedRoute';
      const result = (guard as any).isAllowedCxRoute(
        cxRoute,
        PunchOutOperation.EDIT
      );
      expect(result).toBe(false);
    });

    it('should return false if cxRoute is missing', () => {
      const cxRoute = undefined;
      const result = (guard as any).isAllowedCxRoute(
        cxRoute,
        PunchOutOperation.EDIT
      );
      expect(result).toBe(false);
    });

    it('should return false if allowedCxRoutes is undefined for operation', () => {
      const cxRoute = 'cart';
      const result = (guard as any).isAllowedCxRoute(
        cxRoute,
        'UNKNOWN_OP' as any
      );
      expect(result).toBe(false);
    });

    it('should return true if isAllowedUrls contains home url', () => {
      const result = (guard as any).isAllowedUrls(
        { ...mockRoute, url: [] },
        PunchOutOperation.EDIT,
        '/'
      );
      expect(result).toBe(true);
    });

    it('should return true if allowed url is contained in relative url', () => {
      punchoutNavigationGuardConfig.punchoutNavigation = {
        [PunchOutOperation.INSPECT]: {
          allowedCxRoutes: ['punchoutInspect'],
          redirectPage: { cxRoute: 'punchoutInspect' },
        },
        [PunchOutOperation.EDIT]: {
          allowedUrls: ['product'],
          redirectPage: { cxRoute: 'home' },
        },
        [PunchOutOperation.CREATE]: {
          allowedUrls: ['/'],
          redirectPage: { cxRoute: 'home' },
        },
      };
      const result = (guard as any).isAllowedUrls(
        {
          ...mockRoute,
          url: [
            { path: 'catalog123' },
            { path: 'discount-products' },
            { path: 'abc' },
          ],
        },
        PunchOutOperation.EDIT,
        'catalog123/discount-products/abc'
      );
      expect(result).toBe(true);
    });
  });
});
