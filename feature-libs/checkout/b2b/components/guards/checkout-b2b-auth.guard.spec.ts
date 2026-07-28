import { TestBed } from '@angular/core/testing';
import { RedirectCommand, UrlTree } from '@angular/router';
import { ActiveCartFacade } from '@spartacus/cart/base/root';
import { CheckoutConfigService } from '@spartacus/checkout/base/components';
import {
  AuthRedirectService,
  AuthService,
  B2BUserRole,
  FeatureToggles,
  GlobalMessageService,
  GlobalMessageType,
  SemanticPathService,
  WindowRef,
} from '@spartacus/core';
import { IS_GUEST_USER_CHECKOUT_KEY } from '@spartacus/storefront';
import { User, UserAccountFacade } from '@spartacus/user/account/root';
import { EMPTY, Observable, of } from 'rxjs';
import { CheckoutB2BAuthGuard } from './checkout-b2b-auth.guard';
import { provideMockFeatureToggles } from '../../../../../core-libs/core/src/features-config/feature-toggles/testing';


class AuthServiceStub implements Partial<AuthService> {
  isUserLoggedIn(): Observable<boolean> {
    return EMPTY;
  }
}

class ActiveCartServiceStub implements Partial<ActiveCartFacade> {
  getAssignedUser(): Observable<User> {
    return EMPTY;
  }
  isGuestCart(): Observable<boolean> {
    return of(true);
  }
  isStable(): Observable<boolean> {
    return of(true);
  }
}

class SemanticPathServiceStub implements Partial<SemanticPathService> {
  get(a: string) {
    return `/${a}`;
  }
}

class MockAuthRedirectService implements Partial<AuthRedirectService> {
  saveCurrentNavigationUrl = vi.fn();
}

class MockCheckoutConfigService implements Partial<CheckoutConfigService> {
  isGuestCheckout() {
    return false;
  }
}

class MockUserAccountFacade implements Partial<UserAccountFacade> {
  get(): Observable<User> {
    return of({});
  }
}

class MockGlobalMessageService implements Partial<GlobalMessageService> {
  add = vi.fn();
}

const mockFeatureToggles: FeatureToggles = {
  authorizationCodeFlowByDefault: false,
};

const mockWindowRef = {
  localStorage: {
    setItem: vi.fn(),
  },
};

