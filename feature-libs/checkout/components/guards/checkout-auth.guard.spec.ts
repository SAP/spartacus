import { TestBed } from '@angular/core/testing';
import { UrlTree } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import {
  ActiveCartService,
  AuthRedirectService,
  AuthService,
  B2BUserRole,
  GlobalMessageService,
  GlobalMessageType,
  SemanticPathService,
} from '@spartacus/core';
import { User, UserAccountFacade } from '@spartacus/user/account/root';
import { Observable, of } from 'rxjs';
import { CheckoutConfigService } from '../services/checkout-config.service';
import { CheckoutAuthGuard } from './checkout-auth.guard';

import createSpy = jasmine.createSpy;

class AuthServiceStub implements Partial<AuthService> {
  isUserLoggedIn(): Observable<boolean> {
    return of();
  }
}

class ActiveCartServiceStub implements Partial<ActiveCartService> {
  getAssignedUser(): Observable<User> {
    return of();
  }
  isGuestCart(): boolean {
    return true;
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
  saveCurrentNavigationUrl = jasmine.createSpy('saveCurrentNavigationUrl');
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
  add = createSpy();
}

describe('CheckoutAuthGuard', () => {
  let checkoutGuard: CheckoutAuthGuard;
  let authService: AuthService;
  let authRedirectService: AuthRedirectService;
  let activeCartService: ActiveCartService;
  let checkoutConfigService: CheckoutConfigService;
  let userService: UserAccountFacade;
  let globalMessageService: GlobalMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CheckoutAuthGuard,
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
          provide: ActiveCartService,
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
      ],
      imports: [RouterTestingModule],
    });
    checkoutGuard = TestBed.inject(CheckoutAuthGuard);
    authService = TestBed.inject(AuthService);
    authRedirectService = TestBed.inject(AuthRedirectService);
    activeCartService = TestBed.inject(ActiveCartService);
    checkoutConfigService = TestBed.inject(CheckoutConfigService);
    userService = TestBed.inject(UserAccountFacade);
    globalMessageService = TestBed.inject(GlobalMessageService);
  });

  describe(', when user is NOT authorized,', () => {
    beforeEach(() => {
      spyOn(authService, 'isUserLoggedIn').and.returnValue(of(false));
    });

    describe('and cart does NOT have a user, ', () => {
      beforeEach(() => {
        spyOn(activeCartService, 'getAssignedUser').and.returnValue(of({}));
        spyOn(activeCartService, 'isGuestCart').and.returnValue(false);
      });

      it('should return url to login with forced flag when guestCheckout feature enabled', () => {
        spyOn(checkoutConfigService, 'isGuestCheckout').and.returnValue(true);
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
        spyOn(activeCartService, 'getAssignedUser').and.returnValue(
          of({ uid: '1234|xxx@xxx.com', name: 'guest' } as User)
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
      spyOn(authService, 'isUserLoggedIn').and.returnValue(of(false));
      spyOn(activeCartService, 'isStable').and.returnValue(of(false));
      spyOn(activeCartService, 'isGuestCart').and.returnValue(false);

      checkoutGuard.canActivate().subscribe().unsubscribe();
      expect(
        authRedirectService.saveCurrentNavigationUrl
      ).not.toHaveBeenCalled();
    });
  });

  describe(', when user is authorized,', () => {
    beforeEach(() => {
      spyOn(authService, 'isUserLoggedIn').and.returnValue(of(true));
    });

    describe('and cart does NOT have a user, ', () => {
      beforeEach(() => {
        spyOn(activeCartService, 'getAssignedUser').and.returnValue(of({}));
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
        spyOn(activeCartService, 'getAssignedUser').and.returnValue(
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
        let result: boolean | UrlTree | undefined;
        checkoutGuard
          .canActivate()
          .subscribe((value) => (result = value))
          .unsubscribe();
        expect(result).toBe(true);
      });
    });

    describe('and user is b2b user, ', () => {
      beforeEach(() => {
        spyOn(activeCartService, 'getAssignedUser').and.returnValue(of({}));
      });

      it('should return true when user roles has b2bcustomergroup', () => {
        spyOn(userService, 'get').and.returnValue(
          of({ uid: 'testUser', roles: [B2BUserRole.CUSTOMER] })
        );
        let result: boolean | UrlTree | undefined;
        checkoutGuard
          .canActivate()
          .subscribe((value) => (result = value))
          .unsubscribe();
        expect(result).toBe(true);
      });

      it('should return to /home when user roles does not have b2bcustomergroup', () => {
        spyOn(userService, 'get').and.returnValue(
          of({ uid: 'testUser', roles: [B2BUserRole.ADMIN] })
        );
        let result: boolean | UrlTree | undefined;
        checkoutGuard
          .canActivate()
          .subscribe((value) => (result = value))
          .unsubscribe();
        expect(result?.toString()).toBe('/home');
        expect(globalMessageService.add).toHaveBeenCalledWith(
          { key: 'checkout.invalid.accountType' },
          GlobalMessageType.MSG_TYPE_WARNING
        );
      });
    });
  });
});
