import { TestBed } from '@angular/core/testing';
import { select, Store, StoreModule } from '@ngrx/store';
import { Product } from '../../../model/product.model';
import { ProductActions } from '../actions/index';
import { PRODUCT_FEATURE, StateWithProduct } from '../product-state';
import * as fromReducers from '../reducers/index';
import { ProductSelectors } from '../selectors/index';
import { Subscription } from 'rxjs';

describe('Product Selectors', () => {
  let store: Store<StateWithProduct>;

  const code = 'testCode';
  const scope = 'testScope';
  const product: Product = {
    code,
    name: 'testProduct',
  };

  let subscription: Subscription;

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

  afterEach(() => {
    if (subscription) {
      subscription.unsubscribe();
      subscription = undefined;
    }
  });

  describe('getAllProductCodes', () => {
    it('should return product codes as an array', () => {
      let result: string[];
      subscription = store
        .pipe(select(ProductSelectors.getAllProductCodes))
        .subscribe((value) => (result = value));

      expect(result).toEqual([]);

      store.dispatch(new ProductActions.LoadProductSuccess(product));

      expect(result).toEqual(['testCode']);
    });
  });

  describe('getSelectedProductFactory', () => {
    it('should return a single product by productCode', () => {
      let result: Product;
      subscription = store
        .pipe(select(ProductSelectors.getSelectedProductFactory(code)))
        .subscribe((value) => (result = value));

      store.dispatch(new ProductActions.LoadProductSuccess(product));
      expect(result).toEqual(product);
    });

    it('should return a single product by productCode and scope', () => {
      let result: Product;
      subscription = store
        .pipe(select(ProductSelectors.getSelectedProductFactory(code, scope)))
        .subscribe((value) => (result = value));

      store.dispatch(new ProductActions.LoadProductSuccess(product, scope));
      expect(result).toEqual(product);
    });
  });

  describe('getSelectedProductLoadingFactory', () => {
    it('should return isLoading information', () => {
      let result: boolean;

      subscription = store
        .pipe(select(ProductSelectors.getSelectedProductLoadingFactory(code)))
        .subscribe((value) => (result = value));

      store.dispatch(new ProductActions.LoadProduct(product.code));
      expect(result).toBeTruthy();

      store.dispatch(new ProductActions.LoadProductSuccess(product));
      expect(result).toBeFalsy();
    });

    it('should return isLoading information for scope', () => {
      let result: boolean;

      subscription = store
        .pipe(
          select(ProductSelectors.getSelectedProductLoadingFactory(code, scope))
        )
        .subscribe((value) => (result = value));

      store.dispatch(new ProductActions.LoadProduct(product.code, scope));
      expect(result).toBeTruthy();

      store.dispatch(new ProductActions.LoadProductSuccess(product, scope));
      expect(result).toBeFalsy();
    });
  });

  describe('getSelectedProductSuccessFactory', () => {
    it('should return success information', () => {
      let result: boolean;

      subscription = store
        .pipe(select(ProductSelectors.getSelectedProductSuccessFactory(code)))
        .subscribe((value) => (result = value));

      expect(result).toBeFalsy();

      store.dispatch(new ProductActions.LoadProductSuccess(product));
      expect(result).toBeTruthy();
    });
    it('should return success information for scope', () => {
      let result: boolean;

      subscription = store
        .pipe(
          select(ProductSelectors.getSelectedProductSuccessFactory(code, scope))
        )
        .subscribe((value) => (result = value));

      expect(result).toBeFalsy();

      store.dispatch(new ProductActions.LoadProductSuccess(product, scope));
      expect(result).toBeTruthy();
    });
  });

  describe('getSelectedProductErrorFactory', () => {
    it('should return error information', () => {
      let result: boolean;

      subscription = store
        .pipe(select(ProductSelectors.getSelectedProductErrorFactory(code)))
        .subscribe((value) => (result = value));

      expect(result).toBeFalsy();

      store.dispatch(new ProductActions.LoadProductFail(code, undefined));
      expect(result).toBeTruthy();
    });

    it('should return error information for scope', () => {
      let result: boolean;

      subscription = store
        .pipe(
          select(ProductSelectors.getSelectedProductErrorFactory(code, scope))
        )
        .subscribe((value) => (result = value));

      expect(result).toBeFalsy();

      store.dispatch(
        new ProductActions.LoadProductFail(code, undefined, scope)
      );
      expect(result).toBeTruthy();
    });
  });
});
