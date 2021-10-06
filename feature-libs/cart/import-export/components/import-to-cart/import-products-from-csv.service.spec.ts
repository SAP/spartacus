import { TestBed } from '@angular/core/testing';
import { Action, ActionsSubject } from '@ngrx/store';
import { BehaviorSubject, of, Subject } from 'rxjs';
import {
  ActiveCartService,
  Cart,
  CartActions,
  MultiCartService,
  RoutingService,
  StateUtils,
  UserIdService,
  RouterState,
} from '@spartacus/core';
import { SavedCartFacade } from '@spartacus/cart/saved-cart/root';
import { ProductImportStatus, ProductsData } from '../../core/model';
import { ImportProductsFromCsvService } from './import-products-from-csv.service';

import createSpy = jasmine.createSpy;

const mockUserId = 'test-user';
const mockCartId = '00004546';

const mockFileData: string[][] = [
  ['693923', '1', 'mockProduct1', '$4.00'],
  ['232133', '2', 'mockProduct2', '$5.00'],
];

const mockSavedCart = { name: 'mockSavedCart', description: 'mock saved cart' };

const mockCartData: StateUtils.ProcessesLoaderState<Cart> = {
  value: { code: mockCartId },
};

const mockProductData: ProductsData = [
  { productCode: '693923', quantity: 1 },
  { productCode: '232133', quantity: 2 },
];

class MockUserIdService implements Partial<UserIdService> {
  takeUserId = createSpy().and.returnValue(of(mockUserId));
}

class MockMultiCartService implements Partial<MultiCartService> {
  createCart = createSpy().and.returnValue(of(mockCartData));
  addEntries = createSpy().and.callThrough();
}

class MockSavedCartService implements Partial<SavedCartFacade> {
  saveCart = createSpy().and.callThrough();
  loadSavedCarts = createSpy().and.callThrough();
  getSaveCartProcessLoading = createSpy().and.returnValue(of(false));
}

const routerStateSubject = new BehaviorSubject<RouterState>({
  state: {
    semanticRoute: 'savedCarts',
  },
} as RouterState);

class MockRoutingService implements Partial<RoutingService> {
  getRouterState = createSpy().and.returnValue(
    routerStateSubject.asObservable()
  );
}

class MockActiveCartService implements Partial<ActiveCartService> {
  addEntries = createSpy().and.callThrough();
  getActiveCartId = createSpy().and.returnValue(of(mockCartId));
}

const mockActionsSubject = new Subject<Action>();

