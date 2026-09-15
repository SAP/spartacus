import { Component, NgZone } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router, RouterModule } from '@angular/router';
import {
  AuthService,
  CmsService,
  FeatureToggles,
  ProtectedRoutesService,
  RoutingConfig,
  SemanticPathService,
} from '@spartacus/core';
import { Observable, firstValueFrom, of } from 'rxjs';
import { LogoutConfig } from './logout-config';
import { LogoutGuard } from './logout.guard';

class MockAuthService implements Partial<AuthService> {
  coreLogout() {
    return Promise.resolve();
  }
}

@Component({
  selector: 'cx-page-layout',
  template: 'mock',
})
class MockPageLayoutComponent {}

class MockCmsService implements Partial<CmsService> {
  hasPage(): Observable<boolean> {
    return of(false);
  }
}

class MockProtectedRoutesService implements Partial<ProtectedRoutesService> {
  get shouldProtect() {
    return false;
  }
}

const mockFeatureToggles: FeatureToggles = {
  useConfigurableLogoutRedirect: false,
};

describe('LogoutGuard', () => {
  let logoutGuard: LogoutGuard;
  let authService: AuthService;
  let protectedRoutesService: ProtectedRoutesService;
  let cmsService: CmsService;

  let zone: NgZone;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([
          {
            path: 'logout',
            component: MockPageLayoutComponent,
            canActivate: [LogoutGuard],
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
                login: { paths: ['login'] },
                home: { paths: [''] },
                logout: { paths: ['logout'] },
                'my-account': { paths: ['my-account'] },
              },
            },
          },
        },
        { provide: AuthService, useClass: MockAuthService },
        { provide: CmsService, useClass: MockCmsService },
        { provide: ProtectedRoutesService, useClass: MockProtectedRoutesService },
        { provide: FeatureToggles, useValue: mockFeatureToggles },
        { provide: LogoutConfig, useValue: {} },
        SemanticPathService,
      ],
    });
    authService = TestBed.inject(AuthService);
    logoutGuard = TestBed.inject(LogoutGuard);
    router = TestBed.inject(Router);
    cmsService = TestBed.inject(CmsService);
    protectedRoutesService = TestBed.inject(ProtectedRoutesService);
    zone = TestBed.inject(NgZone);
  });

  describe('When user is authorized,', () => {
    beforeEach(() => {
      vi.spyOn(authService, 'coreLogout');
    });

    it('should logout and clear user state', async () => {
      await zone.run(() => router.navigateByUrl('/logout'));
      expect(authService.coreLogout).toHaveBeenCalled();
    });

    it('should return redirect url to home page if app not protected', async () => {
      vi.spyOn(protectedRoutesService, 'shouldProtect', 'get').mockReturnValue(false);

      const result = await firstValueFrom(logoutGuard.canActivate());
      expect(result.toString()).toBe('/');
    });

    it('should return redirect url to login page if app protected', async () => {
      vi.spyOn(protectedRoutesService, 'shouldProtect', 'get').mockReturnValue(true);

      const result = await firstValueFrom(logoutGuard.canActivate());
      expect(result.toString()).toBe('/login');
    });

    it('should return true if the logout CMS page exists', async () => {
      vi.spyOn(cmsService, 'hasPage').mockReturnValue(of(true));

      const result = await firstValueFrom(logoutGuard.canActivate());
      expect(result).toBe(true);
    });

    describe('useConfigurableLogoutRedirect toggle', () => {
      it('should redirect to home when toggle is disabled, even if redirectRoute is configured', async () => {
        logoutGuard['featureToggles'] = { useConfigurableLogoutRedirect: false };
        logoutGuard['config'] = { logout: { redirectRoute: 'my-account' } };

        const result = await firstValueFrom(logoutGuard.canActivate());
        expect(result.toString()).toBe('/');
      });

      it('should redirect to configured redirectRoute when toggle is enabled', async () => {
        logoutGuard['featureToggles'] = { useConfigurableLogoutRedirect: true };
        logoutGuard['config'] = { logout: { redirectRoute: 'my-account' } };

        const result = await firstValueFrom(logoutGuard.canActivate());
        expect(result.toString()).toBe('/my-account');
      });

      it('should redirect to home when toggle is enabled but no redirectRoute is configured', async () => {
        logoutGuard['featureToggles'] = { useConfigurableLogoutRedirect: true };
        logoutGuard['config'] = {};

        const result = await firstValueFrom(logoutGuard.canActivate());
        expect(result.toString()).toBe('/');
      });

      it('should return true when toggle is enabled and redirectRoute resolves to the logout path', async () => {
        logoutGuard['featureToggles'] = { useConfigurableLogoutRedirect: true };
        logoutGuard['config'] = { logout: { redirectRoute: 'logout' } };

        const result = await firstValueFrom(logoutGuard.canActivate());
        expect(result).toBe(true);
      });

      it('should still redirect to login for protected store when toggle is enabled', async () => {
        logoutGuard['featureToggles'] = { useConfigurableLogoutRedirect: true };
        logoutGuard['config'] = { logout: { redirectRoute: 'my-account' } };
        vi.spyOn(protectedRoutesService, 'shouldProtect', 'get').mockReturnValue(true);

        const result = await firstValueFrom(logoutGuard.canActivate());
        expect(result.toString()).toBe('/login');
      });
    });
  });
});
