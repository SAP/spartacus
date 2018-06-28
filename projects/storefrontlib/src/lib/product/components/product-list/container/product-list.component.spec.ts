import { MaterialModule } from 'projects/storefrontlib/src/lib/material.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { ProductListComponent } from './product-list.component';
import { ProductPagingComponent } from '../product-paging/product-paging.component';
import { ProductFacetNavigationComponent } from '../product-facet-navigation/product-facet-navigation.component';
import { ProductGridItemComponent } from '../product-grid-item/product-grid-item.component';
import { ProductLineItemComponent } from '../product-line-item/product-line-item.component';
import { ProductSortingComponent } from '../product-sorting/product-sorting.component';
import { ProductListItemComponent } from '../product-list-item/product-list-item.component';
import { AddToCartComponent } from '../../../../cart/components/add-to-cart/add-to-cart.component';
import { PictureComponent } from '../../../../ui/components/media/picture/picture.component';
import { RouterTestingModule } from '@angular/router/testing';
import { SearchConfig } from '../../../search-config';

import * as fromRoot from '../../../../routing/store';
import * as fromProduct from '../../../store';
import * as fromCart from '../../../../cart/store';
import * as fromUser from '../../../../user/store';

import { StoreModule, Store, combineReducers } from '@ngrx/store';

describe('ProductListComponent in product-list', () => {
  let store: Store<fromProduct.ProductsState>;
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let searchConfig: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        RouterTestingModule,
        StoreModule.forRoot({
          ...fromRoot.reducers,
          products: combineReducers(fromProduct.reducers),
          cart: combineReducers(fromCart.reducers),
          user: combineReducers(fromUser.reducers)
        })
      ],
      declarations: [
        ProductListComponent,
        ProductPagingComponent,
        ProductFacetNavigationComponent,
        ProductGridItemComponent,
        ProductLineItemComponent,
        ProductListItemComponent,
        ProductSortingComponent,
        AddToCartComponent,
        PictureComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    searchConfig = new SearchConfig();
    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOnInit and get search result if the result is empty with given categoryCode', () => {
    spyOn(store, 'select').and.returnValues(of({}, {}));

    component.categoryCode = 'mockCategoryCode';

    component.ngOnInit();
    component.model$.subscribe();
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromProduct.SearchProducts({
        queryText: ':relevance:category:mockCategoryCode',
        searchConfig: searchConfig
      })
    );
  });

  it('should call ngOnInit and get search result if the result is empty with given brandCode', () => {
    spyOn(store, 'select').and.returnValues(of({}, {}));

    component.brandCode = 'mockBrandCode';

    component.ngOnInit();
    component.model$.subscribe();
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromProduct.SearchProducts({
        queryText: ':relevance:brand:mockBrandCode',
        searchConfig: searchConfig
      })
    );
  });

  it('should call ngOnChanges and get search results with category code', () => {
    component.categoryCode = 'mockCategoryCode';
    component.ngOnChanges();
    searchConfig = { ...searchConfig, ...{ pageSize: 10 } };
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromProduct.SearchProducts({
        queryText: ':relevance:category:mockCategoryCode',
        searchConfig: searchConfig
      })
    );
  });

  it('should call ngOnChanges get search results with brand code', () => {
    component.brandCode = 'mockBrandCode';
    component.ngOnChanges();
    searchConfig = { ...searchConfig, ...{ pageSize: 10 } };
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromProduct.SearchProducts({
        queryText: ':relevance:brand:mockBrandCode',
        searchConfig: searchConfig
      })
    );
  });

  it('should call onFilter', () => {
    component.onFilter('mockQuery');

    expect(store.dispatch).toHaveBeenCalledWith(
      new fromProduct.SearchProducts({
        queryText: 'mockQuery',
        searchConfig: searchConfig
      })
    );
  });

  it('should change pages', done => {
    const pagination = new ProductPagingComponent();
    pagination.viewPageEvent.subscribe(event => {
      expect(event).toEqual(2);
      component.viewPage(event);
      expect(component.searchConfig.currentPage).toBe(event);
      done();
    });

    pagination.next(2);
  });

  it('should change sortings', done => {
    const pagination = new ProductSortingComponent();
    pagination.sortListEvent.subscribe(event => {
      expect(event).toEqual('sortCode');
      component.viewPage(event);
      expect(component.searchConfig.currentPage).toBe(event);
      done();
    });

    pagination.sortList('sortCode');
  });
});
