import * as fromAction from '../actions/checkout.action';
import { DeliveryModeList, Address, PaymentDetails, Order } from '../../../occ';

const userId = 'testUserId';
const cartId = 'testCartId';
const selectedModeId = 'selectedModeId';
const paymentDetails: PaymentDetails = {
  id: 'mockPaymentDetails'
};

const orderDetails: Order = {
  code: 'testOrder123'
};

const address: Address = {
  firstName: 'John',
  lastName: 'Doe',
  titleCode: 'mr',
  line1: 'Toyosaki 2 create on cart',
  town: 'Montreal',
  postalCode: 'L6M1P9',
  country: { isocode: 'CA' }
};

const modes: DeliveryModeList = {
  deliveryModes: [{ code: 'code1' }, { code: 'code2' }]
};

describe('Checkout Actions', () => {
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

  describe('SetDeliveryAddress', () => {
    it('should create the action', () => {
      const payload = {
        userId: userId,
        cartId: cartId,
        address: address
      };

      const action = new fromAction.SetDeliveryAddress(payload);
      expect({ ...action }).toEqual({
        type: fromAction.SET_DELIVERY_ADDRESS,
        payload: payload
      });
    });
  });

  describe('SetDeliveryAddressFail', () => {
    it('should create the action', () => {
      const error = 'anError';
      const action = new fromAction.SetDeliveryAddressFail(error);

      expect({ ...action }).toEqual({
        type: fromAction.SET_DELIVERY_ADDRESS_FAIL,
        payload: error
      });
    });
  });

  describe('SetDeliveryAddressSuccess', () => {
    it('should create the action', () => {
      const action = new fromAction.SetDeliveryAddressSuccess(address);
      expect({ ...action }).toEqual({
        type: fromAction.SET_DELIVERY_ADDRESS_SUCCESS,
        payload: address
      });
    });
  });

  describe('Load Supported Delivery Modes from Cart', () => {
    describe('LoadSupportedDeliveryModes', () => {
      it('should create the action', () => {
        const payload = {
          userId: userId,
          cartId: cartId
        };

        const action = new fromAction.LoadSupportedDeliveryModes(payload);
        expect({ ...action }).toEqual({
          type: fromAction.LOAD_SUPPORTED_DELIVERY_MODES,
          payload: payload
        });
      });
    });

    describe('LoadSupportedDeliveryModesFail', () => {
      it('should create the action', () => {
        const error = 'anError';
        const action = new fromAction.LoadSupportedDeliveryModesFail(error);

        expect({ ...action }).toEqual({
          type: fromAction.LOAD_SUPPORTED_DELIVERY_MODES_FAIL,
          payload: error
        });
      });
    });

    describe('LoadSupportedDeliveryModesSuccess', () => {
      it('should create the action', () => {
        const action = new fromAction.LoadSupportedDeliveryModesSuccess(modes);
        expect({ ...action }).toEqual({
          type: fromAction.LOAD_SUPPORTED_DELIVERY_MODES_SUCCESS,
          payload: modes
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
          selectedModeId: selectedModeId
        };

        const action = new fromAction.SetDeliveryMode(payload);
        expect({ ...action }).toEqual({
          type: fromAction.SET_DELIVERY_MODE,
          payload: payload
        });
      });
    });

    describe('SetDeliveryModeFail', () => {
      it('should create the action', () => {
        const error = 'anError';
        const action = new fromAction.SetDeliveryModeFail(error);

        expect({ ...action }).toEqual({
          type: fromAction.SET_DELIVERY_MODE_FAIL,
          payload: error
        });
      });
    });

    describe('SetDeliveryModeSuccess', () => {
      it('should create the action', () => {
        const action = new fromAction.SetDeliveryModeSuccess(selectedModeId);
        expect({ ...action }).toEqual({
          type: fromAction.SET_DELIVERY_MODE_SUCCESS,
          payload: selectedModeId
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
          paymentDetails: paymentDetails
        };

        const action = new fromAction.CreatePaymentDetails(payload);
        expect({ ...action }).toEqual({
          type: fromAction.CREATE_PAYMENT_DETAILS,
          payload: payload
        });
      });
    });

    describe('CreatePaymentDetailsFail', () => {
      it('should create the action', () => {
        const error = 'anError';
        const action = new fromAction.CreatePaymentDetailsFail(error);

        expect({ ...action }).toEqual({
          type: fromAction.CREATE_PAYMENT_DETAILS_FAIL,
          payload: error
        });
      });
    });

    describe('CreatePaymentDetailsSuccess', () => {
      it('should create the action', () => {
        const action = new fromAction.CreatePaymentDetailsSuccess(
          paymentDetails
        );
        expect({ ...action }).toEqual({
          type: fromAction.CREATE_PAYMENT_DETAILS_SUCCESS,
          payload: paymentDetails
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
          paymentDetails: paymentDetails
        };

        const action = new fromAction.SetPaymentDetails(payload);
        expect({ ...action }).toEqual({
          type: fromAction.SET_PAYMENT_DETAILS,
          payload: payload
        });
      });
    });

    describe('SetPaymentDetailsFail', () => {
      it('should create the action', () => {
        const error = 'anError';
        const action = new fromAction.SetPaymentDetailsFail(error);

        expect({ ...action }).toEqual({
          type: fromAction.SET_PAYMENT_DETAILS_FAIL,
          payload: error
        });
      });
    });

    describe('SetPaymentDetailsSuccess', () => {
      it('should create the action', () => {
        const action = new fromAction.SetPaymentDetailsSuccess(paymentDetails);
        expect({ ...action }).toEqual({
          type: fromAction.SET_PAYMENT_DETAILS_SUCCESS,
          payload: paymentDetails
        });
      });
    });
  });

  describe('Place Order', () => {
    describe('PlaceOrder', () => {
      it('should create the action', () => {
        const payload = {
          userId: userId,
          cartId: cartId
        };

        const action = new fromAction.PlaceOrder(payload);
        expect({ ...action }).toEqual({
          type: fromAction.PLACE_ORDER,
          payload: payload
        });
      });
    });

    describe('PlaceOrderFail', () => {
      it('should create the action', () => {
        const error = 'anError';
        const action = new fromAction.PlaceOrderFail(error);

        expect({ ...action }).toEqual({
          type: fromAction.PLACE_ORDER_FAIL,
          payload: error
        });
      });
    });

    describe('PlaceOrderSuccess', () => {
      it('should create the action', () => {
        const action = new fromAction.PlaceOrderSuccess(orderDetails);
        expect({ ...action }).toEqual({
          type: fromAction.PLACE_ORDER_SUCCESS,
          payload: orderDetails
        });
      });
    });
  });

  describe('Clear Checkout Step', () => {
    describe('ClearCheckoutStep', () => {
      it('should create the action', () => {
        const action = new fromAction.ClearCheckoutStep(2);
        expect({ ...action }).toEqual({
          type: fromAction.CLEAR_CHECKOUT_STEP,
          payload: 2
        });
      });
    });
  });

  describe('Clear Checkout Data', () => {
    describe('ClearCheckoutData', () => {
      it('should create the action', () => {
        const action = new fromAction.ClearCheckoutData();
        expect({ ...action }).toEqual({
          type: fromAction.CLEAR_CHECKOUT_DATA
        });
      });
    });
  });

  describe('Clear Supported Delivery Modes Data', () => {
    describe('ClearSupportedDeliveryModes', () => {
      it('should create the action', () => {
        const action = new fromAction.ClearSupportedDeliveryModes();
        expect({ ...action }).toEqual({
          type: fromAction.CLEAR_SUPPORTED_DELIVERY_MODES
        });
      });
    });
  });
});
