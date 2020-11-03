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
import { CdcAuthService } from '../facade/cdc-auth.service';
import { CdcLogoutGuard } from './cdc-logout.guard';

class MockAuthService implements Partial<AuthService> {
  internalLogout() {
    return Promise.resolve();
  }
}

class MockCdcAuthService implements Partial<CdcAuthService> {
  logoutFromCdc() {
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

describe('CdcLogoutGuard', () => {
  let authService: AuthService;
  let cdcAuthService: CdcAuthService;

  let zone: NgZone;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          {
            path: 'logout',
            component: MockPageLayoutComponent,
            canActivate: [CdcLogoutGuard],
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
        { provide: CdcAuthService, useClass: MockCdcAuthService },
        {
          provide: ProtectedRoutesService,
          useClass: MockProtectedRoutesService,
        },
        SemanticPathService,
      ],
    });
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    cdcAuthService = TestBed.inject(CdcAuthService);
    zone = TestBed.inject(NgZone);
  });

  it('should logout in spartacus and from CDC', async () => {
    spyOn(authService, 'internalLogout').and.callThrough();
    spyOn(cdcAuthService, 'logoutFromCdc').and.callThrough();

    await zone.run(() => router.navigateByUrl('/logout'));
    expect(authService.internalLogout).toHaveBeenCalled();
    expect(cdcAuthService.logoutFromCdc).toHaveBeenCalled();
  });
});
