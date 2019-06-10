import { NgZone, Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';

import {
  AuthService,
  CmsService,
  RoutingService,
  SemanticPathService,
} from '@spartacus/core';
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
  go() {}
}

class MockSemanticPathService {
  get() {}
}

describe('LogoutGuard', () => {
  let logoutGuard: LogoutGuard;
  let authService: AuthService;

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
      ],
    });
    authService = TestBed.get(AuthService);
    logoutGuard = TestBed.get(LogoutGuard);
    router = TestBed.get(Router);

    zone = TestBed.get(NgZone);
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
  });
});
