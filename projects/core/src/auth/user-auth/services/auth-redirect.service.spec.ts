import { Component, NgZone } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Navigation, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { RoutingService } from '../../../routing/facade/routing.service';
import { AuthFlowRoutesService } from './auth-flow-routes.service';
import { AuthRedirectStorageService } from './auth-redirect-storage.service';
import { AuthRedirectService } from './auth-redirect.service';
import {
  CurrencySetEvent,
  CxEvent,
  EventService,
  LanguageSetEvent,
} from '@spartacus/core';
import { Location } from '@angular/common';
import { Subject } from 'rxjs';

const mockEventStream$ = new Subject<CxEvent>();
const mockLocationPath = '/electronics-spa/de/JPY';

class MockRoutingService implements Partial<RoutingService> {
  go = jasmine.createSpy('go');
  goByUrl = jasmine.createSpy('goByUrl');
}

class MockAuthFlowRoutesService implements Partial<AuthFlowRoutesService> {
  isAuthFlow(url: string): boolean {
    return url === '/login';
  }
}

class MockEventService implements Partial<EventService> {
  get = jasmine.createSpy().and.returnValue(mockEventStream$.asObservable());
  dispatch = jasmine.createSpy();
}

class MockLocation implements Partial<Location> {
  path = jasmine.createSpy().and.returnValue(mockLocationPath);
  replaceState = jasmine.createSpy('replaceState');
  isCurrentPathEqualTo = jasmine.createSpy('isCurrentPathEqualTo');
  go = jasmine.createSpy('go');
}

@Component({ selector: 'cx-test-component', template: 'test' })
export class TestComponent {}

describe('AuthRedirectService', () => {
  let service: AuthRedirectService;
  let routingService: RoutingService;
  let router: Router;
  let zone: NgZone;
  let authRedirectStorageService: AuthRedirectStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthRedirectService,
        AuthRedirectStorageService,
        {
          provide: RoutingService,
          useClass: MockRoutingService,
        },
        { provide: AuthFlowRoutesService, useClass: MockAuthFlowRoutesService },
        { provide: EventService, useClass: MockEventService },
        { provide: Location, useClass: MockLocation },
      ],
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'login', component: TestComponent },
          { path: 'some/url', redirectTo: 'some/url/after/redirects' },
          { path: 'some/url/after/redirects', component: TestComponent },
          { path: 'other/url', component: TestComponent },
        ]),
      ],
    });
    service = TestBed.inject(AuthRedirectService);
    routingService = TestBed.inject(RoutingService);
    router = TestBed.inject(Router);
    zone = TestBed.inject(NgZone);

    authRedirectStorageService = TestBed.inject(AuthRedirectStorageService);
    spyOn(authRedirectStorageService, 'setRedirectUrl').and.callThrough();
    spyOn(authRedirectStorageService, 'getRedirectUrl').and.callThrough();
  });

  describe('redirect', () => {
    it('should redirect by to the saved redirect URL', () => {
      authRedirectStorageService.setRedirectUrl('/redirect/url');
      service.redirect();
      expect(authRedirectStorageService.getRedirectUrl).toHaveBeenCalled();
      expect(routingService.goByUrl).toHaveBeenCalledWith('/redirect/url');
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

  it('should save redirect url on language change', () => {
    mockEventStream$.next(new LanguageSetEvent());
    expect(authRedirectStorageService.setRedirectUrl).toHaveBeenCalledWith(
      mockLocationPath
    );
  });

  it('should NOT save redirect url on language change, when the URL is part of the auth flow', async () => {
    await zone.run(() => router.navigateByUrl('/login'));
    mockEventStream$.next(new LanguageSetEvent());
    expect(authRedirectStorageService.setRedirectUrl).toHaveBeenCalledWith(
      mockLocationPath
    );
    expect(authRedirectStorageService.setRedirectUrl).not.toHaveBeenCalledWith(
      '/login'
    );
  });

  it('should save redirect url on currency change', () => {
    mockEventStream$.next(new CurrencySetEvent());
    expect(authRedirectStorageService.setRedirectUrl).toHaveBeenCalledWith(
      mockLocationPath
    );
  });

  it('should NOT save redirect url on currency change, when the URL is part of the auth flow', async () => {
    await zone.run(() => router.navigateByUrl('/login'));
    mockEventStream$.next(new CurrencySetEvent());
    expect(authRedirectStorageService.setRedirectUrl).toHaveBeenCalledWith(
      mockLocationPath
    );
    expect(authRedirectStorageService.setRedirectUrl).not.toHaveBeenCalledWith(
      '/login'
    );
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
    it('should save the passed url', () => {
      service.setRedirectUrl('/custom/url');
      expect(authRedirectStorageService.setRedirectUrl).toHaveBeenCalledWith(
        '/custom/url'
      );
    });
    it('should not save the url if the url is part of the user auth flow', () => {
      service.setRedirectUrl('/login');
      expect(authRedirectStorageService.setRedirectUrl).not.toHaveBeenCalled();
    });
  });
});
