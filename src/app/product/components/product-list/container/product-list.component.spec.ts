import { MaterialModule } from 'app/material.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductListComponent } from './product-list.component';
import * as fromProductStore from '../../../store';
import { Store, StoreModule } from '@ngrx/store';
import * as fromRoot from '../../../../routing/store';
import { of } from 'rxjs/observable/of';
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

const mockSearchResults = {
  pagination: 'mockPagination'
};

const mockEmptySearchResults = {};

fdescribe('ProductListComponent in product-list', () => {
  let store: Store<fromProductStore.ProductsState>;
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          MaterialModule,
          RouterTestingModule,
          StoreModule.forRoot({
            ...fromRoot.reducers
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
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);

    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOnInit and search results exist in store', () => {
    spyOn(store, 'select').and.returnValue(of(mockSearchResults));

    component.ngOnInit();

    component.model$.subscribe(result =>
      expect(result).toEqual(mockSearchResults)
    );
    expect(store.dispatch).not.toHaveBeenCalledWith(
      new fromProductStore.SearchProducts({
        queryText: 'mockQuery',
        searchConfig: new SearchConfig(10)
      })
    );
  });

  it('should call ngOnInit and search results do not exist in store', () => {
    spyOn(store, 'select').and.returnValue(of(mockEmptySearchResults));
    component.query = 'mockQuery';

    component.ngOnInit();
    component.model$.subscribe();

    expect(store.dispatch).toHaveBeenCalledWith(
      new fromProductStore.SearchProducts({
        queryText: 'mockQuery',
        searchConfig: new SearchConfig(10)
      })
    );
  });

  it('should call get search results with no category and brand code', () => {
    component.ngOnChanges();

    expect(store.dispatch).not.toHaveBeenCalled();
  });

  it('should call get search results with category code', () => {
    component.categoryCode = 'mockCategoryCode';
    component.ngOnChanges();

    expect(component.query).toEqual(':relevance:category:mockCategoryCode');
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromProductStore.SearchProducts({
        queryText: ':relevance:category:mockCategoryCode',
        searchConfig: new SearchConfig(10)
      })
    );
  });

  it('should call get search results with brand code', () => {
    component.brandCode = 'mockBrandCode';
    component.ngOnChanges();

    expect(component.query).toEqual(':relevance:brand:mockBrandCode');
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromProductStore.SearchProducts({
        queryText: ':relevance:brand:mockBrandCode',
        searchConfig: new SearchConfig(10)
      })
    );
  });

  it('should call onFilter', () => {
    component.onFilter('mockQuery');

    expect(store.dispatch).toHaveBeenCalledWith(
      new fromProductStore.SearchProducts({
        queryText: 'mockQuery',
        searchConfig: new SearchConfig(10)
      })
    );
  });
});
