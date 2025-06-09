import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import {
  AuthRedirectService,
  AuthService,
  AuthStorageService,
  GlobalMessageService,
  OCC_USER_ID_CURRENT,
  RoutingService,
  UserIdService,
} from '@spartacus/core';
import {
  PunchoutDetectionService,
  PunchoutStoreService,
} from '@spartacus/punchout/root';
import { Observable, of } from 'rxjs';
import { PunchoutAuthService } from './punchout-auth.service';

const MOCK_TOKEN = 'abc';

class MockGlobalMessageService implements Partial<GlobalMessageService> {
  remove() {
    return;
  }
  add() {
    return;
  }
}

class MockAuthService implements Partial<AuthService> {
  isUserLoggedIn(): Observable<boolean> {
    return of(true);
  }
  coreLogout(): Promise<void> {
    return Promise.resolve();
  }
}

class MockAuthStorageService implements Partial<AuthStorageService> {
  setItem() {
    return;
  }
}

class MockUserIdService implements Partial<UserIdService> {
  setUserId(_: string): void {
    return;
  }
}

class MockPunchoutStoreService implements Partial<PunchoutStoreService> {
  clearPunchoutState = () => {};
}

class MockAuthRedirectService implements Partial<AuthRedirectService> {
  setRedirectUrl = jasmine.createSpy('setRedirectUrl');
}

class MockPunchoutDetectionService
  implements Partial<PunchoutDetectionService>
{
  isPunchoutSessionPage(): boolean {
    return true;
  }
}

class MockRoutingService implements Partial<RoutingService> {
  go = () => Promise.resolve(true);
}

describe('PunchoutAuthService', () => {
  let service: PunchoutAuthService;
  let userIdService: UserIdService;
  let authService: AuthService;
  let authStorageService: AuthStorageService;
  let globalMessageService: GlobalMessageService;
  let store: Store;
  let routingService: RoutingService;
  let punchoutStoreService: PunchoutStoreService;
  let punchoutDetectionService: PunchoutDetectionService;
  let authRedirectService: AuthRedirectService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PunchoutAuthService,
        { provide: UserIdService, useClass: MockUserIdService },
        { provide: AuthService, useClass: MockAuthService },
        { provide: AuthStorageService, useClass: MockAuthStorageService },
        { provide: GlobalMessageService, useClass: MockGlobalMessageService },
        { provide: Store, useValue: { dispatch: () => {} } },
        { provide: PunchoutStoreService, useClass: MockPunchoutStoreService },
        { provide: AuthRedirectService, useClass: MockAuthRedirectService },
        {
          provide: MockPunchoutDetectionService,
          useClass: PunchoutDetectionService,
        },
        {
          provide: MockRoutingService,
          useClass: RoutingService,
        },
      ],
    });
    service = TestBed.inject(PunchoutAuthService);
    userIdService = TestBed.inject(UserIdService);
    authStorageService = TestBed.inject(AuthStorageService);
    authService = TestBed.inject(AuthService);
    globalMessageService = TestBed.inject(GlobalMessageService);
    store = TestBed.inject(Store);
    routingService = TestBed.inject(RoutingService);
    punchoutStoreService = TestBed.inject(PunchoutStoreService);
    punchoutDetectionService = TestBed.inject(PunchoutDetectionService);
    authRedirectService = TestBed.inject(AuthRedirectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should loginWithToken triggers silent login', (done) => {
    spyOn(authStorageService, 'setItem');
    spyOn(userIdService, 'setUserId');
    spyOn(globalMessageService, 'remove');
    spyOn(store, 'dispatch');

    service.loginWithToken(MOCK_TOKEN);
    expect(authStorageService.setItem).toHaveBeenCalledWith(
      'access_token',
      MOCK_TOKEN
    );
    expect(userIdService.setUserId).toHaveBeenCalledWith(OCC_USER_ID_CURRENT);
    expect(globalMessageService.remove).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalled();
    done();
  });

  it('should logout when user is already logged-in', (done) => {
    spyOn(authService, 'coreLogout').and.returnValue(Promise.resolve());
    spyOn(authService, 'isUserLoggedIn').and.returnValue(of(true));
    spyOn(userIdService, 'setUserId');
    spyOn(globalMessageService, 'remove');

    service.silentLogout().subscribe({
      next: (value) => {
        expect(value).toEqual(true);
        expect(authService.coreLogout).toHaveBeenCalled();
        expect(globalMessageService.remove).toHaveBeenCalled();
        done();
      },
    });
  });

  it('should not logout when user is not logged-in', (done) => {
    spyOn(authService, 'coreLogout').and.returnValue(Promise.resolve());
    spyOn(authService, 'isUserLoggedIn').and.returnValue(of(false));
    spyOn(userIdService, 'setUserId');

    service.silentLogout().subscribe({
      next: (value) => {
        expect(value).toEqual(false);
        expect(authService.coreLogout).not.toHaveBeenCalled();
        done();
      },
    });
  });

  it('should isLoggedIn fetch authService isLoggedIn first value only', (done) => {
    spyOn(authService, 'isUserLoggedIn').and.returnValue(of(false, true, true));
    let count = 0;
    service.isUserLoggedIn().subscribe({
      next: (value) => {
        expect(value).toEqual(false);
        count++;
      },
      complete: () => {
        expect(count).toEqual(1);
        done();
      },
    });
  });

  it('should endPunchoutSession navigate to punchoutError page', async () => {
    spyOn(authService, 'isUserLoggedIn').and.returnValue(of(false, true, true));
    spyOn(authService, 'coreLogout').and.returnValue(Promise.resolve());
    spyOn(globalMessageService, 'add');
    spyOn(routingService, 'go');
    spyOn(punchoutStoreService, 'clearPunchoutState');
    spyOn(punchoutDetectionService, 'isPunchoutSessionPage').and.returnValue(
      false
    );
    service.endPunchoutSession();
    await Promise.resolve();

    expect(authRedirectService.setRedirectUrl).not.toHaveBeenCalled();
    expect(authService.coreLogout).toHaveBeenCalled();
    expect(globalMessageService.add).toHaveBeenCalled();
    expect(routingService.go).toHaveBeenCalledWith({
      cxRoute: 'punchoutError',
    });
  });

  it('should endPunchoutSession setRedirectUrl to homepage on SessionPage', async () => {
    spyOn(authService, 'isUserLoggedIn').and.returnValue(of(false, true, true));
    spyOn(authService, 'coreLogout').and.returnValue(Promise.resolve());
    spyOn(globalMessageService, 'add');
    spyOn(routingService, 'go');
    spyOn(punchoutStoreService, 'clearPunchoutState');
    spyOn(punchoutDetectionService, 'isPunchoutSessionPage').and.returnValue(
      true
    );
    service.endPunchoutSession();
    await Promise.resolve();

    expect(authService.coreLogout).toHaveBeenCalled();
    expect(globalMessageService.add).toHaveBeenCalled();
    expect(authRedirectService.setRedirectUrl).toHaveBeenCalledWith('/');
    expect(routingService.go).toHaveBeenCalledWith({
      cxRoute: 'punchoutError',
    });
  });
});
