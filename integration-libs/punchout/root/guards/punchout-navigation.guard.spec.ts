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
import { of } from 'rxjs';
import { PunchoutNavigationGuard } from './punchout-navigation.guard';
import { PunchoutFacade } from '../facade';
import { PunchOutOperation, PunchoutSession, PunchoutState } from '../model';
import { PunchoutStoreService } from '../services';
import {
  defaultPunchoutNavigationGuardConfig,
  PunchoutNavigationGuardConfig,
} from '../config';

describe('PunchoutNavigationGuard', () => {
  let guard: PunchoutNavigationGuard;
  let authService: jasmine.SpyObj<AuthService>;
  let punchoutStoreService: jasmine.SpyObj<PunchoutStoreService>;
  let punchoutFacade: jasmine.SpyObj<PunchoutFacade>;
  let routingService: jasmine.SpyObj<RoutingService>;
  let globalMessageService: jasmine.SpyObj<GlobalMessageService>;

  const mockRoute = {
    url: [{ path: 'cart' }],
    data: { cxRoute: 'cart' },
  } as unknown as CmsActivatedRouteSnapshot;

  class MockRoutingConfigService implements Partial<RoutingConfigService> {
    getRouteName = () => '';
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PunchoutNavigationGuard,
        {
          provide: AuthService,
          useValue: jasmine.createSpyObj('AuthService', ['isUserLoggedIn']),
        },
        {
          provide: PunchoutStoreService,
          useValue: jasmine.createSpyObj('PunchoutStoreService', [
            'getPunchoutState',
          ]),
        },
        {
          provide: PunchoutFacade,
          useValue: jasmine.createSpyObj('PunchoutFacade', [
            'requestPunchoutSession',
          ]),
        },
        {
          provide: RoutingService,
          useValue: jasmine.createSpyObj('RoutingService', ['go']),
        },
        {
          provide: GlobalMessageService,
          useValue: jasmine.createSpyObj('GlobalMessageService', ['add']),
        },
        {
          provide: Router,
          useValue: {},
        },
        {
          provide: PunchoutNavigationGuardConfig,
          useValue: defaultPunchoutNavigationGuardConfig,
        },
        {
          provide: RoutingConfigService,
          useClass: MockRoutingConfigService,
        },
      ],
    });

    guard = TestBed.inject(PunchoutNavigationGuard);
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    punchoutStoreService = TestBed.inject(
      PunchoutStoreService
    ) as jasmine.SpyObj<PunchoutStoreService>;
    punchoutFacade = TestBed.inject(
      PunchoutFacade
    ) as jasmine.SpyObj<PunchoutFacade>;
    routingService = TestBed.inject(
      RoutingService
    ) as jasmine.SpyObj<RoutingService>;
    globalMessageService = TestBed.inject(
      GlobalMessageService
    ) as jasmine.SpyObj<GlobalMessageService>;
  });

  it('should allow access for allowed cxRoute in EDIT mode', (done) => {
    authService.isUserLoggedIn.and.returnValue(of(true));

    const state: PunchoutState = {
      punchoutSessionId: 'session123',
      punchoutSession: {
        punchOutOperation: PunchOutOperation.EDIT,
      } as PunchoutSession,
    };
    punchoutStoreService.getPunchoutState.and.returnValue(of(state));

    guard.canActivate(mockRoute, {} as any).subscribe((result) => {
      expect(result).toBeTruthy();
      expect(globalMessageService.add).not.toHaveBeenCalled();
      expect(routingService.go).not.toHaveBeenCalled();
      done();
    });
  });

  it('should block access for disallowed route in INSPECT mode', (done) => {
    authService.isUserLoggedIn.and.returnValue(of(true));

    const state: PunchoutState = {
      punchoutSessionId: 'session123',
      punchoutSession: {
        punchOutOperation: PunchOutOperation.INSPECT,
      } as PunchoutSession,
    };
    punchoutStoreService.getPunchoutState.and.returnValue(of(state));

    guard.canActivate(mockRoute, {} as any).subscribe((result) => {
      expect(result).toBeFalsy();
      expect(globalMessageService.add).toHaveBeenCalledWith(
        { key: 'punchout.noSufficientPermissions' },
        GlobalMessageType.MSG_TYPE_WARNING
      );
      expect(routingService.go).toHaveBeenCalledWith({
        cxRoute: 'punchoutInspect',
      });
      done();
    });
  });

  it('should allow access if no punchout session exists', (done) => {
    authService.isUserLoggedIn.and.returnValue(of(false));

    guard.canActivate(mockRoute, {} as any).subscribe((result) => {
      expect(result).toBeTruthy();
      done();
    });
  });

  it('should handle punchout session fallback from facade', (done) => {
    authService.isUserLoggedIn.and.returnValue(of(true));

    const state: PunchoutState = {
      punchoutSessionId: 'session123',
      punchoutSession: undefined,
    };
    punchoutStoreService.getPunchoutState.and.returnValue(of(state));
    punchoutFacade.requestPunchoutSession.and.returnValue(
      of({ punchOutOperation: PunchOutOperation.EDIT } as PunchoutSession)
    );

    guard.canActivate(mockRoute, {} as any).subscribe((result) => {
      expect(result).toBeTruthy();
      done();
    });
  });

  it('should handle errors and allow access by default', (done) => {
    authService.isUserLoggedIn.and.returnValue(of(true));
    punchoutStoreService.getPunchoutState.and.returnValue(
      of({} as PunchoutState)
    );
    punchoutFacade.requestPunchoutSession.and.throwError(
      new Error('Test error')
    );

    guard.canActivate(mockRoute, {} as any).subscribe((result) => {
      expect(result).toBeTruthy();
      done();
    });
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
  });
});
