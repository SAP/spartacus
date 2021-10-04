import { AbstractType } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { defaultQuickOrderFormConfig } from '@spartacus/cart/quick-order/root';
import {
  ActiveCartService,
  CartAddEntrySuccessEvent,
  EventService,
  OrderEntry,
  Product,
  ProductAdapter,
  ProductSearchAdapter,
  ProductSearchPage,
  SearchConfig,
} from '@spartacus/core';
import { Observable, of, timer } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { QuickOrderService } from './quick-order.service';

const mockProduct1Code: string = 'mockCode1';
const mockProduct2Code: string = 'mockCode2';
const mockProduct1: Product = {
  code: mockProduct1Code,
  price: {
    value: 1,
  },
};
const mockProduct2: Product = {
  code: mockProduct2Code,
  price: {
    value: 1,
  },
};
const mockEmptyEntry: OrderEntry = {};
const mockEntry1: OrderEntry = {
  product: mockProduct1,
  quantity: 1,
  basePrice: {
    value: 1,
  },
  totalPrice: {
    value: 1,
  },
};
const mockEntry2: OrderEntry = {
  product: mockProduct2,
  quantity: 2,
  basePrice: {
    value: 1,
  },
  totalPrice: {
    value: 1,
  },
};
const mockEntry1AfterUpdate: OrderEntry = {
  product: mockProduct1,
  quantity: 4,
  basePrice: {
    value: 1,
  },
  totalPrice: {
    value: 1,
  },
};
const mockEntries: OrderEntry[] = [mockEntry1, mockEntry2];
const mockMaxProducts: number = 10;
const mockSearchConfig: SearchConfig = {
  pageSize: mockMaxProducts,
};
const mockDefaultSearchConfig: SearchConfig = {
  pageSize: defaultQuickOrderFormConfig.quickOrderForm?.maxProducts,
};
const mockProductSearchPage: ProductSearchPage = {
  products: [mockProduct1, mockProduct2],
};

class MockProductSearchAdapter implements Partial<ProductSearchAdapter> {
  search(
    _query: string,
    _searchConfig?: SearchConfig
  ): Observable<ProductSearchPage> {
    return of(mockProductSearchPage);
  }
}

class MockActiveCartService implements Partial<ActiveCartService> {
  isStable(): Observable<boolean> {
    return of(true);
  }
  addEntries(_cartEntries: OrderEntry[]): void {}
}

class MockEventService implements Partial<EventService> {
  get<T>(_type: AbstractType<T>): Observable<T> {
    const event = new CartAddEntrySuccessEvent();
    event.productCode = mockProduct1Code;
    event.quantity = 4;
    return of(event) as any;
  }
}

