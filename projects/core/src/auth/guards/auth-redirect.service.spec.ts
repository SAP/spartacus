import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthRedirectService } from './auth-redirect.service';
import { RoutingService } from '../../routing/facade/routing.service';

class MockRoutingService {
  go = jasmine.createSpy('go');
  goByUrl = jasmine.createSpy('goByUrl');
}

describe('AuthRedirectService', () => {
  let service: AuthRedirectService;
  let routingService: RoutingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthRedirectService,
        {
          provide: RoutingService,
          useClass: MockRoutingService,
        },
      ],
      imports: [RouterTestingModule],
    });
    service = TestBed.get(AuthRedirectService);
    routingService = TestBed.get(RoutingService);
  });

  describe('redirect', () => {
    it('should redirect to the home page', () => {
      service.redirect();
      expect(routingService.go).toHaveBeenCalledWith('/');
    });

    describe(', when just opened url with NotAuthGuard,', () => {
      beforeEach(() => {
        service.reportNotAuthGuard('/test', '/login', 1);
        service.redirect();
      });

      it('should redirect to the previous url', () => {
        expect(routingService.goByUrl).toHaveBeenCalledWith('/test');
      });
    });

    describe(', when just opened sequentially two urls with NotAuthGuard,', () => {
      beforeEach(() => {
        service.reportNotAuthGuard('/test', '/login', 1);
        service.reportNotAuthGuard('/login', '/register', 2);
        service.redirect();
      });

      it('should redirect to the very first url', () => {
        expect(routingService.goByUrl).toHaveBeenCalledWith('/test');
      });
    });

    describe(', when AuthGuard just blocked url and redirected to url with NotAuthGuard,', () => {
      beforeEach(() => {
        service.reportAuthGuard('/my-account', 1);
        service.reportNotAuthGuard('/test', '/register', 2);
        service.redirect();
      });

      it('should redirect to the url blocked by AuthGuard', () => {
        expect(routingService.goByUrl).toHaveBeenCalledWith('/my-account');
      });
    });

    describe(', when AuthGuard blocked url, then opened manually different url, and then opened url with NotAuthGuard,', () => {
      beforeEach(() => {
        service.reportAuthGuard('/my-account', 1);
        service.reportNotAuthGuard('/test', '/register', 3);
        service.redirect();
      });

      it('should redirect to the previous url', () => {
        expect(routingService.goByUrl).toHaveBeenCalledWith('/test');
      });
    });
  });
});
