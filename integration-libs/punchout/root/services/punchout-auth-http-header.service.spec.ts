import { TestBed } from '@angular/core/testing';
import {
  AuthRedirectService,
  AuthService,
  AuthStorageService,
  AuthToken,
  GlobalMessageService,
  OAuthLibWrapperService,
  OccEndpointsService,
  RoutingService,
} from '@spartacus/core';
import { of } from 'rxjs';
import { PunchoutFacade } from '../facade';
import { PunchOutLevel, PunchOutOperation, PunchoutSession } from '../model';
import { PunchoutAuthHttpHeaderService } from './punchout-auth-http-header.service';
import { PunchoutDetectionService } from './punchout-detection.service';
import { PunchoutStoreService } from './punchout-store.service';

const mockSessionId = '123abc';
const mockPunchoutSession: PunchoutSession = {
  customerId: 'test@test.com',
  cartId: 'mockCart',
  punchOutLevel: PunchOutLevel.PRODUCT,
  punchOutOperation: PunchOutOperation.EDIT,
  selectedItem: 'mockItemId',
  token: {
    accessToken: 'mockToken',
    tokenType: 'Bearer',
  },
};

class MockPunchoutDetectionService
  implements Partial<PunchoutDetectionService>
{
  isPunchoutSessionPage(): boolean {
    return true;
  }
  getPunchoutSessionId(): string | undefined {
    return mockSessionId;
  }
  isPunchoutSession(): boolean | undefined {
    return false;
  }
}

class MockAuthService implements Partial<AuthService> {
  coreLogout(): Promise<void> {
    return Promise.resolve();
  }
}

class MockAuthStorageService implements Partial<AuthStorageService> {
  getToken() {
    return of({ access_token: 'acc_token' } as AuthToken);
  }
}

class MockOAuthLibWrapperService implements Partial<OAuthLibWrapperService> {
  refreshToken(): void {}
}
class MockRoutingService implements Partial<RoutingService> {
  go = () => Promise.resolve(true);
  goByUrl = () => Promise.resolve(true);
}

class MockGlobalMessageService implements Partial<GlobalMessageService> {
  add() {}
  remove() {}
}

class MockOccEndpointsService implements Partial<OccEndpointsService> {
  getBaseUrl() {
    return 'some-server/occ';
  }
  getRawEndpointValue(): string {
    return 'some-endpoint';
  }
}

class MockAuthRedirectService implements Partial<AuthRedirectService> {
  saveCurrentNavigationUrl = jasmine.createSpy('saveCurrentNavigationUrl');
  setRedirectUrl = jasmine.createSpy('setRedirectUrl');
}

class MockPunchoutFacade implements Partial<PunchoutFacade> {
  getPunchoutSession = () => of(mockPunchoutSession);
  logoutPunchoutUser = () => of(true);
  endPunchoutSession = () => of();
}

describe('PunchoutAuthHttpHeaderService', () => {
  let service: PunchoutAuthHttpHeaderService;
  let authService: AuthService;
  let punchoutDetectionService: PunchoutDetectionService;
  let punchoutStoreService: PunchoutStoreService;
  let punchoutfacade: PunchoutFacade;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: PunchoutFacade, useClass: MockPunchoutFacade },
        {
          provide: PunchoutDetectionService,
          useClass: MockPunchoutDetectionService,
        },
        { provide: AuthService, useClass: MockAuthService },
        { provide: GlobalMessageService, useClass: MockGlobalMessageService },
        { provide: OccEndpointsService, useClass: MockOccEndpointsService },
        { provide: AuthStorageService, useClass: MockAuthStorageService },
        { provide: AuthRedirectService, useClass: MockAuthRedirectService },
        {
          provide: OAuthLibWrapperService,
          useClass: MockOAuthLibWrapperService,
        },
        { provide: RoutingService, useClass: MockRoutingService },
      ],
    });
    service = TestBed.inject(PunchoutAuthHttpHeaderService);
    authService = TestBed.inject(AuthService);
    punchoutDetectionService = TestBed.inject(PunchoutDetectionService);
    punchoutStoreService = TestBed.inject(PunchoutStoreService);
    punchoutfacade = TestBed.inject(PunchoutFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should handleExpiredRefreshToken call super coreLogout when not Punchout Session page', async () => {
    spyOn(authService, 'coreLogout').and.callThrough();
    spyOn(punchoutfacade, 'logoutPunchoutUser').and.callThrough();
    spyOn(punchoutDetectionService, 'isPunchoutSessionPage').and.returnValue(
      false
    );
    spyOn(punchoutStoreService, 'getPunchoutSessionId').and.returnValue('');
    spyOn(punchoutfacade, 'endPunchoutSession').and.callThrough();

    service.handleExpiredRefreshToken();
    await Promise.resolve();
    expect(authService.coreLogout).toHaveBeenCalled();
    expect(punchoutfacade.logoutPunchoutUser).not.toHaveBeenCalled();
    expect(punchoutfacade.endPunchoutSession).not.toHaveBeenCalled();
  });

  it('should handleExpiredRefreshToken silently logout when Punchout Session page', async () => {
    spyOn(authService, 'coreLogout').and.callThrough();
    spyOn(punchoutDetectionService, 'isPunchoutSessionPage').and.returnValue(
      true
    );
    spyOn(punchoutDetectionService, 'isPunchoutSession').and.returnValue(true);
    spyOn(punchoutfacade, 'endPunchoutSession').and.callThrough();
    spyOn(punchoutfacade, 'logoutPunchoutUser').and.callThrough();

    service.handleExpiredRefreshToken();
    await Promise.resolve();

    expect(punchoutfacade.logoutPunchoutUser).toHaveBeenCalledWith();
    expect(punchoutfacade.endPunchoutSession).not.toHaveBeenCalledWith();
    expect(authService.coreLogout).not.toHaveBeenCalled();
  });

  it('should handleExpiredRefreshToken endPunchoutSession when Punchout Session already exists', async () => {
    spyOn(authService, 'coreLogout').and.callThrough();
    spyOn(punchoutDetectionService, 'isPunchoutSessionPage').and.returnValue(
      false
    );
    spyOn(punchoutDetectionService, 'isPunchoutSession').and.returnValue(true);
    spyOn(punchoutfacade, 'endPunchoutSession').and.callThrough();
    spyOn(punchoutfacade, 'logoutPunchoutUser').and.callThrough();

    service.handleExpiredRefreshToken();
    await Promise.resolve();

    expect(punchoutfacade.logoutPunchoutUser).not.toHaveBeenCalledWith();
    expect(punchoutfacade.endPunchoutSession).toHaveBeenCalledWith();
    expect(authService.coreLogout).not.toHaveBeenCalled();
  });
});
