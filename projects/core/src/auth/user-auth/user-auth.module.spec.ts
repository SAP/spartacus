import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ConfigInitializerService } from '../../config/config-initializer/config-initializer.service';
import { AuthService } from './facade/auth.service';
import { checkOAuthParamsInUrl } from './user-auth.module';

class MockAuthService implements Partial<AuthService> {
  checkOAuthParamsInUrl() {
    return Promise.resolve();
  }
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
      ],
    });
    authService = TestBed.inject(AuthService);
    configInitializerService = TestBed.inject(ConfigInitializerService);
  });

  it(`should check OAuth params in the URL`, (done) => {
    spyOn(authService, 'checkOAuthParamsInUrl').and.callThrough();

    checkOAuthParamsInUrl(authService, configInitializerService)().then(() => {
      expect(authService.checkOAuthParamsInUrl).toHaveBeenCalled();
      done();
    });
  });

  it(`should resolve only after checking of the URL params completes`, (done) => {
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

    checkOAuthParamsInUrl(authService, configInitializerService)().then(() => {
      expect(checkingUrlParamsCompleted).toBe(true);
      done();
    });
  });
});
