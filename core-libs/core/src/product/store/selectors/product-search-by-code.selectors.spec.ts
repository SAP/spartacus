import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { Product } from '../../../model/product.model';
import { PRODUCT_FEATURE, StateWithProduct } from '../product-state';
import * as fromReducers from '../reducers/index';
import { getSelectedProductSearchByCodeStateFactory } from './product-search-by-code.selectors';
import { StateUtils } from '../../../state/utils/index';
import { ProductActions } from '../actions/index';

describe('getSelectedProductSearchByCodeStateFactory', () => {
  let store: Store<StateWithProduct>;

  const code = 'testCode';
  const scope = 'testScope';
  const product: Product = {
    code,
    name: 'testProduct',
  };

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

  it('should return the initial loader state when no product is found', () => {
    let result: StateUtils.LoaderState<Product>;
    store
      .select(getSelectedProductSearchByCodeStateFactory({ code, scope }))
      .subscribe((value) => (result = value));

    expect(result).toEqual(StateUtils.initialLoaderState);
  });

  it('should return the correct product state when product found', () => {
    let result: StateUtils.LoaderState<Product>;
    store
      .select(getSelectedProductSearchByCodeStateFactory({ code, scope }))
      .subscribe((value) => (result = value));

    store.dispatch(
      new ProductActions.ProductSearchLoadByCodeSuccess({
        product: product,
        code: code,
        scope: scope,
      })
    );

    expect(result.value).toEqual(product);
  });
});
