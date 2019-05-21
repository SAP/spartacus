import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthRedirectGuard } from './auth-redirect.guard';
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
        AuthRedirectGuard,
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

  describe('when navigated to auth url and called "redirect"', () => {
    beforeEach(() => {
      service.reportNavigation('/test', '/login');
      service.redirect();
    });

    it('user should be navigated to previous url', () => {
      expect(routingService.goByUrl).toHaveBeenCalledWith('/test');
    });

    it('calling "redirect" again should navigate to the home page', () => {
      service.redirect();
      expect(routingService.go).toHaveBeenCalledWith('/');
    });
  });

  describe('when navigated to one auth url, then to other auth url and then called "redirect"', () => {
    beforeEach(() => {
      service.reportNavigation('/test', '/login');
      service.reportNavigation('/login', '/register');
      service.redirect();
    });

    it('user should be navigated to the first url that came from', () => {
      expect(routingService.goByUrl).toHaveBeenCalledWith('/test');
    });
  });
});
