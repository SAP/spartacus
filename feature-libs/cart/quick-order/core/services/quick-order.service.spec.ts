import { AbstractType } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { defaultQuickOrderConfig } from '@spartacus/cart/quick-order/root';
import {
  ActiveCartService,
  CartAddEntrySuccessEvent,
  EventService,
  OrderEntry,
  Product,
  ProductSearchConnector,
  ProductSearchPage,
  SearchConfig,
} from '@spartacus/core';
import { Observable, of, queueScheduler } from 'rxjs';
import { delay, observeOn, switchMap, take, tap } from 'rxjs/operators';
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
  pageSize: defaultQuickOrderConfig.quickOrder?.searchForm?.maxProducts,
};
const mockProductSearchPage: ProductSearchPage = {
  products: [mockProduct1, mockProduct2],
};

class MockProductSearchConnector implements Partial<ProductSearchConnector> {
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
  let productSearchConnector: ProductSearchConnector;
  let activeCartService: ActiveCartService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        QuickOrderService,
        {
          provide: ActiveCartService,
          useClass: MockActiveCartService,
        },
        {
          provide: EventService,
          useClass: MockEventService,
        },
        {
          provide: ProductSearchConnector,
          useClass: MockProductSearchConnector,
        },
      ],
    });

    service = TestBed.inject(QuickOrderService);
    productSearchConnector = TestBed.inject(ProductSearchConnector);
    activeCartService = TestBed.inject(ActiveCartService);
  });

  beforeEach(() => {
    service.clearList();
    service.setListLimit(10);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should clear timeout subscriptions on service destroy', () => {
    spyOn(service, 'clearDeletedEntries').and.callThrough();
    service.ngOnDestroy();

    expect(service.clearDeletedEntries).toHaveBeenCalled();
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

  describe('should trigger search products', () => {
    beforeEach(() => {
      spyOn(productSearchConnector, 'search').and.returnValue(
        of(mockProductSearchPage)
      );
    });

    it('with provided maxProducts', (done) => {
      service
        .searchProducts(mockProduct1Code, mockMaxProducts)
        .pipe(take(1))
        .subscribe(() => {
          expect(productSearchConnector.search).toHaveBeenCalledWith(
            mockProduct1Code,
            mockSearchConfig
          );
          done();
        });
    });

    it('with default config maxProducts value', (done) => {
      service
        .searchProducts(mockProduct1Code)
        .pipe(take(1))
        .subscribe(() => {
          expect(productSearchConnector.search).toHaveBeenCalledWith(
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

  it('should delete entry', (done) => {
    service.loadEntries([mockEntry1, mockEntry2]);
    service.softDeleteEntry(0);

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

  it('should add product to the quick order list with custom quantity', (done) => {
    service.addProduct(mockProduct1, 4);

    service
      .getEntries()
      .pipe(take(1))
      .subscribe((entries) => {
        expect(entries).toEqual([
          {
            product: mockProduct1,
            quantity: 4,
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

  it('should add deleted entry and after 5s delete it', (done) => {
    service.loadEntries(mockEntries);
    service.softDeleteEntry(0);

    service
      .getSoftDeletedEntries()
      .pipe(
        tap((softDeletedEntries) => {
          expect(softDeletedEntries).toEqual({ mockCode1: mockEntry1 });
        }),
        delay(5000),
        switchMap(() => service.getSoftDeletedEntries())
      )
      .subscribe((result) => {
        expect(result).toEqual({});
      });
    done();
  });

  it('should not add deleted entry', (done) => {
    service.loadEntries([mockEmptyEntry]);
    service.softDeleteEntry(0);

    service
      .getSoftDeletedEntries()
      .pipe(take(1))
      .subscribe((result) => {
        expect(result).toEqual({});
        done();
      });
  });

  it('should return deleted entries', (done) => {
    service.loadEntries([mockEntry1]);
    service.softDeleteEntry(0);

    service
      .getSoftDeletedEntries()
      .pipe(take(1))
      .subscribe((result) => {
        expect(result).toEqual({ mockCode1: mockEntry1 });
        done();
      });
  });

  it('should undo deleted entry', (done) => {
    service.loadEntries([mockEntry1]);
    service.softDeleteEntry(0);

    service
      .getSoftDeletedEntries()
      .pipe(
        observeOn(queueScheduler),
        take(1),
        tap((softDeletedEntries) => {
          expect(softDeletedEntries).toEqual({ mockCode1: mockEntry1 });
        }),
        tap(() => service.restoreSoftDeletedEntry(mockProduct1Code))
      )
      .subscribe((result) => {
        expect(result).toEqual({});
        done();
      });
  });

  it('should clear deleted entry', (done) => {
    service.loadEntries([mockEntry1]);
    service.softDeleteEntry(0);
    service.hardDeleteEntry(mockProduct1Code);
    service
      .getSoftDeletedEntries()
      .pipe(take(1))
      .subscribe((result) => {
        expect(result).toEqual({});
        done();
      });
  });

  describe('canAdd', () => {
    it('should verify can add a product which already exists even list limit reached', () => {
      let result: boolean;
      service.setListLimit(1);
      service.addProduct(mockProduct1);

      service.canAdd(mockProduct1Code).subscribe((canAdd) => (result = canAdd));
      expect(result).toBe(true);
    });

    describe('should verify cannot add next product because of limit', () => {
      it('with product code', () => {
        let result: boolean;
        service.setListLimit(1);
        service.addProduct(mockProduct1);

        service
          .canAdd(mockProduct2Code)
          .subscribe((canAdd) => (result = canAdd));
        expect(result).toBe(false);
      });

      it('without product code', () => {
        let result: boolean;
        service.setListLimit(1);
        service.addProduct(mockProduct1);

        service.canAdd().subscribe((canAdd) => (result = canAdd));
        expect(result).toBe(false);
      });
    });
  });

  describe('Non purchasable product', () => {
    it('should return null if there is no error set up', (done) => {
      service.getNonPurchasableProductError().subscribe((value) => {
        expect(value).toBeNull();
        done();
      });
    });

    it('should set error and return it', (done) => {
      service.setNonPurchasableProductError(mockProduct1);
      service.getNonPurchasableProductError().subscribe((value) => {
        expect(value).toEqual(mockProduct1);
        done();
      });
    });

    it('should clear error', (done) => {
      service.setNonPurchasableProductError(mockProduct1);
      service.clearNonPurchasableProductError();
      service.getNonPurchasableProductError().subscribe((value) => {
        expect(value).toBeNull();
        done();
      });
    });
  });
});
