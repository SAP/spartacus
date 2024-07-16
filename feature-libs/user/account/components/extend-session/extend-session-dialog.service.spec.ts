import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { EMPTY, Observable, of } from 'rxjs';
import { ExtendSessionDialogService } from './extend-session-dialog.service';
import { LaunchDialogService, LAUNCH_CALLER } from '@spartacus/storefront';
import {
  AuthStorageService,
  AuthService,
  AuthConfig,
  AuthToken,
} from '@spartacus/core';

const mockAuthConfig: AuthConfig = {
  authentication: {
    sessionExpirationWarning: {
      enabled: true,
      interval: 300,
    },
  },
};
const mockAuthConfigDisabled: AuthConfig = {
  authentication: {
    sessionExpirationWarning: {
      enabled: false,
      interval: 300,
    },
  },
};

const mockAuthToken: AuthToken = {
  access_token: 'access_token',
  access_token_stored_at: 'access_token_stored_at',
  expires_at: (Date.now() + 310_000).toString(), // expires in 310 seconds
  refresh_token: 'token',
};

class MockLaunchDialogService implements Partial<LaunchDialogService> {
  openDialogAndSubscribe() {
    return EMPTY;
  }

  closeDialog() {}
}

class MockAuthService implements Partial<AuthService> {
  isUserLoggedIn(): Observable<boolean> {
    return of(true);
  }
}

class MockAuthStorageService implements Partial<AuthStorageService> {
  getToken(): Observable<AuthToken> {
    return of(mockAuthToken);
  }
}

fdescribe('ExtendSessionDialogService', () => {
  let service: ExtendSessionDialogService;
  let launchDialogService: LaunchDialogService;
  let authStorageService: AuthStorageService;
  let authService: AuthService;
  let authConfig: AuthConfig;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ExtendSessionDialogService,
        { provide: LaunchDialogService, useClass: MockLaunchDialogService },
        {
          provide: AuthStorageService,
          useClass: MockAuthStorageService,
        },
        { provide: AuthService, useClass: MockAuthService },
        { provide: AuthConfig, useValue: mockAuthConfig },
      ],
    });

    service = TestBed.inject(ExtendSessionDialogService);
    launchDialogService = TestBed.inject(LaunchDialogService);
    authStorageService = TestBed.inject(AuthStorageService);
    authService = TestBed.inject(AuthService);
    authConfig = TestBed.inject(AuthConfig);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should not initialize if warning is disabled', () => {
    spyOn(launchDialogService, 'openDialogAndSubscribe');
    authConfig = mockAuthConfigDisabled;
    (service as any).initialize();
    expect(launchDialogService.openDialogAndSubscribe).not.toHaveBeenCalled();
  });

  it('should check if warning is enabled', () => {
    (authConfig as any).authentication.sessionExpirationWarning.enabled = true;
    expect(service.isWarningEnabled()).toBeTruthy();
    (authConfig as any).authentication.sessionExpirationWarning.enabled = false;
    expect(service.isWarningEnabled()).toBeFalsy();
  });

  it('should open modal with correct time left when token is close to expire', fakeAsync(() => {
    spyOn(launchDialogService, 'openDialogAndSubscribe');
    spyOn(authStorageService, 'getToken').and.returnValue(of(mockAuthToken));
    spyOn(authService, 'isUserLoggedIn').and.returnValue(of(true));
    (service as any).listenForToken(300);
    tick(10_000);
    expect(launchDialogService.openDialogAndSubscribe).toHaveBeenCalledWith(
      LAUNCH_CALLER.EXTEND_SESSION,
      undefined,
      { timeLeft: 300 }
    );
  }));

  it('should close modal dialog', () => {
    spyOn(launchDialogService, 'closeDialog');
    service.closeModal('test reason');
    expect(launchDialogService.closeDialog).toHaveBeenCalledWith('test reason');
  });

  it('should handle cases where token expires sooner than warning interval', fakeAsync(() => {
    const shortExpiryToken = {
      ...mockAuthToken,
      expires_at: (Date.now() + 100_000).toString(), // Token expires in 100 seconds
    };
    spyOn(launchDialogService, 'openDialogAndSubscribe');
    spyOn(authStorageService, 'getToken').and.returnValue(of(shortExpiryToken));
    spyOn(authService, 'isUserLoggedIn').and.returnValue(of(true));

    (service as any).listenForToken(300);
    tick(0);
    expect(launchDialogService.openDialogAndSubscribe).toHaveBeenCalledWith(
      LAUNCH_CALLER.EXTEND_SESSION,
      undefined,
      { timeLeft: 100 }
    );
  }));

  it('should not open modal if user is not logged in', fakeAsync(() => {
    spyOn(launchDialogService, 'openDialogAndSubscribe');
    spyOn(authStorageService, 'getToken').and.returnValue(of(mockAuthToken));
    spyOn(authService, 'isUserLoggedIn').and.returnValue(of(false));
    (service as any).initialize();
    tick(10_000);
    expect(launchDialogService.openDialogAndSubscribe).not.toHaveBeenCalled();
  }));

  it('should properly unsubscribe on ngOnDestroy', () => {
    service.ngOnDestroy();
    expect(service['subscription']).toBeFalsy();

    (service as any).listenForToken(300);
    service.ngOnDestroy();
    expect(service['subscription'].closed).toBeTruthy();
  });
});
