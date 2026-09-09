import { TestBed } from '@angular/core/testing';
import {
  ActiveCartFacade,
  CartModification,
  CartModificationList,
  CartValidationFacade,
  CartValidationStatusCode,
} from '@spartacus/cart/base/root';
import {
  FeatureToggles,
  GlobalMessageService,
  GlobalMessageType,
  RouterState,
  SemanticPathService,
} from '@spartacus/core';
import { provideMockFeatureToggles } from '@spartacus/core/testing/mock-feature-toggles';
import { BehaviorSubject, EMPTY, Observable, of, ReplaySubject } from 'rxjs';
import { CartConfigService } from '../services/cart-config.service';
import { CartValidationStateService } from '../services/cart-validation-state.service';
import { CartValidationGuard } from './cart-validation.guard';

const cartModificationSubject = new BehaviorSubject<CartModificationList>({
  cartModifications: [],
});
const mockCartId = 'cartTest';
const mockEntriesSubject = new BehaviorSubject([]);
const mockEntries = [
  {
    product: {
      code: 'productCode1',
      name: 'product1',
    },
  },
  {
    product: {
      code: 'productCode2',
      name: 'product2',
    },
  },
  {
    product: {
      code: 'productCode3',
      name: 'product3',
    },
  },
];

class MockCartValidationService implements Partial<CartValidationFacade> {
  validateCart() {
    return cartModificationSubject.asObservable();
  }
}
class MockSemanticPathService implements Partial<SemanticPathService> {
  get() {
    return '/cart';
  }
}
class MockGlobalMessageService implements Partial<GlobalMessageService> {
  add = vi.fn().mockImplementation(() => {});
}
class MockActiveCartFacade implements Partial<ActiveCartFacade> {
  getActiveCartId = () => of(mockCartId);
  reloadActiveCart = vi.fn().mockImplementation(() => {});
  getEntries = () => mockEntriesSubject.asObservable();
}
class MockCartValidationStateService
  implements Partial<CartValidationStateService>
{
  NAVIGATION_SKIPS = 2;
  navigationIdCount = 0;

  cartValidationResult$ = new ReplaySubject<CartModification[]>();
  checkForValidationResultClear$ = EMPTY as Observable<
    [RouterState, CartModification[]]
  >;

  updateValidationResultAndRoutingId() {
    this.cartValidationResult$.next([]);
  }
}
class MockCartConfigService implements Partial<CartConfigService> {
  isCartValidationEnabled() {
    return true;
  }
}

describe(`CartValidationGuard`, () => {
  let guard: CartValidationGuard;
  let globalMessageService: GlobalMessageService;
  let activeCartService: ActiveCartFacade;
  let featureToggles: FeatureToggles;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CartValidationGuard,
        { provide: CartValidationFacade, useClass: MockCartValidationService },
        { provide: SemanticPathService, useClass: MockSemanticPathService },
        { provide: GlobalMessageService, useClass: MockGlobalMessageService },
        { provide: ActiveCartFacade, useClass: MockActiveCartFacade },
        {
          provide: CartValidationStateService,
          useClass: MockCartValidationStateService,
        },
        {
          provide: CartConfigService,
          useClass: MockCartConfigService,
        },
        provideMockFeatureToggles({
          cartValidationDisplayBackendMessages: false,
        }),
      ],
    });

    guard = TestBed.inject(CartValidationGuard);
    globalMessageService = TestBed.inject(GlobalMessageService);
    activeCartService = TestBed.inject(ActiveCartFacade);
    featureToggles = TestBed.inject(FeatureToggles);

    cartModificationSubject.next({ cartModifications: [] });
  });

  it('should return true if cart modification list is empty / cart is valid', () => {
    let result;
    guard
      .canActivate()
      .subscribe((value) => (result = value))
      .unsubscribe();

    expect(result).toEqual(true);
  });

  it('should return cart route and call proper global message if cart got modified', () => {
    let result;
    cartModificationSubject.next({
      cartModifications: [{ statusCode: 'noStock' }],
    });
    mockEntriesSubject.next(mockEntries);

    guard
      .canActivate()
      .subscribe((value) => (result = value))
      .unsubscribe();

    expect(globalMessageService.add).toHaveBeenCalledWith(
      {
        key: 'validation.cartEntriesChangeDuringCheckout',
      },
      GlobalMessageType.MSG_TYPE_ERROR,
      10000
    );
    expect(activeCartService.reloadActiveCart).toHaveBeenCalled();
    expect(result.toString()).toEqual('/cart');
  });

  it('should return different global message if only product in cart gets removed', () => {
    let result;
    cartModificationSubject.next({
      cartModifications: [
        {
          statusCode: 'noStock',
          entry: mockEntries[0],
        },
      ],
    });
    mockEntriesSubject.next([mockEntries[0]]);

    guard
      .canActivate()
      .subscribe((value) => (result = value))
      .unsubscribe();

    expect(globalMessageService.add).toHaveBeenCalledWith(
      {
        key: 'validation.cartEntryRemoved',
        params: {
          name: mockEntries[0].product.name,
        },
      },
      GlobalMessageType.MSG_TYPE_ERROR,
      10000
    );
    expect(activeCartService.reloadActiveCart).toHaveBeenCalled();
    expect(result.toString()).toEqual('/cart');
  });

  it('should show the quantity-limits message for a below-min violation when the toggle is enabled', () => {
    featureToggles.cartValidationDisplayBackendMessages = true;
    let result;
    cartModificationSubject.next({
      cartModifications: [
        {
          statusCode: 'below_min_quantity',
          statusMessage:
            'The minimum required quantity for product code productCode1 has not been met. Min=5, Actual=1.',
        },
      ],
    });
    mockEntriesSubject.next(mockEntries);

    guard
      .canActivate()
      .subscribe((value) => (result = value))
      .unsubscribe();

    expect(globalMessageService.add).toHaveBeenCalledWith(
      {
        key: 'validation.cartQuantityLimitsViolated',
      },
      GlobalMessageType.MSG_TYPE_ERROR,
      10000
    );
    expect(result.toString()).toEqual('/cart');
  });

  it('should show the quantity-limits message for an above-max violation when the toggle is enabled', () => {
    featureToggles.cartValidationDisplayBackendMessages = true;
    cartModificationSubject.next({
      cartModifications: [
        { statusCode: CartValidationStatusCode.ABOVE_MAX_QUANTITY },
      ],
    });
    mockEntriesSubject.next(mockEntries);

    guard.canActivate().subscribe().unsubscribe();

    expect(globalMessageService.add).toHaveBeenCalledWith(
      {
        key: 'validation.cartQuantityLimitsViolated',
      },
      GlobalMessageType.MSG_TYPE_ERROR,
      10000
    );
  });

  it('should fall back to the generic message for a min/max violation when the toggle is disabled', () => {
    featureToggles.cartValidationDisplayBackendMessages = false;
    cartModificationSubject.next({
      cartModifications: [{ statusCode: 'below_min_quantity' }],
    });
    mockEntriesSubject.next(mockEntries);

    guard.canActivate().subscribe().unsubscribe();

    expect(globalMessageService.add).toHaveBeenCalledWith(
      {
        key: 'validation.cartEntriesChangeDuringCheckout',
      },
      GlobalMessageType.MSG_TYPE_ERROR,
      10000
    );
  });
});
