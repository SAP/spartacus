import { TestBed } from '@angular/core/testing';
import { BehaviorSubject, of } from 'rxjs';
import { OrderEntry, ProductConnector } from '@spartacus/core';
import { ProductData } from '@spartacus/storefront';
import { QuickOrderFacade } from '../facade/quick-order.facade';
import { QuickOrderOrderEntriesContext } from './quick-order-order-entries-context';
import createSpy = jasmine.createSpy;

const mockProductData: ProductData[] = [
  { productCode: '693923', quantity: 1 },
  { productCode: '232133', quantity: 2 },
];

const products = {
  693923: { name: 'mockProduct1', code: '693923' },
  232133: { name: 'mockProduct2', code: '232133' },
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
];

const canAdd$ = new BehaviorSubject<boolean>(true);

class MockProductConnector implements Partial<ProductConnector> {
  get = createSpy().and.callFake((code) => of(products[code]));
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
    it('should add entries to quick order', () => {
      canAdd$.next(true);
      service.addEntries(mockProductData).subscribe();

      expect(productConnector.get).toHaveBeenCalledTimes(
        mockProductData.length
      );
      expect(productConnector.get).toHaveBeenCalledWith(
        mockProductData[0].productCode
      );
      expect(productConnector.get).toHaveBeenCalledWith(
        mockProductData[1].productCode
      );
      expect(quickOrderFacade.addProduct).toHaveBeenCalledTimes(
        mockProductData.length
      );
      expect(quickOrderFacade.addProduct).toHaveBeenCalledWith(
        products['693923'],
        mockProductData[0].quantity
      );
      expect(quickOrderFacade.addProduct).toHaveBeenCalledWith(
        products['232133'],
        mockProductData[1].quantity
      );
    });

    it('should not add entries due to limit', () => {
      canAdd$.next(false);
      service.addEntries(mockProductData).subscribe();

      expect(quickOrderFacade.addProduct).not.toHaveBeenCalled();
    });
  });
});
