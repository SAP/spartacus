import { PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ConfigInitializerService } from '../../config/config-initializer/config-initializer.service';
import { AuthService } from './facade/auth.service';
import { checkOAuthParamsInUrl } from './user-auth.module';
import createSpy = jasmine.createSpy;

class MockAuthService implements Partial<AuthService> {
  checkOAuthParamsInUrl() {
    return Promise.resolve();
  }
  refreshAuthConfig = createSpy().and.stub();
}

class MockConfigInitializerService
  implements Partial<ConfigInitializerService>
{
  getStable() {
    return of({});
  }
}

describe(`checkOAuthParamsInUrl APP_INITIALIZER`, () => {
  let authService: AuthService;
  let configInitializerService: ConfigInitializerService;
  const platformId = 'browser';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: AuthService,
          useClass: MockAuthService,
        },
        {
          provide: ConfigInitializerService,
          useClass: MockConfigInitializerService,
        },
        { provide: PLATFORM_ID, useValue: 'browser' },
      ],
    });
    authService = TestBed.inject(AuthService);
    configInitializerService = TestBed.inject(ConfigInitializerService);
  });

  it(`should check OAuth params in the URL`, async () => {
    spyOn(authService, 'checkOAuthParamsInUrl').and.callThrough();

    await checkOAuthParamsInUrl(
      authService,
      configInitializerService,
      platformId
    )();
    expect(authService.refreshAuthConfig).toHaveBeenCalled();
    expect(authService.checkOAuthParamsInUrl).toHaveBeenCalled();
  });

  it(`should resolve only after checking of the URL params completes`, async () => {
    let checkingUrlParamsCompleted = false;

    spyOn(authService, 'checkOAuthParamsInUrl').and.callFake(() => {
      // simulate a delay in checking URL params
      // (which can normally happen due to a long OAuth authorization_code handshake):
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          checkingUrlParamsCompleted = true;
          resolve();
        }, 1);
      });
    });

    await checkOAuthParamsInUrl(
      authService,
      configInitializerService,
      platformId
    )();
    expect(checkingUrlParamsCompleted).toBe(true);
  });

  it('should not check OAuth params in URL if platform is not browser', async () => {
    const platformId = 'server';

    const checkOAuthParamsInUrlSpy = spyOn(
      authService,
      'checkOAuthParamsInUrl'
    );

    const fn = checkOAuthParamsInUrl(
      authService,
      configInitializerService,
      platformId
    );

    await fn();

    expect(checkOAuthParamsInUrlSpy).not.toHaveBeenCalled();
  });
});
