import { TabbingOrderConfig, TabbingOrderTypes } from '../tabbing-order.model';

export const tabbingOrderConfig: TabbingOrderConfig = {
  paymentMethod: [
    {
      value: 'poNumber',
      type: TabbingOrderTypes.GENERIC_INPUT,
    },
    {
      value: 'paymentType',
      type: TabbingOrderTypes.RADIO,
    },
    {
      value: 'paymentType',
      type: TabbingOrderTypes.RADIO,
    },
    { value: 'Back', type: TabbingOrderTypes.BUTTON },
    { value: 'Continue', type: TabbingOrderTypes.BUTTON },
  ],
  shippingAddressNew: [
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
    { value: 'Back to cart', type: TabbingOrderTypes.BUTTON },
    { value: 'Continue', type: TabbingOrderTypes.BUTTON },
  ],
  shippingAddressExisting: [
    { value: 'Add New Address', type: TabbingOrderTypes.BUTTON },
    {
      value: 'Ship to this address',
      type: TabbingOrderTypes.LINK,
    },
    { value: 'Back to cart', type: TabbingOrderTypes.BUTTON },
    { value: 'Continue', type: TabbingOrderTypes.BUTTON },
  ],
  deliveryMode: [
    { value: 'Shipping address', type: TabbingOrderTypes.LINK },
    { value: 'deliveryModeId', type: TabbingOrderTypes.RADIO },
    { value: 'deliveryModeId', type: TabbingOrderTypes.RADIO },
    { value: 'Back', type: TabbingOrderTypes.BUTTON },
    { value: 'Continue', type: TabbingOrderTypes.BUTTON },
  ],
};
