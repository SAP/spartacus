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
import { ICON_TYPE } from '../../..';

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
  product: any;
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
  @Input() type: ICON_TYPE;
}

@Component({
  selector: 'cx-add-to-cart',
  template: '<button>add to cart</button>',
})
export class MockAddToCartComponent {
  @Input() productCode: string;
  @Input() showQuantity: boolean;
}

export class MockProductListComponentService {
  setQuery = createSpy('setQuery');
  viewPage = createSpy('viewPage');
  sort = createSpy('sort');
  clearSearchResults = createSpy('clearSearchResults');
  getPageItems = createSpy('getPageItems');
  model$ = createSpy('model$');
}

let isMockInfiniteScroll: boolean;
let isMockButton: boolean;
let mockLimit: number;

export class MockPaginationConfig {
  pagination = {
    infiniteScroll: {
      active: isMockInfiniteScroll,
      showMoreButton: isMockButton,
      limit: mockLimit,
    },
  };
}

describe('ProductListComponent', () => {
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

  describe('component using pagination', () => {
    beforeAll(() => {
      isMockInfiniteScroll = false;
    });

    describe('ngOnInit', () => {
      beforeEach(() => {
        SpyOnModelAndReturn(mockModel1);
        spyOn(component, 'paginationOperations').and.stub();
        component.ngOnInit();
      });

      it('should not use infinite scroll', () => {
        expect(component.isInfiniteScroll).toBeFalsy();
      });

      it('should clear search results', () => {
        expect(componentService.clearSearchResults).toHaveBeenCalled();
      });

      it('should use pagination function', () => {
        expect(component.paginationOperations).toHaveBeenCalled();
      });
    });
  });

  describe('component using infinite scroll', () => {
    beforeAll(() => {
      isMockInfiniteScroll = true;
    });

    describe('ngOnInit', () => {
      beforeEach(() => {
        SpyOnModelAndReturn(mockModel1);
        spyOn(component, 'infiniteScrollOperations').and.stub();
        component.ngOnInit();
      });

      it('should use infinite scroll', () => {
        expect(component.isInfiniteScroll).toBeTruthy();
      });

      it('should call infinite scroll function', () => {
        expect(component.infiniteScrollOperations).toHaveBeenCalled();
      });
    });

    describe('functions', () => {
      it('should append product when appendProducts is true', () => {
        component.model = mockModel1;

        component.appendProducts = true;
        component.infiniteScrollOperations(mockModel1Page2);

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
        component.infiniteScrollOperations(mockModel1Page2);

        expect(component.model).toEqual(mockModel1Page2);
      });

      it('isSamePage should return true when they are the same products', () => {
        component.model = mockModel1;
        expect(component.isSamePage(mockModel1)).toBe(true);
      });

      it('isSamePage should return false when products are the same but resetList is true', () => {
        component.model = mockModel1;
        component.resetList = true;

        expect(component.isSamePage(mockModel1)).toBe(false);
      });

      it('isEmpty should be true when there are no products', () => {
        //mockModel2 is a model that contains no products
        component.model = mockModel2;
        component.setConditions();

        expect(component.isEmpty).toBeTruthy();
      });

      it('isLastPage should be true when there are no more pages', () => {
        component.model = mockModel1Page3;
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
        SpyOnModelAndReturn(mockModel1);

        component.ngOnInit();
        expect(component.productLimit).toEqual(2);
        expect(mockModel1.products.length).toEqual(1);
        expect(component.isMaxProducts).toBeFalsy();

        fixture.detectChanges();

        expect(el.query(By.css('.btn-link'))).toBeNull();
      });

      it('should display buttons when limit is reached', () => {
        SpyOnModelAndReturn(mockModel1);

        component.ngOnInit();
        expect(component.productLimit).toEqual(2);
        expect(component.model.products.length).toEqual(1);
        expect(component.isMaxProducts).toBeFalsy();
        expect(component.isLastPage).toBeFalsy();

        component.appendProducts = true;
        SpyOnModelAndReturn(mockModel1Page2);

        fixture.detectChanges();

        expect(component.productLimit).toEqual(2);
        expect(component.model.products.length).toEqual(2);
        expect(component.isMaxProducts).toBeTruthy();
        expect(component.isLastPage).toBeFalsy();

        const buttons = el.queryAll(By.css('.btn-link'));
        expect(buttons[0].nativeElement.innerHTML).toEqual(backToTopBtn);
        expect(buttons[1].nativeElement.innerHTML).toEqual(showMoreBtn);
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
        SpyOnModelAndReturn(mockModel1);

        expect(mockModel1.pagination.currentPage).not.toEqual(
          mockModel1.pagination.totalPages - 1
        );

        component.ngOnInit();

        expect(component.isMaxProducts).toBeTruthy();
        expect(component.isLastPage).toBeFalsy();

        fixture.detectChanges();

        const buttons = el.queryAll(By.css('.btn-link'));
        expect(buttons[0].nativeElement.innerHTML).toEqual(backToTopBtn);
        expect(buttons[1].nativeElement.innerHTML).toEqual(showMoreBtn);
      });

      it('should NOT display "show more" button when there are no addtional pages', () => {
        SpyOnModelAndReturn(mockModel1Page3);

        expect(mockModel1Page3.pagination.currentPage).toEqual(
          mockModel1Page3.pagination.totalPages - 1
        );

        component.ngOnInit();

        expect(component.isMaxProducts).toBeTruthy();
        expect(component.isLastPage).toBeTruthy();

        fixture.detectChanges();

        const buttons = el.queryAll(By.css('.btn-link'));
        expect(buttons[0].nativeElement.innerHTML).toEqual(backToTopBtn);
        expect(buttons[1]).toBeUndefined();
      });

      it('productLimit should be set to 1', () => {
        component.setComponentConfigurations();
        expect(component.productLimit).toEqual(1);
      });
    });
  });

  function SpyOnModelAndReturn(model: ProductSearchPage) {
    const getSpy = createSpy().and.returnValue(of(model));
    Object.defineProperty(componentService, 'model$', { get: getSpy });
  }
});
