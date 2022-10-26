import {
  Component,
  DebugElement,
  Directive,
  Input,
  Pipe,
  PipeTransform,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActiveCartFacade, Cart } from '@spartacus/cart/base/root';
import { SavedCartFacade } from '@spartacus/cart/saved-cart/root';
import {
  I18nTestingModule,
  ImageType,
  Product,
  TranslationService,
} from '@spartacus/core';
import { OrderHistoryFacade, OrderHistoryList } from '@spartacus/order/root';
import { FocusConfig, ICON_TYPE } from '@spartacus/storefront';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { AsmCustomerTableComponent } from '../../asm-customer-ui-components/asm-customer-table/asm-customer-table.component';
import { Customer360SectionContextSource } from '../customer-360-section-context-source.model';
import { Customer360SectionContext } from '../customer-360-section-context.model';
import { AsmCustomerActivityComponent } from './asm-customer-activity.component';

@Directive({
  selector: '[cxFocus]',
})
export class MockKeyboadFocusDirective {
  @Input('cxFocus') config: FocusConfig = {};
}

describe('AsmCustomerActivityComponent', () => {
  const mockProduct1: Product = {
    code: '553637',
    name: 'NV10',
    images: {
      PRIMARY: {
        thumbnail: {
          altText: 'NV10',
          format: 'thumbnail',
          imageType: ImageType.PRIMARY,
          url: 'image-url',
        },
      },
    },
    price: {
      formattedValue: '$264.69',
    },
    stock: {
      stockLevel: 0,
      stockLevelStatus: 'outOfStock',
    },
  };

  const mockProduct2: Product = {
    code: '553638',
    name: 'NV11',
    images: {
      PRIMARY: {
        thumbnail: {
          altText: 'NV11',
          format: 'thumbnail',
          imageType: ImageType.PRIMARY,
          url: 'image-url',
        },
      },
    },
    price: {
      formattedValue: '$188.69',
    },
    stock: {
      stockLevel: 0,
      stockLevelStatus: 'outOfStock',
    },
    baseOptions: [
      {
        selected: {
          variantOptionQualifiers: [
            {
              name: 'color',
              value: 'red',
            },
            {
              name: 'size',
              value: 'XL',
            },
          ],
        },
      },
    ],
  };

  const mockCart1: Cart = {
    code: '00001',
    name: 'test name',
    saveTime: new Date(2000, 2, 2),
    description: 'test description',
    totalItems: 2,
    totalPrice: {
      formattedValue: '$165.00',
    },
    entries: [
      {
        product: mockProduct1,
      },
      {
        product: mockProduct2,
      },
    ],
  };
  const mockCart2: Cart = {
    code: '00002',
    name: 'test name',
    saveTime: new Date(2000, 2, 2),
    description: 'test description',
    totalItems: 2,
    totalPrice: {
      formattedValue: '$167.00',
    },
  };
  const mockCarts: Cart[] = [mockCart1, mockCart2];

  class MockSavedCartFacade implements Partial<SavedCartFacade> {
    getList(): Observable<Cart[]> {
      return of(mockCarts);
    }
    loadSavedCarts(): void {}
  }

  const cart$ = new BehaviorSubject<Cart>(mockCart1);

  class MockActiveCartService implements Partial<ActiveCartFacade> {
    getActive(): Observable<Cart> {
      return cart$.asObservable();
    }
  }

  @Pipe({
    name: 'cxTranslate',
  })
  class MockTranslatePipe implements PipeTransform {
    transform(): any {}
  }
  @Component({
    selector: 'cx-icon',
    template: '',
  })
  class MockCxIconComponent {
    @Input() type: ICON_TYPE;
  }

  const mockOrders: OrderHistoryList = {
    orders: [
      {
        code: '1',
        placed: new Date('2018-01-01'),
        statusDisplay: 'test',
        total: { formattedValue: '1' },
      },
      {
        code: '2',
        placed: new Date('2018-01-02'),
        statusDisplay: 'test2',
        total: { formattedValue: '2' },
      },
    ],
    pagination: { totalResults: 1, totalPages: 2, sort: 'byDate' },
    sorts: [{ code: 'byDate', selected: true }],
  };

  const mockOrderHistoryList$ = new BehaviorSubject<OrderHistoryList>(
    mockOrders
  );

  class MockOrderHistoryFacade implements Partial<OrderHistoryFacade> {
    getOrderHistoryList(): Observable<OrderHistoryList> {
      return mockOrderHistoryList$.asObservable();
    }
    getOrderHistoryListLoaded(): Observable<boolean> {
      return of(true);
    }
    loadOrderList(
      _pageSize: number,
      _currentPage?: number,
      _sort?: string
    ): void {}
    clearOrderList() {}
  }

  class MockTranslationService {
    translate(): Observable<string> {
      return of('test');
    }
  }
  let component: AsmCustomerActivityComponent;
  let fixture: ComponentFixture<AsmCustomerActivityComponent>;
  let el: DebugElement;
  let activeCartFacade: ActiveCartFacade;
  let sectionContext: Customer360SectionContext<void>;
  let orderHistoryFacade: OrderHistoryFacade;
  let savedCartFacade: SavedCartFacade;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [
        AsmCustomerActivityComponent,
        MockTranslatePipe,
        MockCxIconComponent,
        AsmCustomerTableComponent,
      ],
      providers: [
        { provide: ActiveCartFacade, useClass: MockActiveCartService },
        { provide: OrderHistoryFacade, useClass: MockOrderHistoryFacade },
        { provide: SavedCartFacade, useClass: MockSavedCartFacade },
        { provide: TranslationService, useClass: MockTranslationService },
        Customer360SectionContextSource,
        {
          provide: Customer360SectionContext,
          useExisting: Customer360SectionContextSource,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsmCustomerActivityComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;

    const contextSource = TestBed.inject(Customer360SectionContextSource);
    contextSource.config$.next({
      pageSize: 5,
    });

    activeCartFacade = TestBed.inject(ActiveCartFacade);
    savedCartFacade = TestBed.inject(SavedCartFacade);
    sectionContext = TestBed.inject(Customer360SectionContext);
    orderHistoryFacade = TestBed.inject(OrderHistoryFacade);
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should get data from services', () => {
    spyOn(activeCartFacade, 'getActive').and.returnValue(of(mockCart1));
    spyOn(savedCartFacade, 'getList').and.returnValue(of(mockCarts));
    spyOn(orderHistoryFacade, 'getOrderHistoryList').and.returnValue(
      of(mockOrders)
    );

    fixture.detectChanges();

    expect(activeCartFacade.getActive).toHaveBeenCalled();
    expect(savedCartFacade.getList).toHaveBeenCalled();
    expect(orderHistoryFacade.getOrderHistoryList).toHaveBeenCalled();
    expect(component.columns.length).toBe(6);
  });

  describe('table', () => {
    beforeEach(() => {
      spyOn(activeCartFacade, 'getActive').and.returnValue(of(mockCart1));
      spyOn(savedCartFacade, 'getList').and.returnValue(of(mockCarts));
      spyOn(orderHistoryFacade, 'getOrderHistoryList').and.returnValue(
        of(mockOrders)
      );
      fixture.detectChanges();
    });

    it('should display the column headers', () => {
      const headers = el.queryAll(By.css('.cx-asm-customer-table-header'));
      expect(headers.length).toBe(component.columns.length);
    });

    it('should display table', () => {
      const tableBody = el.query(By.css('.cx-asm-customer-table tbody'));
      const tableRows = tableBody?.queryAll(By.css('tr'));
      expect(tableRows.length).toBe(5);
    });

    it('should navigate to cart, order detail and saved cart detail', () => {
      spyOn(sectionContext.navigate$, 'next').and.stub();
      const tableBody = el.query(By.css('.cx-asm-customer-table tbody'));
      const tableRows = tableBody.queryAll(By.css('tr'));
      const linkCell = tableRows[0].query(
        By.css('.cx-asm-customer-table-link')
      );
      linkCell.nativeElement.click();

      expect(sectionContext.navigate$.next).toHaveBeenCalledWith({
        cxRoute: 'savedCartsDetails',
        params: { savedCartId: '00001' },
      });

      const linkCell2 = tableRows[2].query(
        By.css('.cx-asm-customer-table-link')
      );
      linkCell2.nativeElement.click();
      expect(sectionContext.navigate$.next).toHaveBeenCalledWith({
        cxRoute: 'orderDetails',
        params: { code: '1' },
      });

      const linkCell3 = tableRows[4].query(
        By.css('.cx-asm-customer-table-link')
      );
      linkCell3.nativeElement.click();
      expect(sectionContext.navigate$.next).toHaveBeenCalledWith({
        cxRoute: 'cart',
      });
    });
  });
});
