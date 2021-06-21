import { CheckoutActions } from '../actions/index';

const userId = 'testUserId';
const cartId = 'testCartId';

describe('Payment Types Actions', () => {
  describe('Set payment type for Cart', () => {
    describe('SetPaymentType', () => {
      it('should create the action', () => {
        const payload = {
          userId,
          cartId,
          typeCode: 'typeCode',
          poNumber: 'poNumber',
        };

        const action = new CheckoutActions.SetPaymentType(payload);
        expect({ ...action }).toEqual({
          type: CheckoutActions.SET_PAYMENT_TYPE,
          payload,
        });
      });
    });

    describe('SetPaymentTypeFail', () => {
      it('should create the action', () => {
        const error = 'anError';
        const action = new CheckoutActions.SetPaymentTypeFail(error);

        expect({ ...action }).toEqual({
          type: CheckoutActions.SET_PAYMENT_TYPE_FAIL,
          payload: error,
        });
      });
    });

    describe('SetPaymentTypeSuccess', () => {
      it('should create the action', () => {
        const cart = { code: 'test' };
        const action = new CheckoutActions.SetPaymentTypeSuccess(cart);
        expect({ ...action }).toEqual({
          type: CheckoutActions.SET_PAYMENT_TYPE_SUCCESS,
          payload: cart,
        });
      });
    });
  });
});
