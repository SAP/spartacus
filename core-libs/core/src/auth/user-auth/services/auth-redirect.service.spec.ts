import { Component, NgZone } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  CanActivateFn,
  Navigation,
  Router,
  RouterModule,
  UrlTree,
} from '@angular/router';
import {
  FeatureConfigService,
  SiteContextUrlParams,
  SiteContextUrlSerializer,
} from '@spartacus/core';
import { RoutingService } from '../../../routing/facade/routing.service';
import { AuthFlowRoutesService } from './auth-flow-routes.service';
import { AuthRedirectStorageService } from './auth-redirect-storage.service';
import { AuthRedirectService } from './auth-redirect.service';

class MockRoutingService implements Partial<RoutingService> {
  go = jasmine.createSpy('go');
  goByUrl = jasmine.createSpy('goByUrl');
}

class MockAuthFlowRoutesService implements Partial<AuthFlowRoutesService> {
  isAuthFlow(url: string): boolean {
    return url === '/login';
  }
}

class MockSiteContextUrlSerializer
  implements Partial<SiteContextUrlSerializer>
{
  urlExtractContextParameters(url: string): {
    url: string;
    params: SiteContextUrlParams;
  } {
    return { url, params: { language: 'en', currency: 'jpy' } };
  }
}

@Component({
  selector: 'cx-test-component',
  template: 'test',
})
export class TestComponent {}

