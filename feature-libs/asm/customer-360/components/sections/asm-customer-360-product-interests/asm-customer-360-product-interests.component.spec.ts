import { Component, DebugElement, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  AsmCustomer360ProductInterestList,
  AsmCustomer360Type,
} from '@spartacus/asm/customer-360/root';
import {
  I18nTestingModule,
  ImageType,
  Product,
  ProductService,
} from '@spartacus/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

import { AsmCustomer360ProductListingComponent } from '../../asm-customer-360-product-listing/asm-customer-360-product-listing.component';
import { AsmCustomer360SectionContextSource } from '../asm-customer-360-section-context-source.model';
import { AsmCustomer360SectionContext } from '../asm-customer-360-section-context.model';
import { AsmCustomer360ProductInterestsComponent } from './asm-customer-360-product-interests.component';
import { AsmCustomer360ProductItemComponent } from '../../asm-customer-360-product-item/asm-customer-360-product-item.component';
import { BREAKPOINT, BreakpointService } from '@spartacus/storefront';

describe('AsmCustomer360ProductInterestsComponent', () => {
  let component: AsmCustomer360ProductInterestsComponent;
  let fixture: ComponentFixture<AsmCustomer360ProductInterestsComponent>;
  let el: DebugElement;

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

  const productService = jasmine.createSpyObj('ProductService', ['get']);

  class MockBreakpointService {
    get breakpoint$(): Observable<BREAKPOINT> {
      return breakpointSubject.asObservable();
    }
  }
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
        AsmCustomer360ProductInterestsComponent,
        AsmCustomer360ProductListingComponent,
        AsmCustomer360ProductItemComponent,
        MockMediaComponent,
      ],
      providers: [
        AsmCustomer360SectionContextSource,
        {
          provide: AsmCustomer360SectionContext,
          useExisting: AsmCustomer360SectionContextSource,
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
    fixture = TestBed.createComponent(AsmCustomer360ProductInterestsComponent);
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

    const contextSource = TestBed.inject(AsmCustomer360SectionContextSource);

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
    const productListing = el.query(
      By.css('cx-asm-customer-360-product-listing')
    );

    const title = productListing.query(By.css('.title-link'));

    expect(title.nativeElement.textContent).toBe(
      ' asmCustomer360.productInterests.header '
    );
  });

  it('should render products', () => {
    breakpointSubject.next(BREAKPOINT.lg);
    fixture.detectChanges();
    expect(el.queryAll(By.css('cx-asm-customer-360-product-item')).length).toBe(
      2
    );

    breakpointSubject.next(BREAKPOINT.md);

    fixture.detectChanges();
    expect(el.queryAll(By.css('cx-asm-customer-360-product-item')).length).toBe(
      1
    );

    const productItem = el.queryAll(
      By.css('cx-asm-customer-360-product-item')
    )[0];
    expect(
      productItem.query(By.css('.cx-asm-customer-360-product-item-name'))
        .nativeElement.textContent
    ).toContain(mockProduct1.name);

    expect(
      productItem.query(By.css('.cx-asm-customer-360-product-item-code'))
        .nativeElement.textContent
    ).toContain(mockProduct1.code);
  });
});