describe('ImportProductsFromCsvService', () => {
  let service: ImportProductsFromCsvService;
  let multiCartService: MultiCartService;
  let savedCartService: SavedCartFacade;
  let userIdService: UserIdService;
  let routingService: RoutingService;
  let activeCartService: ActiveCartService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ImportProductsFromCsvService,
        { provide: UserIdService, useClass: MockUserIdService },
        { provide: MultiCartService, useClass: MockMultiCartService },
        { provide: SavedCartFacade, useClass: MockSavedCartService },
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: ActiveCartService, useClass: MockActiveCartService },
        { provide: ActionsSubject, useValue: mockActionsSubject },
      ],
    });
    service = TestBed.inject(ImportProductsFromCsvService);
    multiCartService = TestBed.inject(MultiCartService);
    savedCartService = TestBed.inject(SavedCartFacade);
    userIdService = TestBed.inject(UserIdService);
    routingService = TestBed.inject(RoutingService);
    activeCartService = TestBed.inject(ActiveCartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return true if data is parsable', () => {
    const result = service.isDataParsableToProducts(mockFileData);
    expect(result).toBe(true);
  });

  it('should return false if data is not parsable', () => {
    const result = service.isDataParsableToProducts([['abc', '11.22']]);
    expect(result).toBe(false);
  });

  it('should convert csv extracted data according to product and quantity', () => {
    expect(service['csvDataToProduct'](mockFileData)).toEqual(mockProductData);
  });

  describe('loadProductsToCart for saved cart', () => {
    beforeEach(() => {
      routerStateSubject.next({
        state: {
          semanticRoute: 'savedCarts',
        },
      } as RouterState);
    });

    it('should create, save and load cart', () => {
      service
        .loadProductsToCart(mockProductData, mockSavedCart)
        .subscribe()
        .unsubscribe();

      expect(routingService.getRouterState).toHaveBeenCalledWith();
      expect(userIdService.takeUserId).toHaveBeenCalledWith();
      expect(multiCartService.createCart).toHaveBeenCalledWith({
        userId: mockUserId,
        extraData: { active: false },
      });
      expect(savedCartService.saveCart).toHaveBeenCalledWith({
        cartId: mockCartId,
        saveCartName: mockSavedCart.name,
        saveCartDescription: mockSavedCart.description,
      });
      expect(savedCartService.loadSavedCarts).toHaveBeenCalled();
      expect(multiCartService.addEntries).toHaveBeenCalledWith(
        mockUserId,
        mockCartId,
        mockProductData
      );
    });

    it('should return success action', () => {
      let action;
      service
        .loadProductsToCart(mockProductData, mockSavedCart)
        .subscribe((data) => (action = data));

      mockActionsSubject.next(
        new CartActions.CartAddEntrySuccess({
          userId: mockUserId,
          cartId: mockCartId,
          productCode: '693923',
          quantity: 1,
          entry: { product: { name: 'mockProduct1' } },
          quantityAdded: 1,
          statusCode: ProductImportStatus.SUCCESS,
        })
      );

      expect(action).toEqual({
        productCode: '693923',
        statusCode: ProductImportStatus.SUCCESS,
        productName: 'mockProduct1',
      });
    });

    it('should return low stock action', () => {
      let action;
      service
        .loadProductsToCart(mockProductData, mockSavedCart)
        .subscribe((data) => (action = data));

      mockActionsSubject.next(
        new CartActions.CartAddEntrySuccess({
          userId: mockUserId,
          cartId: mockCartId,
          productCode: '693923',
          entry: { product: { name: 'mockProduct1' } },
          quantity: 4,
          quantityAdded: 1,
          statusCode: ProductImportStatus.LOW_STOCK,
        })
      );

      expect(action).toEqual({
        productName: 'mockProduct1',
        quantity: 4,
        quantityAdded: 1,
        productCode: '693923',
        statusCode: ProductImportStatus.LOW_STOCK,
      });
    });

    it('should return no stock action', () => {
      let action;
      service
        .loadProductsToCart(mockProductData, mockSavedCart)
        .subscribe((data) => (action = data));

      mockActionsSubject.next(
        new CartActions.CartAddEntrySuccess({
          userId: mockUserId,
          cartId: mockCartId,
          productCode: '693923',
          entry: { product: { name: 'mockProduct1' } },
          quantity: 4,
          quantityAdded: 0,
          statusCode: ProductImportStatus.NO_STOCK,
        })
      );

      expect(action).toEqual({
        productCode: '693923',
        statusCode: ProductImportStatus.NO_STOCK,
        productName: 'mockProduct1',
      });
    });

    it('should return Unknown Identifier Error action', () => {
      let action;
      service
        .loadProductsToCart(mockProductData, mockSavedCart)
        .subscribe((data) => (action = data));

      mockActionsSubject.next(
        new CartActions.CartAddEntryFail({
          userId: mockUserId,
          cartId: mockCartId,
          productCode: '693923',
          quantity: 1,
          error: { details: [{ type: 'UnknownIdentifierError' }] },
        })
      );

      expect(action).toEqual({
        productCode: '693923',
        statusCode: ProductImportStatus.UNKNOWN_IDENTIFIER,
      });
    });

    it('should return unknown error action', () => {
      let action;
      service
        .loadProductsToCart(mockProductData, mockSavedCart)
        .subscribe((data) => (action = data));

      mockActionsSubject.next(
        new CartActions.CartAddEntrySuccess({
          userId: mockUserId,
          cartId: mockCartId,
          productCode: '693923',
          entry: { product: { name: 'mockProduct1' } },
          quantity: 4,
          quantityAdded: 1,
          statusCode: 'CODE_WHICH_WE_DIDNT_REGISTER',
        })
      );

      expect(action).toEqual({
        productCode: '693923',
        statusCode: ProductImportStatus.UNKNOWN_ERROR,
      });
    });
  });

  describe('loadProductsToCart for active cart', () => {
    it('should create, save and load cart', () => {
      routerStateSubject.next({
        state: {
          semanticRoute: 'cart',
        },
      } as RouterState);

      service
        .loadProductsToCart(mockProductData, mockSavedCart)
        .subscribe()
        .unsubscribe();

      expect(routingService.getRouterState).toHaveBeenCalledWith();
      expect(activeCartService.addEntries).toHaveBeenCalledWith([
        { product: { code: '693923' }, quantity: 1 },
        { product: { code: '232133' }, quantity: 2 },
      ]);
      expect(activeCartService.getActiveCartId).toHaveBeenCalledWith();
    });
  });

  describe('loadProductsToCart for other page', () => {
    it('should create, save and load cart', () => {
      routerStateSubject.next({
        state: {
          semanticRoute: 'otherPage',
        },
      } as RouterState);

      service
        .loadProductsToCart(mockProductData, mockSavedCart)
        .subscribe()
        .unsubscribe();

      expect(routingService.getRouterState).toHaveBeenCalledWith();
      expect(activeCartService.addEntries).toHaveBeenCalledWith([
        { product: { code: '693923' }, quantity: 1 },
        { product: { code: '232133' }, quantity: 2 },
      ]);
      expect(activeCartService.getActiveCartId).toHaveBeenCalledWith();
    });
  });
});