describe('AuthRedirectService', () => {
  let service: AuthRedirectService;
  let routingService: RoutingService;
  let router: Router;
  let zone: NgZone;
  let authRedirectStorageService: AuthRedirectStorageService;
  let siteContextUrlSerializer: SiteContextUrlSerializer;

  const routes = [
    { path: 'login', component: TestComponent },
    { path: 'some/url', redirectTo: 'some/url/after/redirects' },
    { path: 'some/url/after/redirects', component: TestComponent },
    { path: 'other/url', component: TestComponent },
    {
      path: 'guarded/url',
      component: TestComponent,
      canActivate: [
        (): UrlTree => TestBed.inject(Router).parseUrl('/other/url'),
      ] as CanActivateFn[],
    },
  ];

  function configureTestingModule() {
    TestBed.configureTestingModule({
      providers: [
        AuthRedirectService,
        AuthRedirectStorageService,
        FeatureConfigService,
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: AuthFlowRoutesService, useClass: MockAuthFlowRoutesService },
        {
          provide: SiteContextUrlSerializer,
          useClass: MockSiteContextUrlSerializer,
        },
      ],
      imports: [RouterModule.forRoot(routes)],
    });
  }

  beforeEach(() => {
    configureTestingModule();
    service = TestBed.inject(AuthRedirectService);
    routingService = TestBed.inject(RoutingService);
    router = TestBed.inject(Router);
    zone = TestBed.inject(NgZone);
    authRedirectStorageService = TestBed.inject(AuthRedirectStorageService);
    siteContextUrlSerializer = TestBed.inject(SiteContextUrlSerializer);

    spyOn(authRedirectStorageService, 'setRedirectUrl').and.callThrough();
    spyOn(authRedirectStorageService, 'getRedirectUrl').and.callThrough();
  });

  describe('redirect', () => {
    it('should redirect by to the saved redirect URL', () => {
      const redirectUrl = '/redirect/url';
      authRedirectStorageService.setRedirectUrl(redirectUrl);
      service.redirect();
      expect(authRedirectStorageService.getRedirectUrl).toHaveBeenCalled();
      expect(routingService.goByUrl).toHaveBeenCalledWith(redirectUrl);
    });

    it('should redirect to home page when there was no saved redirect URL', () => {
      authRedirectStorageService.setRedirectUrl(undefined);
      service.redirect();
      expect(authRedirectStorageService.getRedirectUrl).toHaveBeenCalled();
      expect(routingService.go).toHaveBeenCalledWith('/');
    });

    it('should clear saved redirect URL', () => {
      service.redirect();
      expect(authRedirectStorageService.setRedirectUrl).toHaveBeenCalledWith(
        undefined
      );
    });
  });

  it('should save redirect url on every navigation end', async () => {
    await zone.run(() => router.navigateByUrl('/some/url'));
    expect(authRedirectStorageService.setRedirectUrl).toHaveBeenCalledWith(
      '/some/url/after/redirects'
    );

    await zone.run(() => router.navigateByUrl('/other/url'));
    expect(authRedirectStorageService.setRedirectUrl).toHaveBeenCalledWith(
      '/other/url'
    );
  });

  it('should NOT save redirect url on navigation end, when the URL is part of the auth flow', async () => {
    await zone.run(() => router.navigateByUrl('/login'));
    expect(authRedirectStorageService.setRedirectUrl).not.toHaveBeenCalledWith(
      '/login'
    );
    await zone.run(() => router.navigateByUrl('/other/url'));

    expect(authRedirectStorageService.setRedirectUrl).toHaveBeenCalledWith(
      '/other/url'
    );
  });

  describe('when redirectOnlyOnTrueNavigationEnd is enabled', () => {
    beforeEach(() => {
      TestBed.resetTestingModule();
      configureTestingModule();
      authRedirectStorageService = TestBed.inject(AuthRedirectStorageService);
      router = TestBed.inject(Router);
      zone = TestBed.inject(NgZone);
      const featureConfigService = TestBed.inject(FeatureConfigService);
      spyOn(authRedirectStorageService, 'setRedirectUrl').and.callThrough();
      spyOn(featureConfigService, 'isEnabled').and.returnValue(true);

      TestBed.inject(AuthRedirectService);
    });

    it('should NOT save redirect url when NavigationEnd was caused by a guard redirect (UrlTree)', async () => {
      await zone.run(() => router.navigateByUrl('/some/url/after/redirects'));
      (authRedirectStorageService.setRedirectUrl as jasmine.Spy).calls.reset();

      await zone.run(() => router.navigateByUrl('/guarded/url'));

      expect(
        authRedirectStorageService.setRedirectUrl
      ).not.toHaveBeenCalledWith('/other/url');
    });
  });

  describe('saveCurrentNavigationUrl', () => {
    it('should save the url of the current navigation', () => {
      spyOn(router, 'getCurrentNavigation').and.returnValue(<Navigation>{
        finalUrl: router.parseUrl('/anticipated/url'),
      });
      service.saveCurrentNavigationUrl();
      expect(authRedirectStorageService.setRedirectUrl).toHaveBeenCalledWith(
        '/anticipated/url'
      );
    });

    it('should NOT save the url of the current navigation if it is a part of the auth flow', () => {
      spyOn(router, 'getCurrentNavigation').and.returnValue(<Navigation>{
        initialUrl: router.parseUrl('/login'),
        finalUrl: router.parseUrl('/login'),
      });
      service.saveCurrentNavigationUrl();
      expect(authRedirectStorageService.setRedirectUrl).not.toHaveBeenCalled();
    });

    it('should NOT save the url when there is no pending navigation', () => {
      spyOn(router, 'getCurrentNavigation').and.returnValue(null);
      service.saveCurrentNavigationUrl();
      expect(authRedirectStorageService.setRedirectUrl).not.toHaveBeenCalled();
    });

    it('should NOT save the url when finalUrl was not yet determined for the current navigation (before RouteRecognized event happened)', () => {
      spyOn(router, 'getCurrentNavigation').and.returnValue(<Navigation>{
        initialUrl: router.parseUrl('/login'),
        finalUrl: undefined,
      });
      service.saveCurrentNavigationUrl();
      expect(authRedirectStorageService.setRedirectUrl).not.toHaveBeenCalled();
    });
  });

  describe('setRedirectUrl', () => {
    it('should save the passed url without site context parameters', () => {
      spyOn<any>(service, 'getUrlWithoutSiteContextParams').and.returnValue(
        '/c/123'
      );
      service.setRedirectUrl('/custom/url/en/USD/c/123');
      expect(authRedirectStorageService.setRedirectUrl).toHaveBeenCalledWith(
        '/c/123'
      );
    });

    it('should not save the url if the url is part of the user auth flow', () => {
      service.setRedirectUrl('/login');
      expect(authRedirectStorageService.setRedirectUrl).not.toHaveBeenCalled();
    });
  });

  describe('getUrlWithoutSiteContextParams', () => {
    it('should return url without site context parameters', () => {
      const inputUrl = '/custom/url/en/USD/c/123';
      spyOn(
        siteContextUrlSerializer,
        'urlExtractContextParameters'
      ).and.callThrough();
      const result = (service as any).getUrlWithoutSiteContextParams(inputUrl);
      expect(result).toEqual(jasmine.any(String));
      expect(
        siteContextUrlSerializer.urlExtractContextParameters
      ).toHaveBeenCalledWith(inputUrl);
    });
  });
});
