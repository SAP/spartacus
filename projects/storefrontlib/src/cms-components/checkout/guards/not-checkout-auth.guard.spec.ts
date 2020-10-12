import { TestBed } from '@angular/core/testing';
import { NavigationExtras } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import {
  ActiveCartService,
  AuthService,
  RoutingService,
  UrlCommands,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { NotCheckoutAuthGuard } from './not-checkout-auth.guard';

class AuthServiceStub {
  isUserLoggedIn(): Observable<boolean> {
    return of();
  }
}

class RoutingServiceStub {
  go(_path: any[] | UrlCommands, _query?: object, _extras?: NavigationExtras) {}
}

class CartServiceStub {
  isGuestCart(): Boolean {
    return true;
  }
}
describe('NotCheckoutAuthGuard', () => {
  let guard: NotCheckoutAuthGuard;
  let authService: AuthServiceStub;
  let routing: RoutingService;
  let activeCartService: ActiveCartService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: RoutingService, useClass: RoutingServiceStub },
        { provide: AuthService, useClass: AuthServiceStub },
        {
          provide: ActiveCartService,
          useClass: CartServiceStub,
        },
      ],
      imports: [RouterTestingModule],
    });
    authService = TestBed.inject(AuthService);
    guard = TestBed.inject(NotCheckoutAuthGuard);
    routing = TestBed.inject(RoutingService);
    activeCartService = TestBed.inject(ActiveCartService);
  });

  describe('when user is authorized,', () => {
    beforeEach(() => {
      spyOn(authService, 'isUserLoggedIn').and.returnValue(of(true));
    });

    it('should return false', () => {
      let result: boolean;
      guard
        .canActivate()
        .subscribe((value) => (result = value))
        .unsubscribe();

      expect(result).toBe(false);
    });

    it('should redirect to homepage', () => {
      spyOn(routing, 'go');
      guard.canActivate().subscribe().unsubscribe();
      expect(routing.go).toHaveBeenCalledWith({ cxRoute: 'home' });
    });
  });

  describe('when user is NOT authorized, but user is guest', () => {
    beforeEach(() => {
      spyOn(authService, 'isUserLoggedIn').and.returnValue(of(false));
    });

    it('should return false', () => {
      let result: boolean;
      guard
        .canActivate()
        .subscribe((value) => (result = value))
        .unsubscribe();

      expect(result).toBe(false);
    });

    it('should redirect to cart page', () => {
      spyOn(routing, 'go');
      guard.canActivate().subscribe().unsubscribe();
      expect(routing.go).toHaveBeenCalledWith({ cxRoute: 'cart' });
    });
  });

  describe('when user is NOT authorized nor guest', () => {
    beforeEach(() => {
      spyOn(authService, 'isUserLoggedIn').and.returnValue(of(false));
      spyOn(activeCartService, 'isGuestCart').and.returnValue(false);
    });

    it('should return true', () => {
      let result: boolean;
      guard
        .canActivate()
        .subscribe((value) => (result = value))
        .unsubscribe();

      expect(result).toBe(true);
    });
  });
});
