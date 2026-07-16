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
import { RouterModule } from '@angular/router';
import {
  CxDatePipe,
  FeatureDirective,
  FeatureLevelDirective,
  GlobalMessageService,
  I18nTestingModule,
  ImageType,
  MockDatePipe,
  MockTranslatePipe,
  NotificationType,
  OccConfig,
  Product,
  ProductInterestEntryRelation,
  ProductInterestSearchResult,
  ProductService,
  TranslatePipe,
  UrlPipe,
  UserInterestsService,
} from '@spartacus/core';
import {
  AtMessageDirective,
  MediaComponent,
  PaginationComponent,
  SortingComponent,
  SpinnerComponent,
} from '@spartacus/storefront';
import { cold, getTestScheduler } from 'jasmine-marbles';
import { MockFeatureDirective } from 'core-libs/storefront/shared/test/mock-feature-directive';
import { Observable, of } from 'rxjs';
import { LayoutConfig } from '../../../layout/config/layout-config';
import { MockFeatureLevelDirective } from '../../../shared/test/mock-feature-level-directive';
import { MyInterestsComponent } from './my-interests.component';

@Component({
  template: '',
  selector: 'cx-pagination',
})
class MockPaginationComponent {
  @Input() pagination;
  @Output() viewPageEvent = new EventEmitter<string>();
}
@Component({
  template: '',
  selector: 'cx-sorting',
})
class MockSortingComponent {
  @Input() sortOptions;
  @Input() sortLabels;
  @Input() selectedOption;
  @Input() placeholder;
  @Output() sortListEvent = new EventEmitter<string>();
}

@Component({
  template: '',
  selector: 'cx-media',
})
class MockMediaComponent {
  @Input() container;
  @Input() format;
}

const MockOccModuleConfig: OccConfig = {
  backend: {
    occ: {
      baseUrl: '',
      prefix: '',
    },
    media: {
      baseUrl: '',
    },
  },
};
const MockLayoutConfig: LayoutConfig = {};

@Pipe({ name: 'cxUrl' })
class MockUrlPipe implements PipeTransform {
  transform(): any {}
}

class MockGlobalMessageService implements Partial<GlobalMessageService> {
  remove() {}
  add() {}
}

@Component({
  selector: 'cx-spinner',
  template: '',
})
class MockSpinnerComponent {}

@Directive({ selector: '[cxAtMessage]' })
class MockAtMessageDirective {
  @Input() cxAtMessage: string | string[] | undefined;
}

const p553637$: Observable<Product> = of({
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
});

