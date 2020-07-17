import { Component, NgZone } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import {
  AuthService,
  CmsService,
  ProtectedRoutesService,
  RoutingService,
  SemanticPathService,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { LogoutGuard } from './logout-guard';

class MockAuthService {
  logout() {
    return Promise.resolve();
  }
}

@Component({
  selector: 'cx-page-layout',
  template: 'mock',
})
class MockPageLayoutComponent {}

class MockCmsService {
  hasPage(): Observable<Boolean> {
    return of(false);
  }
  refreshLatestPage(): void {}
}

class MockRoutingService {
  go = jasmine.createSpy();
}

class MockSemanticPathService {
  get() {}
}

class MockProtectedRoutesService {
  get shouldProtect() {
    return false;
  }
}

describe('LogoutGuard', () => {
  let logoutGuard: LogoutGuard;
  let authService: AuthService;
  let routingService: RoutingService;
  let protectedRoutesService: ProtectedRoutesService;

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
        { provide: AuthService, useClass: MockAuthService },
        { provide: CmsService, useClass: MockCmsService },
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: SemanticPathService, useClass: MockSemanticPathService },
        {
          provide: ProtectedRoutesService,
          useClass: MockProtectedRoutesService,
        },
      ],
    });
    authService = TestBed.inject(AuthService);
    logoutGuard = TestBed.inject(LogoutGuard);
    routingService = TestBed.inject(RoutingService);
    router = TestBed.inject(Router);
    protectedRoutesService = TestBed.inject(ProtectedRoutesService);

    zone = TestBed.inject(NgZone);
  });

  describe('When user is authorized,', () => {
    beforeEach(function () {
      spyOn(authService, 'logout').and.callThrough();
    });

    it('should return false', (done) => {
      logoutGuard
        .canActivate()
        .pipe(take(1))
        .subscribe((value) => {
          expect(value).toBe(false);
          done();
        });
    });

    it('should logout and clear user state', async () => {
      await zone.run(() => router.navigateByUrl('/logout'));
      expect(authService.logout).toHaveBeenCalled();
    });

    it('should redirect to home page if app not protected', (done) => {
      spyOnProperty(protectedRoutesService, 'shouldProtect').and.returnValue(
        false
      );

      logoutGuard
        .canActivate()
        .pipe(take(1))
        .subscribe(() => {
          expect(routingService.go).toHaveBeenCalledWith({
            cxRoute: 'home',
          });
          done();
        });
    });

    it('should redirect to login page if app protected', (done) => {
      spyOnProperty(protectedRoutesService, 'shouldProtect').and.returnValue(
        true
      );

      logoutGuard
        .canActivate()
        .pipe(take(1))
        .subscribe(() => {
          expect(routingService.go).toHaveBeenCalledWith({
            cxRoute: 'login',
          });
          done();
        });
    });
  });
});
