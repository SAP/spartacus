import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import {
  AuthService,
  CmsActivatedRouteSnapshot,
  GlobalMessageService,
  GlobalMessageType,
  RoutingService,
} from '@spartacus/core';
import { PunchoutNavigationGuard } from './punchout-navigation.guard';
import { PunchoutFacade } from '../facade';
import { PunchOutOperation, PunchoutSession, PunchoutState } from '../model';
import {
  PunchoutStatePersistanceService,
  PunchoutStoreService,
} from '../services';
import { of } from 'rxjs';

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
          useValue: jasmine.createSpyObj('RoutingService', ['goByUrl']),
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
          provide: PunchoutStatePersistanceService,
          useValue: {},
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
      expect(routingService.goByUrl).not.toHaveBeenCalled();
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
        { key: 'organization.notification.noSufficientPermissions' },
        GlobalMessageType.MSG_TYPE_WARNING
      );
      expect(routingService.goByUrl).toHaveBeenCalledWith(
        '/punchout/cxml/inspect'
      );
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
});