const p553638$: Observable<Product> = of({
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
});

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
      product: {
        code: '553637',
      },
      productInterestEntry: [
        {
          dateAdded: new Date().toString(),
          interestType: NotificationType.BACK_IN_STOCK,
        },
      ],
    },
    {
      product: {
        code: '553638',
      },
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

describe('MyInterestsComponent', () => {
  let component: MyInterestsComponent;
  let fixture: ComponentFixture<MyInterestsComponent>;
  let el: DebugElement;

  const productInterestService = { loadProductInterests: vi.fn(), getAndLoadProductInterests: vi.fn(), getProdutInterestsLoading: vi.fn(), getRemoveProdutInterestLoading: vi.fn(), removeProdutInterest: vi.fn(), clearProductInterests: vi.fn(), resetRemoveInterestState: vi.fn() };
  const productService = { get: vi.fn() };

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([]),
        MyInterestsComponent,
        I18nTestingModule,
      ],
      providers: [
        { provide: OccConfig, useValue: MockOccModuleConfig },
        { provide: LayoutConfig, useValue: MockLayoutConfig },
        { provide: UserInterestsService, useValue: productInterestService },
        { provide: ProductService, useValue: productService },
        { provide: GlobalMessageService, useClass: MockGlobalMessageService },
      ],
    })
      .overrideComponent(MyInterestsComponent, {
        remove: {
          imports: [
            TranslatePipe,
            CxDatePipe,
            UrlPipe,
            MediaComponent,
            SpinnerComponent,
            PaginationComponent,
            SortingComponent,
            FeatureLevelDirective,
            AtMessageDirective,
            FeatureDirective,
          ],
        },
        add: {
          imports: [
            MockTranslatePipe,
            MockDatePipe,
            MockUrlPipe,
            MockMediaComponent,
            MockSpinnerComponent,
            MockPaginationComponent,
            MockSortingComponent,
            MockFeatureLevelDirective,
            MockAtMessageDirective,
            MockFeatureDirective,
          ],
        },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyInterestsComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;

    productInterestService.getAndLoadProductInterests.mockReturnValue(
      of(emptyInterests)
    );
    productInterestService.getProdutInterestsLoading.mockReturnValue(of(false));
    productInterestService.getRemoveProdutInterestLoading.mockReturnValue(
      of(false)
    );
    productInterestService.loadProductInterests.mockImplementation(() => {});
    productInterestService.removeProdutInterest.mockImplementation(() => {});
    productInterestService.clearProductInterests.mockImplementation(() => {});
    productInterestService.resetRemoveInterestState.mockImplementation(() => {});
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should display header', () => {
    fixture.detectChanges();
    expect(el.query(By.css('h2')).nativeElement.innerText).toEqual(
      'myInterests.header'
    );
  });

  it('should show loading spinner when data is loading', () => {
    productInterestService.getProdutInterestsLoading.mockReturnValue(of(true));
    fixture.detectChanges();
    expect(el.query(By.css('cx-spinner'))).toBeTruthy();
  });

  it('should display message when no interest', () => {
    fixture.detectChanges();
    expect(el.query(By.css('.cx-product-interests-message'))).toBeTruthy();
  });

  it('should show interests list', () => {
    productInterestService.getAndLoadProductInterests.mockReturnValue(
      of(mockedInterests)
    );
    productService.get.withArgs('553637', 'details').mockReturnValue(p553637$);
    productService.get.withArgs('553638', 'details').mockReturnValue(p553638$);
    productInterestService.getProdutInterestsLoading.mockReturnValue(of(false));
    fixture.detectChanges();

    const table = el.query(By.css('.cx-product-interests-table'));
    expect(table).toBeTruthy();

    expect(el.query(By.css('.cx-product-interests-title'))).toBeTruthy();
    expect(el.queryAll(By.css('cx-sorting')).length).toEqual(2);
    expect(el.queryAll(By.css('cx-pagination')).length).toEqual(2);
    expect(
      table.queryAll(By.css('.cx-product-interests-product-item')).length
    ).toEqual(2);
    expect(table.queryAll(By.css('cx-media')).length).toEqual(2);
    expect(
      table.queryAll(By.css('.cx-product-interests-product-image-link')).length
    ).toEqual(2);
    expect(table.queryAll(By.css('.cx-name')).length).toEqual(2);
    expect(
      table.queryAll(By.css('.cx-product-interests-product-code-link')).length
    ).toEqual(2);
    expect(table.queryAll(By.css('.cx-code')).length).toEqual(2);
    expect(
      table.queryAll(By.css('.cx-product-interests-variant-name')).length
    ).toEqual(2);
    expect(
      table.queryAll(By.css('.cx-product-interests-variant-value')).length
    ).toEqual(2);
    expect(
      table.queryAll(By.css('.cx-product-interests-product-stock')).length
    ).toEqual(2);
    expect(
      table.queryAll(By.css('.cx-product-interests-product-price')).length
    ).toEqual(2);
    expect(table.queryAll(By.css('.cx-product-interests-type')).length).toEqual(
      2
    );
    expect(
      table.queryAll(By.css('.cx-product-interests-expiration-date')).length
    ).toEqual(2);
    expect(
      table.queryAll(By.css('.cx-product-interests-remove-btn')).length
    ).toEqual(2);
  });

  it('should be able to change page/sort', () => {
    fixture.detectChanges();

    component.sortChange('byNameAsc');
    expect(productInterestService.loadProductInterests).toHaveBeenCalledWith(
      10,
      0,
      'name:asc'
    );

    component.pageChange(2);
    expect(productInterestService.loadProductInterests).toHaveBeenCalledWith(
      10,
      2,
      'name:asc'
    );
  });

  it('should be able to remove an interest item', () => {
    productInterestService.getAndLoadProductInterests.mockReturnValue(
      of(mockedInterests)
    );
    productService.get.withArgs('553637', 'details').mockReturnValue(p553637$);
    productService.get.withArgs('553638', 'details').mockReturnValue(p553638$);
    productInterestService.getRemoveProdutInterestLoading.mockReturnValue(
      cold('-a|', { a: true })
    );
    fixture.detectChanges();
    const button = el.query(
      By.css('.cx-product-interests-remove-btn')
    ).nativeElement;
    expect(button.disabled).toBeFalsy();

    button.click();
    getTestScheduler().flush();
    fixture.detectChanges();

    expect(button.disabled).toBeTruthy();
    const item: ProductInterestEntryRelation = mockedInterests.results[0];
    expect(productInterestService.removeProdutInterest).toHaveBeenCalledWith(
      item
    );
  });
});
