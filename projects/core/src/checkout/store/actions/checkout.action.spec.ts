import { Address } from '../../../model/address.model';
import { PaymentDetails } from '../../../model/cart.model';
import { DeliveryMode, Order } from '../../../model/order.model';
import { CheckoutActions } from '../actions/index';

const userId = 'testUserId';
const cartId = 'testCartId';
const selectedModeId = 'selectedModeId';
const paymentDetails: PaymentDetails = {
  id: 'mockPaymentDetails',
};

const orderDetails: Order = {
  code: 'testOrder123',
};

const address: Address = {
  firstName: 'John',
  lastName: 'Doe',
  titleCode: 'mr',
  line1: 'Toyosaki 2 create on cart',
  town: 'Montreal',
  postalCode: 'L6M1P9',
  country: { isocode: 'CA' },
};

const modes: DeliveryMode[] = [{ code: 'code1' }, { code: 'code2' }];

describe('Checkout Actions', () => {
  describe('AddDeliveryAddress', () => {
    it('should create the action', () => {
      const payload = {
        userId: userId,
        cartId: cartId,
        address: address,
      };

      const action = new CheckoutActions.AddDeliveryAddress(payload);
      expect({ ...action }).toEqual({
        type: CheckoutActions.ADD_DELIVERY_ADDRESS,
        payload: payload,
      });
    });
  });

  describe('AddDeliveryAddressFail', () => {
    it('should create the action', () => {
      const error = 'anError';
      const action = new CheckoutActions.AddDeliveryAddressFail(error);

      expect({ ...action }).toEqual({
        type: CheckoutActions.ADD_DELIVERY_ADDRESS_FAIL,
        payload: error,
      });
    });
  });

  describe('AddDeliveryAddressSuccess', () => {
    it('should create the action', () => {
      const action = new CheckoutActions.AddDeliveryAddressSuccess(address);
      expect({ ...action }).toEqual({
        type: CheckoutActions.ADD_DELIVERY_ADDRESS_SUCCESS,
        payload: address,
      });
    });
  });

  describe('SetDeliveryAddress', () => {
    it('should create the action', () => {
      const payload = {
        userId: userId,
        cartId: cartId,
        address: address,
      };

      const action = new CheckoutActions.SetDeliveryAddress(payload);
      expect({ ...action }).toEqual({
        type: CheckoutActions.SET_DELIVERY_ADDRESS,
        payload: payload,
      });
    });
  });

  describe('SetDeliveryAddressFail', () => {
    it('should create the action', () => {
      const error = 'anError';
      const action = new CheckoutActions.SetDeliveryAddressFail(error);

      expect({ ...action }).toEqual({
        type: CheckoutActions.SET_DELIVERY_ADDRESS_FAIL,
        payload: error,
      });
    });
  });

  describe('SetDeliveryAddressSuccess', () => {
    it('should create the action', () => {
      const action = new CheckoutActions.SetDeliveryAddressSuccess(address);
      expect({ ...action }).toEqual({
        type: CheckoutActions.SET_DELIVERY_ADDRESS_SUCCESS,
        payload: address,
      });
    });
  });

  describe('Load Supported Delivery Modes from Cart', () => {
    describe('LoadSupportedDeliveryModes', () => {
      it('should create the action', () => {
        const payload = {
          userId: userId,
          cartId: cartId,
        };

        const action = new CheckoutActions.LoadSupportedDeliveryModes(payload);
        expect({ ...action }).toEqual({
          type: CheckoutActions.LOAD_SUPPORTED_DELIVERY_MODES,
          payload: payload,
        });
      });
    });

    describe('LoadSupportedDeliveryModesFail', () => {
      it('should create the action', () => {
        const error = 'anError';
        const action = new CheckoutActions.LoadSupportedDeliveryModesFail(
          error
        );

        expect({ ...action }).toEqual({
          type: CheckoutActions.LOAD_SUPPORTED_DELIVERY_MODES_FAIL,
          payload: error,
        });
      });
    });

    describe('LoadSupportedDeliveryModesSuccess', () => {
      it('should create the action', () => {
        const action = new CheckoutActions.LoadSupportedDeliveryModesSuccess(
          modes
        );
        expect({ ...action }).toEqual({
          type: CheckoutActions.LOAD_SUPPORTED_DELIVERY_MODES_SUCCESS,
          payload: modes,
        });
      });
    });
  });

  describe('Set Delivery Mode for Cart', () => {
    describe('SetDeliveryMode', () => {
      it('should create the action', () => {
        const payload = {
          userId: userId,
          cartId: cartId,
          selectedModeId: selectedModeId,
        };

        const action = new CheckoutActions.SetDeliveryMode(payload);
        expect({ ...action }).toEqual({
          type: CheckoutActions.SET_DELIVERY_MODE,
          payload: payload,
        });
      });
    });

    describe('SetDeliveryModeFail', () => {
      it('should create the action', () => {
        const error = 'anError';
        const action = new CheckoutActions.SetDeliveryModeFail(error);

        expect({ ...action }).toEqual({
          type: CheckoutActions.SET_DELIVERY_MODE_FAIL,
          payload: error,
        });
      });
    });

    describe('SetDeliveryModeSuccess', () => {
      it('should create the action', () => {
        const action = new CheckoutActions.SetDeliveryModeSuccess(
          selectedModeId
        );
        expect({ ...action }).toEqual({
          type: CheckoutActions.SET_DELIVERY_MODE_SUCCESS,
          payload: selectedModeId,
        });
      });
    });
  });

  describe('Create Payment Details for Cart', () => {
    describe('CreatePaymentDetails', () => {
      it('should create the action', () => {
        const payload = {
          userId: userId,
          cartId: cartId,
          paymentDetails: paymentDetails,
        };

        const action = new CheckoutActions.CreatePaymentDetails(payload);
        expect({ ...action }).toEqual({
          type: CheckoutActions.CREATE_PAYMENT_DETAILS,
          payload: payload,
        });
      });
    });

    describe('CreatePaymentDetailsFail', () => {
      it('should create the action', () => {
        const error = 'anError';
        const action = new CheckoutActions.CreatePaymentDetailsFail(error);

        expect({ ...action }).toEqual({
          type: CheckoutActions.CREATE_PAYMENT_DETAILS_FAIL,
          payload: error,
        });
      });
    });

    describe('CreatePaymentDetailsSuccess', () => {
      it('should create the action', () => {
        const action = new CheckoutActions.CreatePaymentDetailsSuccess(
          paymentDetails
        );
        expect({ ...action }).toEqual({
          type: CheckoutActions.CREATE_PAYMENT_DETAILS_SUCCESS,
          payload: paymentDetails,
        });
      });
    });
  });

  describe('Set Payment Details for Cart', () => {
    describe('SetPaymentDetails', () => {
      it('should create the action', () => {
        const payload = {
          userId: userId,
          cartId: cartId,
          paymentDetails: paymentDetails,
        };

        const action = new CheckoutActions.SetPaymentDetails(payload);
        expect({ ...action }).toEqual({
          type: CheckoutActions.SET_PAYMENT_DETAILS,
          payload: payload,
        });
      });
    });

    describe('SetPaymentDetailsFail', () => {
      it('should create the action', () => {
        const error = 'anError';
        const action = new CheckoutActions.SetPaymentDetailsFail(error);

        expect({ ...action }).toEqual({
          type: CheckoutActions.SET_PAYMENT_DETAILS_FAIL,
          payload: error,
        });
      });
    });

    describe('SetPaymentDetailsSuccess', () => {
      it('should create the action', () => {
        const action = new CheckoutActions.SetPaymentDetailsSuccess(
          paymentDetails
        );
        expect({ ...action }).toEqual({
          type: CheckoutActions.SET_PAYMENT_DETAILS_SUCCESS,
          payload: paymentDetails,
        });
      });
    });
  });

  describe('Place Order', () => {
    describe('PlaceOrder', () => {
      it('should create the action', () => {
        const payload = {
          userId: userId,
          cartId: cartId,
        };

        const action = new CheckoutActions.PlaceOrder(payload);
        expect({ ...action }).toEqual({
          type: CheckoutActions.PLACE_ORDER,
          payload: payload,
        });
      });
    });

    describe('PlaceOrderFail', () => {
      it('should create the action', () => {
        const error = 'anError';
        const action = new CheckoutActions.PlaceOrderFail(error);

        expect({ ...action }).toEqual({
          type: CheckoutActions.PLACE_ORDER_FAIL,
          payload: error,
        });
      });
    });

    describe('PlaceOrderSuccess', () => {
      it('should create the action', () => {
        const action = new CheckoutActions.PlaceOrderSuccess(orderDetails);
        expect({ ...action }).toEqual({
          type: CheckoutActions.PLACE_ORDER_SUCCESS,
          payload: orderDetails,
        });
      });
    });
  });

  describe('Clear Checkout Step', () => {
    describe('ClearCheckoutStep', () => {
      it('should create the action', () => {
        const action = new CheckoutActions.ClearCheckoutStep(2);
        expect({ ...action }).toEqual({
          type: CheckoutActions.CLEAR_CHECKOUT_STEP,
          payload: 2,
        });
      });
    });
  });

  describe('Clear Checkout Data', () => {
    describe('ClearCheckoutData', () => {
      it('should create the action', () => {
        const action = new CheckoutActions.ClearCheckoutData();
        expect({ ...action }).toEqual({
          type: CheckoutActions.CLEAR_CHECKOUT_DATA,
        });
      });
    });
  });

  describe('Clear Supported Delivery Modes Data', () => {
    describe('ClearSupportedDeliveryModes', () => {
      it('should create the action', () => {
        const action = new CheckoutActions.ClearSupportedDeliveryModes();
        expect({ ...action }).toEqual({
          type: CheckoutActions.CLEAR_SUPPORTED_DELIVERY_MODES,
        });
      });
    });
  });
});
