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
import { PunchoutAuthHttpHeaderService } from './punchout-auth-http-header.service';
import { PunchoutDetectionService } from './punchout-detection.service';

class MockPunchoutDetectionService
  implements Partial<PunchoutDetectionService>
{
  isPunchoutSessionPage(): boolean {
    return true;
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

class MockOAuthLibWrapperService implements Partial<OAuthLibWrapperService> {}

class MockRoutingService implements Partial<RoutingService> {
  go = () => Promise.resolve(true);
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
}

describe('PunchoutAuthHttpHeaderService', () => {
  let service: PunchoutAuthHttpHeaderService;
  let authService: AuthService;
  let punchoutDetectionService: PunchoutDetectionService;
  let globalMessageService: GlobalMessageService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
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
    globalMessageService = TestBed.inject(GlobalMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should handleExpiredRefreshToken call super coreLogout when not Punchout Session page', async () => {
    spyOn(authService, 'coreLogout').and.callThrough();
    spyOn(punchoutDetectionService, 'isPunchoutSessionPage').and.returnValue(
      false
    );
    spyOn(globalMessageService, 'remove').and.callThrough();

    service.handleExpiredRefreshToken();
    await Promise.resolve();

    expect(authService.coreLogout).toHaveBeenCalled();
    expect(globalMessageService.remove).not.toHaveBeenCalled();
  });

  it('should handleExpiredRefreshToken silently logout when Punchout Session page', async () => {
    spyOn(authService, 'coreLogout').and.callThrough();
    spyOn(punchoutDetectionService, 'isPunchoutSessionPage').and.returnValue(
      true
    );
    spyOn(globalMessageService, 'remove').and.callThrough();

    service.handleExpiredRefreshToken();
    await Promise.resolve();

    expect(authService.coreLogout).toHaveBeenCalled();
    expect(globalMessageService.remove).toHaveBeenCalled();
  });
});
