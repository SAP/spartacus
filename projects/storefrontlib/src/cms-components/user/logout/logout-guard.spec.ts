import { Component, NgZone } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import {
  AuthService,
  CmsService,
  FeatureConfigService,
  ProtectedRoutesService,
  RoutingService,
  SemanticPathService,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { LogoutGuard } from './logout-guard';

class MockAuthService {
  logout() {}
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

class MockFeatureConfigService {
  isLevel() {
    return false;
  }
}

describe('LogoutGuard', () => {
  let logoutGuard: LogoutGuard;
  let authService: AuthService;
  let routingService: RoutingService;
  let featureConfigService: FeatureConfigService;
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
        {
          provide: FeatureConfigService,
          useClass: MockFeatureConfigService,
        },
      ],
    });
    authService = TestBed.inject(AuthService);
    logoutGuard = TestBed.inject(LogoutGuard);
    routingService = TestBed.inject(RoutingService);
    router = TestBed.inject(Router);
    featureConfigService = TestBed.inject(FeatureConfigService);
    protectedRoutesService = TestBed.inject(ProtectedRoutesService);

    zone = TestBed.inject(NgZone);
  });

  describe('When user is authorised,', () => {
    beforeEach(function() {
      spyOn(authService, 'logout');
    });

    it('should return false', () => {
      let result: boolean;
      logoutGuard
        .canActivate()
        .subscribe(value => (result = value))
        .unsubscribe();

      expect(result).toBe(false);
    });

    it('should logout and clear user state', async () => {
      await zone.run(() => router.navigateByUrl('/logout'));
      expect(authService.logout).toHaveBeenCalled();
    });

    // TODO(issue:5666) Deprecated since 1.4
    it('should redirect to home page', () => {
      spyOn(featureConfigService, 'isLevel').and.returnValue(false);
      logoutGuard.canActivate().subscribe();

      expect(routingService.go).toHaveBeenCalledWith({
        cxRoute: 'home',
      });
    });

    // TODO(issue:5666) Deprecated since 1.4
    it('should redirect to home page if app not protected', () => {
      spyOn(featureConfigService, 'isLevel').and.returnValue(true);

      spyOnProperty(protectedRoutesService, 'shouldProtect').and.returnValue(
        false
      );

      logoutGuard.canActivate().subscribe();

      expect(routingService.go).toHaveBeenCalledWith({
        cxRoute: 'home',
      });
    });

    // TODO(issue:5666) Deprecated since 1.4
    it('should redirect to login page if app protected', () => {
      spyOn(featureConfigService, 'isLevel').and.returnValue(true);

      spyOnProperty(protectedRoutesService, 'shouldProtect').and.returnValue(
        true
      );

      logoutGuard.canActivate().subscribe();

      expect(routingService.go).toHaveBeenCalledWith({
        cxRoute: 'login',
      });
    });
  });
});
