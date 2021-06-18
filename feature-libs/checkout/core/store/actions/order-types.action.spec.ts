import { ORDER_TYPE } from '@spartacus/core';
import { CheckoutActions } from './index';

describe('Order Types Action', () => {
  describe('SetOrderType action', () => {
    it('should create the action', () => {
      const payload: ORDER_TYPE = ORDER_TYPE.PLACE_ORDER;
      const action = new CheckoutActions.SetOrderType(payload);

      expect({ ...action }).toEqual({
        type: CheckoutActions.SET_ORDER_TYPE,
        payload,
      });
    });
  });
});
