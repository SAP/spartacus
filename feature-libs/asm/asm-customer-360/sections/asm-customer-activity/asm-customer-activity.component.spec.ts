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
import { Cart } from '@spartacus/cart/base/root';
import {
  I18nTestingModule,
  ImageType,
  Product,
  TranslationService,
} from '@spartacus/core';
import { OrderHistoryList } from '@spartacus/order/root';
import {
  DirectionMode,
  DirectionService,
  FocusConfig,
  ICON_TYPE,
} from '@spartacus/storefront';
import { ArgsPipe } from '@spartacus/asm/core';
import { Observable, of } from 'rxjs';
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

  class MockTranslationService {
    translate(): Observable<string> {
      return of('test');
    }
  }

  class MockDirectionService {
    getDirection() {
      return DirectionMode.LTR;
    }
  }

  let component: AsmCustomerActivityComponent;
  let fixture: ComponentFixture<AsmCustomerActivityComponent>;
  let el: DebugElement;
  let sectionContext: Customer360SectionContext<void>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [
        AsmCustomerActivityComponent,
        MockTranslatePipe,
        MockCxIconComponent,
        AsmCustomerTableComponent,
        ArgsPipe,
      ],
      providers: [
        { provide: TranslationService, useClass: MockTranslationService },
        Customer360SectionContextSource,
        {
          provide: Customer360SectionContext,
          useExisting: Customer360SectionContextSource,
        },
        {
          provide: DirectionService,
          useClass: MockDirectionService,
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
    contextSource.activeCart$.next(mockCart1);
    contextSource.orderHistory$.next(mockOrders);
    contextSource.savedCarts$.next(mockCarts);

    sectionContext = TestBed.inject(Customer360SectionContext);
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should get data from services', () => {
    fixture.detectChanges();

    expect(component.columns.length).toBe(6);
  });

  describe('table', () => {
    beforeEach(() => {
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
