import { TestBed } from '@angular/core/testing';

import {
  AuthRedirectService,
  AuthService,
  LoggerService,
  SemanticPathService,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';

import { Router, UrlTree } from '@angular/router';
import { OppsLoginRequiredGuard } from './opps-login-required.guard';
import { OppsConfig } from '../config/opps-config';

const mockConfig = {
  opps: {
    loginRequired: {
      urlParameter: 'testParam',
    },
  },
};
class MockSemanticPathService implements Partial<SemanticPathService> {
  get() {
    return '/login';
  }
}
class MockAuthRedirectService implements Partial<AuthRedirectService> {
  setRedirectUrl(_url: string): void {}
}
class MockLoggerService {
  log(): void {}
  warn(): void {}
  error(): void {}
  info(): void {}
  debug(): void {}
}
class MockAuthService implements Partial<AuthService> {
  isUserLoggedIn(): Observable<boolean> {
    return of(false);
  }
  async checkOAuthParamsInUrl(): Promise<void> {}
  async loginWithCredentials(
    _userId: string,
    _password: string
  ): Promise<void> {}
}
class MockRouter implements Partial<Router> {
  init() {}
  saveCurrentNavigation() {}
  serializeUrl(_url: UrlTree): string {
    return '/login';
  }
  parseUrl(_url: string): UrlTree {
    return { root: 'test-login' } as any;
  }
  getCurrentNavigation(): any {
    let output = {
      id: 1,
      previousNavigation: null,
      trigger: 'imperative',
      finalUrl: {
        queryParams: {},
        fragment: '',
      },
      initialUrl: {} as any,
      extractedUrl: {} as any,
      extras: {},
    };
    return output;
  }
}
describe('OppsLoginRequiredGuard', () => {
  let guard: OppsLoginRequiredGuard;
  let authService: AuthService;
  let authRedirectService: AuthRedirectService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        { provide: OppsConfig, useValue: mockConfig },
        { provide: SemanticPathService, useClass: MockSemanticPathService },
        { provide: AuthRedirectService, useClass: MockAuthRedirectService },
        { provide: LoggerService, useClass: MockLoggerService },
        { provide: AuthService, useClass: MockAuthService },
        { provide: Router, useClass: MockRouter },
      ],
    });
    authService = TestBed.inject(AuthService);
    guard = TestBed.inject(OppsLoginRequiredGuard);
    authRedirectService = TestBed.inject(AuthRedirectService);
  });
  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
  it('should return true if user is logged in', (done) => {
    spyOn(authService, 'isUserLoggedIn').and.returnValue(of(true));
    guard.canActivate({} as any, {} as any).subscribe((result) => {
      expect(result).toEqual(true);
      done();
    });
  });
  it('should return login url tree if user is not logged in & login required parameter is set to true in url', (done) => {
    spyOn(authService, 'isUserLoggedIn').and.returnValue(of(false));
    spyOn(authRedirectService, 'setRedirectUrl').and.returnValue();
    const route: any = {
      queryParams: { testParam: 'true' },
    };
    guard.canActivate(route, {} as any).subscribe((result) => {
      expect(authRedirectService.setRedirectUrl).toHaveBeenCalled();
      expect(JSON.stringify(result)).toEqual('{"root":"test-login"}');
      done();
    });
  });
  it('should return true if user is not logged in & login required parameter is set to false in url', (done) => {
    spyOn(authService, 'isUserLoggedIn').and.returnValue(of(false));
    const route: any = {
      queryParams: { testParam: 'false' },
    };
    guard.canActivate(route, {} as any).subscribe((result) => {
      expect(result).toEqual(true);
      done();
    });
  });
  it('should return true if user is not logged in & login required parameter is not present in url', (done) => {
    spyOn(authService, 'isUserLoggedIn').and.returnValue(of(false));
    const route: any = {
      queryParams: {},
    };
    guard.canActivate(route, {} as any).subscribe((result) => {
      expect(result).toEqual(true);
      done();
    });
  });
});
