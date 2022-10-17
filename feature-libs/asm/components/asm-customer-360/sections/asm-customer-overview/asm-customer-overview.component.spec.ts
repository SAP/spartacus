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
import { AsmCustomerOverviewComponent } from './asm-customer-overview.component';
import { ActiveCartFacade, Cart, OrderEntry } from '@spartacus/cart/base/root';
import { SavedCartFacade } from '@spartacus/cart/saved-cart/root';
import { By } from '@angular/platform-browser';

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
class MockBreakpointService {
  get breakpoint$(): Observable<BREAKPOINT> {
    return of(BREAKPOINT.xl);
  }
}
@Directive({
  selector: '[cxFocus]',
})
export class MockKeyboadFocusDirective {
  @Input('cxFocus') config: FocusConfig = {};
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

describe('AsmCustomerOverviewComponent', () => {
  let component: AsmCustomerOverviewComponent;
  let fixture: ComponentFixture<AsmCustomerOverviewComponent>;
  let el: DebugElement;
  let activeCartFacade: ActiveCartFacade;
  let breakpointService: BreakpointService;
  let savedCartFacade: SavedCartFacade;

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
        { provide: ActiveCartFacade, useClass: MockActiveCartService },
        {
          provide: BreakpointService,
          useClass: MockBreakpointService,
        },
        { provide: SavedCartFacade, useClass: MockSavedCartFacade },
        { provide: UserInterestsService, useValue: productInterestService },
        { provide: ProductService, useValue: productService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsmCustomerOverviewComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;

    breakpointService = TestBed.inject(BreakpointService);
    savedCartFacade = TestBed.inject(SavedCartFacade);
    activeCartFacade = TestBed.inject(ActiveCartFacade);

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
    spyOn(activeCartFacade, 'getActive').and.returnValue(of(mockCart1));
    spyOn(component.navigate, 'emit').and.stub();

    spyOnProperty(breakpointService, 'breakpoint$').and.returnValue(
      of(BREAKPOINT.lg)
    );
    fixture.detectChanges();

    expect(activeCartFacade.getActive).toHaveBeenCalled();

    expect(el.queryAll(By.css('.cx-asm-overview-active-item')).length).toEqual(
      2
    );
    const showMoreBtn = el.query(
      By.css('.cx-asm-overview-active-cart .cx-action-link')
    );
    expect(showMoreBtn).toBeFalsy();

    const titleLink = el.query(
      By.css('.cx-asm-overview-active-cart .cx-overview-title-link')
    );
    titleLink.nativeElement.click();
    expect(component.navigate.emit).toHaveBeenCalledWith({
      cxRoute: 'cart',
    });
  });

  it('should show empty active cart section', () => {
    spyOn(activeCartFacade, 'getActive').and.returnValue(of(undefined));
    spyOnProperty(breakpointService, 'breakpoint$').and.returnValue(
      of(BREAKPOINT.lg)
    );
    fixture.detectChanges();

    expect(activeCartFacade.getActive).toHaveBeenCalled();

    expect(el.query(By.css('.cx-asm-overview-empty'))).toBeTruthy();
  });

  it('should return active cart and show more button', () => {
    spyOn(activeCartFacade, 'getActive').and.returnValue(of(mockCart1));

    spyOnProperty(breakpointService, 'breakpoint$').and.returnValue(
      of(BREAKPOINT.md)
    );
    fixture.detectChanges();

    expect(activeCartFacade.getActive).toHaveBeenCalled();
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
    spyOn(savedCartFacade, 'getList').and.returnValue(of(mockCarts));
    spyOn(component.navigate, 'emit').and.stub();

    spyOnProperty(breakpointService, 'breakpoint$').and.returnValue(
      of(BREAKPOINT.xl)
    );
    fixture.detectChanges();

    expect(savedCartFacade.getList).toHaveBeenCalled();
    expect(el.queryAll(By.css('.cx-asm-overview-saved-item')).length).toEqual(
      2
    );
    const showMoreBtn = el.query(
      By.css('.cx-asm-overview-saved-cart .cx-action-link')
    );
    expect(showMoreBtn).toBeFalsy();

    const titleLink = el.query(
      By.css('.cx-asm-overview-saved-cart .cx-overview-title-link')
    );
    titleLink.nativeElement.click();
    expect(component.navigate.emit).toHaveBeenCalledWith({
      cxRoute: 'saved-carts',
    });
  });

  it('should return saved cart and show more button', () => {
    spyOn(savedCartFacade, 'getList').and.returnValue(of(mockCarts));

    spyOnProperty(breakpointService, 'breakpoint$').and.returnValue(
      of(BREAKPOINT.md)
    );
    fixture.detectChanges();

    expect(savedCartFacade.getList).toHaveBeenCalled();
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
    spyOn(component.navigate, 'emit').and.stub();
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

    const titleLink = el.query(
      By.css('.cx-asm-overview-active-interests .cx-overview-title-link')
    );
    titleLink.nativeElement.click();
    expect(component.navigate.emit).toHaveBeenCalledWith({
      cxRoute: 'myInterests',
    });
  });
});
