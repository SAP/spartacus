import { TestBed } from '@angular/core/testing';
import { select, Store, StoreModule } from '@ngrx/store';
import { Product } from '../../../model/product.model';
import { ProductActions } from '../actions/index';
import { PRODUCT_FEATURE, StateWithProduct } from '../product-state';
import * as fromReducers from '../reducers/index';
import { ProductSelectors } from '../selectors/index';

describe('Cms Component Selectors', () => {
  let store: Store<StateWithProduct>;

  const code = 'testCode';
  const product: Product = {
    code,
    name: 'testProduct',
  };
  const entities = {
    testCode: {
      loading: false,
      error: false,
      success: true,
      value: product,
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(PRODUCT_FEATURE, fromReducers.getReducers()),
      ],
    });
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('getSelectedProductsFactory', () => {
    it('should return product by code', () => {
      let result: Product[];
      store
        .pipe(select(ProductSelectors.getSelectedProductsFactory(['testCode'])))
        .subscribe(value => (result = value));

      store.dispatch(new ProductActions.LoadProductSuccess(product));

      expect(result).toEqual([entities['testCode'].value]);
    });
  });

  describe('getAllProductCodes', () => {
    it('should return product codes as an array', () => {
      let result: string[];
      store
        .pipe(select(ProductSelectors.getAllProductCodes))
        .subscribe(value => (result = value));

      expect(result).toEqual([]);

      store.dispatch(new ProductActions.LoadProductSuccess(product));

      expect(result).toEqual(['testCode']);
    });
  });

  describe('getSelectedProductFactory', () => {
    it('should return a single product by productCode', () => {
      let result: Product;
      store
        .pipe(select(ProductSelectors.getSelectedProductFactory(code)))
        .subscribe(value => (result = value));

      store.dispatch(new ProductActions.LoadProductSuccess(product));
      expect(result).toEqual(product);
    });
  });

  describe('getSelectedProductLoadingFactory', () => {
    it('should return isLoading information', () => {
      let result: boolean;

      store
        .pipe(select(ProductSelectors.getSelectedProductLoadingFactory(code)))
        .subscribe(value => (result = value));

      store.dispatch(new ProductActions.LoadProduct(product.code));
      expect(result).toBeTruthy();

      store.dispatch(new ProductActions.LoadProductSuccess(product));
      expect(result).toBeFalsy();
    });
  });

  describe('getSelectedProductSuccessFactory', () => {
    it('should return success information', () => {
      let result: boolean;

      store
        .pipe(select(ProductSelectors.getSelectedProductSuccessFactory(code)))
        .subscribe(value => (result = value));

      expect(result).toBeFalsy();

      store.dispatch(new ProductActions.LoadProductSuccess(product));
      expect(result).toBeTruthy();
    });
  });

  describe('getSelectedProductErrorFactory', () => {
    it('should return error information', () => {
      let result: boolean;

      store
        .pipe(select(ProductSelectors.getSelectedProductErrorFactory(code)))
        .subscribe(value => (result = value));

      expect(result).toBeFalsy();

      store.dispatch(new ProductActions.LoadProductFail(code, undefined));
      expect(result).toBeTruthy();
    });
  });
});
