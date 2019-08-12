import { Component, Input, Pipe, PipeTransform, Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { I18nTestingModule } from '@spartacus/core';
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
  model$ = of({});
}

let isMockInfiniteScroll = false;

export class MockPaginationConfig {
  pagination = { infiniteScroll: isMockInfiniteScroll };
}

fdescribe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let componentService: ProductListComponentService;

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
        component.ngOnInit();
        expect(component.isInfiniteScroll).toBeTruthy();
      });

      it('should call infinite scroll function', () => {
        spyOn(component, 'infiniteScrollOperations');

        component.ngOnInit();
        expect(component.infiniteScrollOperations).toHaveBeenCalled();
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
});