describe('QuickOrderService', () => {
  let service: QuickOrderService;
  let productSearchAdapter: ProductSearchAdapter;
  let activeCartService: ActiveCartService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        QuickOrderService,
        ProductAdapter,
        {
          provide: ActiveCartService,
          useClass: MockActiveCartService,
        },
        {
          provide: EventService,
          useClass: MockEventService,
        },
        { provide: ProductSearchAdapter, useClass: MockProductSearchAdapter },
      ],
    });

    service = TestBed.inject(QuickOrderService);
    productSearchAdapter = TestBed.inject(ProductSearchAdapter);
    activeCartService = TestBed.inject(ActiveCartService);
  });

  beforeEach(() => {
    service.clearList();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should clear timeout subscriptions on service destroy', () => {
    spyOn(service, 'clearTimeoutSubscriptions').and.callThrough();
    service.ngOnDestroy();

    expect(service.clearTimeoutSubscriptions).toHaveBeenCalled();
  });

  it('should return an empty list of entries', (done) => {
    service
      .getEntries()
      .pipe(take(1))
      .subscribe((entries) => {
        expect(entries).toEqual([]);
        done();
      });
  });

  it('should load and return list of entries', (done) => {
    service.loadEntries(mockEntries);
    service
      .getEntries()
      .pipe(take(1))
      .subscribe((entries) => {
        expect(entries).toEqual(mockEntries);
        done();
      });
  });

  it('should clear list of entries', (done) => {
    service.loadEntries(mockEntries);
    service.clearList();
    service
      .getEntries()
      .pipe(take(1))
      .subscribe((entries) => {
        expect(entries).toEqual([]);
        done();
      });
  });

  describe('should trigger search', () => {
    beforeEach(() => {
      spyOn(productSearchAdapter, 'search').and.returnValue(
        of(mockProductSearchPage)
      );
    });

    it('with provided maxProducts', (done) => {
      service
        .search(mockProduct1Code, mockMaxProducts)
        .pipe(take(1))
        .subscribe(() => {
          expect(productSearchAdapter.search).toHaveBeenCalledWith(
            mockProduct1Code,
            mockSearchConfig
          );
          done();
        });
    });

    it('with default config maxProducts value', (done) => {
      service
        .search(mockProduct1Code)
        .pipe(take(1))
        .subscribe(() => {
          expect(productSearchAdapter.search).toHaveBeenCalledWith(
            mockProduct1Code,
            mockDefaultSearchConfig
          );
          done();
        });
    });
  });

  it('should update entry quantity', (done) => {
    service.loadEntries([mockEntry1]);
    service.updateEntryQuantity(0, 4);

    service
      .getEntries()
      .pipe(take(1))
      .subscribe((entries) => {
        expect(entries).toEqual([mockEntry1AfterUpdate]);
        done();
      });
  });

  it('should remove entry', (done) => {
    service.loadEntries([mockEntry1, mockEntry2]);
    service.softRemoveEntry(0);

    service
      .getEntries()
      .pipe(take(1))
      .subscribe((entries) => {
        expect(entries).toEqual([mockEntry2]);
        done();
      });
  });

  it('should add products to the cart', (done) => {
    spyOn(activeCartService, 'addEntries').and.callThrough();
    spyOn(activeCartService, 'isStable').and.callThrough();
    spyOn(service, 'clearList').and.callThrough();

    service.loadEntries([mockEntry1]);
    service
      .addToCart()
      .pipe(take(1))
      .subscribe(() => {
        expect(activeCartService.addEntries).toHaveBeenCalled();
        expect(activeCartService.isStable).toHaveBeenCalled();
        expect(service.clearList).toHaveBeenCalled();
        done();
      });
  });

  it('should add product to the quick order list', (done) => {
    service.addProduct(mockProduct1);

    service
      .getEntries()
      .pipe(take(1))
      .subscribe((entries) => {
        expect(entries).toEqual([
          {
            product: mockProduct1,
            quantity: 1,
            basePrice: {
              value: 1,
            },
            totalPrice: {
              value: 1,
            },
          },
        ]);
        done();
      });
  });

  it('should add product to the quick order list by increasing current existing product quantity', (done) => {
    service.addProduct(mockProduct1);
    service.addProduct(mockProduct1);

    service
      .getEntries()
      .pipe(take(1))
      .subscribe((entries) => {
        expect(entries).toEqual([
          {
            product: mockProduct1,
            quantity: 2,
            basePrice: {
              value: 1,
            },
            totalPrice: {
              value: 1,
            },
          },
        ]);
        done();
      });
  });

  it('should set added product', (done) => {
    service.setProductAdded(mockProduct1Code);
    service
      .getProductAdded()
      .pipe(take(1))
      .subscribe((result) => {
        expect(result).toEqual(mockProduct1Code);
      });
    done();
  });

  it('should get added product', (done) => {
    service
      .getProductAdded()
      .pipe(take(1))
      .subscribe((result) => {
        expect(result).toBeNull();
      });
    done();
  });

  it('should add deleted entry and after 5s removed it', (done) => {
    service.loadEntries(mockEntries);
    service.softRemoveEntry(0);

    timer(5000)
      .pipe(
        take(1),
        switchMap(() => service.getSoftDeletedEntries())
      )
      .subscribe((result) => {
        expect(result).toEqual({});
      });
    done();
  });

  it('should not add deleted entry', (done) => {
    service.loadEntries([mockEmptyEntry]);
    service.softRemoveEntry(0);

    service
      .getSoftDeletedEntries()
      .pipe(take(1))
      .subscribe((result) => {
        expect(result).toEqual({});
      });
    done();
  });

  it('should return deleted entries', (done) => {
    service.loadEntries([mockEntry1]);
    service.softRemoveEntry(0);

    service
      .getSoftDeletedEntries()
      .pipe(take(1))
      .subscribe((result) => {
        expect(result).toEqual({ mockCode1: mockEntry1 });
      });
    done();
  });

  it('should undo deleted entry', (done) => {
    service.loadEntries([mockEntry1]);
    service.softRemoveEntry(0);

    service.restoreSoftDeletedEntry(mockProduct1Code);

    service
      .getSoftDeletedEntries()
      .pipe(take(1))
      .subscribe((result) => {
        expect(result).toEqual({});
      });
    done();
  });

  it('should clear deleted entry', (done) => {
    service.loadEntries([mockEntry1]);
    service.softRemoveEntry(0);
    service.hardDeletedEntry(mockProduct1Code);
    service
      .getSoftDeletedEntries()
      .pipe(take(1))
      .subscribe((result) => {
        expect(result).toEqual({});
      });
    done();
  });
});
