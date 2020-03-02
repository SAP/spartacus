import { TestBed } from '@angular/core/testing';
import { NavigationExtras } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import {
  AuthRedirectService,
  AuthService,
  CartService,
  RoutingService,
  UrlCommands,
  User,
  UserToken,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { CheckoutConfigService } from '../services';
import { CheckoutAuthGuard } from './checkout-auth.guard';

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
  getAssignedUser(): Observable<User> {
    return of();
  }
  isGuestCart(): Boolean {
    return true;
  }
}

class MockAuthRedirectService {
  reportAuthGuard = jasmine.createSpy('reportAuthGuard');
}

class MockCheckoutConfigService {
  isGuestCheckout() {
    return false;
  }
}

describe('CheckoutAuthGuard', () => {
  let checkoutGuard: CheckoutAuthGuard;
  let service: RoutingService;
  let authService: AuthService;
  let authRedirectService: AuthRedirectService;
  let cartService: CartService;
  let checkoutConfigService: CheckoutConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CheckoutAuthGuard,
        {
          provide: RoutingService,
          useClass: RoutingServiceStub,
        },
        {
          provide: AuthRedirectService,
          useClass: MockAuthRedirectService,
        },
        {
          provide: AuthService,
          useClass: AuthServiceStub,
        },
        {
          provide: CartService,
          useClass: CartServiceStub,
        },
        {
          provide: CheckoutConfigService,
          useClass: MockCheckoutConfigService,
        },
      ],
      imports: [RouterTestingModule],
    });
    checkoutGuard = TestBed.inject(CheckoutAuthGuard);
    service = TestBed.inject(RoutingService);
    authService = TestBed.inject(AuthService);
    authRedirectService = TestBed.inject(AuthRedirectService);
    cartService = TestBed.inject(CartService);
    checkoutConfigService = TestBed.inject(CheckoutConfigService);

    spyOn(service, 'go').and.stub();
  });

  describe(', when user is NOT authorized,', () => {
    beforeEach(() => {
      spyOn(authService, 'getUserToken').and.returnValue(
        of({ access_token: undefined } as UserToken)
      );
    });

    describe('and cart does NOT have a user, ', () => {
      beforeEach(() => {
        spyOn(cartService, 'getAssignedUser').and.returnValue(of({}));
        spyOn(cartService, 'isGuestCart').and.returnValue(false);
      });

      it('should return false', () => {
        let result: boolean;
        checkoutGuard
          .canActivate()
          .subscribe(value => (result = value))
          .unsubscribe();
        expect(result).toBe(false);
      });

      it('should redirect to login with forced flag when guestCheckout feature enabled', () => {
        spyOn(checkoutConfigService, 'isGuestCheckout').and.returnValue(true);
        checkoutGuard
          .canActivate()
          .subscribe()
          .unsubscribe();
        expect(service.go).toHaveBeenCalledWith(
          { cxRoute: 'login' },
          { forced: true }
        );
      });

      it('should redirect to login without forced flag when guestCheckout feature disabled', () => {
        checkoutGuard
          .canActivate()
          .subscribe()
          .unsubscribe();
        expect(service.go).toHaveBeenCalledWith({ cxRoute: 'login' });
      });

      it('should notify AuthRedirectService with the current navigation', () => {
        checkoutGuard
          .canActivate()
          .subscribe()
          .unsubscribe();
        expect(authRedirectService.reportAuthGuard).toHaveBeenCalled();
      });
    });

    describe('and cart has a user, ', () => {
      beforeEach(() => {
        spyOn(cartService, 'getAssignedUser').and.returnValue(
          of({ uid: '1234|xxx@xxx.com', name: 'guest' } as User)
        );
      });

      it('should return true', () => {
        let result: boolean;
        checkoutGuard
          .canActivate()
          .subscribe(value => (result = value))
          .unsubscribe();
        expect(result).toBe(true);
      });
    });
  });

  describe(', when user is authorized,', () => {
    beforeEach(() => {
      spyOn(authService, 'getUserToken').and.returnValue(of(mockUserToken));
    });

    describe('and cart does NOT have a user, ', () => {
      beforeEach(() => {
        spyOn(cartService, 'getAssignedUser').and.returnValue(of({}));
      });

      it('should return true', () => {
        let result: boolean;
        checkoutGuard
          .canActivate()
          .subscribe(value => (result = value))
          .unsubscribe();
        expect(result).toBe(true);
      });
    });

    describe('and cart has a user, ', () => {
      beforeEach(() => {
        spyOn(cartService, 'getAssignedUser').and.returnValue(
          of({ uid: '1234|xxx@xxx.com', name: 'guest' } as User)
        );
      });

      it('should return true', () => {
        let result: boolean;
        checkoutGuard
          .canActivate()
          .subscribe(value => (result = value))
          .unsubscribe();
        expect(result).toBe(true);
      });
    });
  });
});
