import {
  CheckoutConfig,
  CheckoutStepType,
  DeliveryModePreferences,
} from '@spartacus/checkout/root';

export const defaultB2bCheckoutConfig: CheckoutConfig = {
  checkout: {
    steps: [
      {
        id: 'paymentType',
        name: 'checkoutProgress.methodOfPayment',
        routeName: 'checkoutPaymentType',
        type: [CheckoutStepType.PAYMENT_TYPE],
      },
      {
        id: 'shippingAddress',
        name: 'checkoutProgress.shippingAddress',
        routeName: 'checkoutShippingAddress',
        type: [CheckoutStepType.SHIPPING_ADDRESS],
      },
      {
        id: 'deliveryMode',
        name: 'checkoutProgress.deliveryMode',
        routeName: 'checkoutDeliveryMode',
        type: [CheckoutStepType.DELIVERY_MODE],
      },
      {
        id: 'paymentDetails',
        name: 'checkoutProgress.paymentDetails',
        routeName: 'checkoutPaymentDetails',
        type: [CheckoutStepType.PAYMENT_DETAILS],
      },
      {
        id: 'reviewOrder',
        name: 'checkoutProgress.reviewOrder',
        routeName: 'checkoutReviewOrder',
        type: [CheckoutStepType.REVIEW_ORDER],
      },
    ],
    express: false,
    defaultDeliveryMode: [DeliveryModePreferences.FREE],
    guest: false,
  },
};
