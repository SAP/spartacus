import { AbstractType } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  ActiveCartFacade,
  CartAddEntrySuccessEvent,
  OrderEntry,
} from '@spartacus/cart/main/root';
import { EventService, Product, ProductAdapter } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
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

class MockProductAdapter implements Partial<ProductAdapter> {
  load(_productCode: any, _scope?: string): Observable<Product> {
    return of(mockProduct1);
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
  let productAdapter: ProductAdapter;
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
        { provide: ProductAdapter, useClass: MockProductAdapter },
      ],
    });

    service = TestBed.inject(QuickOrderService);
    productAdapter = TestBed.inject(ProductAdapter);
    activeCartService = TestBed.inject(ActiveCartFacade);
  });

  beforeEach(() => {
    service.clearList();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
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

  it('should trigger search', () => {
    spyOn(productAdapter, 'load');

    service.search(mockProduct1Code);
    expect(productAdapter.load).toHaveBeenCalledWith(mockProduct1Code);
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
    service.loadEntries(mockEntries);
    service.removeEntry(0);

    service
      .getEntries()
      .pipe(take(1))
      .subscribe((entries) => {
        expect(entries).toEqual([mockEntry2]);
        done();
      });
  });

  // TODO: Fully check this method behavior
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

  it('should set added product', () => {
    service.setProductAdded(mockProduct1Code);
    service
      .getProductAdded()
      .subscribe((result) => {
        expect(result).toEqual(mockProduct1Code);
      })
      .unsubscribe();
  });
});
