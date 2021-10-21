import { TestBed } from '@angular/core/testing';
import { Action, ActionsSubject } from '@ngrx/store';
import { of, Subject } from 'rxjs';
import {
  Cart,
  CartActions,
  MultiCartService,
  StateUtils,
  UserIdService,
} from '@spartacus/core';
import {
  NewSavedCartImportContext,
  ProductData,
  ProductImportStatus,
} from '@spartacus/cart/import-export/core';
import { SavedCartFacade } from '@spartacus/cart/saved-cart/root';
import createSpy = jasmine.createSpy;

const mockActionsSubject = new Subject<Action>();

const mockUserId = 'test-user';
const mockCartId = '00004546';

const mockSavedCart = { name: 'mockSavedCart', description: 'mock saved cart' };

const mockCartData: StateUtils.ProcessesLoaderState<Cart> = {
  value: { code: mockCartId },
};

const mockProductData: ProductData[] = [
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

describe('NewSavedCartImportContext', () => {
  let service: NewSavedCartImportContext;
  let multiCartService: MultiCartService;
  let savedCartService: SavedCartFacade;
  let userIdService: UserIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { useValue: mockActionsSubject, provide: ActionsSubject },
        { useClass: MockSavedCartService, provide: SavedCartFacade },
        { useClass: MockMultiCartService, provide: MultiCartService },
        { useClass: MockUserIdService, provide: UserIdService },
      ],
    });
    service = TestBed.inject(NewSavedCartImportContext);
    multiCartService = TestBed.inject(MultiCartService);
    savedCartService = TestBed.inject(SavedCartFacade);
    userIdService = TestBed.inject(UserIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('addEntries', () => {
    it('should create, save and load cart', () => {
      service.addEntries(mockProductData, mockSavedCart).subscribe();

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
        .addEntries(mockProductData, mockSavedCart)
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
        .addEntries(mockProductData, mockSavedCart)
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
        .addEntries(mockProductData, mockSavedCart)
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
        .addEntries(mockProductData, mockSavedCart)
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
        .addEntries(mockProductData, mockSavedCart)
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
