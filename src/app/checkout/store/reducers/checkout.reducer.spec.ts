import * as fromCheckout from './checkout.reducer';
import * as fromActions from './../actions';

describe('Checkout reducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const { initialState } = fromCheckout;
      const action = {} as any;
      const state = fromCheckout.reducer(undefined, action);

      expect(state).toBe(initialState);
    });
  });

  describe('ADD_DELIVERY_ADDRESS_SUCCESS action', () => {
    it('should add delivery address', () => {
      const address: any = {
        id: 'testAddressId',
        firstName: 'John',
        lastName: 'Doe',
        titleCode: 'mr',
        line1: 'Toyosaki 2 create on cart'
      };

      const { initialState } = fromCheckout;

      const action = new fromActions.AddDeliveryAddressSuccess(address);
      const state = fromCheckout.reducer(initialState, action);
      expect(state.address).toEqual(address);
    });
  });
});
