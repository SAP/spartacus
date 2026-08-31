import { Component, NgZone } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router, RouterModule } from '@angular/router';
import {
  AuthService,
  CmsService,
  ProtectedRoutesService,
  RoutingConfig,
  SemanticPathService,
} from '@spartacus/core';
import { Observable, firstValueFrom, of } from 'rxjs';
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
        { provide: CmsService, useClass: MockCmsService },
        {
          provide: ProtectedRoutesService,
          useClass: MockProtectedRoutesService,
        },
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
      vi.spyOn(protectedRoutesService, 'shouldProtect', 'get').mockReturnValue(
        false
      );

      const result = await firstValueFrom(logoutGuard.canActivate());
      expect(result.toString()).toBe('/');
    });

    it('should return redirect url to login page if app protected', async () => {
      vi.spyOn(protectedRoutesService, 'shouldProtect', 'get').mockReturnValue(
        true
      );

      const result = await firstValueFrom(logoutGuard.canActivate());
      expect(result.toString()).toBe('/login');
    });

    it('should return true if the logout page exists', async () => {
      vi.spyOn(cmsService, 'hasPage').mockReturnValue(of(true));

      const result = await firstValueFrom(logoutGuard.canActivate());
      expect(result).toBe(true);
    });
  });
});
