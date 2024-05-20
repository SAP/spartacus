import {
  Component,
  DebugElement,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { I18nTestingModule, Product } from '@spartacus/core';
import { BREAKPOINT, BreakpointService } from '@spartacus/storefront';
import { BehaviorSubject, Observable } from 'rxjs';

import { AsmCustomer360ProductListingComponent } from './asm-customer-360-product-listing.component';
import { ProductItem } from './product-item.model';

describe('AsmCustomer360ProductListingComponent', () => {
  let component: AsmCustomer360ProductListingComponent;
  let fixture: ComponentFixture<AsmCustomer360ProductListingComponent>;
  let el: DebugElement;

  let componentTest: AsmCustomerProductListingComponentTest;
  let testFixture: ComponentFixture<AsmCustomerProductListingComponentTest>;
  let testDebugElement: DebugElement;

  const breakpointSubject = new BehaviorSubject<BREAKPOINT>(BREAKPOINT.xl);

  @Component({
    template: '',
    selector:
      '[cx-asm-customer-360-product-item], cx-asm-customer-360-product-item',
  })
  class MockAsmProductItemComponent {
    @Input() product: Product;
    @Input() quantity: number;
    @Input() isOrderEntry = true;
    @Output() selectProduct = new EventEmitter<Product>();
  }

  @Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'asm-customer-product-listing-component-test',
    template: `
      <cx-asm-customer-360-product-listing
        [headerInactive]="headerInactive"
        [headerTemplate]="headerTemplate"
        [products]="products"
        [headerText]="headerText"
        (clickHeader)="clickHeaderSpy.push(undefined)"
        (selectProduct)="selectProductSpy.push($event)"
      >
      </cx-asm-customer-360-product-listing>

      <ng-template #headerTemplate>
        <div id="product-listing-header-template"></div>
      </ng-template>
    `,
  })
  // eslint-disable-next-line @angular-eslint/component-class-suffix
  class AsmCustomerProductListingComponentTest {
    @ViewChild(AsmCustomer360ProductListingComponent)
    componentRef: AsmCustomer360ProductListingComponent;

    @Input()
    headerInactive: boolean;

    @Input()
    products: Array<ProductItem>;

    @Input()
    headerText: string;

    clickHeaderSpy: Array<undefined> = [];

    selectProductSpy: Array<Product> = [];
  }

  class MockBreakpointService {
    get breakpoint$(): Observable<BREAKPOINT> {
      return breakpointSubject.asObservable();
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [
        AsmCustomer360ProductListingComponent,
        MockAsmProductItemComponent,
        AsmCustomerProductListingComponentTest,
      ],
      providers: [
        {
          provide: BreakpointService,
          useClass: MockBreakpointService,
        },
      ],
    }).compileComponents();
  });

  function createComponent(): void {
    fixture = TestBed.createComponent(AsmCustomer360ProductListingComponent);
    component = fixture.componentInstance;

    component.products = [
      {
        code: 'product001',
        quantity: 1,
      },
      {
        code: 'product002',
        quantity: 2,
      },
    ];
    component.headerText = 'Header text';

    el = fixture.debugElement;
  }

  function createComponentTest(): void {
    testFixture = TestBed.createComponent(
      AsmCustomerProductListingComponentTest
    );
    componentTest = testFixture.componentInstance;
    testDebugElement = testFixture.debugElement;

    componentTest.products = [
      {
        code: 'product001',
        quantity: 1,
      },
      {
        code: 'product002',
        quantity: 2,
      },
    ];
    componentTest.headerText = 'Header text';
  }

  it('should create', () => {
    createComponent();

    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render products', () => {
    createComponent();

    fixture.detectChanges();
    expect(el.queryAll(By.css('cx-asm-customer-360-product-item')).length).toBe(
      2
    );
  });

  it('should render a header', () => {
    createComponent();

    fixture.detectChanges();
    const header = el.queryAll(By.css('.product-listing-header'));

    expect(header.length).toBe(1);
    expect(header[0].nativeElement.textContent).toBe(' Header text ');
  });

  it('shoulder render only two products', () => {
    createComponent();

    breakpointSubject.next(BREAKPOINT.lg);

    fixture.detectChanges();

    expect(el.queryAll(By.css('cx-asm-customer-360-product-item')).length).toBe(
      2
    );
  });

  it('should show more products if not all are shown', () => {
    createComponent();

    breakpointSubject.next(BREAKPOINT.md);

    fixture.detectChanges();

    expect(el.queryAll(By.css('cx-asm-customer-360-product-item')).length).toBe(
      1
    );

    const showHideButton = el.query(By.css('.show-hide-button'));

    showHideButton.nativeElement.click();

    fixture.detectChanges();

    expect(el.queryAll(By.css('cx-asm-customer-360-product-item')).length).toBe(
      2
    );

    showHideButton.nativeElement.click();

    fixture.detectChanges();

    expect(el.queryAll(By.css('cx-asm-customer-360-product-item')).length).toBe(
      1
    );
  });

  it('should show a text explaining that there are no items to render', () => {
    createComponent();

    component.emptyResultDescription = 'There are no items';
    component.products = [];

    fixture.detectChanges();

    expect(
      el.query(By.css('.empty-result-description')).nativeElement.textContent
    ).toBe(' There are no items ');
  });

  describe('from a parent element', () => {
    beforeEach(() => {
      createComponentTest();

      testFixture.detectChanges();
    });

    it('should render the header template', () => {
      expect(
        testDebugElement.query(By.css('#product-listing-header-template'))
      ).toBeTruthy();
    });

    it('should render the header as unclickable', () => {
      const headerLink = testDebugElement.query(By.css('.title-link'));

      expect(headerLink).toBeTruthy();

      expect(headerLink.classes.inactive).toBeFalsy();

      componentTest.headerInactive = true;

      testFixture.detectChanges();

      expect(headerLink.classes.inactive).toBeTruthy();
    });
  });
});
