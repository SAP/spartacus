import * as fromAction from '../actions/checkout.action';

const userId = 'testUserId';
const cartId = 'testCartId';

const address: any = {
  firstName: 'John',
  lastName: 'Doe',
  titleCode: 'mr',
  line1: 'Toyosaki 2 create on cart'
};

describe('Add Delivery Address to Cart Actions', () => {
  describe('AddDeliveryAddress', () => {
    it('should create the action', () => {
      const payload = {
        userId: userId,
        cartId: cartId,
        address: address
      };

      const action = new fromAction.AddDeliveryAddress(payload);
      expect({ ...action }).toEqual({
        type: fromAction.ADD_DELIVERY_ADDRESS,
        payload: payload
      });
    });
  });

  describe('AddDeliveryAddressFail', () => {
    it('should create the action', () => {
      const error = 'anError';
      const action = new fromAction.AddDeliveryAddressFail(error);

      expect({ ...action }).toEqual({
        type: fromAction.ADD_DELIVERY_ADDRESS_FAIL,
        payload: error
      });
    });
  });

  describe('AddDeliveryAddressSuccess', () => {
    it('should create the action', () => {
      const action = new fromAction.AddDeliveryAddressSuccess(address);
      expect({ ...action }).toEqual({
        type: fromAction.ADD_DELIVERY_ADDRESS_SUCCESS,
        payload: address
      });
    });
  });
});
