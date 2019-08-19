import {
  Component,
  Input,
  Pipe,
  PipeTransform,
  Type,
  DebugElement,
} from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { I18nTestingModule, ProductSearchPage } from '@spartacus/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { Observable, of } from 'rxjs';
import { PageLayoutService } from '../../../../cms-structure';
import {
  ListNavigationModule,
  MediaComponent,
  SpinnerModule,
} from '../../../../shared';
import { PaginationConfig } from '../../config/pagination-config';
import { ProductFacetNavigationComponent } from '../product-facet-navigation/product-facet-navigation.component';
import { ProductGridItemComponent } from '../product-grid-item/product-grid-item.component';
import {
  ProductViewComponent,
  ViewModes,
} from '../product-view/product-view.component';
import { ProductListComponentService } from './product-list-component.service';
import { ProductListComponent } from './product-list.component';
import createSpy = jasmine.createSpy;

const mockModel: ProductSearchPage = {
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
    currentPage: 1,
    totalPages: 2,
  },
  products: [{ averageRating: 3, code: 'mockCode2-1', name: 'mockName2-1' }],
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
    totalPages: 0,
  },
  products: [],
};

@Component({
  selector: 'cx-star-rating',
  template: '',
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
})
class MockProductListItemComponent {
  @Input()
  product;
  paginationOperations = createSpy('paginationOperations');
  infiniteScrollOperations = createSpy('infiniteScrollPagination');
}

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform() {}
}

@Component({
  selector: 'cx-icon',
  template: '',
})
export class MockCxIconComponent {
  @Input() type;
}

@Component({
  selector: 'cx-add-to-cart',
  template: '<button>add to cart</button>',
})
export class MockAddToCartComponent {
  @Input() productCode;
  @Input() showQuantity;
}

export class MockProductListComponentService {
  setQuery = createSpy('setQuery');
  viewPage = createSpy('viewPage');
  sort = createSpy('sort');
  clearSearchResults = createSpy('clearSearchResults');
  getPageItems = createSpy('getPageItems');
  model$ = of({});
}

let isMockInfiniteScroll = false;
let isMockButton = false;
let mockLimit = 0;

export class MockPaginationConfig {
  pagination = {
    infiniteScroll: {
      active: isMockInfiniteScroll,
      button: isMockButton,
      limit: mockLimit,
    },
  };
}

