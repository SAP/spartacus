import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { take } from 'rxjs/operators';
import { RoutingService } from '../../../routing/facade/routing.service';
import { AuthRedirectStorageService } from './auth-redirect-storage.service';
import { AuthRedirectService } from './auth-redirect.service';

class MockRoutingService {
  go = jasmine.createSpy('go');
  goByUrl = jasmine.createSpy('goByUrl');
}

describe('AuthRedirectService', () => {
  let service: AuthRedirectService;
  let routingService: RoutingService;
  let router: Router;
  let authRedirectStorageService: AuthRedirectStorageService;

  beforeEach(() => {
    const mockRouter = {
      url: '',
      getCurrentNavigation: () => {},
      serializeUrl: (x) => x,
    };

    TestBed.configureTestingModule({
      providers: [
        AuthRedirectService,
        AuthRedirectStorageService,
        {
          provide: RoutingService,
          useClass: MockRoutingService,
        },
        { provide: Router, useValue: mockRouter },
      ],
      imports: [RouterTestingModule],
    });
    service = TestBed.inject(AuthRedirectService);
    routingService = TestBed.inject(RoutingService);
    authRedirectStorageService = TestBed.inject(AuthRedirectStorageService);
    router = TestBed.inject(Router);
  });

  describe('redirect', () => {
    it('should redirect to the home page', () => {
      service.redirect();
      expect(routingService.go).toHaveBeenCalledWith('/');
    });

    describe(', when just opened url with NotAuthGuard,', () => {
      beforeEach(() => {
        router['url' as any] = '/test';
        spyOn(router, 'getCurrentNavigation').and.returnValue({
          id: 1,
          finalUrl: '/login',
        } as any);
        service.reportNotAuthGuard();

        service.redirect();
      });

      it('should redirect to the previous url', () => {
        expect(routingService.goByUrl).toHaveBeenCalledWith('/test');
      });
    });

    describe(', when just opened sequentially two urls with NotAuthGuard,', () => {
      beforeEach(() => {
        spyOn(router, 'getCurrentNavigation').and.returnValues(
          { id: 1, finalUrl: '/login' } as any,
          { id: 2, finalUrl: '/register' } as any
        );

        router['url' as any] = '/test';
        service.reportNotAuthGuard();
        router['url' as any] = '/login';
        service.reportNotAuthGuard();

        service.redirect();
      });

      it('should redirect to the very first url', () => {
        expect(routingService.goByUrl).toHaveBeenCalledWith('/test');
      });
    });

    describe(', when AuthGuard just blocked url and redirected to url with NotAuthGuard,', () => {
      beforeEach(() => {
        spyOn(router, 'getCurrentNavigation').and.returnValues(
          { id: 1, finalUrl: '/my-account' } as any,
          { id: 2, finalUrl: '/register' } as any
        );
        router['url' as any] = '/test';
        service.reportAuthGuard();
        service.reportNotAuthGuard();

        service.redirect();
      });

      it('should redirect to the url blocked by AuthGuard', () => {
        expect(routingService.goByUrl).toHaveBeenCalledWith('/my-account');
      });
    });

    describe(', when AuthGuard blocked url, then opened manually different url, and then opened url with NotAuthGuard,', () => {
      beforeEach(() => {
        spyOn(router, 'getCurrentNavigation').and.returnValues(
          { id: 1, finalUrl: '/my-account' } as any,
          { id: 3, finalUrl: '/register' } as any // id 3 matters here
        );

        router['url' as any] = '/test';
        service.reportAuthGuard();
        router['url' as any] = '/test2';
        service.reportNotAuthGuard();

        service.redirect();
      });

      it('should redirect to the previous url', () => {
        expect(routingService.goByUrl).toHaveBeenCalledWith('/test2');
      });
    });
  });

  describe('setCurrentUrlAsRedirectUrl', () => {
    it('should set current url in auth redirect storage service', () => {
      spyOn(authRedirectStorageService, 'getRedirectUrl').and.callThrough();
      (router as any).url = '/test';

      service.setCurrentUrlAsRedirectUrl();

      authRedirectStorageService
        .getRedirectUrl()
        .pipe(take(1))
        .subscribe((val) => {
          expect(val).toBe('/test');
        });
    });
  });
});
