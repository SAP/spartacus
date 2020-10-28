import { TestBed } from '@angular/core/testing';
import { UrlTree } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import {
  ActiveCartService,
  AuthRedirectService,
  AuthService,
  B2BUserGroup,
  GlobalMessageService,
  GlobalMessageType,
  SemanticPathService,
  User,
  UserService,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { CheckoutConfigService } from '../services';
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
  reportAuthGuard = jasmine.createSpy('reportAuthGuard');
}

class MockCheckoutConfigService implements Partial<CheckoutConfigService> {
  isGuestCheckout() {
    return false;
  }
}

class MockUserService implements Partial<UserService> {
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
  let userService: UserService;
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
          provide: UserService,
          useClass: MockUserService,
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
    userService = TestBed.inject(UserService);
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
        let result: boolean | UrlTree;
        checkoutGuard
          .canActivate()
          .subscribe((value) => (result = value))
          .unsubscribe();
        expect(result.toString()).toEqual(`/login?forced=true`);
      });

      it('should return url to login without forced flag when guestCheckout feature disabled', () => {
        let result: boolean | UrlTree;
        checkoutGuard
          .canActivate()
          .subscribe((value) => (result = value))
          .unsubscribe();
        expect(result.toString()).toEqual(`/login`);
      });

      it('should notify AuthRedirectService with the current navigation', () => {
        checkoutGuard.canActivate().subscribe().unsubscribe();
        expect(authRedirectService.reportAuthGuard).toHaveBeenCalled();
      });
    });

    describe('and cart has a user, ', () => {
      beforeEach(() => {
        spyOn(activeCartService, 'getAssignedUser').and.returnValue(
          of({ uid: '1234|xxx@xxx.com', name: 'guest' } as User)
        );
      });

      it('should return true', () => {
        let result: boolean | UrlTree;
        checkoutGuard
          .canActivate()
          .subscribe((value) => (result = value))
          .unsubscribe();
        expect(result).toBe(true);
      });
    });
  });

  describe(', when user is in checkout pages,', () => {
    it('should not redirect route when cart is unstable', () => {
      spyOn(authService, 'getUserToken').and.returnValue(of(mockUserToken));
      spyOn(activeCartService, 'isStable').and.returnValue(of(false));
      checkoutGuard.canActivate().subscribe().unsubscribe();
      expect(service.go).not.toHaveBeenCalled();
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
        let result: boolean | UrlTree;
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
        let result: boolean;
        checkoutGuard
          .canActivate()
          .subscribe((value) => (result = value))
          .unsubscribe();
        expect(result).toBeTruthy();
      });

      it('should return true', () => {
        let result: boolean | UrlTree;
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
          of({ uid: 'testUser', roles: [B2BUserGroup.B2B_CUSTOMER_GROUP] })
        );
        let result: boolean | UrlTree;
        checkoutGuard
          .canActivate()
          .subscribe((value) => (result = value))
          .unsubscribe();
        expect(result).toBe(true);
      });

      it('should return false when user roles does not have b2bcustomergroup', () => {
        spyOn(userService, 'get').and.returnValue(
          of({ uid: 'testUser', roles: [B2BUserGroup.B2B_ADMIN_GROUP] })
        );
        let result: boolean | UrlTree;
        checkoutGuard
          .canActivate()
          .subscribe((value) => (result = value))
          .unsubscribe();
        expect(result).toBe(false);
        expect(globalMessageService.add).toHaveBeenCalledWith(
          { key: 'checkout.invalid.accountType' },
          GlobalMessageType.MSG_TYPE_WARNING
        );
      });
    });
  });
});
