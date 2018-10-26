import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListComponent } from './product-list.component';
import { ProductFacetNavigationComponent } from '../product-facet-navigation/product-facet-navigation.component';
import { ProductGridItemComponent } from '../product-grid-item/product-grid-item.component';
import { ProductListItemComponent } from '../product-list-item/product-list-item.component';
import { AddToCartComponent } from '../../../../cart/components/add-to-cart/add-to-cart.component';
import { PictureComponent } from '../../../../ui/components/media/picture/picture.component';
import { RouterTestingModule } from '@angular/router/testing';
import { SearchConfig } from '../../../search-config';

import * as fromRoot from '../../../../routing/store';
import * as fromProduct from '../../../store';

import { StoreModule, combineReducers } from '@ngrx/store';
import {
  ProductViewComponent,
  ViewModes
} from '../product-view/product-view.component';
import {
  NgbCollapseModule,
  NgbPaginationModule,
  NgbRatingModule
} from '@ng-bootstrap/ng-bootstrap';
import { StarRatingComponent } from '../../../../ui';
import { FormsModule } from '@angular/forms';
import { PaginationAndSortingModule } from '../../../../ui/components/pagination-and-sorting/pagination-and-sorting.module';
import { PaginationComponent } from '../../../../ui/components/pagination-and-sorting/pagination/pagination.component';
import { SortingComponent } from '../../../../ui/components/pagination-and-sorting/sorting/sorting.component';
import { ProductSearchService } from '../../../services/product-search.service';

describe('ProductListComponent in product-list', () => {
  let service: ProductSearchService;
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let searchConfig: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NgbPaginationModule,
        NgbCollapseModule,
        NgbRatingModule,
        PaginationAndSortingModule,
        FormsModule,
        RouterTestingModule,
        StoreModule.forRoot({
          ...fromRoot.getReducers(),
          products: combineReducers(fromProduct.getReducers())
        })
      ],
      providers: [ProductSearchService],
      declarations: [
        ProductListComponent,
        ProductFacetNavigationComponent,
        ProductGridItemComponent,
        ProductListItemComponent,
        AddToCartComponent,
        PictureComponent,
        ProductViewComponent,
        StarRatingComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    service = TestBed.get(ProductSearchService);
    searchConfig = new SearchConfig();

    spyOn(service, 'search').and.callThrough();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOnChanges and get search results with category code', () => {
    component.categoryCode = 'mockCategoryCode';
    component.ngOnInit();
    component.ngOnChanges();
    searchConfig = { ...searchConfig, ...{ pageSize: 10 } };
    expect(service.search).toHaveBeenCalledWith(
      ':relevance:category:mockCategoryCode',
      searchConfig
    );
  });

  it('should call ngOnChanges get search results with brand code', () => {
    component.brandCode = 'mockBrandCode';
    component.ngOnInit();
    component.ngOnChanges();
    searchConfig = { ...searchConfig, ...{ pageSize: 10 } };
    expect(service.search).toHaveBeenCalledWith(
      ':relevance:brand:mockBrandCode',
      searchConfig
    );
  });

  it('should call onFilter', () => {
    component.onFilter('mockQuery');
    expect(service.search).toHaveBeenCalledWith('mockQuery', searchConfig);
  });

  it('should change pages', done => {
    const pagination = new PaginationComponent();
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
