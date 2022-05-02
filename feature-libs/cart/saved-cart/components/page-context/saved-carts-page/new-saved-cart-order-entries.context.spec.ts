import { TestBed } from '@angular/core/testing';
import { ProductImportInfoService } from '@spartacus/cart/base/core';
import {
  Cart,
  MultiCartFacade,
  ProductData,
  ProductImportStatus,
} from '@spartacus/cart/base/root';
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
  deleteSavedCart = createSpy();
}

const mockProductImportInfo = {
  productCode: 'testProductCode',
  statusCode: 'testStatusCode',
};
class MockProductImportInfoService {
  getResults = createSpy().and.returnValue(of(mockProductImportInfo));
}

describe('NewSavedCartOrderEntriesContext that successfully imports products', () => {
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

const mockFailingProductImportWithUnknownIdentifier = {
  productCode: 'testProductCode',
  statusCode: ProductImportStatus.UNKNOWN_IDENTIFIER,
};
class MockFailingProductImportInfoServiceWithUnknownIdentifier {
  getResults = createSpy().and.returnValue(
    of(mockFailingProductImportWithUnknownIdentifier)
  );
}

describe('NewSavedCartOrderEntriesContext that does not successfully import products because of an unknown identifier', () => {
  let service: NewSavedCartOrderEntriesContext;
  let multiCartService: MultiCartFacade;
  let savedCartService: SavedCartFacade;
  let userIdService: UserIdService;
  let productImportInfoService: ProductImportInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          useClass: MockFailingProductImportInfoServiceWithUnknownIdentifier,
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
    it('should delete the cart for invalid products', () => {
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
      expect(savedCartService.deleteSavedCart).toHaveBeenCalledWith(mockCartId);
    });
  });
});

const mockFailingProductImportWithUnknownError = {
  productCode: 'testProductCode',
  statusCode: ProductImportStatus.UNKNOWN_IDENTIFIER,
};
class MockFailingProductImportInfoServiceWithUnknownError {
  getResults = createSpy().and.returnValue(
    of(mockFailingProductImportWithUnknownError)
  );
}

describe('NewSavedCartOrderEntriesContext that does not successfully import products because of an unknown error', () => {
  let service: NewSavedCartOrderEntriesContext;
  let multiCartService: MultiCartFacade;
  let savedCartService: SavedCartFacade;
  let userIdService: UserIdService;
  let productImportInfoService: ProductImportInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          useClass: MockFailingProductImportInfoServiceWithUnknownError,
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
    it('should delete the cart for invalid products', () => {
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
      expect(savedCartService.deleteSavedCart).toHaveBeenCalledWith(mockCartId);
    });
  });
});
