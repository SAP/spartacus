import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import {
  Component,
  Input,
  PipeTransform,
  Pipe,
  SimpleChange
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {
  NgbCollapseModule,
  NgbPaginationModule,
  NgbRatingModule
} from '@ng-bootstrap/ng-bootstrap';

import { ProductSearchService, ProductSearchPage } from '@spartacus/core';

import { of, Observable } from 'rxjs';

import createSpy = jasmine.createSpy;

import { ProductFacetNavigationComponent } from '../product-facet-navigation/product-facet-navigation.component';
import { ProductGridItemComponent } from '../product-grid-item/product-grid-item.component';
import {
  ProductViewComponent,
  ViewModes
} from '../product-view/product-view.component';
import { StarRatingComponent } from '../../../../ui';
import { AddToCartComponent } from '../../../../cart/add-to-cart/add-to-cart.component';
import { PaginationAndSortingModule } from '../../../../ui/components/pagination-and-sorting/pagination-and-sorting.module';
import { PictureComponent } from '../../../../ui/components/media/picture/picture.component';
import { PaginationComponent } from '../../../../ui/components/pagination-and-sorting/pagination/pagination.component';
import { SortingComponent } from '../../../../ui/components/pagination-and-sorting/sorting/sorting.component';

import { ProductListComponent } from './product-list.component';

class MockProductSearchService {
  search = createSpy();
  searchResults$ = of();

  getSearchResults(): Observable<ProductSearchPage> {
    return of();
  }

  clearSearchResults(): void {}
}
class MockActivatedRoute {
  snapshot = { queryParams: {} };
  setParams = params => (this.snapshot.queryParams = params);
}

@Component({
  template: '',
  selector: 'cx-product-list-item'
})
class MockProductListItemComponent {
  @Input()
  product;
}

@Pipe({
  name: 'cxTranslateUrl'
})
class MockTranslateUrlPipe implements PipeTransform {
  transform() {}
}

@Pipe({
  name: 'stripHtml'
})
class MockStripHtmlPipe implements PipeTransform {
  transform(): any {}
}

describe('ProductListComponent in product-list', () => {
  let service: ProductSearchService;
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NgbPaginationModule,
        NgbCollapseModule,
        NgbRatingModule,
        PaginationAndSortingModule,
        FormsModule,
        RouterTestingModule
      ],
      providers: [
        {
          provide: ProductSearchService,
          useClass: MockProductSearchService
        },
        {
          provide: ActivatedRoute,
          useClass: MockActivatedRoute
        }
      ],
      declarations: [
        ProductListComponent,
        ProductFacetNavigationComponent,
        ProductGridItemComponent,
        AddToCartComponent,
        PictureComponent,
        ProductViewComponent,
        StarRatingComponent,
        MockProductListItemComponent,
        MockTranslateUrlPipe,
        MockStripHtmlPipe
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    service = TestBed.get(ProductSearchService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOnChanges and get search results with params provided with url', () => {
    const activeRoute = TestBed.get(ActivatedRoute);

    activeRoute.setParams({
      query: 'myBestQueryEver:category:bestqueries',
      categoryCode: 'mockCategoryCode',
      page: 112
    });

    component.categoryCode = 'mockCategoryCode';
    component.ngOnInit();
    component.ngOnChanges({
      categoryCode: new SimpleChange(null, component.categoryCode, false)
    });

    expect(service.search).toHaveBeenCalledWith(
      'myBestQueryEver:category:bestqueries',
      { pageSize: 10, page: 112, categoryCode: 'mockCategoryCode' }
    );
  });

  it('should call ngOnChanges and get search results with category code', () => {
    component.categoryCode = 'mockCategoryCode';
    component.ngOnInit();
    component.ngOnChanges({
      categoryCode: new SimpleChange(null, component.categoryCode, false)
    });

    expect(service.search).toHaveBeenCalledWith(
      ':relevance:category:mockCategoryCode',
      { pageSize: 10, categoryCode: 'mockCategoryCode' }
    );
  });

  it('should call ngOnChanges get search results with brand code', () => {
    component.brandCode = 'mockBrandCode';
    component.ngOnInit();
    component.ngOnChanges({
      brandCode: new SimpleChange(null, component.categoryCode, false)
    });

    expect(service.search).toHaveBeenCalledWith(
      ':relevance:brand:mockBrandCode',
      { pageSize: 10, brandCode: 'mockBrandCode' }
    );
  });

  it('should call onFilter', () => {
    component.onFilter('mockQuery');
    expect(service.search).toHaveBeenCalledWith('mockQuery', {});
  });

  it('should change pages', done => {
    const pagination = new PaginationComponent();
    component.query = 'mockQuery';
    pagination.viewPageEvent.subscribe(event => {
      expect(event).toEqual(1);
      component.viewPage(event);
      expect(component.searchConfig.currentPage).toBe(event);
      done();
    });

    pagination.pageChange(2);
  });

  it('should change sortings', done => {
    const pagination = new SortingComponent();
    component.query = 'mockQuery';
    pagination.sortListEvent.subscribe(event => {
      expect(event).toEqual('sortCode');
      component.viewPage(event);
      expect(component.searchConfig.currentPage).toBe(event);
      done();
    });

    pagination.sortList('sortCode');
  });

  it('should change view mode to grid from default list', done => {
    const viewMode = new ProductViewComponent();
    viewMode.modeChange.subscribe(event => {
      expect(event).toEqual(ViewModes.Grid);
      done();
    });

    viewMode.changeMode();
  });
});
