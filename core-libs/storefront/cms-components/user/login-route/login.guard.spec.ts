import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  RouterModule,
  RouterStateSnapshot,
} from '@angular/router';
import {
  AuthConfigService,
  AuthService,
  CmsActivatedRouteSnapshot,
  OAuthFlow,
  RoutingConfig,
} from '@spartacus/core';
import { firstValueFrom, of } from 'rxjs';
import { CmsPageGuard } from '../../../cms-structure/guards/cms-page.guard';
import { LoginGuard } from './login.guard';

class MockAuthService implements Partial<AuthService> {
  loginWithRedirect() {
    return true;
  }
  isUserLoggedIn() {
    return of(false);
  }
}

class MockCmsPageGuard implements Partial<CmsPageGuard> {
  canActivate() {
    return of(true);
  }
}

class MockAuthConfigService implements Partial<AuthConfigService> {
  getOAuthFlow() {
    return OAuthFlow.ImplicitFlow;
  }
}

@Component({
  selector: 'cx-page-layout',
  template: 'mock',
})
class MockPageLayoutComponent {}

describe('LoginGuard', () => {
  let loginGuard: LoginGuard;
  let authService: AuthService;
  let cmsPageGuard: CmsPageGuard;
  let authConfigService: AuthConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([
          {
            path: 'login',
            component: MockPageLayoutComponent,
            canActivate: [LoginGuard],
          },
        ]),
        MockPageLayoutComponent,
      ],
      providers: [
        {
          provide: RoutingConfig,
          useValue: {
            routing: {
              routes: {
                login: {
                  paths: ['login'],
                },
                home: {
                  paths: [''],
                },
                logout: {
                  paths: ['logout'],
                },
              },
            },
          },
        },
        { provide: AuthService, useClass: MockAuthService },
        { provide: CmsPageGuard, useClass: MockCmsPageGuard },
        { provide: AuthConfigService, useClass: MockAuthConfigService },
      ],
    });
    authService = TestBed.inject(AuthService);
    loginGuard = TestBed.inject(LoginGuard);
    cmsPageGuard = TestBed.inject(CmsPageGuard);
    authConfigService = TestBed.inject(AuthConfigService);
  });

  describe('When user is authorized,', () => {
    it('should try to render login CMS page', async () => {
      vi.spyOn(authService, 'isUserLoggedIn').mockReturnValue(of(true));
      vi.spyOn(cmsPageGuard, 'canActivate');
      vi.spyOn(authService, 'loginWithRedirect');

      const res = await firstValueFrom(
        loginGuard.canActivate(
          'a' as unknown as ActivatedRouteSnapshot,
          'b' as unknown as RouterStateSnapshot
        )
      );
      expect(res).toBe(true);
      expect(cmsPageGuard.canActivate).toHaveBeenCalledWith(
        'a' as unknown as CmsActivatedRouteSnapshot,
        'b' as unknown as RouterStateSnapshot
      );
      expect(authService.loginWithRedirect).not.toHaveBeenCalled();
    });
  });

  describe('When user is not authorized', () => {
    it('should try to render login CMS page when ResourcePasswordOwnerFlow is used', async () => {
      vi.spyOn(cmsPageGuard, 'canActivate');
      vi.spyOn(authService, 'loginWithRedirect');
      vi.spyOn(authConfigService, 'getOAuthFlow').mockReturnValue(
        OAuthFlow.ResourceOwnerPasswordFlow
      );

      const res = await firstValueFrom(
        loginGuard.canActivate(
          'a' as unknown as ActivatedRouteSnapshot,
          'b' as unknown as RouterStateSnapshot
        )
      );
      expect(res).toBe(true);
      expect(cmsPageGuard.canActivate).toHaveBeenCalledWith(
        'a' as unknown as CmsActivatedRouteSnapshot,
        'b' as unknown as RouterStateSnapshot
      );
      expect(authService.loginWithRedirect).not.toHaveBeenCalled();
    });

    it('should report previous page and initialize login redirect when flows with redirects are used', () => {
      vi.spyOn(authService, 'loginWithRedirect');
      vi.spyOn(cmsPageGuard, 'canActivate');

      loginGuard
        .canActivate(
          'a' as unknown as ActivatedRouteSnapshot,
          'b' as unknown as RouterStateSnapshot
        )
        .subscribe()
        .unsubscribe();

      expect(cmsPageGuard.canActivate).not.toHaveBeenCalled();
      expect(authService.loginWithRedirect).toHaveBeenCalled();
    });

    it('should report previous page and initialize login redirect when flows with redirects are used', async () => {
      vi.spyOn(authService, 'loginWithRedirect').mockReturnValue(false);
      vi.spyOn(cmsPageGuard, 'canActivate');

      const result = await firstValueFrom(
        loginGuard.canActivate(
          'a' as unknown as ActivatedRouteSnapshot,
          'b' as unknown as RouterStateSnapshot
        )
      );
      expect(result).toBe(false);
      expect(cmsPageGuard.canActivate).not.toHaveBeenCalled();
      expect(authService.loginWithRedirect).toHaveBeenCalled();
    });
  });
});
