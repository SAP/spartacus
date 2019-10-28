import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductScrollComponent } from './product-scroll.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ProductGridItemComponent } from '../..';
import { I18nTestingModule, ProductSearchPage } from '@spartacus/core';
import { SpinnerModule } from '../../../../../shared/components/spinner/spinner.module';
import {
  Component,
  Input,
  Pipe,
  PipeTransform,
  DebugElement,
  Type,
} from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { MediaComponent } from '../../../../../shared/components/media';
import createSpy = jasmine.createSpy;
import { ProductListComponentService } from '../product-list-component.service';
import { ViewModes } from '../../product-view/product-view.component';
import { By } from '@angular/platform-browser';
import { ViewConfig } from '../../../../../shared/config/view-config';
import { ViewportScroller } from '@angular/common';

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
export class MockAddToCartComponent {
  @Input() productCode: string;
  @Input() showQuantity: boolean;
}

class MockProductListComponentService {
  setQuery = createSpy('setQuery');
  viewPage = createSpy('viewPage');
  sort = createSpy('sort');
  clearSearchResults = createSpy('clearSearchResults');
  getPageItems = createSpy('getPageItems');
  model$ = createSpy('model$');
  autoScrollPosition = [0, 0];
  latestScrollCriteria = undefined;
}

class MockViewportScroller {
  scrollToPosition = createSpy('scrollToPosition');
}

describe('ProductScrollComponent', () => {
  let component: ProductScrollComponent;
  let fixture: ComponentFixture<ProductScrollComponent>;
  let el: DebugElement;

  let componentService: MockProductListComponentService;
  let viewportScroller: ViewportScroller;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ProductScrollComponent,
        ProductGridItemComponent,
        MockProductListItemComponent,
        MockUrlPipe,
        MediaComponent,
        MockStarRatingComponent,
        MockAddToCartComponent,
      ],
      imports: [
        InfiniteScrollModule,
        I18nTestingModule,
        SpinnerModule,
        RouterTestingModule,
      ],
      providers: [
        {
          provide: ViewportScroller,
          useClass: MockViewportScroller,
        },
        {
          provide: ProductListComponentService,
          useClass: MockProductListComponentService,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductScrollComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    componentService = TestBed.get(ProductListComponentService as Type<
      ProductListComponentService
    >);
    viewportScroller = TestBed.get(ViewportScroller);
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

    it('should scroll next page, when current page is less than the latest scroll page.', () => {
      componentService.latestScrollCriteria = { currentPage: 1 };
      component.setModel = mockModel1;

      expect(component.appendProducts).toBeTruthy();
      expect(componentService.getPageItems).toHaveBeenCalledWith(1);
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

    describe('with autoScrollPosition exist', () => {
      beforeEach(() => {
        componentService.autoScrollPosition = [0, 1000];
      });

      it('should do auto scroll if no scroll done', () => {
        component.ngAfterViewChecked();
        expect(viewportScroller.scrollToPosition).toHaveBeenCalledWith([
          0,
          1000,
        ]);
        expect(component.doneAutoScroll).toBeTruthy();
      });

      it('should do another auto scroll if all data is loaded and there is a view change during 300ms', () => {
        component.doneAutoScroll = true;
        component.lastScrollTime = Date.now() - 1;
        component.isDataReady = true;
        component.ngAfterViewChecked();
        expect(viewportScroller.scrollToPosition).toHaveBeenCalledWith([
          0,
          1000,
        ]);
      });

      it('should not do auto scroll and reset autoScrollPosition if all data is loaded and the last scroll happens 300ms ago', () => {
        component.doneAutoScroll = true;
        component.lastScrollTime = Date.now() - 300;
        component.isDataReady = true;
        component.ngAfterViewChecked();
        expect(viewportScroller.scrollToPosition).not.toHaveBeenCalledWith([
          0,
          1000,
        ]);
        expect(componentService.autoScrollPosition).toEqual([0, 0]);
      });
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
