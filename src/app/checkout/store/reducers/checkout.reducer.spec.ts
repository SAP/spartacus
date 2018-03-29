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

  describe('LOAD_SUPPORTED_DELIVERY_MODES_SUCCESS action', () => {
    it('should load all supported delivery modes from cart', () => {
      const modes: any = {
        deliveryModes: [{ code: 'code1' }, { code: 'code2' }]
      };

      const entities = {
        code1: modes.deliveryModes[0],
        code2: modes.deliveryModes[1]
      };

      const { initialState } = fromCheckout;

      const action = new fromActions.LoadSupportedDeliveryModesSuccess(modes);
      const state = fromCheckout.reducer(initialState, action);
      expect(state.deliveryMode.supported).toEqual(entities);
    });
  });

  describe('SET_DELIVERY_MODE_SUCCESS action', () => {
    it('should set delivery mode for cart', () => {
      const { initialState } = fromCheckout;

      const action = new fromActions.SetDeliveryModeSuccess(
        'testSelectedModeId'
      );
      const state = fromCheckout.reducer(initialState, action);
      expect(state.deliveryMode.selected).toEqual('testSelectedModeId');
    });
  });
});
