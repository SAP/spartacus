import { TestBed } from '@angular/core/testing';
import { NavigationExtras } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import {
  ActiveCartService,
  AuthRedirectService,
  AuthService,
  B2BUserGroup,
  GlobalMessageService,
  GlobalMessageType,
  RoutingService,
  UrlCommands,
  User,
  UserService,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { CheckoutConfigService } from '../services';
import { CheckoutAuthGuard } from './checkout-auth.guard';
import createSpy = jasmine.createSpy;

class AuthServiceStub {
  isUserLoggedIn(): Observable<boolean> {
    return of();
  }
}
class RoutingServiceStub {
  go(_path: any[] | UrlCommands, _query?: object, _extras?: NavigationExtras) {}
}
class ActiveCartServiceStub {
  getAssignedUser(): Observable<User> {
    return of();
  }
  isGuestCart(): boolean {
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

class MockUserService {
  get(): Observable<User> {
    return of({});
  }
}

class MockGlobalMessageService {
  add = createSpy();
}

describe('CheckoutAuthGuard', () => {
  let checkoutGuard: CheckoutAuthGuard;
  let service: RoutingService;
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
    service = TestBed.inject(RoutingService);
    authService = TestBed.inject(AuthService);
    authRedirectService = TestBed.inject(AuthRedirectService);
    activeCartService = TestBed.inject(ActiveCartService);
    checkoutConfigService = TestBed.inject(CheckoutConfigService);
    userService = TestBed.inject(UserService);
    globalMessageService = TestBed.inject(GlobalMessageService);

    spyOn(service, 'go').and.stub();
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

      it('should return false', () => {
        let result: boolean;
        checkoutGuard
          .canActivate()
          .subscribe((value) => (result = value))
          .unsubscribe();
        expect(result).toBe(false);
      });

      it('should redirect to login with forced flag when guestCheckout feature enabled', () => {
        spyOn(checkoutConfigService, 'isGuestCheckout').and.returnValue(true);
        checkoutGuard.canActivate().subscribe().unsubscribe();
        expect(service.go).toHaveBeenCalledWith(
          { cxRoute: 'login' },
          { forced: true }
        );
      });

      it('should redirect to login without forced flag when guestCheckout feature disabled', () => {
        checkoutGuard.canActivate().subscribe().unsubscribe();
        expect(service.go).toHaveBeenCalledWith({ cxRoute: 'login' });
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
        let result: boolean;
        checkoutGuard
          .canActivate()
          .subscribe((value) => (result = value))
          .unsubscribe();
        expect(result).toBe(true);
      });
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
        let result: boolean;
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

      it('should return true', () => {
        let result: boolean;
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
        let result: boolean;
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
        let result: boolean;
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
