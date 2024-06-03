import { TestBed } from '@angular/core/testing';
import { UrlTree } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ActiveCartFacade } from '@spartacus/cart/base/root';
import {
  AuthRedirectService,
  AuthService,
  GlobalMessageService,
  SemanticPathService,
} from '@spartacus/core';
import { User } from '@spartacus/user/account/root';
import { EMPTY, of } from 'rxjs';
import { CheckoutConfigService } from '../services/checkout-config.service';
import { CheckoutAuthGuard } from './checkout-auth.guard';
import createSpy = jasmine.createSpy;

class AuthServiceStub implements Partial<AuthService> {
  isUserLoggedIn = createSpy().and.returnValue(EMPTY);
}

class ActiveCartServiceStub implements Partial<ActiveCartFacade> {
  getAssignedUser = createSpy().and.returnValue(EMPTY);
  isGuestCart = createSpy().and.returnValue(of(true));
  isStable = createSpy().and.returnValue(of(true));
}

class MockSemanticPathService implements Partial<SemanticPathService> {
  get = createSpy().and.returnValue(`/login`);
}

class MockAuthRedirectService implements Partial<AuthRedirectService> {
  saveCurrentNavigationUrl = createSpy();
}

class MockCheckoutConfigService implements Partial<CheckoutConfigService> {
  isGuestCheckout = createSpy().and.returnValue(false);
}

class MockGlobalMessageService implements Partial<GlobalMessageService> {
  add = createSpy();
}

describe('CheckoutAuthGuard', () => {
  let checkoutGuard: CheckoutAuthGuard;
  let authService: AuthService;
  let authRedirectService: AuthRedirectService;
  let activeCartService: ActiveCartFacade;
  let checkoutConfigService: CheckoutConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CheckoutAuthGuard,
        {
          provide: SemanticPathService,
          useClass: MockSemanticPathService,
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
          provide: ActiveCartFacade,
          useClass: ActiveCartServiceStub,
        },
        {
          provide: CheckoutConfigService,
          useClass: MockCheckoutConfigService,
        },
        {
          provide: GlobalMessageService,
          useClass: MockGlobalMessageService,
        },
      ],
      imports: [RouterTestingModule],
    });
    checkoutGuard = TestBed.inject(CheckoutAuthGuard);
    authService = TestBed.inject(AuthService);
    authRedirectService = TestBed.inject(AuthRedirectService);
    activeCartService = TestBed.inject(ActiveCartFacade);
    checkoutConfigService = TestBed.inject(CheckoutConfigService);
  });

  describe(', when user is NOT authorized,', () => {
    beforeEach(() => {
      authService.isUserLoggedIn = createSpy().and.returnValue(of(false));
    });

    describe('and cart does NOT have a user, ', () => {
      beforeEach(() => {
        activeCartService.getAssignedUser = createSpy().and.returnValue(of({}));
        activeCartService.isGuestCart = createSpy().and.returnValue(of(false));
      });

      it('should return url to login with forced flag when guestCheckout feature enabled', () => {
        checkoutConfigService.isGuestCheckout =
          createSpy().and.returnValue(true);

        let result: boolean | UrlTree | undefined;
        checkoutGuard
          .canActivate()
          .subscribe((value) => (result = value))
          .unsubscribe();
        expect(result?.toString()).toEqual(`/login?forced=true`);
      });

      it('should return url to login without forced flag when guestCheckout feature disabled', () => {
        let result: boolean | UrlTree | undefined;
        checkoutGuard
          .canActivate()
          .subscribe((value) => (result = value))
          .unsubscribe();
        expect(result?.toString()).toEqual(`/login`);
      });

      it('should notify AuthRedirectService with the current navigation', () => {
        checkoutGuard.canActivate().subscribe().unsubscribe();
        expect(authRedirectService.saveCurrentNavigationUrl).toHaveBeenCalled();
      });
    });

    describe('and cart has a user, ', () => {
      beforeEach(() => {
        activeCartService.getAssignedUser = createSpy().and.returnValue(
          of(of({ uid: '1234|xxx@xxx.com', name: 'guest' } as User))
        );
      });

      it('should return true', () => {
        let result: boolean | UrlTree | undefined;
        checkoutGuard
          .canActivate()
          .subscribe((value) => (result = value))
          .unsubscribe();
        expect(result).toBe(true);
      });
    });
  });

  describe(', when user is in checkout pages,', () => {
    it('should NOT redirect route when cart is unstable', () => {
      activeCartService.isStable = createSpy().and.returnValue(of(false));
      activeCartService.isGuestCart = createSpy().and.returnValue(of(false));
      authService.isUserLoggedIn = createSpy().and.returnValue(of(true));

      checkoutGuard.canActivate().subscribe().unsubscribe();
      expect(
        authRedirectService.saveCurrentNavigationUrl
      ).not.toHaveBeenCalled();
    });
  });

  describe(', when user is authorized,', () => {
    beforeEach(() => {
      authService.isUserLoggedIn = createSpy().and.returnValue(of(true));
    });

    describe('and cart does NOT have a user, ', () => {
      beforeEach(() => {
        activeCartService.getAssignedUser = createSpy().and.returnValue(of({}));
      });

      it('should return true', () => {
        let result: boolean | UrlTree | undefined;
        checkoutGuard
          .canActivate()
          .subscribe((value) => (result = value))
          .unsubscribe();
        expect(result).toBe(true);
      });
    });

    describe('and cart has a user, ', () => {
      beforeEach(() => {
        activeCartService.getAssignedUser = createSpy().and.returnValue(
          of(of({ uid: '1234|xxx@xxx.com', name: 'guest' } as User))
        );
      });

      it('should redirect to same route when cart is stable', () => {
        let result: boolean | undefined;
        checkoutGuard
          .canActivate()
          .subscribe((value) => (result = value != null))
          .unsubscribe();
        expect(result).toBeTruthy();
      });

      it('should return true', () => {
        let result: boolean | UrlTree | undefined;
        checkoutGuard
          .canActivate()
          .subscribe((value) => (result = value))
          .unsubscribe();
        expect(result).toBe(true);
      });
    });
  });
});
