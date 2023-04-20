import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  ActiveCartFacade,
  CartModification,
  CartModificationList,
  CartValidationFacade,
} from '@spartacus/cart/base/root';
import {
  GlobalMessageService,
  GlobalMessageType,
  RouterState,
  SemanticPathService,
} from '@spartacus/core';
import { BehaviorSubject, EMPTY, Observable, of, ReplaySubject } from 'rxjs';
import { CartConfigService } from '../services/cart-config.service';
import { CartValidationStateService } from '../services/cart-validation-state.service';
import { CartValidationGuard } from './cart-validation.guard';

import createSpy = jasmine.createSpy;

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
  add = createSpy().and.stub();
}
class MockActiveCartFacade implements Partial<ActiveCartFacade> {
  getActiveCartId = () => of(mockCartId);
  reloadActiveCart = createSpy().and.stub();
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
      ],
      imports: [RouterTestingModule],
    });

    guard = TestBed.inject(CartValidationGuard);
    globalMessageService = TestBed.inject(GlobalMessageService);
    activeCartService = TestBed.inject(ActiveCartFacade);

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
});
