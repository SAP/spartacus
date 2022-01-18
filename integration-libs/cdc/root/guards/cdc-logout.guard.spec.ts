import { Component, NgZone } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import {
  AuthRedirectService,
  AuthService,
  CmsService,
  ProtectedRoutesService,
  RoutingConfig,
  SemanticPathService,
  WindowRef,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { CdcLogoutGuard } from './cdc-logout.guard';

class MockAuthService implements Partial<AuthService> {
  coreLogout() {
    return Promise.resolve();
  }
}

const gigya = {
  accounts: {
    logout: (): void => {},
  },
};

const mockedWindowRef = {
  nativeWindow: {
    gigya: gigya,
  },
};

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

class MockAuthRedirectService implements Partial<AuthRedirectService> {
  reportNotAuthGuard() {}
}

describe('CdcLogoutGuard', () => {
  let authService: AuthService;
  let winRef: WindowRef;
  let guard: CdcLogoutGuard;

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
        { provide: WindowRef, useValue: mockedWindowRef },
        {
          provide: ProtectedRoutesService,
          useClass: MockProtectedRoutesService,
        },
        {
          provide: AuthRedirectService,
          useClass: MockAuthRedirectService,
        },
        SemanticPathService,
      ],
    });
    authService = TestBed.inject(AuthService);
    winRef = TestBed.inject(WindowRef);
    router = TestBed.inject(Router);
    zone = TestBed.inject(NgZone);
    guard = TestBed.inject(CdcLogoutGuard);
  });

  it('logoutFromCdc should logout user from CDC', () => {
    const cdcLogout = spyOn(
      winRef.nativeWindow['gigya']?.accounts,
      'logout'
    ).and.stub();
    guard['logoutFromCdc']();

    expect(cdcLogout).toHaveBeenCalled();
  });

  it('should logout in spartacus and from CDC', async () => {
    spyOn(authService, 'coreLogout').and.callThrough();
    spyOn(guard as any, 'logoutFromCdc').and.callThrough();

    await zone.run(() => router.navigateByUrl('/logout'));
    expect(authService.coreLogout).toHaveBeenCalled();
    expect(guard['logoutFromCdc']).toHaveBeenCalled();
  });
});
