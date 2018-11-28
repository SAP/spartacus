import * as fromProduct from './product.action';

describe('Product Actions', () => {
  describe('LoadProduct Actions', () => {
    describe('LoadProduct', () => {
      it('should create an action', () => {
        const productCode = 'testCode';
        const action = new fromProduct.LoadProduct(productCode);
        expect({ ...action }).toEqual({
          type: fromProduct.LOAD_PRODUCT,
          payload: productCode,
          meta: {
            reload: false
          }
        });
      });
    });

    describe('LoadProductFail', () => {
      it('should create an action', () => {
        const payload = { message: 'Load Error' };
        const action = new fromProduct.LoadProductFail(payload);

        expect({ ...action }).toEqual({
          type: fromProduct.LOAD_PRODUCT_FAIL,
          payload
        });
      });
    });

    describe('LoadProductSuccess', () => {
      it('should create an action', () => {
        const payload = { products: [{ code: '123' }] };
        const action = new fromProduct.LoadProductSuccess(payload);

        expect({ ...action }).toEqual({
          type: fromProduct.LOAD_PRODUCT_SUCCESS,
          payload
        });
      });
    });
  });
});
