import * as fromCheckout from './checkout.reducer';
import * as fromActions from './../actions';
import { Address } from '../../models/address-model';
import { emptyAddress } from '../reducers/checkout.reducer';

describe('Checkout reducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const { initialState } = fromCheckout;
      const action = {} as any;
      const state = fromCheckout.reducer(undefined, action);

      expect(state).toBe(initialState);
    });
  });

  describe('ADD_DELIVERY_ADDRESS_SUCCESS or SET_DELIVERY_ADDRESS_SUCCESS action', () => {
    it('should add delivery address', () => {
      const address: Address = {
        id: 'testAddressId',
        firstName: 'John',
        lastName: 'Doe',
        titleCode: 'mr',
        line1: 'Toyosaki 2 create on cart',
        town: 'Montreal',
        postalCode: 'L6M1P9',
        country: { isocode: 'CA' }
      };

      const { initialState } = fromCheckout;

      const addDeliveryAddressAction = new fromActions.AddDeliveryAddressSuccess(
        address
      );
      const addDeliveryAddressState = fromCheckout.reducer(
        initialState,
        addDeliveryAddressAction
      );
      expect(addDeliveryAddressState.address).toEqual(address);

      const setDeliveryAddressAction = new fromActions.SetDeliveryAddressSuccess(
        address
      );
      const setDeliveryAddressState = fromCheckout.reducer(
        initialState,
        setDeliveryAddressAction
      );
      expect(setDeliveryAddressState.address).toEqual(address);
    });
  });

  describe('LOAD_SUPPORTED_DELIVERY_MODES_SUCCESS action', () => {
    it('should load all supported delivery modes from cart', () => {
      const modes: { deliveryModes: { code: string }[] } = {
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

  describe('CREATE_PAYMENT_DETAILS_SUCCESS or SET_PAYMENT_DETAILS_SUCCESS action', () => {
    it('should create payment details for cart', () => {
      const { initialState } = fromCheckout;
      const paymentDetails = 'mockPaymentDetails';

      const createPaymentDetailsAction = new fromActions.CreatePaymentDetailsSuccess(
        paymentDetails
      );
      const createPaymentDetailsState = fromCheckout.reducer(
        initialState,
        createPaymentDetailsAction
      );
      expect(createPaymentDetailsState.paymentDetails).toEqual(paymentDetails);

      const setPaymentDetailsAction = new fromActions.SetPaymentDetailsSuccess(
        paymentDetails
      );
      const setPaymentDetailsState = fromCheckout.reducer(
        initialState,
        setPaymentDetailsAction
      );
      expect(setPaymentDetailsState.paymentDetails).toEqual(paymentDetails);
    });
  });

  describe('CREATE_PAYMENT_DETAILS_FAIL action', () => {
    it('should create payment details for cart', () => {
      const { initialState } = fromCheckout;
      const errorPayload = { hasError: 'true' };

      const action = new fromActions.CreatePaymentDetailsFail(errorPayload);
      const state = fromCheckout.reducer(initialState, action);
      expect(state.paymentDetails).toEqual(errorPayload);
    });
  });

  describe('PLACE_ORDER_SUCCESS action', () => {
    it('should place order', () => {
      const { initialState } = fromCheckout;
      const orderDetails = 'mockOrderDetails';

      const action = new fromActions.PlaceOrderSuccess(orderDetails);
      const state = fromCheckout.reducer(initialState, action);
      expect(state.orderDetails).toEqual(orderDetails);
    });
  });

  describe('CLEAR_CHECKOUT_DATA action', () => {
    it('should clear checkout data', () => {
      const { initialState } = fromCheckout;

      const action = new fromActions.ClearCheckoutData();
      const state = fromCheckout.reducer(initialState, action);
      expect(state).toEqual(initialState);
    });
  });

  describe('CLEAR_CHECKOUT_STEP action', () => {
    it('should clear step number 1', () => {
      const { initialState } = fromCheckout;

      const action = new fromActions.ClearCheckoutStep(1);
      const state = fromCheckout.reducer(initialState, action);
      expect(state.address).toEqual(emptyAddress);
    });
  });

  describe('CLEAR_CHECKOUT_STEP action', () => {
    it('should clear step number 2', () => {
      const { initialState } = fromCheckout;
      const delivMode = { supported: {}, selected: '' };

      const action = new fromActions.ClearCheckoutStep(2);
      const state = fromCheckout.reducer(initialState, action);
      expect(state.deliveryMode).toEqual(delivMode);
    });
  });

  describe('CLEAR_CHECKOUT_STEP action', () => {
    it('should clear step number 3', () => {
      const { initialState } = fromCheckout;
      const paymentDets = {};

      const action = new fromActions.ClearCheckoutStep(3);
      const state = fromCheckout.reducer(initialState, action);
      expect(state.paymentDetails).toEqual(paymentDets);
    });
  });

  describe('CLEAR_CHECKOUT_STEP action', () => {
    it('should clear invalid step number', () => {
      const { initialState } = fromCheckout;

      const action = new fromActions.ClearCheckoutStep(4);
      const state = fromCheckout.reducer(initialState, action);
      expect(state).toEqual(initialState);
    });
  });

  describe('CLEAR_SUPPORTED_DELIVERY_MODES action', () => {
    it('should clear supported delivery modes', () => {
      const { initialState } = fromCheckout;

      const action = new fromActions.ClearSupportedDeliveryModes();
      const state = fromCheckout.reducer(initialState, action);
      expect(state.deliveryMode).toEqual(initialState.deliveryMode);
    });
  });

  describe('CLEAR_MISCS_DATA action', () => {
    it('should clear mics data', () => {
      const { initialState } = fromCheckout;

      const action = new fromActions.ClearMiscsData();
      const state = fromCheckout.reducer(initialState, action);
      expect(state.deliveryMode).toEqual(initialState.deliveryMode);
    });
  });
});
