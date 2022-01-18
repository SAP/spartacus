import * as orderApprovalSampleData from '../../../sample-data/b2b-order-approval';
import * as savedCartSampleData from '../../../sample-data/b2b-saved-cart';
import { TabbingOrderConfig, TabbingOrderTypes } from '../tabbing-order.model';

const paymentTypeRadio = {
  value: 'paymentType',
  type: TabbingOrderTypes.RADIO,
};

const backButton = { value: 'Back', type: TabbingOrderTypes.BUTTON };
const continueButton = { value: 'Continue', type: TabbingOrderTypes.BUTTON };

const accountReviewOrderGeneral = [
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
];

const acceptAndSubmitOrder = [
  {
    value: 'I am confirming that I have read and agreed with',
    type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
  },
  {
    value: 'Terms & Conditions',
    type: TabbingOrderTypes.LINK,
  },
  { value: 'Place Order', type: TabbingOrderTypes.BUTTON },
];

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
    { type: TabbingOrderTypes.GENERIC_ELEMENT },
    {
      value: 'Ship to this address',
      type: TabbingOrderTypes.GENERIC_BUTTON,
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
    ...accountReviewOrderGeneral,
    ...acceptAndSubmitOrder,
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
  replenishmentOrderAccountCheckoutReviewOrder: [
    ...accountReviewOrderGeneral,
    { value: '1', type: TabbingOrderTypes.SELECT },
    { value: 'Day(s)', type: TabbingOrderTypes.SELECT },
    { type: TabbingOrderTypes.GENERIC_INPUT },
    ...acceptAndSubmitOrder,
  ],
  cart: [
    {
      value: 'Saved Carts',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Save Cart For Later',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: savedCartSampleData.products[0].name,
      type: TabbingOrderTypes.LINK,
    },
    { type: TabbingOrderTypes.GENERIC_INPUT },
    { value: '+', type: TabbingOrderTypes.BUTTON },
    { value: 'Remove', type: TabbingOrderTypes.LINK },
    { value: 'Import Products', type: TabbingOrderTypes.LINK },
    { value: 'Export to CSV', type: TabbingOrderTypes.LINK },
    { type: TabbingOrderTypes.CX_PROGRESS_BUTTON },
    {
      value: 'Proceed to Checkout',
      type: TabbingOrderTypes.BUTTON,
    },
    {
      value: 'couponCode',
      type: TabbingOrderTypes.FORM_FIELD,
    },
    {
      value: 'Apply',
      type: TabbingOrderTypes.BUTTON,
    },
    {
      value: 'productCode',
      type: TabbingOrderTypes.FORM_FIELD,
    },
    { type: TabbingOrderTypes.GENERIC_INPUT },
    {
      value: 'Add',
      type: TabbingOrderTypes.BUTTON,
    },
  ],
  savedCartModal: [
    {
      type: TabbingOrderTypes.CX_ICON,
    },
    {
      type: TabbingOrderTypes.GENERIC_INPUT,
    },
    {
      type: TabbingOrderTypes.TEXT_AREA,
    },
    {
      value: 'Cancel',
      type: TabbingOrderTypes.BUTTON,
    },
    {
      value: 'Save',
      type: TabbingOrderTypes.BUTTON,
    },
  ],
  savedCartListing: [
    {
      type: TabbingOrderTypes.LINK,
    },
    {
      type: TabbingOrderTypes.LINK,
    },
    {
      type: TabbingOrderTypes.LINK,
    },

    {
      value: '1',
      type: TabbingOrderTypes.LINK,
    },

    {
      value: '$35.00',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Make Cart Active',
      type: TabbingOrderTypes.LINK,
    },
    { value: 'Import Products', type: TabbingOrderTypes.LINK },
  ],
  savedCartDetails: [
    {
      type: TabbingOrderTypes.CX_ICON,
    },
    {
      value: 'Cordless screwdriver 2436',
      type: TabbingOrderTypes.LINK,
    },
    { type: TabbingOrderTypes.GENERIC_INPUT },
    { value: '+', type: TabbingOrderTypes.BUTTON },
    { value: 'Remove', type: TabbingOrderTypes.LINK },
    { value: 'Import Products', type: TabbingOrderTypes.LINK },
    { value: 'Export to CSV', type: TabbingOrderTypes.LINK },
    { value: 'Delete Saved Cart', type: TabbingOrderTypes.BUTTON },
    { value: 'Make cart active', type: TabbingOrderTypes.BUTTON },
  ],
  quickOrder: [
    {
      value: 'product',
      type: TabbingOrderTypes.FORM_FIELD,
    },
    {
      value: savedCartSampleData.products[0].name,
      type: TabbingOrderTypes.LINK,
    },
    { type: TabbingOrderTypes.GENERIC_INPUT },
    { value: '+', type: TabbingOrderTypes.BUTTON },
    { value: 'Remove', type: TabbingOrderTypes.LINK },
    { value: 'Empty list', type: TabbingOrderTypes.BUTTON },
    { value: 'Add', type: TabbingOrderTypes.BUTTON },
  ],
  quickOrderCart: [
    {
      value: 'Saved Carts',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Save Cart For Later',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: savedCartSampleData.products[0].name,
      type: TabbingOrderTypes.LINK,
    },
    { type: TabbingOrderTypes.GENERIC_INPUT },
    { value: '+', type: TabbingOrderTypes.BUTTON },
    { value: 'Remove', type: TabbingOrderTypes.LINK },
    { value: 'Import Products', type: TabbingOrderTypes.LINK },
    { value: 'Export to CSV', type: TabbingOrderTypes.LINK },
    { type: TabbingOrderTypes.CX_PROGRESS_BUTTON },
    {
      value: 'Proceed to Checkout',
      type: TabbingOrderTypes.BUTTON,
    },
    {
      value: 'couponCode',
      type: TabbingOrderTypes.FORM_FIELD,
    },
    {
      value: 'Apply',
      type: TabbingOrderTypes.BUTTON,
    },
    {
      value: 'productCode',
      type: TabbingOrderTypes.FORM_FIELD,
    },
    { type: TabbingOrderTypes.GENERIC_INPUT },
    {
      value: 'Add',
      type: TabbingOrderTypes.BUTTON,
    },
  ],
};