describe('CheckoutAuthGuard', () => {
  let checkoutGuard: CheckoutB2BAuthGuard;
  let authService: AuthService;
  let authRedirectService: AuthRedirectService;
  let activeCartFacade: ActiveCartFacade;
  let checkoutConfigService: CheckoutConfigService;
  let userService: UserAccountFacade;
  let globalMessageService: GlobalMessageService;
  let featureToggles: FeatureToggles;
  let windowRef: WindowRef;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CheckoutB2BAuthGuard,
        {
          provide: SemanticPathService,
          useClass: SemanticPathServiceStub,
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
          provide: UserAccountFacade,
          useClass: MockUserAccountFacade,
        },
        {
          provide: GlobalMessageService,
          useClass: MockGlobalMessageService,
        },
        provideMockFeatureToggles({ ...mockFeatureToggles }),
        {
          provide: WindowRef,
          useValue: mockWindowRef,
        },
      ],
    });
    checkoutGuard = TestBed.inject(CheckoutB2BAuthGuard);
    authService = TestBed.inject(AuthService);
    authRedirectService = TestBed.inject(AuthRedirectService);
    activeCartFacade = TestBed.inject(ActiveCartFacade);
    checkoutConfigService = TestBed.inject(CheckoutConfigService);
    userService = TestBed.inject(UserAccountFacade);
    globalMessageService = TestBed.inject(GlobalMessageService);
    featureToggles = TestBed.inject(FeatureToggles);
    windowRef = TestBed.inject(WindowRef);
  });

  describe(', when user is NOT authorized,', () => {
    beforeEach(() => {
      vi.spyOn(authService, 'isUserLoggedIn').mockReturnValue(of(false));
    });

    describe('and cart does NOT have a user, ', () => {
      beforeEach(() => {
        vi.spyOn(activeCartFacade, 'getAssignedUser').mockReturnValue(of({}));
        vi.spyOn(activeCartFacade, 'isGuestCart').mockReturnValue(of(false));
      });

      describe('when authorizationCodeFlowByDefault feature flag is enabled', () => {
        beforeEach(() => {
          featureToggles.authorizationCodeFlowByDefault = true;
        });

        it('should return url to login without forced flag when guestCheckout feature disabled', () => {
          let result: boolean | UrlTree | RedirectCommand | undefined;
          checkoutGuard
            .canActivate()
            .subscribe((value) => (result = value))
            .unsubscribe();
          expect(result?.toString()).toEqual(`/login`);
          expect(windowRef.localStorage?.setItem).not.toHaveBeenCalled();
        });

        it('should return url to login with forced flag when guestCheckout feature enabled', () => {
          vi.spyOn(checkoutConfigService, 'isGuestCheckout').mockReturnValue(true);
          let result: boolean | UrlTree | RedirectCommand | undefined;
          checkoutGuard
            .canActivate()
            .subscribe((value) => (result = value))
            .unsubscribe();
          expect(result?.toString()).toEqual(`/login`);
          expect(windowRef.localStorage?.setItem).toHaveBeenCalledWith(
            IS_GUEST_USER_CHECKOUT_KEY,
            'true'
          );
        });
      });

      describe('when authorizationCodeFlowByDefault feature flag is disabled', () => {
        beforeEach(() => {
          featureToggles.authorizationCodeFlowByDefault = false;
        });

        it('should return url to login without forced flag when guestCheckout feature disabled', () => {
          let result: boolean | UrlTree | RedirectCommand | undefined;
          checkoutGuard
            .canActivate()
            .subscribe((value) => (result = value))
            .unsubscribe();
          expect(result?.toString()).toEqual(`/login`);
        });

        it('should return url to login without forced flag when guestCheckout feature enabled', () => {
          vi.spyOn(checkoutConfigService, 'isGuestCheckout').mockReturnValue(true);
          let result: boolean | UrlTree | RedirectCommand | undefined;
          checkoutGuard
            .canActivate()
            .subscribe((value) => (result = value))
            .unsubscribe();
          expect(result?.toString()).toEqual(`/login?forced=true`);
        });
      });

      it('should notify AuthRedirectService with the current navigation', () => {
        checkoutGuard.canActivate().subscribe().unsubscribe();
        expect(authRedirectService.saveCurrentNavigationUrl).toHaveBeenCalled();
      });
    });

    describe('and cart has a user, ', () => {
      beforeEach(() => {
        vi.spyOn(activeCartFacade, 'getAssignedUser').mockReturnValue(
          of({ uid: '1234|xxx@xxx.com', name: 'guest' } as User)
        );
      });

      it('should return true', () => {
        let result: boolean | UrlTree | RedirectCommand | undefined;
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
      vi.spyOn(authService, 'isUserLoggedIn').mockReturnValue(of(false));
      vi.spyOn(activeCartFacade, 'isStable').mockReturnValue(of(false));
      vi.spyOn(activeCartFacade, 'isGuestCart').mockReturnValue(of(false));

      checkoutGuard.canActivate().subscribe().unsubscribe();
      expect(
        authRedirectService.saveCurrentNavigationUrl
      ).not.toHaveBeenCalled();
    });
  });

  describe(', when user is authorized,', () => {
    beforeEach(() => {
      vi.spyOn(authService, 'isUserLoggedIn').mockReturnValue(of(true));
    });

    describe('and cart does NOT have a user, ', () => {
      beforeEach(() => {
        vi.spyOn(activeCartFacade, 'getAssignedUser').mockReturnValue(of({}));
      });

      it('should return true', () => {
        let result: boolean | UrlTree | RedirectCommand | undefined;
        checkoutGuard
          .canActivate()
          .subscribe((value) => (result = value))
          .unsubscribe();
        expect(result).toBe(true);
      });
    });

    describe('and cart has a user, ', () => {
      beforeEach(() => {
        vi.spyOn(activeCartFacade, 'getAssignedUser').mockReturnValue(
          of({ uid: '1234|xxx@xxx.com', name: 'guest' } as User)
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
        let result: boolean | UrlTree | RedirectCommand | undefined;
        checkoutGuard
          .canActivate()
          .subscribe((value) => (result = value))
          .unsubscribe();
        expect(result).toBe(true);
      });
    });

    describe('and user is b2b user, ', () => {
      beforeEach(() => {
        vi.spyOn(activeCartFacade, 'getAssignedUser').mockReturnValue(of({}));
      });

      it('should return true when user roles has b2bcustomergroup', () => {
        vi.spyOn(userService, 'get').mockReturnValue(
          of({ uid: 'testUser', roles: [B2BUserRole.CUSTOMER] })
        );
        let result: boolean | UrlTree | RedirectCommand | undefined;
        checkoutGuard
          .canActivate()
          .subscribe((value) => (result = value))
          .unsubscribe();
        expect(result).toBe(true);
      });

      it('should return to /home when user roles does not have b2bcustomergroup', () => {
        vi.spyOn(userService, 'get').mockReturnValue(
          of({ uid: 'testUser', roles: [B2BUserRole.ADMIN] })
        );
        let result: boolean | UrlTree | RedirectCommand | undefined;
        checkoutGuard
          .canActivate()
          .subscribe((value) => (result = value))
          .unsubscribe();
        expect(result?.toString()).toBe('/home');
        expect(globalMessageService.add).toHaveBeenCalledWith(
          { key: 'checkoutB2B.invalid.accountType' },
          GlobalMessageType.MSG_TYPE_WARNING
        );
      });
    });
  });
});