fdescribe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let componentService: ProductListComponentService;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NgbCollapseModule,
        ListNavigationModule,
        FormsModule,
        RouterTestingModule,
        I18nTestingModule,
        InfiniteScrollModule,
        SpinnerModule,
      ],
      providers: [
        {
          provide: PageLayoutService,
          useClass: MockPageLayoutService,
        },
        {
          provide: ProductListComponentService,
          useClass: MockProductListComponentService,
        },
        {
          provide: PaginationConfig,
          useClass: MockPaginationConfig,
        },
      ],
      declarations: [
        ProductListComponent,
        ProductFacetNavigationComponent,
        ProductGridItemComponent,
        MockStarRatingComponent,
        MockAddToCartComponent,
        MediaComponent,
        ProductViewComponent,
        MockProductListItemComponent,
        MockUrlPipe,
        MockCxIconComponent,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    componentService = TestBed.get(ProductListComponentService as Type<
      ProductListComponentService
    >);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('component using pagination', () => {
    beforeAll(() => {
      isMockInfiniteScroll = false;
    });

    describe('ngOnInit', () => {
      it('should not use infinite scroll', () => {
        component.ngOnInit();
        expect(component.isInfiniteScroll).toBeFalsy();
      });

      it('should clear search results', () => {
        component.ngOnInit();
        expect(componentService.clearSearchResults).toHaveBeenCalled();
      });

      it('should use pagination function', () => {
        spyOn(component, 'paginationOperations');
        component.ngOnInit();

        expect(component.paginationOperations).toHaveBeenCalled();
      });
    });
  });

  describe('component using infinite scroll', () => {
    beforeAll(() => {
      isMockInfiniteScroll = true;
    });

    describe('ngOnInit', () => {
      it('should use infinite scroll', () => {
        SpyOnModelAndReturn(mockModel);
        component.ngOnInit();

        expect(component.isInfiniteScroll).toBeTruthy();
      });

      it('should call infinite scroll function', () => {
        SpyOnModelAndReturn(mockModel);
        spyOn(component, 'infiniteScrollOperations');
        component.ngOnInit();

        expect(component.infiniteScrollOperations).toHaveBeenCalled();
      });
    });

    describe('functions', () => {
      it('should append product when appendProducts is true', () => {
        component.model = mockModel;

        component.appendProducts = true;
        component.infiniteScrollOperations(mockModel2);

        const totalLength =
          mockModel.products.length + mockModel2.products.length;

        expect(component.model.products.length).toEqual(totalLength);
        expect(component.model.products).toContain(
          jasmine.objectContaining(mockModel2.products[0])
        );
      });

      it('should replace products when appendProducts is false', () => {
        component.model = mockModel;
        component.infiniteScrollOperations(mockModel2);

        expect(component.model).toEqual(mockModel2);
      });

      it('isSamePage should return true when they are the same products', () => {
        component.model = mockModel;
        expect(component.isSamePage(mockModel)).toBe(true);
      });

      it('isSamePage should return false when products are the same but resetList is true', () => {
        component.model = mockModel;
        component.resetList = true;

        expect(component.isSamePage(mockModel)).toBe(false);
      });

      it('isEmpty should be true when there are no products', () => {
        //mockModel3 is a model that contains no products
        component.model = mockModel3;
        component.setConditions();

        expect(component.isEmpty).toBeTruthy();
      });

      it('isLastPage should be true when there are no more pages', () => {
        component.model = mockModel2;
        component.setConditions();

        expect(component.isLastPage).toBeTruthy();
      });

      it('setViewMode should call service.getPageItems', () => {
        component.isInfiniteScroll = true;
        component.setViewMode(ViewModes.Grid);

        expect(componentService.getPageItems).toHaveBeenCalledWith(0);
      });
    });

    describe('with limit', () => {
      beforeAll(() => {
        mockLimit = 2;
      });

      it('should NOT display buttons when limit is not reached', () => {
        SpyOnModelAndReturn(mockModel);

        component.ngOnInit();
        expect(component.productLimit).toEqual(2);
        expect(mockModel.products.length).toEqual(1);
        expect(component.isMaxProducts).toBeFalsy();

        fixture.detectChanges();

        expect(el.query(By.css('.btn-link'))).toBeNull();
      });

      it('should display buttons when limit is reached', () => {
        SpyOnModelAndReturn(mockModel);

        component.ngOnInit();
        expect(component.productLimit).toEqual(2);
        expect(component.model.products.length).toEqual(1);
        expect(component.isMaxProducts).toBeFalsy();

        component.appendProducts = true;
        SpyOnModelAndReturn(mockModel2);

        fixture.detectChanges();

        expect(component.productLimit).toEqual(2);
        expect(component.model.products.length).toEqual(2);
        expect(component.isMaxProducts).toBeTruthy();

        expect(el.query(By.css('.btn-link')).nativeElement).toBeDefined();
      });

      it('productLimit should be set to mockLimit value', () => {
        component.setComponentConfigurations();
        expect(component.productLimit).toEqual(mockLimit);
      });
    });

    describe('with button', () => {
      beforeAll(() => {
        isMockButton = true;
      });

      it('should display "show more" and "back to top" buttons when there are additional pages', () => {
        SpyOnModelAndReturn(mockModel);

        expect(mockModel.pagination.totalPages).toEqual(2);
        component.ngOnInit();
        expect(component.isMaxProducts).toBeTruthy();
        expect(component.isLastPage).toBeFalsy();
        fixture.detectChanges();
        expect(
          el.query(By.css('.btn-link.back-to-top')).nativeElement
        ).toBeDefined();
        expect(
          el.query(By.css('.btn-link.show-more')).nativeElement
        ).toBeDefined();
      });

      it('should NOT display "show more" button when there are no addtional pages', () => {
        SpyOnModelAndReturn(mockModel2);

        expect(mockModel.pagination.totalPages).toEqual(2);
        component.ngOnInit();
        expect(component.isMaxProducts).toBeTruthy();
        expect(component.isLastPage).toBeTruthy();
        fixture.detectChanges();
        expect(
          el.query(By.css('.btn-link.back-to-top')).nativeElement
        ).toBeDefined();
        expect(el.query(By.css('.btn-link.show-more'))).toBeNull();
      });

      it('productLimit should be set to 1', () => {
        component.setComponentConfigurations();
        expect(component.productLimit).toEqual(1);
      });
    });
  });

  it('viewPage should call service.viewPage', () => {
    component.viewPage(123);
    expect(componentService.viewPage).toHaveBeenCalledWith(123);
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

  function SpyOnModelAndReturn(model: ProductSearchPage) {
    createSpy('model$');
    const getSpy = jasmine.createSpy().and.returnValue(of(model));
    Object.defineProperty(componentService, 'model$', { get: getSpy });
  }
});
