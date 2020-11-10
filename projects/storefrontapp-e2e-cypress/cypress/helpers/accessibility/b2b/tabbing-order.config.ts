import { TabbingOrderConfig, TabbingOrderTypes } from '../tabbing-order.model';
import * as orderApprovalSampleData from '../../../sample-data/b2b-order-approval';

const paymentTypeRadio = {
  value: 'paymentType',
  type: TabbingOrderTypes.RADIO,
};

const backButton = { value: 'Back', type: TabbingOrderTypes.BUTTON };
const continueButton = { value: 'Continue', type: TabbingOrderTypes.BUTTON };

export const tabbingOrderConfig: TabbingOrderConfig = {
  paymentMethod: [
    {
      value: 'poNumber',
      type: TabbingOrderTypes.GENERIC_INPUT,
    },
    paymentTypeRadio,
    paymentTypeRadio,
    backButton,
    continueButton,
  ],
  shippingAddressNew: [
    { value: 'Method ofPayment', type: TabbingOrderTypes.LINK },
    { value: 'isocode', type: TabbingOrderTypes.NG_SELECT },
    { value: 'titleCode', type: TabbingOrderTypes.NG_SELECT },
    { value: 'firstName', type: TabbingOrderTypes.FORM_FIELD },
    { value: 'lastName', type: TabbingOrderTypes.FORM_FIELD },
    { value: 'line1', type: TabbingOrderTypes.FORM_FIELD },
    { value: 'line2', type: TabbingOrderTypes.FORM_FIELD },
    { value: 'town', type: TabbingOrderTypes.FORM_FIELD },
    { value: 'postalCode', type: TabbingOrderTypes.FORM_FIELD },
    { value: 'isocode', type: TabbingOrderTypes.NG_SELECT },
    { value: 'phone', type: TabbingOrderTypes.FORM_FIELD },
    backButton,
    continueButton,
  ],
  shippingAddressExisting: [
    { value: 'Method ofPayment', type: TabbingOrderTypes.LINK },
    { value: 'Add New Address', type: TabbingOrderTypes.BUTTON },
    {
      value: 'Ship to this address',
      type: TabbingOrderTypes.LINK,
    },
    backButton,
    continueButton,
  ],
  shippingAddressAccount: [
    { value: 'Method ofPayment', type: TabbingOrderTypes.LINK },
    { value: 'Cost Center', type: TabbingOrderTypes.SELECT },
    {
      value: 'Ship to this address',
      type: TabbingOrderTypes.LINK,
    },
    backButton,
    continueButton,
  ],
  deliveryMode: [
    { value: 'Method ofPayment', type: TabbingOrderTypes.LINK },
    { value: 'ShippingAddress', type: TabbingOrderTypes.LINK },
    { value: 'deliveryModeId', type: TabbingOrderTypes.RADIO },
    { value: 'deliveryModeId', type: TabbingOrderTypes.RADIO },
    backButton,
    continueButton,
  ],
  paymentDetailsCard: [
    { value: 'Method ofPayment', type: TabbingOrderTypes.LINK },
    { value: 'ShippingAddress', type: TabbingOrderTypes.LINK },
    { value: 'DeliveryMode', type: TabbingOrderTypes.LINK },
    { type: TabbingOrderTypes.GENERIC_INPUT },
    {
      value: 'accountHolderName',
      type: TabbingOrderTypes.FORM_FIELD,
    },
    { value: 'cardNumber', type: TabbingOrderTypes.FORM_FIELD },
    { type: TabbingOrderTypes.GENERIC_INPUT },
    { type: TabbingOrderTypes.GENERIC_INPUT },
    { value: 'cvn', type: TabbingOrderTypes.FORM_FIELD },
    {
      value: 'Set as default',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: 'Same as shipping address',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    backButton,
    continueButton,
  ],
  paymentDetailsBillingAddress: [
    { type: TabbingOrderTypes.GENERIC_CHECKBOX },
    { type: TabbingOrderTypes.GENERIC_INPUT },
    { value: 'firstName', type: TabbingOrderTypes.FORM_FIELD },
    { value: 'lastName', type: TabbingOrderTypes.FORM_FIELD },
    { value: 'line1', type: TabbingOrderTypes.FORM_FIELD },
    { value: 'line2', type: TabbingOrderTypes.FORM_FIELD },
    { value: 'town', type: TabbingOrderTypes.FORM_FIELD },
    { value: 'postalCode', type: TabbingOrderTypes.FORM_FIELD },
    { value: 'isocodeShort', type: TabbingOrderTypes.NG_SELECT },
  ],
  checkoutReviewOrder: [
    { value: 'Method ofPayment', type: TabbingOrderTypes.LINK },
    { value: 'ShippingAddress', type: TabbingOrderTypes.LINK },
    { value: 'DeliveryMode', type: TabbingOrderTypes.LINK },
    { value: 'PaymentDetails', type: TabbingOrderTypes.LINK },
    {
      value: '/powertools-spa/en/USD/checkout/payment-type',
      type: TabbingOrderTypes.IMG_LINK,
    },
    {
      value: '/powertools-spa/en/USD/checkout/payment-type',
      type: TabbingOrderTypes.IMG_LINK,
    },
    {
      value: '/powertools-spa/en/USD/checkout/payment-details',
      type: TabbingOrderTypes.IMG_LINK,
    },
    {
      value: '/powertools-spa/en/USD/checkout/shipping-address',
      type: TabbingOrderTypes.IMG_LINK,
    },
    {
      value: '/powertools-spa/en/USD/checkout/delivery-mode',
      type: TabbingOrderTypes.IMG_LINK,
    },
    {
      value: 'Cordless screwdriver 2436',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'orderType',
      type: TabbingOrderTypes.RADIO,
    },
    {
      value: 'orderType',
      type: TabbingOrderTypes.RADIO,
    },
    {
      value: 'I am confirming that I have read and agreed with',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: 'Terms & Conditions',
      type: TabbingOrderTypes.LINK,
    },
    { value: 'Place Order', type: TabbingOrderTypes.BUTTON },
  ],
  checkoutReviewOrderAccount: [
    { value: 'Method ofPayment', type: TabbingOrderTypes.LINK },
    { value: 'ShippingAddress', type: TabbingOrderTypes.LINK },
    { value: 'DeliveryMode', type: TabbingOrderTypes.LINK },
    {
      value: '/powertools-spa/en/USD/checkout/payment-type',
      type: TabbingOrderTypes.IMG_LINK,
    },
    {
      value: '/powertools-spa/en/USD/checkout/payment-type',
      type: TabbingOrderTypes.IMG_LINK,
    },
    {
      value: '/powertools-spa/en/USD/checkout/shipping-address',
      type: TabbingOrderTypes.IMG_LINK,
    },
    {
      value: '/powertools-spa/en/USD/checkout/shipping-address',
      type: TabbingOrderTypes.IMG_LINK,
    },
    {
      value: '/powertools-spa/en/USD/checkout/delivery-mode',
      type: TabbingOrderTypes.IMG_LINK,
    },
    {
      value: 'Cordless screwdriver 2436',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'orderType',
      type: TabbingOrderTypes.RADIO,
    },
    {
      value: 'orderType',
      type: TabbingOrderTypes.RADIO,
    },
    {
      value: 'I am confirming that I have read and agreed with',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: 'Terms & Conditions',
      type: TabbingOrderTypes.LINK,
    },
    { value: 'Place Order', type: TabbingOrderTypes.BUTTON },
  ],
  orderApprovalList: [
    {
      type: TabbingOrderTypes.NG_SELECT,
    },
    {
      value:
        orderApprovalSampleData.approvalOrderList.orderApprovals[0].order.code,
      type: TabbingOrderTypes.LINK,
    },
    {
      value: orderApprovalSampleData.none,
      type: TabbingOrderTypes.LINK,
    },
    {
      value:
        orderApprovalSampleData.approvalOrderList.orderApprovals[0].order
          .orgCustomer.name,
      type: TabbingOrderTypes.LINK,
    },
    {
      value: orderApprovalSampleData.orderPlacedDate,
      type: TabbingOrderTypes.LINK,
    },
    {
      value: orderApprovalSampleData.statusPendingApproval,
      type: TabbingOrderTypes.LINK,
    },
    {
      value:
        orderApprovalSampleData.approvalOrderList.orderApprovals[0].order
          .totalPrice.formattedValue,
      type: TabbingOrderTypes.LINK,
    },
    {
      type: TabbingOrderTypes.NG_SELECT,
    },
  ],
  orderApprovalDetail: [
    {
      value: 'Back To List',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: ' Reject Order... ',
      type: TabbingOrderTypes.BUTTON,
    },
    {
      value: ' Approve Order... ',
      type: TabbingOrderTypes.BUTTON,
    },
    {
      value: 'Angle Grinder RT-AG 115',
      type: TabbingOrderTypes.LINK,
    },
  ],
  orderApprovalForm: [
    {
      value: 'comment',
      type: TabbingOrderTypes.FORM_FIELD,
    },
    {
      value: 'Cancel',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Approve',
      type: TabbingOrderTypes.BUTTON,
    },
    {
      value: 'Angle Grinder RT-AG 115',
      type: TabbingOrderTypes.LINK,
    },
  ],
  orderRejectionForm: [
    {
      value: 'comment',
      type: TabbingOrderTypes.FORM_FIELD,
    },
    {
      value: 'Cancel',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Reject',
      type: TabbingOrderTypes.BUTTON,
    },
    {
      value: 'Angle Grinder RT-AG 115',
      type: TabbingOrderTypes.LINK,
    },
  ],
};
