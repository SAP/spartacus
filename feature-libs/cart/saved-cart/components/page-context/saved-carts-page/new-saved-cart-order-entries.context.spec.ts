import { TestBed } from '@angular/core/testing';
import { ProductImportInfoService } from '@spartacus/cart/base/core';
import { Cart, MultiCartFacade, ProductData, ProductImportStatus } from '@spartacus/cart/base/root';
import { SavedCartFacade } from '@spartacus/cart/saved-cart/root';
import { UserIdService } from '@spartacus/core';
import { of } from 'rxjs';
import { NewSavedCartOrderEntriesContext } from './new-saved-cart-order-entries.context';
import createSpy = jasmine.createSpy;

const mockUserId = 'test-user';
const mockCartId = '00004546';

const mockSavedCart = { name: 'mockSavedCart', description: 'mock saved cart' };

const mockCartData: Cart = {
  code: mockCartId,
};

const mockProductData: ProductData[] = [
  { productCode: '693923', quantity: 1 },
  { productCode: '232133', quantity: 2 },
];
const mockInvalidProductData: ProductData[] = [
  { productCode: '3857732', quantity: 1 },
];

class MockUserIdService implements Partial<UserIdService> {
  takeUserId = createSpy().and.returnValue(of(mockUserId));
}

class MockMultiCartFacade implements Partial<MultiCartFacade> {
  createCart = createSpy().and.returnValue(of(mockCartData));
  addEntries = createSpy().and.callThrough();
}

class MockSavedCartService implements Partial<SavedCartFacade> {
  saveCart = createSpy().and.callThrough();
  loadSavedCarts = createSpy().and.callThrough();
  getSaveCartProcessLoading = createSpy().and.returnValue(of(false));
  deleteCart = createSpy();
  deleteSavedCart = createSpy();
  // getSavedCartList = createSpy().and.callThrough().returnValue(of([]));
}

const mockProductImportInfo = {
  productCode: 'testProductCode',
  statusCode: 'testStatusCode',
};
class MockProductImportInfoService {
  getResults = createSpy().and.returnValue(of(mockProductImportInfo));
}

const mockFailingProductImportInfo = {
  productCode: 'testProductCode',
  statusCode: ProductImportStatus.UNKNOWN_IDENTIFIER,
};
class MockFailingProductImportInfoService {
  getResults = createSpy().and.returnValue(of(mockFailingProductImportInfo));
}

describe('NewSavedCartOrderEntriesContext', () => {
  let service: NewSavedCartOrderEntriesContext;
  let multiCartService: MultiCartFacade;
  let savedCartService: SavedCartFacade;
  let userIdService: UserIdService;
  let productImportInfoService: ProductImportInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          useClass: MockProductImportInfoService,
          provide: ProductImportInfoService,
        },
        { useClass: MockSavedCartService, provide: SavedCartFacade },
        { useClass: MockMultiCartFacade, provide: MultiCartFacade },
        { useClass: MockUserIdService, provide: UserIdService },
      ],
    });
    service = TestBed.inject(NewSavedCartOrderEntriesContext);
    multiCartService = TestBed.inject(MultiCartFacade);
    savedCartService = TestBed.inject(SavedCartFacade);
    userIdService = TestBed.inject(UserIdService);
    productImportInfoService = TestBed.inject(ProductImportInfoService);
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
      expect(productImportInfoService.getResults).toHaveBeenCalledWith(
        mockCartId
      );
    });
  });
});


describe('failing NewSavedCartOrderEntriesContext', () => {
  let service: NewSavedCartOrderEntriesContext;
  let multiCartService: MultiCartFacade;
  let savedCartService: SavedCartFacade;
  let userIdService: UserIdService;
  let productImportInfoService: ProductImportInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          useClass: MockFailingProductImportInfoService,
          provide: ProductImportInfoService,
        },
        { useClass: MockSavedCartService, provide: SavedCartFacade },
        { useClass: MockMultiCartFacade, provide: MultiCartFacade },
        { useClass: MockUserIdService, provide: UserIdService },
      ],
    });
    service = TestBed.inject(NewSavedCartOrderEntriesContext);
    multiCartService = TestBed.inject(MultiCartFacade);
    savedCartService = TestBed.inject(SavedCartFacade);
    userIdService = TestBed.inject(UserIdService);
    productImportInfoService = TestBed.inject(ProductImportInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should delete the cart for invalid products', () => {
    service.addEntries(mockInvalidProductData, mockSavedCart).subscribe();

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
      mockInvalidProductData
    );
    expect(productImportInfoService.getResults).toHaveBeenCalledWith(
      mockCartId
    );
    expect(savedCartService.deleteSavedCart).toHaveBeenCalledWith(
      mockCartId
    );
    // TODO improve me
    // expect(savedCartService.getSavedCartList).toEqual(of([]));
  });
});
