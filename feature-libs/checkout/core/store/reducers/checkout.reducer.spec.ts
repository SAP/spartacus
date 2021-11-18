import {
  Address,
  DeliveryMode,
  Order,
  PaymentDetails,
  ReplenishmentOrder,
} from '@spartacus/core';
import { CheckoutDetails } from '../../models/checkout.model';
import { CheckoutActions } from './../actions/index';
import * as fromCheckout from './checkout.reducer';

describe('Checkout reducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const { initialState } = fromCheckout;
      const action = {} as any;
      const state = fromCheckout.reducer(undefined, action);

      expect(state).toBe(initialState);
    });
  });

  describe('SET_PAYMENT_TYPE_SUCCESS action', () => {
    it('should set po number to cart', () => {
      const { initialState } = fromCheckout;

      const action = new CheckoutActions.SetPaymentTypeSuccess({
        code: 'testCart',
        purchaseOrderNumber: 'testNumber',
      });
      const state = fromCheckout.reducer(initialState, action);
      expect(state.poNumber.po).toEqual('testNumber');
    });
  });

  describe('SET_COST_CENTER_SUCCESS action', () => {
    it('should set cost center to cart', () => {
      const { initialState } = fromCheckout;

      const action = new CheckoutActions.SetCostCenterSuccess(
        'testCostCenterId'
      );
      const state = fromCheckout.reducer(initialState, action);
      expect(state.poNumber.costCenter).toEqual('testCostCenterId');
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
        country: { isocode: 'CA' },
      };

      const { initialState } = fromCheckout;

      const addDeliveryAddressAction =
        new CheckoutActions.AddDeliveryAddressSuccess(address);
      const addDeliveryAddressState = fromCheckout.reducer(
        initialState,
        addDeliveryAddressAction
      );
      expect(addDeliveryAddressState.address).toEqual(address);

      const setDeliveryAddressAction =
        new CheckoutActions.SetDeliveryAddressSuccess(address);
      const setDeliveryAddressState = fromCheckout.reducer(
        initialState,
        setDeliveryAddressAction
      );
      expect(setDeliveryAddressState.address).toEqual(address);
    });
  });

  describe('LOAD_SUPPORTED_DELIVERY_MODES_SUCCESS action', () => {
    it('should load all supported delivery modes from cart', () => {
      const modes: DeliveryMode[] = [{ code: 'code1' }, { code: 'code2' }];

      const entities = {
        code1: modes[0],
        code2: modes[1],
      };

      const { initialState } = fromCheckout;

      const action = new CheckoutActions.LoadSupportedDeliveryModesSuccess(
        modes
      );
      const state = fromCheckout.reducer(initialState, action);
      expect(state.deliveryMode.supported).toEqual(entities);
    });
  });

  describe('SET_DELIVERY_MODE_SUCCESS action', () => {
    it('should set delivery mode for cart', () => {
      const { initialState } = fromCheckout;

      const action = new CheckoutActions.SetDeliveryModeSuccess(
        'testSelectedModeId'
      );
      const state = fromCheckout.reducer(initialState, action);
      expect(state.deliveryMode.selected).toEqual('testSelectedModeId');
    });
  });

  describe('CREATE_PAYMENT_DETAILS_SUCCESS or SET_PAYMENT_DETAILS_SUCCESS action', () => {
    it('should create payment details for cart', () => {
      const { initialState } = fromCheckout;
      const paymentDetails: PaymentDetails = {
        id: 'mockPaymentDetails',
      };

      const createPaymentDetailsAction =
        new CheckoutActions.CreatePaymentDetailsSuccess(paymentDetails);
      const createPaymentDetailsState = fromCheckout.reducer(
        initialState,
        createPaymentDetailsAction
      );
      expect(createPaymentDetailsState.paymentDetails).toEqual(paymentDetails);

      const setPaymentDetailsAction =
        new CheckoutActions.SetPaymentDetailsSuccess(paymentDetails);
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

      const action = new CheckoutActions.CreatePaymentDetailsFail(errorPayload);
      const state = fromCheckout.reducer(initialState, action);
      expect(state.paymentDetails as any).toEqual(errorPayload);
    });
  });

  describe('PLACE_ORDER_SUCCESS action', () => {
    it('should place order', () => {
      const { initialState } = fromCheckout;
      const orderDetails: Order = {
        code: 'testOrder123',
      };

      const action = new CheckoutActions.PlaceOrderSuccess(orderDetails);
      const state = fromCheckout.reducer(initialState, action);
      expect(state.orderDetails).toEqual(orderDetails);
    });
  });

  describe('SCHEDULE_REPLENISHMENT_ORDER_SUCCESS action', () => {
    it('should schedule a replenishment order', () => {
      const { initialState } = fromCheckout;
      const replenishmentOrderDetails: ReplenishmentOrder = {
        active: true,
        purchaseOrderNumber: 'test-po',
        replenishmentOrderCode: 'test-repl-order',
      };

      const action = new CheckoutActions.ScheduleReplenishmentOrderSuccess(
        replenishmentOrderDetails
      );
      const state = fromCheckout.reducer(initialState, action);
      expect(state.orderDetails).toEqual(replenishmentOrderDetails);
    });
  });

  describe('CLEAR_CHECKOUT_DATA action', () => {
    it('should clear checkout data', () => {
      const { initialState } = fromCheckout;

      const action = new CheckoutActions.ClearCheckoutData();
      const state = fromCheckout.reducer(initialState, action);
      expect(state).toEqual(initialState);
    });
  });

  describe('CLEAR_CHECKOUT_STEP action', () => {
    it('should clear step number 1', () => {
      const { initialState } = fromCheckout;

      const action = new CheckoutActions.ClearCheckoutStep(1);
      const state = fromCheckout.reducer(initialState, action);
      expect(state.address).toEqual({});
    });
  });

  describe('CLEAR_CHECKOUT_STEP action', () => {
    it('should clear step number 2', () => {
      const { initialState } = fromCheckout;
      const delivMode = { supported: {}, selected: '' };

      const action = new CheckoutActions.ClearCheckoutStep(2);
      const state = fromCheckout.reducer(initialState, action);
      expect(state.deliveryMode).toEqual(delivMode);
    });
  });

  describe('CLEAR_CHECKOUT_STEP action', () => {
    it('should clear step number 3', () => {
      const { initialState } = fromCheckout;
      const paymentDets = {};

      const action = new CheckoutActions.ClearCheckoutStep(3);
      const state = fromCheckout.reducer(initialState, action);
      expect(state.paymentDetails).toEqual(paymentDets);
    });
  });

  describe('CLEAR_CHECKOUT_STEP action', () => {
    it('should clear invalid step number', () => {
      const { initialState } = fromCheckout;

      const action = new CheckoutActions.ClearCheckoutStep(4);
      const state = fromCheckout.reducer(initialState, action);
      expect(state).toEqual(initialState);
    });
  });

  describe('CLEAR_SUPPORTED_DELIVERY_MODES action', () => {
    it('should clear supported delivery modes', () => {
      const { initialState } = fromCheckout;

      const action = new CheckoutActions.ClearSupportedDeliveryModes();
      const state = fromCheckout.reducer(initialState, action);
      expect(state.deliveryMode).toEqual(initialState.deliveryMode);
    });
  });

  describe('CHECKOUT_CLEAR_MISCS_DATA action', () => {
    it('should clear mics data', () => {
      const { initialState } = fromCheckout;

      const action = new CheckoutActions.CheckoutClearMiscsData();
      const state = fromCheckout.reducer(initialState, action);
      expect(state.deliveryMode).toEqual(initialState.deliveryMode);
    });
  });

  describe('LOAD_CHECKOUT_DETAILS_SUCCESS action', () => {
    it('should load all details data', () => {
      const { initialState } = fromCheckout;
      const code = 'code';
      const firstName = 'firstName';
      const accountHolderName = 'accountHolderName';
      const details: CheckoutDetails = {
        deliveryAddress: {
          firstName,
        },
        deliveryMode: {
          code,
        },
        paymentInfo: {
          accountHolderName,
        },
      };

      const action = new CheckoutActions.LoadCheckoutDetailsSuccess(details);
      const state = fromCheckout.reducer(initialState, action);
      expect(state.address.firstName).toEqual(firstName);
      expect(state.deliveryMode.selected).toEqual(code);
      expect(state.paymentDetails.accountHolderName).toEqual(accountHolderName);
    });
  });

  describe('CLEAR_CHECKOUT_DELIVERY_ADDRESS action', () => {
    it('should clear supported delivery modes', () => {
      const { initialState } = fromCheckout;
      const stateWithAddress = {
        ...initialState,
        address: { firstName: 'firstName' },
      };
      const payload = {
        userId: 'userId',
        cartId: 'cartId',
      };

      const action = new CheckoutActions.ClearCheckoutDeliveryAddress(payload);
      const state = fromCheckout.reducer(stateWithAddress, action);
      expect(state.address).toEqual(initialState.address);
    });
  });

  describe('CLEAR_CHECKOUT_DELIVERY_MODE action', () => {
    it('should clear supported delivery modes', () => {
      const { initialState } = fromCheckout;
      const stateWithDeliveryMode = {
        ...initialState,
        deliveryMode: {
          supported: {},
          selected: 'deliveryMode1',
        },
      };
      const payload = {
        userId: 'userId',
        cartId: 'cartId',
      };

      const action = new CheckoutActions.ClearCheckoutDeliveryMode(payload);
      const state = fromCheckout.reducer(stateWithDeliveryMode, action);
      expect(state.deliveryMode).toEqual(initialState.deliveryMode);
    });
  });
});
