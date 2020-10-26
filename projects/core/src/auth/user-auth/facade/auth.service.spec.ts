import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { take } from 'rxjs/operators';
import { BasicAuthService } from '../services/basic-auth.service';
import { AuthService } from './auth.service';

class MockBasicAuthService implements Partial<BasicAuthService> {
  checkOAuthParamsInUrl() {
    return Promise.resolve();
  }
  loginWithRedirect() {
    return true;
  }
  authorize() {
    return Promise.resolve();
  }
  logout() {
    return Promise.resolve();
  }
  initLogout() {}
  isUserLoggedIn() {
    return of(true);
  }
}

describe('AuthService', () => {
  let service: AuthService;
  let basicAuthService: BasicAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        AuthService,
        {
          provide: BasicAuthService,
          useClass: MockBasicAuthService,
        },
      ],
    });

    service = TestBed.inject(AuthService);
    basicAuthService = TestBed.inject(BasicAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('checkOAuthParamsInUrl()', () => {
    it('should call basic auth checkOAuthParamsInUrl method', () => {
      spyOn(basicAuthService, 'checkOAuthParamsInUrl').and.callThrough();

      service.checkOAuthParamsInUrl();

      expect(basicAuthService.checkOAuthParamsInUrl).toHaveBeenCalled();
    });
  });

  describe('loginWithRedirect()', () => {
    it('should call basic auth loginWithRedirect method', () => {
      spyOn(basicAuthService, 'loginWithRedirect').and.callThrough();

      const result = service.loginWithRedirect();

      expect(result).toBeTrue();
      expect(basicAuthService.loginWithRedirect).toHaveBeenCalled();
    });
  });

  describe('authorize()', () => {
    it('should call basic auth authorize method', () => {
      spyOn(basicAuthService, 'authorize').and.callThrough();

      service.authorize('username', 'pass');

      expect(basicAuthService.authorize).toHaveBeenCalledWith(
        'username',
        'pass'
      );
    });
  });

  describe('logout()', () => {
    it('should call basic auth logout method', () => {
      spyOn(basicAuthService, 'logout').and.callThrough();

      service.logout();

      expect(basicAuthService.logout).toHaveBeenCalled();
    });
  });

  describe('isUserLoggedIn()', () => {
    it('should return true when there is access_token', (done) => {
      service
        .isUserLoggedIn()
        .pipe(take(1))
        .subscribe((result) => {
          expect(result).toBeTrue();
          done();
        });
    });

    it('should return false when there is not access_token', (done) => {
      spyOn(basicAuthService, 'isUserLoggedIn').and.returnValue(of(false));

      service
        .isUserLoggedIn()
        .pipe(take(1))
        .subscribe((result) => {
          expect(result).toBeFalse();
          done();
        });
    });
  });

  describe('initLogout()', () => {
    it('should call basic auth initLogout method', () => {
      spyOn(basicAuthService, 'initLogout').and.callThrough();

      service.initLogout();

      expect(basicAuthService.initLogout).toHaveBeenCalledWith();
    });
  });
});
