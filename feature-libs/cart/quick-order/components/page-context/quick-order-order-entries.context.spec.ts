import { TestBed } from '@angular/core/testing';
import {
  OrderEntry,
  ProductData,
  ProductImportStatus,
} from '@spartacus/cart/base/root';
import { QuickOrderFacade } from '@spartacus/cart/quick-order/root';
import { LoggerService, ProductConnector } from '@spartacus/core';
import { BehaviorSubject, EMPTY, of, throwError } from 'rxjs';
import { QuickOrderOrderEntriesContext } from './quick-order-order-entries.context';
import createSpy = jasmine.createSpy;

const unhandledItemErrorId = 'UnhandledItemErrorId';

const mockProductData: ProductData[] = [
  { productCode: '693923', quantity: 1 },
  { productCode: '232133', quantity: 2 },
  { productCode: '756745', quantity: 99999 },
  { productCode: '345345', quantity: 123 },
];

const products = {
  693923: { name: 'mockProductSuccess', code: '693923' },
  232133: { name: 'mockProductSuccess', code: '232133' },
  756745: {
    name: 'mockProductLowStock',
    code: '756745',
    stock: { stockLevel: 150 },
  },
  345345: {
    name: 'mockProductOutOfStock',
    code: '345345',
    stock: { stockLevelStatus: 'outOfStock' },
  },
};

const mockEntries: OrderEntry[] = [
  {
    quantity: 1,
    product: products['693923'],
  },
  {
    quantity: 2,
    product: products['232133'],
  },
  {
    quantity: 99999,
    product: products['756745'],
  },
  {
    quantity: 123,
    product: products['756745'],
  },
];

const canAdd$ = new BehaviorSubject<boolean>(true);

class MockProductConnector implements Partial<ProductConnector> {
  get(_code) {
    return EMPTY;
  }
}

class MockQuickOrderFacade implements Partial<QuickOrderFacade> {
  addProduct = createSpy().and.callThrough();
  getEntries = createSpy().and.returnValue(of(mockEntries));
  canAdd = createSpy().and.returnValue(canAdd$.asObservable());
}

