import { Component, Input, Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import {
  CxDatePipe,
  FeatureLevelDirective,
  GlobalMessageService,
  I18nTestingModule,
  MockDatePipe,
  MockTranslatePipe,
  ProductSearchPage,
  TranslatePipe,
  UrlPipe,
} from '@spartacus/core';
import {
  IconComponent,
  ProductGridItemComponent,
  ProductListItemComponent,
  ProductScrollComponent,
} from '@spartacus/storefront';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { PageLayoutService } from '../../../../cms-structure';
import {
  ListNavigationModule,
  MediaComponent,
  SpinnerModule,
  StarRatingComponent,
} from '../../../../shared';
import { ViewConfig } from '../../../../shared/config/view-config';
import { MockFeatureLevelDirective } from '../../../../shared/test/mock-feature-level-directive';
import { ProductFacetNavigationComponent } from '../product-facet-navigation/product-facet-navigation.component';
import {
  ProductViewComponent,
  ViewModes,
} from '../product-view/product-view.component';
import { ProductListComponentService } from './product-list-component.service';
import { ProductListComponent } from './product-list.component';

const mockProducts = [
  { code: 'p1', name: 'Product 1' },
  { code: 'p2', name: 'Product 2' },
];

@Component({
  selector: 'cx-star-rating',
  template: '',
  imports: [
    ListNavigationModule,
    FormsModule,
    I18nTestingModule,
    InfiniteScrollModule,
    SpinnerModule,
  ],
})
class MockStarRatingComponent {
  @Input() rating;
  @Input() disabled;
}

class MockPageLayoutService {
  getSlots(): Observable<string[]> {
    return of(['LogoSlot']);
  }
  get templateName$(): Observable<string> {
    return of('LandingPage2Template');
  }
}

@Component({
  template: '',
  selector: 'cx-product-list-item',
  imports: [
    ListNavigationModule,
    FormsModule,
    I18nTestingModule,
    InfiniteScrollModule,
    SpinnerModule,
  ],
})
class MockProductListItemComponent {
  @Input() product: any;
  @Input() itemIndex: number;
}

@Component({
  template: '',
  selector: 'cx-product-grid-item',
  imports: [
    ListNavigationModule,
    FormsModule,
    I18nTestingModule,
    InfiniteScrollModule,
    SpinnerModule,
  ],
})
class MockProductGridItemComponent {
  @Input() product: any;
  @Input() itemIndex: number;
}

@Component({
  selector: 'cx-product-scroll',
  template: '',
  imports: [
    ListNavigationModule,
    FormsModule,
    I18nTestingModule,
    InfiniteScrollModule,
    SpinnerModule,
  ],
})
class MockProductScrollComponent {}

@Pipe({ name: 'cxUrl' })
class MockUrlPipe implements PipeTransform {
  transform() {}
}

@Component({
  selector: 'cx-icon',
  template: '',
  imports: [
    ListNavigationModule,
    FormsModule,
    I18nTestingModule,
    InfiniteScrollModule,
    SpinnerModule,
  ],
})
class MockCxIconComponent {
  @Input() type;
}

class MockViewConfig {
  view = {
    infiniteScroll: {
      active: true,
      productLimit: 0,
      showMoreButton: false,
    },
  };
}

class MockGlobalMessageService {
  add = vi.fn();
}

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let componentService: ProductListComponentService;
  let mockModel$: BehaviorSubject<ProductSearchPage>;

  beforeEach(async () => {
    mockModel$ = new BehaviorSubject<ProductSearchPage>({
      products: mockProducts,
    } as ProductSearchPage);

    class MockProductListComponentService {
      setQuery = vi.fn();
      viewPage = vi.fn();
      sort = vi.fn();
      getPageItems = vi.fn();
      model$ = mockModel$;
    }

    TestBed.configureTestingModule({
      imports: [
        ListNavigationModule,
        FormsModule,
        InfiniteScrollModule,
        SpinnerModule,
        ProductListComponent,
        ProductFacetNavigationComponent,
        MediaComponent,
        ProductViewComponent,
      ],
      providers: [
        provideRouter([]),
        {
          provide: PageLayoutService,
          useClass: MockPageLayoutService,
        },
        {
          provide: ProductListComponentService,
          useClass: MockProductListComponentService,
        },
        {
          provide: ViewConfig,
          useClass: MockViewConfig,
        },
        {
          provide: GlobalMessageService,
          useClass: MockGlobalMessageService,
        },
      ],
    })
      .overrideComponent(ProductListComponent, {
        remove: {
          imports: [
            TranslatePipe,
            CxDatePipe,
            UrlPipe,
            StarRatingComponent,
            ProductListItemComponent,
            ProductGridItemComponent,
            IconComponent,
            FeatureLevelDirective,
            ProductScrollComponent,
          ],
        },
        add: {
          imports: [
            MockTranslatePipe,
            MockDatePipe,
            MockUrlPipe,
            MockStarRatingComponent,
            MockProductListItemComponent,
            MockProductGridItemComponent,
            MockCxIconComponent,
            MockFeatureLevelDirective,
            MockProductScrollComponent,
          ],
        },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    componentService = TestBed.inject(ProductListComponentService);
    fixture.detectChanges();
  });

  describe('ngOnInit', () => {
    beforeEach(() => {
      component.ngOnInit();
    });

    it('should get model from the service', () => {
      expect(component.model$).toBe(componentService.model$);
    });

    it('should use infinite scroll when config setting is active', () => {
      expect(component.isInfiniteScroll).toEqual(true);
    });
  });

  it('sortList should call service.sort', () => {
    component.sortList('testSortCode');
    expect(componentService.sort).toHaveBeenCalledWith('testSortCode');
  });

  it('setViewMode should set view mode', () => {
    component.setViewMode(ViewModes.List);
    expect(component.viewMode$.value).toBe(ViewModes.List);

    component.setViewMode(ViewModes.Grid);
    expect(component.viewMode$.value).toBe(ViewModes.Grid);
  });

  describe('UI test', () => {
    beforeEach(() => {
      mockModel$.next({ products: mockProducts });
    });

    describe('when infinite scroll is enabled', () => {
      beforeEach(() => {
        component.isInfiniteScroll = true;
      });

      it('should render product scroll component', () => {
        fixture.detectChanges();
        const productScrollComponent = fixture.debugElement.query(
          By.css('cx-product-scroll')
        );
        expect(productScrollComponent).not.toBeNull();
      });
    });

    describe('when infinite scroll is disabled', () => {
      beforeEach(() => {
        component.isInfiniteScroll = false;
      });

      it('should not render product scroll component', () => {
        fixture.detectChanges();
        const productScrollComponent = fixture.debugElement.query(
          By.css('cx-product-scroll')
        );
        expect(productScrollComponent).toBeNull();
      });

      describe('when viewMode is List', () => {
        beforeEach(() => {
          component.setViewMode(ViewModes.List);
        });

        it('should render product list item components', () => {
          fixture.detectChanges();
          const listItems = fixture.debugElement.queryAll(
            By.directive(MockProductListItemComponent)
          );
          expect(listItems.length).toBe(2);
          expect(listItems[0].componentInstance.product).toEqual(
            mockProducts[0]
          );
          expect(listItems[0].componentInstance.itemIndex).toEqual(0);
          expect(listItems[1].componentInstance.product).toEqual(
            mockProducts[1]
          );
          expect(listItems[1].componentInstance.itemIndex).toEqual(1);
        });

        it('should NOT render product grid item components', () => {
          fixture.detectChanges();
          const gridItems = fixture.debugElement.queryAll(
            By.directive(MockProductGridItemComponent)
          );
          expect(gridItems.length).toBe(0);
        });
      });

      describe('when viewMode is Grid', () => {
        beforeEach(() => {
          component.setViewMode(ViewModes.Grid);
        });

        it('should render product grid item components', () => {
          fixture.detectChanges();

          const gridItems = fixture.debugElement.queryAll(
            By.directive(MockProductGridItemComponent)
          );
          expect(gridItems.length).toBe(2);
          expect(gridItems[0].componentInstance.product).toEqual(
            mockProducts[0]
          );
          expect(gridItems[0].componentInstance.itemIndex).toEqual(0);
          expect(gridItems[1].componentInstance.product).toEqual(
            mockProducts[1]
          );
          expect(gridItems[1].componentInstance.itemIndex).toEqual(1);
        });

        it('should NOT render product list item components', () => {
          fixture.detectChanges();
          const listItems = fixture.debugElement.queryAll(
            By.directive(MockProductListItemComponent)
          );
          expect(listItems.length).toBe(0);
        });
      });
    });
  });
});
