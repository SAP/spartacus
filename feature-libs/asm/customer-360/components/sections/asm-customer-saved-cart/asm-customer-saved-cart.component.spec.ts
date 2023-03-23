import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Cart } from '@spartacus/cart/base/root';
import { I18nTestingModule, ImageType, Product } from '@spartacus/core';

import { AsmCustomerProductListingComponent } from '../../asm-customer-product-listing/asm-customer-product-listing.component';
import { Customer360SectionContextSource } from '../customer-360-section-context-source.model';
import { Customer360SectionContext } from '../customer-360-section-context.model';
import { AsmCustomerSavedCartComponent } from './asm-customer-saved-cart.component';

describe('AsmCustomerSavedCartComponent', () => {
  let component: AsmCustomerSavedCartComponent;
  let fixture: ComponentFixture<AsmCustomerSavedCartComponent>;
  let el: DebugElement;

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

  const mockCart: Cart = {
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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [
        AsmCustomerSavedCartComponent,
        AsmCustomerProductListingComponent,
      ],
      providers: [
        Customer360SectionContextSource,
        {
          provide: Customer360SectionContext,
          useExisting: Customer360SectionContextSource,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsmCustomerSavedCartComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;

    const contextSource = TestBed.inject(Customer360SectionContextSource);
    contextSource.savedCarts$.next([mockCart]);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a header', () => {
    const productListing = el.query(By.css('cx-asm-customer-product-listing'));

    const title = productListing.query(By.css('.title-link'));

    expect(title.nativeElement.textContent).toBe(
      ' customer360.savedCart.header '
    );

    const titleLink = productListing.query(By.css('.cx-overview-title-link'));

    expect(titleLink.nativeElement.textContent).toBe(' 00001 ');

    const totalItems = productListing.query(By.css('.cart-total-no-items'));

    expect(totalItems.nativeElement.textContent).toBe(
      ' customer360.productListing.totalNoItems count:2 '
    );

    const totalPrice = productListing.query(By.css('.cart-total-price'));

    expect(totalPrice.nativeElement.textContent).toBe(
      ' customer360.productListing.totalPrice price:$165.00 '
    );
  });
});
