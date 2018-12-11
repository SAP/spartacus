import * as fromProduct from './product.reducer';
import * as fromActions from '../actions/product.action';

describe('Product Reducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const { initialState } = fromProduct;
      const action = {} as any;
      const state = fromProduct.reducer(undefined, action);

      expect(state).toBe(initialState);
    });
  });

  describe('LOAD_PRODUCT_SUCCESS action', () => {
    it('should populate product details entities', () => {
      const product = {
        code: 'testCode',
        name: 'testProduct'
      };

      const { initialState } = fromProduct;
      const action = new fromActions.LoadProductSuccess(product);
      const state = fromProduct.reducer(initialState, action);

      expect(state.entities).toEqual({ testCode: product });
    });
  });

  describe('LOAD_PRODUCT_FAIL action', () => {
    it('should return an empty product', () => {
      const code = 'testCode';
      const product = {
        code: code,
        name: 'testProduct'
      };

      const { initialState } = fromProduct;

      const successAction = new fromActions.LoadProductSuccess(product);
      const stateAfterSuccess = fromProduct.reducer(
        initialState,
        successAction
      );
      expect(stateAfterSuccess.entities).toBeTruthy();
      expect(stateAfterSuccess.entities[code]).toBe(product);

      const failAction = new fromActions.LoadProductFail(product);
      const stateAfterFail = fromProduct.reducer(stateAfterSuccess, failAction);
      expect(stateAfterFail.entities[code]).toEqual({});
    });
  });
});
