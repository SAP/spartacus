import {
  ActiveCartService,
  GlobalMessageService,
  SemanticPathService,
  CartValidationService,
  RoutingService,
  CartModification,
  GlobalMessageType,
  RouterState,
} from '@spartacus/core';
import { CartValidationGuard } from '@spartacus/storefront';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject, Observable, of, ReplaySubject } from 'rxjs';
import createSpy = jasmine.createSpy;
import { CartValidationWarningsStateService } from '../cart-validation-warnings-state.service';

const cartModificationSubject = new BehaviorSubject({});
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

class MockCartValidationService implements Partial<CartValidationService> {
  getCartValidationStatus() {
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
class MockActiveCartService implements Partial<ActiveCartService> {
  getActiveCartId = () => of(mockCartId);
  reloadActiveCart = createSpy().and.stub();
  getEntries = () => mockEntriesSubject.asObservable();
}
class MockCartValidationWarningsStateService
  implements Partial<CartValidationWarningsStateService> {
  NAVIGATION_SKIPS = 2;
  navigationIdCount = 0;

  cartValidationResult$ = new ReplaySubject<CartModification[]>();
  checkForValidationResultClear$ = of() as Observable<
    [RouterState, CartModification[]]
  >;
}

class MockRoutingService {
  getRouterState() {
    return of();
  }
}

fdescribe(`CartValidationGuard`, () => {
  let guard: CartValidationGuard;
  let globalMessageService: GlobalMessageService;
  let activeCartService: ActiveCartService;
  let routingService: RoutingService;
  let cartValidationWarningsStateService: CartValidationWarningsStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CartValidationGuard,
        { provide: CartValidationService, useClass: MockCartValidationService },
        { provide: SemanticPathService, useClass: MockSemanticPathService },
        { provide: GlobalMessageService, useClass: MockGlobalMessageService },
        { provide: ActiveCartService, useClass: MockActiveCartService },
        {
          provide: CartValidationWarningsStateService,
          useClass: MockCartValidationWarningsStateService,
        },
        { provide: RoutingService, useClass: MockRoutingService },
      ],
      imports: [RouterTestingModule],
    });

    guard = TestBed.inject(CartValidationGuard);
    globalMessageService = TestBed.inject(GlobalMessageService);
    activeCartService = TestBed.inject(ActiveCartService);
    routingService = TestBed.inject(RoutingService);
    cartValidationWarningsStateService = TestBed.inject(
      CartValidationWarningsStateService
    );

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
      GlobalMessageType.MSG_TYPE_ERROR
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
      GlobalMessageType.MSG_TYPE_ERROR
    );
    expect(activeCartService.reloadActiveCart).toHaveBeenCalled();
    expect(result.toString()).toEqual('/cart');
  });

  it('should push updated validation result and router state id count', () => {
    const modification = { statusCode: 'noStock', entry: mockEntries[0] };
    spyOn(routingService, 'getRouterState').and.returnValue(
      of({ navigationId: 5 } as any)
    );

    guard.updateValidationResultState([modification]);

    let result;

    cartValidationWarningsStateService.cartValidationResult$.subscribe(
      (value) => (result = value)
    );

    expect(result).toEqual([modification]);
    expect(cartValidationWarningsStateService.navigationIdCount).toEqual(5);
  });
});
