import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import {
  AuthService,
  CmsActivatedRouteSnapshot,
  GlobalMessageService,
  GlobalMessageType,
  RoutingConfigService,
  RoutingService,
} from '@spartacus/core';
import { firstValueFrom, of } from 'rxjs';
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
  let authService: { isUserLoggedIn: ReturnType<typeof vi.fn> };
  let punchoutStoreService: { getPunchoutState: ReturnType<typeof vi.fn> };
  let punchoutFacade: { requestPunchoutSession: ReturnType<typeof vi.fn> };
  let routingService: { go: ReturnType<typeof vi.fn> };
  let routingConfigService: { getRouteName: ReturnType<typeof vi.fn> };
  let globalMessageService: { add: ReturnType<typeof vi.fn> };
  let punchoutNavigationGuardConfig: PunchoutNavigationGuardConfig;

  const mockRoute = {
    url: [{ path: 'cart' }],
    data: { cxRoute: 'cart' },
  } as unknown as CmsActivatedRouteSnapshot;

  beforeEach(() => {
    authService = { isUserLoggedIn: vi.fn() };
    punchoutStoreService = { getPunchoutState: vi.fn() };
    punchoutFacade = { requestPunchoutSession: vi.fn() };
    routingService = { go: vi.fn() };
    globalMessageService = { add: vi.fn() };
    routingConfigService = { getRouteName: vi.fn() };

    TestBed.configureTestingModule({
      providers: [
        PunchoutNavigationGuard,
        { provide: AuthService, useValue: authService },
        { provide: PunchoutStoreService, useValue: punchoutStoreService },
        { provide: PunchoutFacade, useValue: punchoutFacade },
        { provide: RoutingService, useValue: routingService },
        { provide: GlobalMessageService, useValue: globalMessageService },
        { provide: Router, useValue: {} },
        {
          provide: PunchoutNavigationGuardConfig,
          useValue: defaultPunchoutNavigationGuardConfig,
        },
        {
          provide: RoutingConfigService,
          useValue: routingConfigService,
        },
      ],
    });

    guard = TestBed.inject(PunchoutNavigationGuard);
    authService = TestBed.inject(AuthService) as any;
    punchoutStoreService = TestBed.inject(PunchoutStoreService) as any;
    punchoutFacade = TestBed.inject(PunchoutFacade) as any;
    routingService = TestBed.inject(RoutingService) as any;
    routingConfigService = TestBed.inject(RoutingConfigService) as any;
    globalMessageService = TestBed.inject(GlobalMessageService) as any;
    punchoutNavigationGuardConfig = TestBed.inject(PunchoutNavigationGuardConfig);
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

    const result = await firstValueFrom(guard.canActivate(mockRoute, {} as any));
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

    const result = await firstValueFrom(guard.canActivate(mockRoute, {} as any));
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

    const result = await firstValueFrom(guard.canActivate(mockRoute, {} as any));
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

    const result = await firstValueFrom(guard.canActivate(mockRoute, {} as any));
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

    const result = await firstValueFrom(guard.canActivate(mockRoute, {} as any));
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
