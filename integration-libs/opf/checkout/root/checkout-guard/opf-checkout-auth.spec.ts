import { TestBed } from '@angular/core/testing';
import { UrlTree } from '@angular/router';
import { ActiveCartFacade } from '@spartacus/cart/base/root';
import {
  CheckoutAuthGuard,
  CheckoutConfigService,
} from '@spartacus/checkout/base/components';
import {
  AuthRedirectService,
  AuthService,
  FeatureConfigService,
  GlobalMessageService,
  RoutingService,
  SemanticPathService,
  UserIdService,
} from '@spartacus/core';
import { EMPTY, of } from 'rxjs';
import { OpfCartUserEmailCheckerService } from '../services';
import { OpfCheckoutAuthGuard } from './opf-checkout-auth.guard';
import createSpy = jasmine.createSpy;

class AuthServiceStub implements Partial<AuthService> {
  isUserLoggedIn = createSpy().and.returnValue(EMPTY);
}

class ActiveCartServiceStub implements Partial<ActiveCartFacade> {
  getAssignedUser = createSpy().and.returnValue(EMPTY);
  isGuestCart = createSpy().and.returnValue(of(true));
  isStable = createSpy().and.returnValue(of(true));
  getActiveCartId = createSpy().and.returnValue(of('cart-id'));
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

describe('OpfCheckoutAuthGuard', () => {
  let guard: OpfCheckoutAuthGuard;
  let userIdService: jasmine.SpyObj<UserIdService>;
  let opfCartUserEmailChecker: jasmine.SpyObj<OpfCartUserEmailCheckerService>;
  let routingService: jasmine.SpyObj<
    RoutingService & { createUrlTree: jasmine.Spy }
  >;
  let semanticPathService: jasmine.SpyObj<SemanticPathService>;
  let activeCartFacade: jasmine.SpyObj<ActiveCartFacade>;
  let featureConfig: jasmine.SpyObj<FeatureConfigService>;

  beforeEach(() => {
    const checkoutAuthGuardSpy = jasmine.createSpyObj('CheckoutAuthGuard', [
      'canActivate',
    ]);
    const routingServiceSpy = jasmine.createSpyObj('RoutingService', [
      'createUrlTree',
    ]);
    const userIdServiceSpy = jasmine.createSpyObj('UserIdService', [
      'getUserId',
    ]);
    const featureConfigServiceSpy = jasmine.createSpyObj(
      'FeatureConfigService',
      ['isEnabled']
    );
    const opfCartUserEmailCheckerSpy = jasmine.createSpyObj(
      'OpfCartUserEmailCheckerService',
      ['isCartUserHasEmail']
    );

    const semanticPathServiceSpy = jasmine.createSpyObj('SemanticPathService', [
      'get',
    ]);

    TestBed.configureTestingModule({
      providers: [
        OpfCheckoutAuthGuard,
        { provide: CheckoutAuthGuard, useValue: checkoutAuthGuardSpy },
        { provide: UserIdService, useValue: userIdServiceSpy },
        {
          provide: OpfCartUserEmailCheckerService,
          useValue: opfCartUserEmailCheckerSpy,
        },
        {
          provide: FeatureConfigService,
          useValue: featureConfigServiceSpy,
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
    ) as jasmine.SpyObj<UserIdService>;
    opfCartUserEmailChecker = TestBed.inject(
      OpfCartUserEmailCheckerService
    ) as jasmine.SpyObj<OpfCartUserEmailCheckerService>;
    routingService = TestBed.inject(RoutingService) as jasmine.SpyObj<
      RoutingService & { createUrlTree: jasmine.Spy }
    >;
    semanticPathService = TestBed.inject(
      SemanticPathService
    ) as jasmine.SpyObj<SemanticPathService>;
    activeCartFacade = TestBed.inject(
      ActiveCartFacade
    ) as jasmine.SpyObj<ActiveCartFacade>;
    featureConfig = TestBed.inject(
      FeatureConfigService
    ) as jasmine.SpyObj<FeatureConfigService>;

    featureConfig.isEnabled.and.returnValue(true);
  });

  it('should call super.canActivate() if opfEnablePreventingFromCheckoutWithoutEmail feature toggle is not enabled', (done) => {
    featureConfig.isEnabled.and.returnValue(false);
    const superCanActivateSpy = spyOn(
      CheckoutAuthGuard.prototype,
      'canActivate'
    ).and.returnValue(of(true));

    guard.canActivate().subscribe(() => {
      expect(superCanActivateSpy).toHaveBeenCalled();
      done();
    });
  });

  it('should not call isCartUserHasEmail if not guest user', () => {
    activeCartFacade.isGuestCart.and.returnValue(of(false));
    expect(opfCartUserEmailChecker.isCartUserHasEmail).not.toHaveBeenCalled();
  });

  it('should call super.canActivate() when isGuestCart is false', (done) => {
    const superCanActivateSpy = spyOn(
      CheckoutAuthGuard.prototype,
      'canActivate'
    ).and.returnValue(of(true));
    activeCartFacade.isGuestCart.and.returnValue(of(false));

    guard.canActivate().subscribe(() => {
      expect(superCanActivateSpy).toHaveBeenCalled();
      done();
    });
  });

  it('should redirect to opfCheckoutEmail if guest cart user does not have email', (done) => {
    userIdService.getUserId.and.returnValue(of('guest-user'));
    opfCartUserEmailChecker.isCartUserHasEmail.and.returnValue(of(false));
    semanticPathService.get.and.returnValue('/opf-checkout-email');
    const urlTree = new UrlTree();
    routingService.createUrlTree.and.returnValue(urlTree);

    guard.canActivate().subscribe((result: any) => {
      expect(result.toString()).toEqual('/opf-checkout-email');
      done();
    });
  });

  it('should allow activation if guest cart user has a valid email', (done) => {
    userIdService.getUserId.and.returnValue(of('guest-user'));
    opfCartUserEmailChecker.isCartUserHasEmail.and.returnValue(of(true));

    guard.canActivate().subscribe((result: any) => {
      expect(result).toBeTruthy();
      done();
    });
  });
});
