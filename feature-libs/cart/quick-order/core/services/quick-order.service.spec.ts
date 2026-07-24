import { vi } from 'vitest';
import { AbstractType } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  ActiveCartFacade,
  CartAddEntrySuccessEvent,
  OrderEntry,
} from '@spartacus/cart/base/root';
import { defaultQuickOrderConfig } from '@spartacus/cart/quick-order/root';
import {
  EventService,
  Product,
  ProductSearchConnector,
  ProductSearchPage,
  SearchConfig,
} from '@spartacus/core';
import { Observable, of, queueScheduler, firstValueFrom } from 'rxjs';
import { observeOn, take, tap } from 'rxjs/operators';
import { QuickOrderService } from './quick-order.service';

const mockProduct1Code: string = 'mockCode1';
const mockProduct2Code: string = 'mockCode2';
const mockProduct3Code: string = 'mockCode3';
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

class MockActiveCartService implements Partial<ActiveCartFacade> {
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
  let activeCartService: ActiveCartFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        QuickOrderService,
        {
          provide: ActiveCartFacade,
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
    activeCartService = TestBed.inject(ActiveCartFacade);
  });

  beforeEach(() => {
    service.clearList();
    service.setListLimit(10);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should clear timeout subscriptions on service destroy', () => {
    vi.spyOn(service, 'clearDeletedEntries');
    service.ngOnDestroy();

    expect(service.clearDeletedEntries).toHaveBeenCalled();
  });

  it('should return an empty list of entries', async () => {
    const entries = await firstValueFrom(service.getEntries());
    expect(entries).toEqual([]);
  });

  it('should load and return list of entries', async () => {
    service.loadEntries(mockEntries);
    const entries = await firstValueFrom(service.getEntries());
    expect(entries).toEqual(mockEntries);
  });

  it('should clear list of entries', async () => {
    service.loadEntries(mockEntries);
    service.clearList();
    const entries = await firstValueFrom(service.getEntries());
    expect(entries).toEqual([]);
  });

  describe('should trigger search products', () => {
    beforeEach(() => {
      vi.spyOn(productSearchConnector, 'search').mockReturnValue(
        of(mockProductSearchPage)
      );
    });

    it('with provided maxProducts', async () => {
      await firstValueFrom(service.searchProducts(mockProduct1Code, mockMaxProducts));
      expect(productSearchConnector.search).toHaveBeenCalledWith(
        mockProduct1Code,
        mockSearchConfig
      );
    });

    it('with default config maxProducts value', async () => {
      await firstValueFrom(service.searchProducts(mockProduct1Code));
      expect(productSearchConnector.search).toHaveBeenCalledWith(
        mockProduct1Code,
        mockDefaultSearchConfig
      );
    });
  });

  it('should update entry quantity', async () => {
    service.loadEntries([mockEntry1]);
    service.updateEntryQuantity(0, 4);

    const entries = await firstValueFrom(service.getEntries());
    expect(entries).toEqual([mockEntry1AfterUpdate]);
  });

  it('should delete entry', async () => {
    service.loadEntries([mockEntry1, mockEntry2]);
    service.softDeleteEntry(0);

    const entries = await firstValueFrom(service.getEntries());
    expect(entries).toEqual([mockEntry2]);
  });

  it('should add products to the cart', async () => {
    vi.spyOn(activeCartService, 'addEntries');
    vi.spyOn(activeCartService, 'isStable');
    vi.spyOn(service, 'clearList');

    service.loadEntries([mockEntry1]);
    await firstValueFrom(service.addToCart());
    expect(activeCartService.addEntries).toHaveBeenCalled();
    expect(activeCartService.isStable).toHaveBeenCalled();
    expect(service.clearList).toHaveBeenCalled();
  });

  it('should add product to the quick order list', async () => {
    service.addProduct(mockProduct1);

    const entries = await firstValueFrom(service.getEntries());
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
  });

  it('should add product to the quick order list with custom quantity', async () => {
    service.addProduct(mockProduct1, 4);

    const entries = await firstValueFrom(service.getEntries());
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
  });

  it('should add product to the quick order list by increasing current existing product quantity', async () => {
    service.addProduct(mockProduct1);
    service.addProduct(mockProduct1);

    const entries = await firstValueFrom(service.getEntries());
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
  });

  it('should add deleted entry and after 7s delete it', async () => {
    vi.useFakeTimers();
    service.loadEntries(mockEntries);
    service.softDeleteEntry(0);

    let softDeletedEntries: any;
    let shouldCheck = true;

    service
      .getSoftDeletedEntries()
      .pipe(
        tap((entries) => {
          if (shouldCheck) {
            expect(entries).toEqual({ mockCode1: mockEntry1 });

            shouldCheck = false;
          }
        })
      )
      .subscribe((result) => {
        softDeletedEntries = result;
      });

    await vi.advanceTimersByTimeAsync(7000);
    vi.useRealTimers();

    expect(softDeletedEntries).toEqual({});
  });

  it('should not add deleted entry', async () => {
    service.loadEntries([mockEmptyEntry]);
    service.softDeleteEntry(0);

    const result = await firstValueFrom(service.getSoftDeletedEntries());
    expect(result).toEqual({});
  });

  it('should return deleted entries', async () => {
    service.loadEntries([mockEntry1]);
    service.softDeleteEntry(0);

    const result = await firstValueFrom(service.getSoftDeletedEntries());
    expect(result).toEqual({ mockCode1: mockEntry1 });
  });

  it('should undo deleted entry', async () => {
    service.loadEntries([mockEntry1]);
    service.softDeleteEntry(0);

    const result = await firstValueFrom(
      service.getSoftDeletedEntries().pipe(
        observeOn(queueScheduler),
        tap((softDeletedEntries) => {
          expect(softDeletedEntries).toEqual({ mockCode1: mockEntry1 });
        }),
        tap(() => service.restoreSoftDeletedEntry(mockProduct1Code))
      )
    );
    expect(result).toEqual({});
  });

  it('should clear deleted entry', async () => {
    service.loadEntries([mockEntry1]);
    service.softDeleteEntry(0);
    service.hardDeleteEntry(mockProduct1Code);
    const result = await firstValueFrom(service.getSoftDeletedEntries());
    expect(result).toEqual({});
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

    describe('adding list of products to non-empty entry list', () => {
      const mockProductsToAdd: any[] = [
        { productCode: mockProduct1Code },
        { productCode: mockProduct2Code },
        { productCode: mockProduct3Code },
      ];

      beforeEach(() => {
        service.addProduct(mockProduct1);
      });

      it('should verify can add products which already exists even list limit reached', () => {
        let result: boolean;
        service.setListLimit(2);
        service.addProduct(mockProduct2);

        service
          .canAdd(mockProduct1Code, mockProductsToAdd)
          .subscribe((canAdd) => (result = canAdd));
        expect(result).toBe(true);
        service
          .canAdd(mockProduct2Code, mockProductsToAdd)
          .subscribe((canAdd) => (result = canAdd));
        expect(result).toBe(true);
      });

      it('should verify can add 1st existing product in list of 3 products because it will NOT breach limit of 2', () => {
        let result: boolean;
        service.setListLimit(2);

        service
          .canAdd(mockProduct1Code, mockProductsToAdd)
          .subscribe((canAdd) => (result = canAdd));
        expect(result).toBe(true);
      });

      it('should verify can add 2nd non-existing product in list of 3 products because it will NOT breach limit of 2', () => {
        let result: boolean;
        service.setListLimit(2);

        service
          .canAdd(mockProduct2Code, mockProductsToAdd)
          .subscribe((canAdd) => (result = canAdd));
        expect(result).toBe(true);
      });

      it('should verify cannot add 3rd non-existing product in list of 3 products because it will breach limit of 2', () => {
        let result: boolean;
        service.setListLimit(2);

        service
          .canAdd(mockProduct3Code, mockProductsToAdd)
          .subscribe((canAdd) => (result = canAdd));
        expect(result).toBe(false);
      });
    });
  });

  describe('Non purchasable product', () => {
    it('should return null if there is no error set up', async () => {
      const value = await firstValueFrom(service.getNonPurchasableProductError());
      expect(value).toBeNull();
    });

    it('should set error and return it', async () => {
      service.setNonPurchasableProductError(mockProduct1);
      const value = await firstValueFrom(service.getNonPurchasableProductError());
      expect(value).toEqual(mockProduct1);
    });

    it('should clear error', async () => {
      service.setNonPurchasableProductError(mockProduct1);
      service.clearNonPurchasableProductError();
      const value = await firstValueFrom(service.getNonPurchasableProductError());
      expect(value).toBeNull();
    });
  });
});
