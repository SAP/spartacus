import {
  Component,
  DebugElement,
  Input,
  Pipe,
  PipeTransform,
} from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { I18nTestingModule, ProductSearchPage } from '@spartacus/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ProductGridItemComponent } from '../..';
import { MediaComponent } from '../../../../../shared/components/media';
import { SpinnerModule } from '../../../../../shared/components/spinner/spinner.module';
import { ViewConfig } from '../../../../../shared/config/view-config';
import { MockFeatureLevelDirective } from '../../../../../shared/test/mock-feature-level-directive';
import { ViewModes } from '../../product-view/product-view.component';
import { ProductListComponentService } from '../product-list-component.service';
import { ProductScrollComponent } from './product-scroll.component';
import createSpy = jasmine.createSpy;

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

const backToTopBtn = 'productList.backToTopBtn';
const showMoreBtn = 'productList.showMoreBtn';

@Component({
  selector: 'cx-star-rating',
  template: '',
})
class MockStarRatingComponent {
  @Input() rating: number;
  @Input() disabled: boolean;
}

@Component({
  template: '',
  selector: 'cx-product-list-item',
})
class MockProductListItemComponent {
  @Input()
  product: any;
}

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform() {}
}

@Component({
  selector: 'cx-add-to-cart',
  template: '<button>add to cart</button>',
})
class MockAddToCartComponent {
  @Input() product: string;
  @Input() showQuantity: boolean;
}

class MockProductListComponentService {
  setQuery = createSpy('setQuery');
  viewPage = createSpy('viewPage');
  sort = createSpy('sort');
  clearSearchResults = createSpy('clearSearchResults');
  getPageItems = createSpy('getPageItems');
  model$ = createSpy('model$');
}

@Component({
  selector: 'cx-variant-style-icons',
  template: 'test',
})
class MockStyleIconsComponent {
  @Input() variants: any[];
}

describe('ProductScrollComponent', () => {
  let component: ProductScrollComponent;
  let fixture: ComponentFixture<ProductScrollComponent>;
  let el: DebugElement;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [
          ProductScrollComponent,
          ProductGridItemComponent,
          MockProductListItemComponent,
          MockUrlPipe,
          MediaComponent,
          MockStarRatingComponent,
          MockAddToCartComponent,
          MockStyleIconsComponent,
          MockFeatureLevelDirective,
        ],
        imports: [
          InfiniteScrollModule,
          I18nTestingModule,
          SpinnerModule,
          RouterTestingModule,
        ],
        providers: [
          {
            provide: ProductListComponentService,
            useClass: MockProductListComponentService,
          },
        ],
      }).compileComponents();
    })
  );

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
        mockModel1.products.length + mockModel1Page2.products.length;

      expect(component.model.products.length).toEqual(totalLength);
      expect(component.model.products).toContain(
        jasmine.objectContaining(mockModel1.products[0])
      );
      expect(component.model.products).toContain(
        jasmine.objectContaining(mockModel1Page2.products[0])
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
        component.setConfig = scrollConfig;
        component.setModel = mockModel1;
        component.inputViewMode = ViewModes.List;
      });

      it('productLimit should be set to config limit', () => {
        expect(component.productLimit).toEqual(2);
      });

      it('should NOT display buttons when limit is not reached', () => {
        expect(component.productLimit).toEqual(2);
        expect(mockModel1.products.length).toEqual(1);
        expect(component.isMaxProducts).toBeFalsy();

        fixture.detectChanges();

        expect(el.query(By.css('.btn-action'))).toBeNull();
      });

      it('should display buttons when limit is reached', () => {
        expect(component.productLimit).toEqual(2);
        expect(component.model.products.length).toEqual(1);
        expect(component.isMaxProducts).toBeFalsy();
        expect(component.isLastPage).toBeFalsy();

        component.appendProducts = true;
        component.setModel = mockModel1Page2;

        fixture.detectChanges();

        expect(component.productLimit).toEqual(2);
        expect(component.model.products.length).toEqual(2);
        expect(component.isMaxProducts).toBeTruthy();
        expect(component.isLastPage).toBeFalsy();

        const buttons = el.queryAll(By.css('.btn-action'));
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
        component.setConfig = scrollConfig;
        component.inputViewMode = ViewModes.List;
      });

      it('should display "show more" and "back to top" buttons when there are additional pages', () => {
        expect(mockModel1Page2.pagination.currentPage).not.toEqual(
          mockModel1Page2.pagination.totalPages - 1
        );

        component.setModel = mockModel1Page2;

        expect(component.isMaxProducts).toBeTruthy();
        expect(component.isLastPage).toBeFalsy();

        fixture.detectChanges();

        const buttons = el.queryAll(By.css('.btn-action'));
        expect(buttons[0].nativeElement.innerHTML.trim()).toEqual(backToTopBtn);
        expect(buttons[1].nativeElement.innerHTML.trim()).toEqual(showMoreBtn);
      });

      it('should NOT display "Back to Top" button when on the first page', () => {
        expect(mockModel1.pagination.currentPage).toEqual(0);

        component.setModel = mockModel1;

        expect(component.isMaxProducts).toBeTruthy();
        expect(component.isLastPage).toBeFalsy();

        fixture.detectChanges();

        const buttons = el.queryAll(By.css('.btn-action'));
        expect(buttons[0].nativeElement.innerHTML.trim()).toEqual(showMoreBtn);
        expect(buttons[1]).toBeUndefined();
      });

      it('should NOT display "show more" button when there are no addtional pages', () => {
        expect(mockModel1Page3.pagination.currentPage).toEqual(
          mockModel1Page3.pagination.totalPages - 1
        );

        component.setModel = mockModel1Page3;

        expect(component.isMaxProducts).toBeTruthy();
        expect(component.isLastPage).toBeTruthy();

        fixture.detectChanges();

        const buttons = el.queryAll(By.css('.btn-action'));
        expect(buttons[0].nativeElement.innerHTML.trim()).toEqual(backToTopBtn);
        expect(buttons[1]).toBeUndefined();
      });
    });
  });
});
