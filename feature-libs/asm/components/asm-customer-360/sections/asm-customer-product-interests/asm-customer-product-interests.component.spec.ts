import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  AsmCustomer360ProductInterestList,
  AsmCustomer360Type,
} from '@spartacus/asm/root';
import {
  I18nTestingModule,
  ImageType,
  Product,
  ProductService,
} from '@spartacus/core';
import { of } from 'rxjs';

import { AsmCustomerProductListingComponent } from '../../asm-customer-ui-components/asm-customer-product-listing/asm-customer-product-listing.component';
import { Customer360SectionContextSource } from '../customer-360-section-context-source.model';
import { Customer360SectionContext } from '../customer-360-section-context.model';
import { AsmCustomerProductInterestsComponent } from './asm-customer-product-interests.component';

describe('AsmCustomerProductInterestsComponent', () => {
  let component: AsmCustomerProductInterestsComponent;
  let fixture: ComponentFixture<AsmCustomerProductInterestsComponent>;
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

  const productService = jasmine.createSpyObj('ProductService', ['get']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [
        AsmCustomerProductInterestsComponent,
        AsmCustomerProductListingComponent,
      ],
      providers: [
        Customer360SectionContextSource,
        {
          provide: Customer360SectionContext,
          useExisting: Customer360SectionContextSource,
        },
        { provide: ProductService, useValue: productService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsmCustomerProductInterestsComponent);
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

    const contextSource = TestBed.inject(Customer360SectionContextSource);

    const interestList: AsmCustomer360ProductInterestList = {
      customerProductInterests: [
        {
          product: {
            code: '553637',
          },
        },
        {
          product: {
            code: '553638',
          },
        },
      ],
      type: AsmCustomer360Type.PRODUCT_INTEREST_LIST,
    };

    contextSource.data$.next(interestList);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a header', () => {
    const productListing = el.query(By.css('cx-asm-customer-product-listing'));

    const title = productListing.query(By.css('.title-link'));

    expect(title.nativeElement.textContent).toBe(
      ' asm.customer360.overview.interests '
    );
  });
});
