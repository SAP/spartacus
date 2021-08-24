import { TestBed } from '@angular/core/testing';
import { Action, ActionsSubject } from '@ngrx/store';
import { SavedCartFacade } from '@spartacus/cart/saved-cart/root';
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
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { ProductImportStatus, ProductsData } from '../../core/model';
import { ImportToCartService } from './import-to-cart.service';

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
  getRouterState(): Observable<RouterState> {
    return routerStateSubject.asObservable();
  }
}

class MockActiveCartService implements Partial<ActiveCartService> {
  addEntries() {}
  getActiveCartId(): Observable<string> {
    return of(mockCartId);
  }
}

const mockActionsSubject = new Subject<Action>();

describe('ImportToCartService', () => {
  let service: ImportToCartService;
  let multiCartService: MultiCartService;
  let savedCartService: SavedCartFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ImportToCartService,
        { provide: UserIdService, useClass: MockUserIdService },
        { provide: MultiCartService, useClass: MockMultiCartService },
        { provide: SavedCartFacade, useClass: MockSavedCartService },
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: ActiveCartService, useClass: MockActiveCartService },
        { provide: ActionsSubject, useValue: mockActionsSubject },
      ],
    });
    service = TestBed.inject(ImportToCartService);
    multiCartService = TestBed.inject(MultiCartService);
    savedCartService = TestBed.inject(SavedCartFacade);
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

  describe('loadProductsToCart', () => {
    it('should create, save and load cart', () => {
      service
        .loadProductsToCart(mockProductData, mockSavedCart)
        .subscribe()
        .unsubscribe();

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
});
