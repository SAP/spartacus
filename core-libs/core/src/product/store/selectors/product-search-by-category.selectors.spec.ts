import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { StateUtils } from '../../../state/utils';
import { Product } from '../../../model/product.model';
import { PRODUCT_FEATURE, StateWithProduct } from '../product-state';
import * as fromReducers from '../reducers';
import * as ProductActions from '../actions/product-search-by-category.action';
import { getSelectedProductSearchByCategoryStateFactory } from './product-search-by-category.selectors';

describe('getSelectedProductSearchByCategoryStateFactory', () => {
  let store: Store<StateWithProduct>;

  const categoryCode = 'testCategory';
  const scope = 'testScope';
  const products: Product[] = [
    { code: 'product1', name: 'Test Product 1' },
    { code: 'product2', name: 'Test Product 2' },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(PRODUCT_FEATURE, fromReducers.getReducers()),
      ],
    });

    store = TestBed.inject(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should return the initial loader state when no category is found', () => {
    let result: StateUtils.LoaderState<Product[]>;
    store
      .select(
        getSelectedProductSearchByCategoryStateFactory({ categoryCode, scope })
      )
      .subscribe((value) => (result = value));

    expect(result).toEqual(StateUtils.initialLoaderState);
  });

  it('should return the correct product state when products are found', () => {
    let result: StateUtils.LoaderState<Product[]>;
    store
      .select(
        getSelectedProductSearchByCategoryStateFactory({ categoryCode, scope })
      )
      .subscribe((value) => (result = value));

    store.dispatch(
      new ProductActions.ProductSearchLoadByCategorySuccess({
        categoryCode,
        scope,
        products,
      })
    );

    expect(result.value).toEqual(products);
  });

  it('should return a loading state when loading is triggered', () => {
    let result: StateUtils.LoaderState<Product[]>;
    store
      .select(
        getSelectedProductSearchByCategoryStateFactory({ categoryCode, scope })
      )
      .subscribe((value) => (result = value));

    store.dispatch(
      new ProductActions.ProductSearchLoadByCategory({
        categoryCode,
        scope,
      })
    );

    expect(result.loading).toBeTruthy();
    expect(result.value).toBeUndefined();
  });

  it('should return an error state when the loading fails', () => {
    let result: StateUtils.LoaderState<Product[]>;
    const error = { message: 'Error occurred' };

    store
      .select(
        getSelectedProductSearchByCategoryStateFactory({ categoryCode, scope })
      )
      .subscribe((value) => (result = value));

    store.dispatch(
      new ProductActions.ProductSearchLoadByCategoryFail({
        categoryCode,
        scope,
        error,
      })
    );

    expect(result.error).toBeTruthy();
    expect(result.success).toBeFalsy();
  });
});