describe('QuickOrderOrderEntriesContext', () => {
  let service: QuickOrderOrderEntriesContext;
  let quickOrderFacade: QuickOrderFacade;
  let productConnector: ProductConnector;
  let logger: LoggerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { useClass: MockQuickOrderFacade, provide: QuickOrderFacade },
        { useClass: MockProductConnector, provide: ProductConnector },
      ],
    });
    service = TestBed.inject(QuickOrderOrderEntriesContext);
    quickOrderFacade = TestBed.inject(QuickOrderFacade);
    productConnector = TestBed.inject(ProductConnector);
    logger = TestBed.inject(LoggerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getEntries', () => {
    it('getEntries from quick order', () => {
      let entries: OrderEntry[];
      service
        .getEntries()
        .subscribe((result) => {
          entries = result;
        })
        .unsubscribe();

      expect(quickOrderFacade.getEntries).toHaveBeenCalledWith();
      expect(entries).toEqual(mockEntries);
    });
  });

  describe('addEntries', () => {
    it('should try add entries to quick order', () => {
      canAdd$.next(true);
      productConnector.get = createSpy().and.callFake((code) =>
        of(products[code])
      );
      const results = [];

      service
        .addEntries(mockProductData)
        .subscribe((data) => {
          results.push(data);
        })
        .unsubscribe();

      expect(quickOrderFacade.canAdd).toHaveBeenCalledTimes(
        mockProductData.length
      );
      expect(productConnector.get).toHaveBeenCalledTimes(
        mockProductData.length
      );
      expect(quickOrderFacade.addProduct).toHaveBeenCalledTimes(
        mockProductData.length
      );
      mockProductData.forEach((mockProduct) => {
        expect(productConnector.get).toHaveBeenCalledWith(
          mockProduct.productCode
        );
        expect(quickOrderFacade.addProduct).toHaveBeenCalledWith(
          products[mockProduct.productCode],
          mockProduct.quantity
        );
      });
      expect(results).toEqual([
        {
          productCode: mockProductData[0].productCode,
          statusCode: ProductImportStatus.SUCCESS,
        },
        {
          productCode: mockProductData[1].productCode,
          statusCode: ProductImportStatus.SUCCESS,
        },
        {
          productCode: mockProductData[2].productCode,
          statusCode: ProductImportStatus.LOW_STOCK,
          productName: 'mockProductLowStock',
          quantity: 99999,
          quantityAdded: 150,
        },
        {
          productCode: mockProductData[3].productCode,
          statusCode: ProductImportStatus.NO_STOCK,
          productName: 'mockProductOutOfStock',
        },
      ]);
    });

    it('should not add entries due to limit', () => {
      canAdd$.next(false);
      productConnector.get = createSpy().and.callFake((code) =>
        of(products[code])
      );
      const results = [];

      service
        .addEntries(mockProductData)
        .subscribe((data) => {
          results.push(data);
        })
        .unsubscribe();

      expect(quickOrderFacade.canAdd).toHaveBeenCalledTimes(
        mockProductData.length
      );
      expect(productConnector.get).not.toHaveBeenCalled();
      expect(quickOrderFacade.addProduct).not.toHaveBeenCalled();
      expect(results).toEqual([
        {
          productCode: mockProductData[0].productCode,
          statusCode: ProductImportStatus.LIMIT_EXCEEDED,
        },
        {
          productCode: mockProductData[1].productCode,
          statusCode: ProductImportStatus.LIMIT_EXCEEDED,
        },
        {
          productCode: mockProductData[2].productCode,
          statusCode: ProductImportStatus.LIMIT_EXCEEDED,
        },
        {
          productCode: mockProductData[3].productCode,
          statusCode: ProductImportStatus.LIMIT_EXCEEDED,
        },
      ]);
    });

    it('should catch unknown identifier error', () => {
      canAdd$.next(true);
      productConnector.get = createSpy().and.returnValue(
        throwError(() => ({
          error: {
            errors: [{ type: 'UnknownIdentifierError' }],
          },
        }))
      );

      const unableToAddProductsData: ProductData[] = [
        { productCode: '1232143', quantity: 2 },
      ];
      const results = [];

      service
        .addEntries(unableToAddProductsData)
        .subscribe((data) => {
          results.push(data);
        })
        .unsubscribe();

      expect(quickOrderFacade.canAdd).toHaveBeenCalledTimes(
        unableToAddProductsData.length
      );
      expect(productConnector.get).toHaveBeenCalledTimes(
        unableToAddProductsData.length
      );
      expect(quickOrderFacade.addProduct).not.toHaveBeenCalled();
      expect(results).toEqual([
        {
          productCode: unableToAddProductsData[0].productCode,
          statusCode: ProductImportStatus.UNKNOWN_IDENTIFIER,
        },
      ]);
    });

    it('should catch unknown errors', () => {
      canAdd$.next(true);
      productConnector.get = createSpy().and.returnValue(
        throwError(() => ({}))
      );

      const unableToAddProductsData: ProductData[] = [
        { productCode: unhandledItemErrorId, quantity: 1 },
      ];
      const results = [];
      spyOn(logger, 'warn').and.stub();

      service
        .addEntries(unableToAddProductsData)
        .subscribe((data) => {
          results.push(data);
        })
        .unsubscribe();

      expect(quickOrderFacade.canAdd).toHaveBeenCalledTimes(
        unableToAddProductsData.length
      );
      expect(productConnector.get).toHaveBeenCalledTimes(
        unableToAddProductsData.length
      );
      expect(quickOrderFacade.addProduct).not.toHaveBeenCalled();
      expect(results).toEqual([
        {
          productCode: unableToAddProductsData[0].productCode,
          statusCode: ProductImportStatus.UNKNOWN_ERROR,
        },
      ]);
      expect(logger.warn).toHaveBeenCalledWith(
        'Unrecognized cart add entry action type while mapping messages',
        {}
      );
    });
  });
});
