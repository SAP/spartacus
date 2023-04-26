import { Component, DebugElement, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  I18nTestingModule,
  ImageType,
  Product,
  ProductService,
} from '@spartacus/core';

import { AsmCustomerProductListingComponent } from '../../asm-customer-product-listing/asm-customer-product-listing.component';
import { Customer360SectionContextSource } from '../customer-360-section-context-source.model';
import { Customer360SectionContext } from '../customer-360-section-context.model';
import { AsmCustomerActiveCartComponent } from './asm-customer-active-cart.component';
import { BehaviorSubject, Observable, of } from 'rxjs';
import {
  Customer360ActiveCart,
  Customer360Type,
} from '@spartacus/asm/customer-360/root';
import { BREAKPOINT, BreakpointService } from '@spartacus/storefront';

import { AsmProductItemComponent } from '../../asm-product-item/asm-product-item.component';

describe('AsmCustomerActiveCartComponent', () => {
  let component: AsmCustomerActiveCartComponent;
  let fixture: ComponentFixture<AsmCustomerActiveCartComponent>;
  let el: DebugElement;
  let contextSource: Customer360SectionContextSource<Customer360ActiveCart>;

  const breakpointSubject = new BehaviorSubject<BREAKPOINT>(BREAKPOINT.xl);

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

  class MockBreakpointService {
    get breakpoint$(): Observable<BREAKPOINT> {
      return breakpointSubject.asObservable();
    }
  }
  const mockActiveCart: Customer360ActiveCart = {
    type: Customer360Type.ACTIVE_CART,
    cart: {
      code: '00000001',
      totalPrice: '$100.00',
      totalItemCount: 1,
      entries: [
        {
          quantity: 1,
          basePrice: '$10.00',
          totalPrice: '$10.00',
          productCode: '553637',
        },
        {
          quantity: 3,
          basePrice: '$10.00',
          totalPrice: '$30.00',
          productCode: '553638',
        },
      ],
    },
  };

  const productService = jasmine.createSpyObj('ProductService', ['get']);

  @Component({
    template: '',
    selector: 'cx-media',
  })
  class MockMediaComponent {
    @Input() container: any;
    @Input() format: any;
    @Input() alt: any;
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [
        AsmCustomerActiveCartComponent,
        AsmCustomerProductListingComponent,
        AsmProductItemComponent,
        MockMediaComponent,
      ],
      providers: [
        Customer360SectionContextSource,
        {
          provide: Customer360SectionContext,
          useExisting: Customer360SectionContextSource,
        },
        { provide: ProductService, useValue: productService },
        {
          provide: BreakpointService,
          useClass: MockBreakpointService,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsmCustomerActiveCartComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;

    const mockProductService = TestBed.inject(ProductService);

    (<jasmine.Spy>mockProductService.get).and.callFake((code: string) => {
      switch (code) {
        case '553637':
          return of(mockProduct1);
        case '553638':
          return of(mockProduct2);
      }
    });
    contextSource = TestBed.inject(Customer360SectionContextSource);

    contextSource.data$.next(mockActiveCart);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a header', () => {
    const productListing = el.query(By.css('cx-asm-customer-product-listing'));
    const title = productListing.query(By.css('.title-link'));
    expect(title.nativeElement.textContent).toBe(
      ' customer360.activeCart.header '
    );

    const titleLink = productListing.query(By.css('.cx-overview-title-link'));
    expect(titleLink.nativeElement.textContent).toContain(
      mockActiveCart.cart?.code
    );

    const totalItems = productListing.query(By.css('.cart-total-no-items'));
    expect(totalItems.nativeElement.textContent).toContain(
      mockActiveCart.cart?.totalItemCount
    );

    const totalPrice = productListing.query(By.css('.cart-total-price'));
    expect(totalPrice.nativeElement.textContent).toContain(
      mockActiveCart.cart?.totalPrice
    );
  });
  it('should render products', () => {
    breakpointSubject.next(BREAKPOINT.lg);
    fixture.detectChanges();
    expect(el.queryAll(By.css('cx-asm-product-item')).length).toBe(2);

    breakpointSubject.next(BREAKPOINT.md);

    fixture.detectChanges();
    expect(el.queryAll(By.css('cx-asm-product-item')).length).toBe(1);

    const productItem = el.queryAll(By.css('cx-asm-product-item'))[0];
    expect(
      productItem.query(By.css('.cx-asm-product-item-name')).nativeElement
        .textContent
    ).toContain(mockProduct1.name);

    expect(
      productItem.query(By.css('.cx-asm-product-item-code')).nativeElement
        .textContent
    ).toContain(mockProduct1.code);
  });

  it('should navigate Product', () => {
    spyOn(contextSource.navigate$, 'next').and.stub();
    const productName = el.queryAll(
      By.css('cx-asm-product-item .cx-asm-product-item-name')
    )[0];

    productName.nativeElement.click();
    expect(contextSource.navigate$.next).toHaveBeenCalledWith({
      cxRoute: 'product',
      params: {
        ...mockProduct1,
        quantity: mockActiveCart?.cart?.entries?.[0]?.quantity,
        basePrice: mockActiveCart?.cart?.entries?.[0]?.basePrice,
        totalPrice: mockActiveCart?.cart?.entries?.[0]?.totalPrice,
      },
    });
  });
});
