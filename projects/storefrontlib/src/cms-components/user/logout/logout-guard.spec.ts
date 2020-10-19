import { Component, NgZone } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import {
  AuthService,
  CmsService,
  ProtectedRoutesService,
  RoutingConfig,
  SemanticPathService,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { LogoutGuard } from './logout-guard';

class MockAuthService implements Partial<AuthService> {
  logout() {
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
        RouterTestingModule.withRoutes([
          {
            path: 'logout',
            component: MockPageLayoutComponent,
            canActivate: [LogoutGuard],
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
      spyOn(authService, 'logout').and.callThrough();
    });

    it('should logout and clear user state', async () => {
      await zone.run(() => router.navigateByUrl('/logout'));
      expect(authService.logout).toHaveBeenCalled();
    });

    it('should return redirect url to home page if app not protected', (done) => {
      spyOnProperty(protectedRoutesService, 'shouldProtect').and.returnValue(
        false
      );

      logoutGuard
        .canActivate()
        .pipe(take(1))
        .subscribe((result) => {
          expect(result.toString()).toBe('/');
          done();
        });
    });

    it('should return redirect url to login page if app protected', (done) => {
      spyOnProperty(protectedRoutesService, 'shouldProtect').and.returnValue(
        true
      );

      logoutGuard
        .canActivate()
        .pipe(take(1))
        .subscribe((result) => {
          expect(result.toString()).toBe('/login');
          done();
        });
    });

    it('should return true if the logout page exists', (done) => {
      spyOn(cmsService, 'hasPage').and.returnValue(of(true));

      logoutGuard
        .canActivate()
        .pipe(take(1))
        .subscribe((result) => {
          expect(result).toBe(true);
          done();
        });
    });
  });
});
