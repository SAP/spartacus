import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import {
  AuthConfigService,
  AuthRedirectService,
  AuthService,
  CmsActivatedRouteSnapshot,
  OAuthFlow,
  RoutingConfig,
} from '@spartacus/core';
import { of } from 'rxjs';
import { take } from 'rxjs/operators';
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

class MockAuthRedirectService implements Partial<AuthRedirectService> {
  reportNotAuthGuard() {}
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
  let authRedirectService: AuthRedirectService;
  let authConfigService: AuthConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          {
            path: 'login',
            component: MockPageLayoutComponent,
            canActivate: [LoginGuard],
          },
        ]),
      ],
      declarations: [MockPageLayoutComponent],
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
        { provide: AuthRedirectService, useClass: MockAuthRedirectService },
        { provide: AuthConfigService, useClass: MockAuthConfigService },
      ],
    });
    authService = TestBed.inject(AuthService);
    loginGuard = TestBed.inject(LoginGuard);
    cmsPageGuard = TestBed.inject(CmsPageGuard);
    authRedirectService = TestBed.inject(AuthRedirectService);
    authConfigService = TestBed.inject(AuthConfigService);
  });

  describe('When user is authorized,', () => {
    it('should try to render login CMS page', (done) => {
      spyOn(authService, 'isUserLoggedIn').and.returnValue(of(true));
      spyOn(cmsPageGuard, 'canActivate').and.callThrough();
      spyOn(authRedirectService, 'reportNotAuthGuard').and.callThrough();
      spyOn(authService, 'loginWithRedirect').and.callThrough();

      loginGuard
        .canActivate(
          'a' as unknown as ActivatedRouteSnapshot,
          'b' as unknown as RouterStateSnapshot
        )
        .pipe(take(1))
        .subscribe((res) => {
          expect(res).toBe(true);
          expect(cmsPageGuard.canActivate).toHaveBeenCalledWith(
            'a' as unknown as CmsActivatedRouteSnapshot,
            'b' as unknown as RouterStateSnapshot
          );
          expect(authRedirectService.reportNotAuthGuard).not.toHaveBeenCalled();
          expect(authService.loginWithRedirect).not.toHaveBeenCalled();
          done();
        });
    });
  });

  describe('When user is not authorized', () => {
    it('should try to render login CMS page when ResourcePasswordOwnerFlow is used', (done) => {
      spyOn(cmsPageGuard, 'canActivate').and.callThrough();
      spyOn(authRedirectService, 'reportNotAuthGuard').and.callThrough();
      spyOn(authService, 'loginWithRedirect').and.callThrough();
      spyOn(authConfigService, 'getOAuthFlow').and.returnValue(
        OAuthFlow.ResourceOwnerPasswordFlow
      );

      loginGuard
        .canActivate(
          'a' as unknown as ActivatedRouteSnapshot,
          'b' as unknown as RouterStateSnapshot
        )
        .pipe(take(1))
        .subscribe((res) => {
          expect(res).toBe(true);
          expect(cmsPageGuard.canActivate).toHaveBeenCalledWith(
            'a' as unknown as CmsActivatedRouteSnapshot,
            'b' as unknown as RouterStateSnapshot
          );
          expect(authRedirectService.reportNotAuthGuard).not.toHaveBeenCalled();
          expect(authService.loginWithRedirect).not.toHaveBeenCalled();
          done();
        });
    });

    it('should report previous page and initialize login redirect when flows with redirects are used', () => {
      spyOn(authRedirectService, 'reportNotAuthGuard').and.callThrough();
      spyOn(authService, 'loginWithRedirect').and.callThrough();
      spyOn(cmsPageGuard, 'canActivate').and.callThrough();

      loginGuard
        .canActivate(
          'a' as unknown as ActivatedRouteSnapshot,
          'b' as unknown as RouterStateSnapshot
        )
        .subscribe()
        .unsubscribe();

      expect(cmsPageGuard.canActivate).not.toHaveBeenCalled();
      expect(authRedirectService.reportNotAuthGuard).toHaveBeenCalled();
      expect(authService.loginWithRedirect).toHaveBeenCalled();
    });

    it('should report previous page and initialize login redirect when flows with redirects are used', (done) => {
      spyOn(authRedirectService, 'reportNotAuthGuard').and.callThrough();
      spyOn(authService, 'loginWithRedirect').and.returnValue(false);
      spyOn(cmsPageGuard, 'canActivate').and.callThrough();

      loginGuard
        .canActivate(
          'a' as unknown as ActivatedRouteSnapshot,
          'b' as unknown as RouterStateSnapshot
        )
        .subscribe((result) => {
          expect(result).toBe(false);
          expect(cmsPageGuard.canActivate).not.toHaveBeenCalled();
          expect(authRedirectService.reportNotAuthGuard).toHaveBeenCalled();
          expect(authService.loginWithRedirect).toHaveBeenCalled();
          done();
        });
    });
  });
});
