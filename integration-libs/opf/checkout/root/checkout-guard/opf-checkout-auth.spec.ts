import { TestBed } from '@angular/core/testing';
import { UrlTree } from '@angular/router';
import { vi } from 'vitest';
import { ActiveCartFacade } from '@spartacus/cart/base/root';
import {
  CheckoutAuthGuard,
  CheckoutConfigService,
} from '@spartacus/checkout/base/components';
import {
  AuthRedirectService,
  AuthService,
  GlobalMessageService,
  RoutingService,
  SemanticPathService,
  UserIdService,
} from '@spartacus/core';
import { EMPTY, of } from 'rxjs';
import { OpfCartUserEmailCheckerService } from '../services';
import { OpfCheckoutAuthGuard } from './opf-checkout-auth.guard';

class AuthServiceStub implements Partial<AuthService> {
  isUserLoggedIn = vi.fn().mockReturnValue(EMPTY);
}

class ActiveCartServiceStub implements Partial<ActiveCartFacade> {
  getAssignedUser = vi.fn().mockReturnValue(EMPTY);
  isGuestCart = vi.fn().mockReturnValue(of(true));
  isStable = vi.fn().mockReturnValue(of(true));
  getActiveCartId = vi.fn().mockReturnValue(of('cart-id'));
}

class MockAuthRedirectService implements Partial<AuthRedirectService> {
  saveCurrentNavigationUrl = vi.fn();
}

class MockCheckoutConfigService implements Partial<CheckoutConfigService> {
  isGuestCheckout = vi.fn().mockReturnValue(false);
}

class MockGlobalMessageService implements Partial<GlobalMessageService> {
  add = vi.fn();
}

describe('OpfCheckoutAuthGuard', () => {
  let guard: OpfCheckoutAuthGuard;
  let userIdService: any;
  let opfCartUserEmailChecker: any;
  let routingService: any;
  let semanticPathService: any;
  let activeCartFacade: any;

  beforeEach(() => {
    const checkoutAuthGuardSpy = { canActivate: vi.fn() };
    const routingServiceSpy = { createUrlTree: vi.fn() };
    const userIdServiceSpy = { getUserId: vi.fn() };
    const opfCartUserEmailCheckerSpy = { isCartUserHasEmail: vi.fn() };

    const semanticPathServiceSpy = { get: vi.fn() };

    TestBed.configureTestingModule({
      providers: [
        OpfCheckoutAuthGuard,
        { provide: CheckoutAuthGuard, useValue: checkoutAuthGuardSpy },
        { provide: UserIdService, useValue: userIdServiceSpy },
        {
          provide: OpfCartUserEmailCheckerService,
          useValue: opfCartUserEmailCheckerSpy,
        },
        { provide: RoutingService, useValue: routingServiceSpy },
        { provide: SemanticPathService, useValue: semanticPathServiceSpy },
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
    });

    guard = TestBed.inject(OpfCheckoutAuthGuard);
    userIdService = TestBed.inject(
      UserIdService
    ) as any;
    opfCartUserEmailChecker = TestBed.inject(
      OpfCartUserEmailCheckerService
    ) as any;
    routingService = TestBed.inject(RoutingService) as any;
    semanticPathService = TestBed.inject(
      SemanticPathService
    ) as any;
    activeCartFacade = TestBed.inject(
      ActiveCartFacade
    ) as any;
  });

  it('should not call isCartUserHasEmail if not guest user', () => {
    activeCartFacade.isGuestCart.mockReturnValue(of(false));
    expect(opfCartUserEmailChecker.isCartUserHasEmail).not.toHaveBeenCalled();
  });

  it('should call super.canActivate() when isGuestCart is false', async () => {
    const superCanActivateSpy = vi.spyOn(
      CheckoutAuthGuard.prototype,
      'canActivate'
    ).mockReturnValue(of(true));
    activeCartFacade.isGuestCart.mockReturnValue(of(false));

    guard.canActivate().subscribe(() => {
      expect(superCanActivateSpy).toHaveBeenCalled();    });
  });

  it('should redirect to opfCheckoutEmail if guest cart user does not have email', async () => {
    userIdService.getUserId.mockReturnValue(of('guest-user'));
    opfCartUserEmailChecker.isCartUserHasEmail.mockReturnValue(of(false));
    semanticPathService.get.mockReturnValue('/opf-checkout-email');
    const urlTree = new UrlTree();
    routingService.createUrlTree.mockReturnValue(urlTree);

    guard.canActivate().subscribe((result: any) => {
      expect(result.toString()).toEqual('/opf-checkout-email');    });
  });

  it('should allow activation if guest cart user has a valid email', async () => {
    userIdService.getUserId.mockReturnValue(of('guest-user'));
    opfCartUserEmailChecker.isCartUserHasEmail.mockReturnValue(of(true));

    guard.canActivate().subscribe((result: any) => {
      expect(result).toBeTruthy();    });
  });
});
