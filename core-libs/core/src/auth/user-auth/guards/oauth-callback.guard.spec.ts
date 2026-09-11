import { TestBed } from '@angular/core/testing';
import { Router, UrlTree } from '@angular/router';
import { AuthRedirectService, WindowRef } from '@spartacus/core';
import { EMPTY, firstValueFrom, Observable, of } from 'rxjs';
import { vi } from 'vitest';
import { SemanticPathService } from '../../../routing/configurable-routes/url-translation/semantic-path.service';
import { AuthService } from '../facade/auth.service';
import { OAuthCallbackGuard } from './oauth-callback.guard';

class AuthServiceStub implements Partial<AuthService> {
  isUserLoggedIn(): Observable<boolean> {
    return EMPTY;
  }
}

class SemanticPathServiceStub implements Partial<SemanticPathService> {
  get(a: string) {
    return `/${a}`;
  }
}

class MockAuthRedirectService implements Partial<AuthRedirectService> {
  redirect(): void {}
}
class MockRouter implements Partial<Router> {
  parseUrl(url: string): UrlTree {
    return { fragment: url } as UrlTree;
  }
}
class MockWindowRef implements Partial<WindowRef> {
  isBrowser(): boolean {
    return true;
  }
}

describe('OAuthCallbackGuard', () => {
  let guard: OAuthCallbackGuard;
  let authService: AuthServiceStub;
  let authRedirectService: AuthRedirectService;
  let windowRef: WindowRef;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useClass: AuthServiceStub },
        { provide: AuthRedirectService, useClass: MockAuthRedirectService },
        { provide: Router, useClass: MockRouter },
        { provide: SemanticPathService, useClass: SemanticPathServiceStub },
        { provide: WindowRef, useClass: MockWindowRef },
      ],
    });
    authService = TestBed.inject(AuthService);
    authRedirectService = TestBed.inject(AuthRedirectService);
    windowRef = TestBed.inject(WindowRef);

    guard = TestBed.inject(OAuthCallbackGuard);
  });

  describe('when in SSR context', () => {
    beforeEach(() => {
      vi.spyOn(windowRef, 'isBrowser').mockReturnValue(false);
    });

    it('should allow navigation', async () => {
      const result = await firstValueFrom(guard.canActivate());

      expect(result).toBe(true);
    });
  });

  describe('when in Browser context', () => {
    describe('when user is authorized', () => {
      beforeEach(() => {
        vi.spyOn(authService, 'isUserLoggedIn').mockReturnValue(of(true));
      });

      it('should allow navigation and call AuthRedirect service to resume user flow', async () => {
        vi.spyOn(authRedirectService, 'redirect');

        const result = await firstValueFrom(guard.canActivate());

        expect(result).toBe(true);
        expect(authRedirectService.redirect).toHaveBeenCalled();
      });
    });

    describe('when user is anonymous', () => {
      beforeEach(() => {
        vi.spyOn(authService, 'isUserLoggedIn').mockReturnValue(of(false));
      });

      it('should redirect to the login route', async () => {
        const result = await firstValueFrom(guard.canActivate());

        expect(result).toEqual({ fragment: '/login' });
      });
    });
  });
});
