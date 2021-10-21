import { TestBed } from '@angular/core/testing';
import { OrderEntry } from '@spartacus/core';
import { ImportContext, ProductData } from '@spartacus/cart/import-export/core';
import { Action, ActionsSubject } from '@ngrx/store';
import { Observable, of, Subject } from 'rxjs';
import { CartImportContext } from './cart-import.context';
import { CartTypes } from '../model';
import { Injectable } from '@angular/core';
import createSpy = jasmine.createSpy;

const mockActionsSubject = new Subject<Action>();

const mockCartId = '00004546';

const mockProductsData: ProductData[] = [
  {
    productCode: '123456',
    quantity: 2,
  },
  {
    productCode: '789123',
    quantity: 4,
  },
];

const mockEntries: OrderEntry[] = [
  {
    quantity: 1,
    product: { name: 'mockProduct', code: 'mockCode' },
  },
];

class MockTestCartService {
  addEntries = createSpy().and.callThrough();
  getEntries = createSpy().and.returnValue(of(mockEntries));
  getActiveCartId = createSpy().and.returnValue(of(mockCartId));
}

@Injectable({
  providedIn: 'root',
})
class TestCartImportExportContext
  extends CartImportContext
  implements ImportContext
{
  constructor(
    protected actionsSubject: ActionsSubject,
    protected testCartService: MockTestCartService
  ) {
    super(actionsSubject);
  }

  readonly type = 'TEST_CART' as CartTypes;

  getEntries(): Observable<OrderEntry[]> {
    return this.testCartService.getEntries();
  }

  protected add(products: ProductData[]): Observable<string> {
    this.testCartService.addEntries(this.mapProductsToOrderEntries(products));
    return this.testCartService.getActiveCartId();
  }

  protected mapProductsToOrderEntries(products: ProductData[]): OrderEntry[] {
    return products.map(
      (product: { productCode: string; quantity: number }) => ({
        product: { code: product.productCode },
        quantity: product.quantity,
      })
    );
  }
}

describe('CartImportExportContext', () => {
  let service: TestCartImportExportContext;
  let testCartService: MockTestCartService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { useValue: mockActionsSubject, provide: ActionsSubject },
        MockTestCartService,
      ],
    });
    service = TestBed.inject(TestCartImportExportContext);
    testCartService = TestBed.inject(MockTestCartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('addEntries', () => {
    it('addEntries for test cart', () => {
      service.addEntries(mockProductsData).subscribe().unsubscribe();

      expect(testCartService.addEntries).toHaveBeenCalledWith(mockProductsData);
      expect(testCartService.getActiveCartId).toHaveBeenCalledWith();
    });
  });

  describe('getEntries', () => {
    it('getEntries from test cart', () => {
      let entries: OrderEntry[];
      service
        .getEntries()
        .subscribe((result) => {
          entries = result;
        })
        .unsubscribe();

      expect(testCartService.getEntries).toHaveBeenCalledWith();
      expect(entries).toEqual(mockEntries);
    });
  });
});
