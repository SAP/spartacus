import { TestBed } from '@angular/core/testing';

import {
  AuthRedirectService,
  AuthService,
  LoggerService,
  SemanticPathService,
} from '@spartacus/core';
import { Observable, firstValueFrom, of } from 'rxjs';

import { signal } from '@angular/core';
import { Navigation, Router, UrlTree } from '@angular/router';
import { OppsConfig } from '../config/opps-config';
import { OppsLoginRequiredGuard } from './opps-login-required.guard';

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
  currentNavigation = signal((<Partial<Navigation>>{
    id: 1,
    previousNavigation: null,
    trigger: 'imperative',
    finalUrl: {
      queryParams: {},
      fragment: '',
    } as UrlTree,
    initialUrl: {} as any,
    extractedUrl: {} as any,
    extras: {},
  }) as Navigation | null);
}
describe('OppsLoginRequiredGuard', () => {
  let guard: OppsLoginRequiredGuard;
  let authService: AuthService;
  let authRedirectService: AuthRedirectService;
  beforeEach(() => {
    TestBed.configureTestingModule({
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
  it('should return true if user is logged in', async () => {
    vi.spyOn(authService, 'isUserLoggedIn').mockReturnValue(of(true));
    const result = await firstValueFrom(
      guard.canActivate({} as any, {} as any)
    );
    expect(result).toEqual(true);
  });
  it('should return login url tree if user is not logged in & login required parameter is set to true in url', async () => {
    vi.spyOn(authService, 'isUserLoggedIn').mockReturnValue(of(false));
    vi.spyOn(authRedirectService, 'setRedirectUrl');
    const route: any = {
      queryParams: { testParam: 'true' },
    };
    const result = await firstValueFrom(guard.canActivate(route, {} as any));
    expect(authRedirectService.setRedirectUrl).toHaveBeenCalled();
    expect(JSON.stringify(result)).toEqual('{"root":"test-login"}');
  });
  it('should return true if user is not logged in & login required parameter is set to false in url', async () => {
    vi.spyOn(authService, 'isUserLoggedIn').mockReturnValue(of(false));
    const route: any = {
      queryParams: { testParam: 'false' },
    };
    const result = await firstValueFrom(guard.canActivate(route, {} as any));
    expect(result).toEqual(true);
  });
  it('should return true if user is not logged in & login required parameter is not present in url', async () => {
    vi.spyOn(authService, 'isUserLoggedIn').mockReturnValue(of(false));
    const route: any = {
      queryParams: {},
    };
    const result = await firstValueFrom(guard.canActivate(route, {} as any));
    expect(result).toEqual(true);
  });
});
