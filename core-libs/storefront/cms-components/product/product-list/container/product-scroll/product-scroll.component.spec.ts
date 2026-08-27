import {
  Component,
  DebugElement,
  Input,
  Pipe,
  PipeTransform,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import {
  I18nTestingModule,
  ProductSearchPage,
  TranslatePipe,
} from '@spartacus/core';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { MediaComponent } from '../../../../../shared/components/media';
import { SpinnerComponent } from '../../../../../shared/components/spinner/spinner.component';
import { SpinnerModule } from '../../../../../shared/components/spinner/spinner.module';
import { ViewConfig } from '../../../../../shared/config/view-config';
import { MockFeatureLevelDirective } from '../../../../../shared/test/mock-feature-level-directive';
import { ProductGridItemComponent } from '../../product-grid-item/product-grid-item.component';
import { ProductListItemComponent } from '../../product-list-item/product-list-item.component';
import { ViewModes } from '../../product-view/product-view.component';
import { ProductListComponentService } from '../product-list-component.service';
import { ProductScrollComponent } from './product-scroll.component';
import { vi } from 'vitest';

const mockModel1: ProductSearchPage = {
  breadcrumbs: [
    {
      facetCode: 'mock',
      facetName: 'Mock',
      facetValueCode: 'mockValueCode',
      removeQuery: {
        query: {
          value: 'relevance',
        },
      },
    },
  ],
  pagination: {
    currentPage: 0,
    totalPages: 2,
  },
  products: [{ averageRating: 3, code: 'mockCode1-1', name: 'mockName1-1' }],
};

const mockModel1Page2: ProductSearchPage = {
  breadcrumbs: [
    {
      facetCode: 'mock',
      facetName: 'Mock',
      facetValueCode: 'mockValueCode',
      removeQuery: {
        query: {
          value: 'relevance',
        },
      },
    },
  ],
  pagination: {
    currentPage: 1,
    totalPages: 3,
  },
  products: [{ averageRating: 2, code: 'mockCode2-1', name: 'mockName2-1' }],
};

const mockModel1Page3: ProductSearchPage = {
  breadcrumbs: [
    {
      facetCode: 'mock',
      facetName: 'Mock',
      facetValueCode: 'mockValueCode',
      removeQuery: {
        query: {
          value: 'relevance',
        },
      },
    },
  ],
  pagination: {
    currentPage: 2,
    totalPages: 3,
  },
  products: [{ averageRating: 4, code: 'mockCode3-1', name: 'mockName3-1' }],
};

const mockModel2: ProductSearchPage = {
  breadcrumbs: [
    {
      facetCode: 'mock2',
      facetName: 'Mock2',
      facetValueCode: 'mockValueCode2',
      removeQuery: {
        query: {
          value: 'relevance',
        },
      },
    },
  ],
  pagination: {
    currentPage: 0,
    totalPages: 1,
  },
  products: [],
};

const mockModel3: ProductSearchPage = {
  breadcrumbs: [
    {
      facetCode: 'mock3',
      facetName: 'Mock3',
      facetValueCode: 'mockValueCode3',
      removeQuery: {
        query: {
          value: 'relevance',
        },
      },
    },
  ],
  pagination: {
    currentPage: 0,
    totalPages: 1,
  },
  products: [
    { averageRating: 1, code: 'mockCode1-3', name: 'mockName1-3' },
    { averageRating: 1, code: 'mockCode2-3', name: 'mockName2-3' },
  ],
};

const backToTopBtn = 'productList.backToTopBtn';
const showMoreBtn = 'productList.showMoreBtn';

@Component({
  selector: 'cx-star-rating',
  template: '',
  imports: [InfiniteScrollDirective, I18nTestingModule, SpinnerModule],
})
class MockStarRatingComponent {
  @Input() rating: number;
  @Input() disabled: boolean;
}

@Component({
  template: '',
  selector: 'cx-product-list-item',
  imports: [InfiniteScrollDirective, I18nTestingModule, SpinnerModule],
})
class MockProductListItemComponent {
  @Input() product: any;
  @Input() itemIndex: number;
}

@Component({
  template: '',
  selector: 'cx-product-grid-item',
  imports: [InfiniteScrollDirective, I18nTestingModule, SpinnerModule],
})
class MockProductGridItemComponent {
  @Input() product: any;
  @Input() itemIndex: number;
}

@Pipe({ name: 'cxUrl' })
class MockUrlPipe implements PipeTransform {
  transform() {}
}

@Component({
  selector: 'cx-add-to-cart',
  template: '<button>add to cart</button>',
  imports: [InfiniteScrollDirective, I18nTestingModule, SpinnerModule],
})
class MockAddToCartComponent {
  @Input() product: string;
  @Input() showQuantity: boolean;
}

class MockProductListComponentService {
  setQuery = vi.fn();
  viewPage = vi.fn();
  sort = vi.fn();
  clearSearchResults = vi.fn();
  getPageItems = vi.fn();
  model$ = vi.fn();
}

@Component({
  selector: 'cx-variant-style-icons',
  template: 'test',
  imports: [InfiniteScrollDirective, I18nTestingModule, SpinnerModule],
})
class MockStyleIconsComponent {
  @Input() variants: any[];
}

describe('ProductScrollComponent', () => {
  let component: ProductScrollComponent;
  let fixture: ComponentFixture<ProductScrollComponent>;
  let el: DebugElement;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        InfiniteScrollDirective,
        SpinnerModule,
        ProductScrollComponent,
        RouterModule.forRoot([]),
      ],
      providers: [
        {
          provide: ProductListComponentService,
          useClass: MockProductListComponentService,
        },
      ],
    })
      .overrideComponent(ProductScrollComponent, {
        remove: {
          imports: [
            ProductGridItemComponent,
            SpinnerComponent,
            ProductListItemComponent,
            TranslatePipe,
          ],
        },
        add: {
          imports: [
            MockProductGridItemComponent,
            MockProductListItemComponent,
            MockUrlPipe,
            MediaComponent,
            MockStarRatingComponent,
            MockAddToCartComponent,
            MockStyleIconsComponent,
            MockFeatureLevelDirective,
            I18nTestingModule,
          ],
        },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductScrollComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('infinite scroll operations', () => {
    it('should append product when appendProducts is true', () => {
      component.model = mockModel1;

      component.appendProducts = true;
      component.setModel = mockModel1Page2;

      const totalLength =
        (mockModel1.products?.length ?? 0) +
        (mockModel1Page2.products?.length ?? 0);

      expect(component.model.products?.length).toEqual(totalLength);
      expect(component.model.products).toContainEqual(
        expect.objectContaining((mockModel1.products ?? [])[0])
      );
      expect(component.model.products).toContainEqual(
        expect.objectContaining((mockModel1Page2.products ?? [])[0])
      );
    });

    it('should replace products when appendProducts is false', () => {
      component.model = mockModel1;
      component.setModel = mockModel1Page2;

      expect(component.model).toEqual(mockModel1Page2);
    });

    it('isEmpty should be true when there are no products', () => {
      //mockModel2 is a model that contains no products
      component.setModel = mockModel2;

      expect(component.isEmpty).toBeTruthy();
    });

    it('isLastPage should be true when there are no more pages', () => {
      component.setModel = mockModel1Page3;

      expect(component.isLastPage).toBeTruthy();
    });

    describe('with limit', () => {
      beforeEach(() => {
        const scrollConfig: ViewConfig = {
          view: {
            infiniteScroll: {
              active: true,
              productLimit: 2,
            },
          },
        };
        component.scrollConfig = scrollConfig;
        component.setModel = mockModel1;
        component.inputViewMode = ViewModes.List;
      });

      it('productLimit should be set to config limit', () => {
        expect(component.productLimit).toEqual(2);
      });

      it('should NOT display buttons when limit is not reached', () => {
        expect(component.productLimit).toEqual(2);
        expect(mockModel1.products?.length).toEqual(1);
        expect(component.isMaxProducts).toBeFalsy();

        fixture.detectChanges();

        expect(el.query(By.css('.btn-secondary'))).toBeNull();
      });

      it('should display buttons when limit is reached', () => {
        expect(component.productLimit).toEqual(2);
        expect(component.model.products?.length).toEqual(1);
        expect(component.isMaxProducts).toBeFalsy();
        expect(component.isLastPage).toBeFalsy();

        component.appendProducts = true;
        component.setModel = mockModel1Page2;

        fixture.detectChanges();

        expect(component.productLimit).toEqual(2);
        expect(component.model.products?.length).toEqual(2);
        expect(component.isMaxProducts).toBeTruthy();
        expect(component.isLastPage).toBeFalsy();

        const buttons = el.queryAll(By.css('.btn-secondary'));
        expect(buttons[0].nativeElement.innerHTML.trim()).toEqual(backToTopBtn);
        expect(buttons[1].nativeElement.innerHTML.trim()).toEqual(showMoreBtn);
      });
    });

    describe('with button', () => {
      beforeEach(() => {
        const scrollConfig: ViewConfig = {
          view: {
            infiniteScroll: {
              active: true,
              showMoreButton: true,
            },
          },
        };
        component.scrollConfig = scrollConfig;
        component.inputViewMode = ViewModes.List;
      });

      it('should display "show more" and "back to top" buttons when there are additional pages', () => {
        expect(mockModel1Page2.pagination?.currentPage).not.toEqual(
          (mockModel1Page2.pagination?.totalPages ?? 0) - 1
        );

        component.setModel = mockModel1Page2;

        expect(component.isMaxProducts).toBeTruthy();
        expect(component.isLastPage).toBeFalsy();

        fixture.detectChanges();

        const buttons = el.queryAll(By.css('.btn-secondary'));
        expect(buttons[0].nativeElement.innerHTML.trim()).toEqual(backToTopBtn);
        expect(buttons[1].nativeElement.innerHTML.trim()).toEqual(showMoreBtn);
      });

      it('should NOT display "Back to Top" button when on the first page', () => {
        expect(mockModel1.pagination?.currentPage).toEqual(0);

        component.setModel = mockModel1;

        expect(component.isMaxProducts).toBeTruthy();
        expect(component.isLastPage).toBeFalsy();

        fixture.detectChanges();

        const buttons = el.queryAll(By.css('.btn-secondary'));
        expect(buttons[0].nativeElement.innerHTML.trim()).toEqual(showMoreBtn);
        expect(buttons[1]).toBeUndefined();
      });

      it('should NOT display "show more" button when there are no addtional pages', () => {
        expect(mockModel1Page3.pagination?.currentPage).toEqual(
          (mockModel1Page3.pagination?.totalPages ?? 0) - 1
        );

        component.setModel = mockModel1Page3;

        expect(component.isMaxProducts).toBeTruthy();
        expect(component.isLastPage).toBeTruthy();

        fixture.detectChanges();

        const buttons = el.queryAll(By.css('.btn-secondary'));
        expect(buttons[0].nativeElement.innerHTML.trim()).toEqual(backToTopBtn);
        expect(buttons[1]).toBeUndefined();
      });
    });
  });

  describe('when rendering items', () => {
    describe('when viewMode is List', () => {
      beforeEach(() => {
        component.model = mockModel3;
        component.setViewMode = ViewModes.List;
      });

      it('should render product List item components', () => {
        fixture.detectChanges();
        const listItems = fixture.debugElement.queryAll(
          By.directive(MockProductListItemComponent)
        );
        expect(listItems.length).toBe(2);
        expect(listItems[0].componentInstance.product).toEqual(
          mockModel3.products?.[0]
        );
        expect(listItems[0].componentInstance.itemIndex).toEqual(0);
        expect(listItems[1].componentInstance.product).toEqual(
          mockModel3.products?.[1]
        );
        expect(listItems[1].componentInstance.itemIndex).toEqual(1);
      });

      it('should NOT render product Grid item components', () => {
        fixture.detectChanges();
        const gridItems = fixture.debugElement.queryAll(
          By.directive(MockProductGridItemComponent)
        );
        expect(gridItems.length).toBe(0);
      });
    });

    describe('when viewMode is Grid', () => {
      beforeEach(() => {
        component.model = mockModel3;
        component.setViewMode = ViewModes.Grid;
      });

      it('should render product Grid item components', () => {
        fixture.detectChanges();

        const gridItems = fixture.debugElement.queryAll(
          By.directive(MockProductGridItemComponent)
        );
        expect(gridItems.length).toBe(2);
        expect(gridItems[0].componentInstance.product).toEqual(
          mockModel3.products?.[0]
        );
        expect(gridItems[0].componentInstance.itemIndex).toEqual(0);
        expect(gridItems[1].componentInstance.product).toEqual(
          mockModel3.products?.[1]
        );
        expect(gridItems[1].componentInstance.itemIndex).toEqual(1);
      });

      it('should NOT render product List item components', () => {
        fixture.detectChanges();
        const listItems = fixture.debugElement.queryAll(
          By.directive(MockProductListItemComponent)
        );
        expect(listItems.length).toBe(0);
      });
    });
  });
});
