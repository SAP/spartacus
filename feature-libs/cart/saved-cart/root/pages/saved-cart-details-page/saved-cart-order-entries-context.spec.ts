import { TestBed } from '@angular/core/testing';
import { Action, ActionsSubject } from '@ngrx/store';
import {} from '@spartacus/cart/import-export/core';
import { SavedCartFacade } from '@spartacus/cart/saved-cart/root';
import {
  Cart,
  MultiCartService,
  OrderEntry,
  RouterState,
  RoutingService,
  UserIdService,
} from '@spartacus/core';
import { ProductData } from '@spartacus/storefront';
import { BehaviorSubject, of, Subject } from 'rxjs';
import { SavedCartOrderEntriesContext } from './saved-cart-order-entries-context';
import createSpy = jasmine.createSpy;

const mockActionsSubject = new Subject<Action>();

const mockUserId = 'test-user';
const mockCartId = '00004546';

const mockProductData: ProductData[] = [
  { productCode: '693923', quantity: 1 },
  { productCode: '232133', quantity: 2 },
];

const mockEntries: OrderEntry[] = [
  {
    quantity: 1,
    product: { name: 'mockProduct', code: 'mockCode' },
  },
];

const mockSavedCart: Cart = {
  name: 'mockSavedCart',
  description: 'mock saved cart',
  entries: mockEntries,
};

class MockUserIdService implements Partial<UserIdService> {
  takeUserId = createSpy().and.returnValue(of(mockUserId));
}

class MockMultiCartService implements Partial<MultiCartService> {
  addEntries = createSpy().and.callThrough();
}

class MockSavedCartService implements Partial<SavedCartFacade> {
  get = createSpy().and.returnValue(of(mockSavedCart));
  saveCart = createSpy().and.callThrough();
  loadSavedCarts = createSpy().and.callThrough();
  getSaveCartProcessLoading = createSpy().and.returnValue(of(false));
}

const routerStateSubject = new BehaviorSubject<RouterState>({
  state: {
    semanticRoute: 'savedCartsDetails',
    params: {
      savedCartId: mockCartId,
    },
  },
} as unknown as RouterState);

class MockRoutingService implements Partial<RoutingService> {
  getRouterState = createSpy().and.returnValue(
    routerStateSubject.asObservable()
  );
}

describe('SavedCartOrderEntriesContext', () => {
  let service: SavedCartOrderEntriesContext;
  let multiCartService: MultiCartService;
  let savedCartService: SavedCartFacade;
  let userIdService: UserIdService;
  let routingService: RoutingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { useValue: mockActionsSubject, provide: ActionsSubject },
        { useClass: MockSavedCartService, provide: SavedCartFacade },
        { useClass: MockMultiCartService, provide: MultiCartService },
        { useClass: MockUserIdService, provide: UserIdService },
        { useClass: MockRoutingService, provide: RoutingService },
      ],
    });
    service = TestBed.inject(SavedCartOrderEntriesContext);
    multiCartService = TestBed.inject(MultiCartService);
    savedCartService = TestBed.inject(SavedCartFacade);
    userIdService = TestBed.inject(UserIdService);
    routingService = TestBed.inject(RoutingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getEntries', () => {
    it('getEntries from cart', () => {
      let entries: OrderEntry[];
      service
        .getEntries()
        .subscribe((result) => {
          entries = result;
        })
        .unsubscribe();

      expect(routingService.getRouterState).toHaveBeenCalledWith();
      expect(savedCartService.get).toHaveBeenCalledWith(mockCartId);
      expect(entries).toEqual(mockEntries);
    });
  });

  describe('addEntries', () => {
    it('should add entries to saved cart', () => {
      service.addEntries(mockProductData).subscribe();

      expect(userIdService.takeUserId).toHaveBeenCalledWith();
      expect(routingService.getRouterState).toHaveBeenCalledWith();
      expect(multiCartService.addEntries).toHaveBeenCalledWith(
        mockUserId,
        mockCartId,
        mockProductData
      );
    });
  });
});
