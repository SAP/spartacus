import {
  Component,
  DebugElement,
  Directive,
  EventEmitter,
  Input,
  Output,
  Pipe,
  PipeTransform,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Cart, OrderEntry } from '@spartacus/cart/base/root';
import {
  I18nTestingModule,
  ImageType,
  NotificationType,
  Price,
  Product,
  ProductInterestSearchResult,
  ProductService,
  UserInterestsService,
} from '@spartacus/core';
import {
  BREAKPOINT,
  BreakpointService,
  FocusConfig,
  ICON_TYPE,
} from '@spartacus/storefront';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Customer360SectionContextSource } from '../customer-360-section-context-source.model';
import { Customer360SectionContext } from '../customer-360-section-context.model';
import { AsmCustomerOverviewComponent } from './asm-customer-overview.component';

@Directive({
  selector: '[cxFocus]',
})
export class MockKeyboadFocusDirective {
  @Input('cxFocus') config: FocusConfig = {};
}

describe('AsmCustomerOverviewComponent', () => {
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

  const mockProduct3: Product = {
    code: '553639',
    name: 'NV12',
    images: {
      PRIMARY: {
        thumbnail: {
          altText: 'NV12',
          format: 'thumbnail',
          imageType: ImageType.PRIMARY,
          url: 'image-url',
        },
      },
    },
    price: {
      formattedValue: '$22.69',
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

  const p553637$: Observable<Product> = of(mockProduct1);

  const p553638$: Observable<Product> = of(mockProduct2);

  const p553639$: Observable<Product> = of(mockProduct3);

  const mockedInterests: ProductInterestSearchResult = {
    sorts: [{ code: 'name', asc: true }],
    pagination: {
      count: 5,
      page: 0,
      totalCount: 1,
      totalPages: 1,
    },
    results: [
      {
        product: mockProduct1,
        productInterestEntry: [
          {
            dateAdded: new Date().toString(),
            interestType: NotificationType.BACK_IN_STOCK,
          },
        ],
      },
      {
        product: mockProduct2,
        productInterestEntry: [
          {
            dateAdded: new Date().toString(),
            interestType: NotificationType.BACK_IN_STOCK,
          },
        ],
      },
      {
        product: mockProduct3,
        productInterestEntry: [
          {
            dateAdded: new Date().toString(),
            interestType: NotificationType.BACK_IN_STOCK,
          },
        ],
      },
    ],
  };
  const emptyInterests: ProductInterestSearchResult = {
    sorts: [{ code: 'name', asc: true }],
    pagination: {},
  };

  class MockBreakpointService {
    get breakpoint$(): Observable<BREAKPOINT> {
      return of(BREAKPOINT.xl);
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

  @Component({
    template: '',
    selector: '[cx-asm-product-item], cx-asm-product-item',
  })
  class MockAsmProductItemComponent {
    @Input() item: OrderEntry;
    @Input() product: Product;
    @Input() quantity: number;
    @Input() price: Price;
    @Input() isOrderEntry = true;
    @Output() selectProduct = new EventEmitter<Product>();
  }

  let component: AsmCustomerOverviewComponent;
  let fixture: ComponentFixture<AsmCustomerOverviewComponent>;
  let el: DebugElement;
  let breakpointService: BreakpointService;
  let sectionContext: Customer360SectionContext<void>;
  let contextSource: Customer360SectionContextSource<void>;

  const productInterestService = jasmine.createSpyObj('UserInterestsService', [
    'loadProductInterests',
    'getAndLoadProductInterests',
    'getProdutInterestsLoading',
  ]);
  const productService = jasmine.createSpyObj('ProductService', ['get']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [
        AsmCustomerOverviewComponent,
        MockAsmProductItemComponent,
        MockTranslatePipe,
        MockCxIconComponent,
      ],
      providers: [
        {
          provide: BreakpointService,
          useClass: MockBreakpointService,
        },
        { provide: UserInterestsService, useValue: productInterestService },
        { provide: ProductService, useValue: productService },
        Customer360SectionContextSource,
        {
          provide: Customer360SectionContext,
          useExisting: Customer360SectionContextSource,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsmCustomerOverviewComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;

    breakpointService = TestBed.inject(BreakpointService);

    contextSource = TestBed.inject(Customer360SectionContextSource);
    contextSource.activeCart$.next(mockCart1);
    contextSource.savedCarts$.next(mockCarts);

    sectionContext = TestBed.inject(Customer360SectionContext);

    productInterestService.getAndLoadProductInterests.and.returnValue(
      of(emptyInterests)
    );
    productInterestService.getProdutInterestsLoading.and.returnValue(of(false));
    productInterestService.loadProductInterests.and.stub();
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should return active cart and not show more button', () => {
    spyOnProperty(breakpointService, 'breakpoint$').and.returnValue(
      of(BREAKPOINT.lg)
    );
    fixture.detectChanges();

    expect(el.queryAll(By.css('.cx-asm-overview-active-item')).length).toEqual(
      2
    );

    const showMoreBtn = el.query(
      By.css('.cx-asm-overview-active-cart .cx-action-link')
    );
    expect(showMoreBtn).toBeFalsy();
  });

  it('should link to cart page when click cart id', () => {
    spyOnProperty(breakpointService, 'breakpoint$').and.returnValue(
      of(BREAKPOINT.lg)
    );
    spyOn(sectionContext.navigate$, 'next').and.stub();
    fixture.detectChanges();
    const titleLink = el.query(
      By.css('.cx-asm-overview-active-cart .cx-overview-title-link')
    );

    titleLink.nativeElement.click();

    expect(sectionContext.navigate$.next).toHaveBeenCalledWith({
      cxRoute: 'cart',
    });
  });

  it('should show empty active cart section', () => {
    contextSource.activeCart$.next(undefined);
    spyOnProperty(breakpointService, 'breakpoint$').and.returnValue(
      of(BREAKPOINT.lg)
    );
    fixture.detectChanges();

    expect(el.query(By.css('.cx-asm-overview-empty'))).toBeTruthy();
  });

  it('should show more button for active cart', () => {
    spyOnProperty(breakpointService, 'breakpoint$').and.returnValue(
      of(BREAKPOINT.md)
    );
    fixture.detectChanges();

    expect(el.queryAll(By.css('.cx-asm-overview-active-item')).length).toEqual(
      1
    );
    const showMoreBtn = el.query(
      By.css('.cx-asm-overview-active-cart .cx-action-link')
    );
    expect(showMoreBtn).toBeTruthy();
    expect(component.showMoreActiveCart).toBe(false);
    showMoreBtn.nativeElement.click();
    expect(component.showMoreActiveCart).toBe(true);
  });

  it('should return saved cart and not show more button', () => {
    spyOn(sectionContext.navigate$, 'next').and.stub();
    spyOnProperty(breakpointService, 'breakpoint$').and.returnValue(
      of(BREAKPOINT.xl)
    );
    fixture.detectChanges();

    expect(el.queryAll(By.css('.cx-asm-overview-saved-item')).length).toEqual(
      2
    );
    const showMoreBtn = el.query(
      By.css('.cx-asm-overview-saved-cart .cx-action-link')
    );
    expect(showMoreBtn).toBeFalsy();
  });

  it('should link to saved cart detail page', () => {
    spyOn(sectionContext.navigate$, 'next').and.stub();
    spyOnProperty(breakpointService, 'breakpoint$').and.returnValue(
      of(BREAKPOINT.xl)
    );
    fixture.detectChanges();

    const titleLink = el.query(
      By.css('.cx-asm-overview-saved-cart .cx-overview-title-link')
    );
    titleLink.nativeElement.click();
    expect(sectionContext.navigate$.next).toHaveBeenCalledWith({
      cxRoute: 'savedCartsDetails',
      params: { savedCartId: '00001' },
    });
  });

  it('should return saved cart and show more button', () => {
    spyOnProperty(breakpointService, 'breakpoint$').and.returnValue(
      of(BREAKPOINT.md)
    );
    fixture.detectChanges();

    expect(el.queryAll(By.css('.cx-asm-overview-saved-item')).length).toEqual(
      1
    );
    const showMoreBtn = el.query(
      By.css('.cx-asm-overview-saved-cart .cx-action-link')
    );
    expect(showMoreBtn).toBeTruthy();
    expect(component.showMoreSavedCart).toBe(false);
    showMoreBtn.nativeElement.click();
    expect(component.showMoreSavedCart).toBe(true);
  });

  it('should return interests list', () => {
    spyOnProperty(breakpointService, 'breakpoint$').and.returnValue(
      new BehaviorSubject(BREAKPOINT.md)
    );
    spyOn(sectionContext.navigate$, 'next').and.stub();
    productInterestService.getAndLoadProductInterests.and.returnValue(
      of(mockedInterests)
    );
    productService.get.withArgs('553637', 'details').and.returnValue(p553637$);
    productService.get.withArgs('553638', 'details').and.returnValue(p553638$);
    productService.get.withArgs('553639', 'details').and.returnValue(p553639$);
    productInterestService.getProdutInterestsLoading.and.returnValue(of(false));
    fixture.detectChanges();

    expect(
      el.queryAll(By.css('.cx-asm-overview-interests-item')).length
    ).toEqual(2);

    const showMoreBtn = el.query(
      By.css('.cx-asm-overview-active-interests .cx-action-link')
    );
    expect(showMoreBtn).toBeTruthy();
    showMoreBtn.nativeElement.click();
    expect(component.showMoreInterests).toBe(true);
  });

  it('should link to interest page', () => {
    spyOnProperty(breakpointService, 'breakpoint$').and.returnValue(
      new BehaviorSubject(BREAKPOINT.md)
    );
    spyOn(sectionContext.navigate$, 'next').and.stub();
    productInterestService.getAndLoadProductInterests.and.returnValue(
      of(mockedInterests)
    );
    productService.get.withArgs('553637', 'details').and.returnValue(p553637$);
    productService.get.withArgs('553638', 'details').and.returnValue(p553638$);
    productService.get.withArgs('553639', 'details').and.returnValue(p553639$);
    productInterestService.getProdutInterestsLoading.and.returnValue(of(false));
    fixture.detectChanges();

    const titleLink = el.query(
      By.css('.cx-asm-overview-active-interests .cx-overview-title-link')
    );
    titleLink.nativeElement.click();
    expect(sectionContext.navigate$.next).toHaveBeenCalledWith({
      cxRoute: 'myInterests',
    });
  });
});
