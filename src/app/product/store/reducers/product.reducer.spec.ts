import * as fromProduct from './product.reducer';
import * as fromActions from '../actions/product.action';

fdescribe('Product Reducer', () => {
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
});
