import { TestBed } from '@angular/core/testing';
import { NavigationExtras } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import {
  AuthService,
  CartService,
  RoutingService,
  UrlCommands,
  UserToken,
} from '@spartacus/core';
import { NotCheckoutAuthGuard } from './not-checkout-auth.guard';

const mockUserToken = {
  access_token: 'Mock Access Token',
  token_type: 'test',
  refresh_token: 'test',
  expires_in: 1,
  scope: ['test'],
  userId: 'test',
} as UserToken;

class AuthServiceStub {
  getUserToken(): Observable<UserToken> {
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
  let cartService: CartService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: RoutingService, useClass: RoutingServiceStub },
        { provide: AuthService, useClass: AuthServiceStub },
        {
          provide: CartService,
          useClass: CartServiceStub,
        },
      ],
      imports: [RouterTestingModule],
    });
    authService = TestBed.inject(AuthService);
    guard = TestBed.inject(NotCheckoutAuthGuard);
    routing = TestBed.inject(RoutingService);
    cartService = TestBed.inject(CartService);
  });

  describe('when user is authorized,', () => {
    beforeEach(() => {
      spyOn(authService, 'getUserToken').and.returnValue(of(mockUserToken));
    });

    it('should return false', () => {
      let result: boolean;
      guard
        .canActivate()
        .subscribe(value => (result = value))
        .unsubscribe();

      expect(result).toBe(false);
    });

    it('should redirect to homepage', () => {
      spyOn(routing, 'go');
      guard
        .canActivate()
        .subscribe()
        .unsubscribe();
      expect(routing.go).toHaveBeenCalledWith({ cxRoute: 'home' });
    });
  });

  describe('when user is NOT authorized, but user is guest', () => {
    beforeEach(() => {
      spyOn(authService, 'getUserToken').and.returnValue(
        of({ access_token: undefined } as UserToken)
      );
    });

    it('should return false', () => {
      let result: boolean;
      guard
        .canActivate()
        .subscribe(value => (result = value))
        .unsubscribe();

      expect(result).toBe(false);
    });

    it('should redirect to cart page', () => {
      spyOn(routing, 'go');
      guard
        .canActivate()
        .subscribe()
        .unsubscribe();
      expect(routing.go).toHaveBeenCalledWith({ cxRoute: 'cart' });
    });
  });

  describe('when user is NOT authorized nor guest', () => {
    beforeEach(() => {
      spyOn(authService, 'getUserToken').and.returnValue(
        of({ access_token: undefined } as UserToken)
      );
      spyOn(cartService, 'isGuestCart').and.returnValue(false);
    });

    it('should return true', () => {
      let result: boolean;
      guard
        .canActivate()
        .subscribe(value => (result = value))
        .unsubscribe();

      expect(result).toBe(true);
    });
  });
});
