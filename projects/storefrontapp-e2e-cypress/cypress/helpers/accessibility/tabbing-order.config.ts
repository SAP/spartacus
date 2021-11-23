import { TabbingOrderConfig, TabbingOrderTypes } from './tabbing-order.model';

export const tabbingOrderConfig: TabbingOrderConfig = {
  productConfigurationPage: [
    {
      type: TabbingOrderTypes.GENERIC_ELEMENT,
    },
    {
      value: 'Configuration',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Overview',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Basics',
      type: TabbingOrderTypes.BUTTON,
    },
    {
      value: 'attributeRadioButtonForm',
      type: TabbingOrderTypes.RADIO,
    },
    {
      value: 'attributeRadioButtonForm',
      type: TabbingOrderTypes.RADIO,
    },
    {
      value: 'attributeRadioButtonForm',
      type: TabbingOrderTypes.RADIO,
    },
    {
      value: 'attributeRadioButtonForm',
      type: TabbingOrderTypes.RADIO,
    },
    {
      value: 'Next',
      type: TabbingOrderTypes.BUTTON,
    },
    {
      value: 'Add to Cart',
      type: TabbingOrderTypes.BUTTON,
    },
  ],

  productConfigurationOverview: [
    {
      value: 'show more',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Configuration',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Overview',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Resolve Issues',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Add to Cart',
      type: TabbingOrderTypes.BUTTON,
    },
  ],
  saveForLater: [
    {
      value: 'FUN Flash Single Use Camera, 27+12 pic',
      type: TabbingOrderTypes.LINK,
    },
    { value: 'Move To Cart', type: TabbingOrderTypes.LINK },
    { value: 'Remove', type: TabbingOrderTypes.LINK },
  ],
  notificationPreference: [
    { value: 'Email', type: TabbingOrderTypes.CHECKBOX_WITH_LABEL },
  ],
  updateEmail: [
    { value: 'email', type: TabbingOrderTypes.FORM_FIELD },
    { value: 'confirmEmail', type: TabbingOrderTypes.FORM_FIELD },
    { value: 'password', type: TabbingOrderTypes.FORM_FIELD },
    { value: 'Cancel', type: TabbingOrderTypes.BUTTON },
    { value: 'Save', type: TabbingOrderTypes.BUTTON },
  ],
  wishlist: [
    {
      value: 'FUN Flash Single Use Camera, 27+12 pic',
      type: TabbingOrderTypes.LINK,
    },
    { value: 'Add to cart', type: TabbingOrderTypes.BUTTON },
    { value: 'Remove', type: TabbingOrderTypes.LINK },
  ],
  closeAccount: [
    { value: 'Cancel', type: TabbingOrderTypes.LINK },
    { value: 'CLOSE MY ACCOUNT', type: TabbingOrderTypes.BUTTON },
  ],
  personalDetails: [
    { value: 'titleCode', type: TabbingOrderTypes.FORM_FIELD },
    { value: 'firstName', type: TabbingOrderTypes.FORM_FIELD },
    { value: 'lastName', type: TabbingOrderTypes.FORM_FIELD },
    { value: 'Cancel', type: TabbingOrderTypes.BUTTON },
    { value: 'Save', type: TabbingOrderTypes.BUTTON },
  ],
  paymentDetails: [
    { value: 'Delete', type: TabbingOrderTypes.LINK },
    { value: 'Set as default', type: TabbingOrderTypes.LINK },
    { value: 'Delete', type: TabbingOrderTypes.LINK },
    { value: 'Set as default', type: TabbingOrderTypes.LINK },
    { value: 'Delete', type: TabbingOrderTypes.LINK },
  ],
  addressBookForm: [
    {
      value: 'isocode',
      type: TabbingOrderTypes.NG_SELECT,
    },
    {
      value: 'titleCode',
      type: TabbingOrderTypes.NG_SELECT,
    },
    {
      value: 'firstName',
      type: TabbingOrderTypes.FORM_FIELD,
    },
    {
      value: 'lastName',
      type: TabbingOrderTypes.FORM_FIELD,
    },
    {
      value: 'line1',
      type: TabbingOrderTypes.FORM_FIELD,
    },
    {
      value: 'line2',
      type: TabbingOrderTypes.FORM_FIELD,
    },
    {
      value: 'town',
      type: TabbingOrderTypes.FORM_FIELD,
    },
    {
      value: 'postalCode',
      type: TabbingOrderTypes.FORM_FIELD,
    },
    {
      value: 'isocode',
      type: TabbingOrderTypes.NG_SELECT,
    },
    {
      value: 'phone',
      type: TabbingOrderTypes.FORM_FIELD,
    },
    {
      value: 'defaultAddress',
      type: TabbingOrderTypes.FORM_FIELD,
    },
    {
      value: 'Back to address list',
      type: TabbingOrderTypes.BUTTON,
    },
    {
      value: 'Add address',
      type: TabbingOrderTypes.BUTTON,
    },
  ],
  consentManagement: [
    {
      type: TabbingOrderTypes.LINK,
      value: 'Clear all',
    },
    {
      type: TabbingOrderTypes.LINK,
      value: 'Select all',
    },
    {
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
      value: 'I approve to this sample MARKETING consent',
    },
    {
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
      value: 'Allow SAP Commerce Cloud, Context-Driven Services tracking',
    },
    {
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
      value: 'I approve to this sample STORE USER INFORMATION consent',
    },
  ],
  addToCart: [
    {
      type: TabbingOrderTypes.GENERIC_BUTTON,
    },
    {
      value: 'FUN Flash Single Use Camera, 27+12 pic',
      type: TabbingOrderTypes.LINK,
    },
    { type: TabbingOrderTypes.GENERIC_INPUT },
    { value: 'Remove', type: TabbingOrderTypes.LINK },
    { value: 'view cart', type: TabbingOrderTypes.BUTTON },
    { value: 'proceed to checkout', type: TabbingOrderTypes.BUTTON },
  ],
  shippingAddressNew: [
    { value: 'isocode', type: TabbingOrderTypes.GENERIC_INPUT },
    { value: 'titleCode', type: TabbingOrderTypes.GENERIC_INPUT },
    { value: 'firstName', type: TabbingOrderTypes.FORM_FIELD },
    { value: 'lastName', type: TabbingOrderTypes.FORM_FIELD },
    { value: 'line1', type: TabbingOrderTypes.FORM_FIELD },
    { value: 'line2', type: TabbingOrderTypes.FORM_FIELD },
    { value: 'town', type: TabbingOrderTypes.FORM_FIELD },
    { value: 'postalCode', type: TabbingOrderTypes.FORM_FIELD },
    { value: 'isocode', type: TabbingOrderTypes.GENERIC_INPUT },
    { value: 'phone', type: TabbingOrderTypes.FORM_FIELD },
    {
      value: 'Set as default',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
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
  orderHistoryNoOrders: [
    { value: 'Start Shopping', type: TabbingOrderTypes.BUTTON },
  ],
  paymentDetailsCard: [
    { value: 'Shipping address', type: TabbingOrderTypes.LINK },
    { value: 'Delivery mode', type: TabbingOrderTypes.LINK },
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
    { value: 'Back', type: TabbingOrderTypes.BUTTON },
    { value: 'Continue', type: TabbingOrderTypes.BUTTON },
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
  orderDetails: [
    {
      value: 'Alpha 350',
      type: TabbingOrderTypes.LINK,
    },
  ],
  orderDetailsCancelAction: [
    {
      value: 'Back',
      type: TabbingOrderTypes.BUTTON,
    },
    {
      value: 'Cancel Items',
      type: TabbingOrderTypes.LINK,
    },
  ],
  orderDetailsReturnAction: [
    {
      value: 'Back',
      type: TabbingOrderTypes.BUTTON,
    },
    {
      value: 'Request a Return',
      type: TabbingOrderTypes.LINK,
    },
  ],
  cancelOrReturnOrder: [
    {
      value: 'Back',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Continue',
      type: TabbingOrderTypes.BUTTON,
    },
    {
      value: 'Set all quantities to maximum',
      type: TabbingOrderTypes.BUTTON,
    },
    {
      type: TabbingOrderTypes.GENERIC_INPUT,
    },
    { value: '+', type: TabbingOrderTypes.BUTTON },
    {
      value: 'Back',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Continue',
      type: TabbingOrderTypes.BUTTON,
    },
  ],
  confirmCancelOrReturnOrder: [
    {
      value: 'Back',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Submit Request',
      type: TabbingOrderTypes.BUTTON,
    },
    {
      value: 'Back',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Submit Request',
      type: TabbingOrderTypes.BUTTON,
    },
  ],
  returnRequestList: [
    {
      type: TabbingOrderTypes.NG_SELECT,
    },
    {
      type: TabbingOrderTypes.LINK,
    },
    {
      type: TabbingOrderTypes.LINK,
    },
    {
      type: TabbingOrderTypes.NG_SELECT,
    },
  ],
  returnRequestDetails: [
    {
      value: 'Back',
      type: TabbingOrderTypes.BUTTON,
    },
    {
      value: 'Cancel Return Request',
      type: TabbingOrderTypes.BUTTON,
    },
  ],
  checkoutReviewOrder: [
    { value: 'Shipping address', type: TabbingOrderTypes.LINK },
    { value: 'Delivery mode', type: TabbingOrderTypes.LINK },
    { value: 'Payment details', type: TabbingOrderTypes.LINK },
    { value: 'Edit shipping address', type: TabbingOrderTypes.LINK },
    { value: 'Edit shipping method', type: TabbingOrderTypes.LINK },
    { value: 'Edit payment method', type: TabbingOrderTypes.LINK },
    {
      value: 'FUN Flash Single Use Camera, 27+12 pic',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'I am confirming that I have read and agreed with',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    { value: 'Terms & Conditions', type: TabbingOrderTypes.LINK },
    { value: 'Place Order', type: TabbingOrderTypes.BUTTON },
  ],
  productListDesktop: [
    {
      value: 'Brands',
      type: TabbingOrderTypes.LINK,
    },
    {
      type: TabbingOrderTypes.GENERIC_ELEMENT_WITH_VALUE,
      value: 'Stores',
    },
    {
      type: TabbingOrderTypes.GENERIC_ELEMENT_WITH_VALUE,
      value: 'Price',
    },
    {
      type: TabbingOrderTypes.GENERIC_ELEMENT_WITH_VALUE,
      value: 'Resolution',
    },
    {
      type: TabbingOrderTypes.GENERIC_ELEMENT_WITH_VALUE,
      value: 'Mounting',
    },
    {
      type: TabbingOrderTypes.GENERIC_ELEMENT_WITH_VALUE,
      value: 'Megapixels',
    },
    {
      type: TabbingOrderTypes.GENERIC_ELEMENT_WITH_VALUE,
      value: 'Lens type',
    },
    {
      type: TabbingOrderTypes.GENERIC_ELEMENT_WITH_VALUE,
      value: 'Color',
    },
    {
      type: TabbingOrderTypes.GENERIC_ELEMENT_WITH_VALUE,
      value: 'Brand',
    },
    {
      type: TabbingOrderTypes.GENERIC_ELEMENT_WITH_VALUE,
      value: 'Category',
    },
    {
      type: TabbingOrderTypes.GENERIC_INPUT,
    },
    {
      value: '«',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: '1',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: '3',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: '»',
      type: TabbingOrderTypes.LINK,
    },
    {
      type: TabbingOrderTypes.CX_PRODUCT_VIEW,
    },
    {
      value: ['.cx-product-name', 0],
      type: TabbingOrderTypes.INDEX_OF_ELEMENT,
    },
    { value: 'Add to cart', type: TabbingOrderTypes.BUTTON },
    {
      value: ['.cx-product-name', 1],
      type: TabbingOrderTypes.INDEX_OF_ELEMENT,
    },
    { value: 'Add to cart', type: TabbingOrderTypes.BUTTON },
    {
      value: ['.cx-product-name', 2],
      type: TabbingOrderTypes.INDEX_OF_ELEMENT,
    },
    { value: 'Add to cart', type: TabbingOrderTypes.BUTTON },
    {
      value: ['.cx-product-name', 3],
      type: TabbingOrderTypes.INDEX_OF_ELEMENT,
    },
    { value: 'Add to cart', type: TabbingOrderTypes.BUTTON },
    {
      value: ['.cx-product-name', 4],
      type: TabbingOrderTypes.INDEX_OF_ELEMENT,
    },
    { value: 'Add to cart', type: TabbingOrderTypes.BUTTON },
    {
      value: ['.cx-product-name', 5],
      type: TabbingOrderTypes.INDEX_OF_ELEMENT,
    },
    { value: 'Add to cart', type: TabbingOrderTypes.BUTTON },
    {
      value: ['.cx-product-name', 6],
      type: TabbingOrderTypes.INDEX_OF_ELEMENT,
    },
    { value: 'Add to cart', type: TabbingOrderTypes.BUTTON },
    {
      value: ['.cx-product-name', 7],
      type: TabbingOrderTypes.INDEX_OF_ELEMENT,
    },
    { value: 'Add to cart', type: TabbingOrderTypes.BUTTON },
    {
      value: ['.cx-product-name', 8],
      type: TabbingOrderTypes.INDEX_OF_ELEMENT,
    },
    { value: 'Add to cart', type: TabbingOrderTypes.BUTTON },
    {
      value: ['.cx-product-name', 9],
      type: TabbingOrderTypes.INDEX_OF_ELEMENT,
    },
    { value: 'Add to cart', type: TabbingOrderTypes.BUTTON },
    {
      type: TabbingOrderTypes.GENERIC_INPUT,
    },
    {
      value: '«',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: '1',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: '3',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: '»',
      type: TabbingOrderTypes.LINK,
    },
    {
      type: TabbingOrderTypes.CX_PRODUCT_VIEW,
    },
  ],
  productListMobile: [
    {
      value: 'Filter by',
      type: TabbingOrderTypes.BUTTON,
    },
    {
      value: 'Brands',
      type: TabbingOrderTypes.LINK,
    },
    {
      type: TabbingOrderTypes.GENERIC_INPUT,
    },
    {
      value: '«',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: '1',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: '3',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: '»',
      type: TabbingOrderTypes.LINK,
    },
    {
      type: TabbingOrderTypes.CX_PRODUCT_VIEW,
    },
    {
      value: ['.cx-product-name', 0],
      type: TabbingOrderTypes.INDEX_OF_ELEMENT,
    },
    { value: 'Add to cart', type: TabbingOrderTypes.BUTTON },
    {
      value: ['.cx-product-name', 1],
      type: TabbingOrderTypes.INDEX_OF_ELEMENT,
    },
    { value: 'Add to cart', type: TabbingOrderTypes.BUTTON },
    {
      value: ['.cx-product-name', 2],
      type: TabbingOrderTypes.INDEX_OF_ELEMENT,
    },
    { value: 'Add to cart', type: TabbingOrderTypes.BUTTON },
    {
      value: ['.cx-product-name', 3],
      type: TabbingOrderTypes.INDEX_OF_ELEMENT,
    },
    { value: 'Add to cart', type: TabbingOrderTypes.BUTTON },
    {
      value: ['.cx-product-name', 4],
      type: TabbingOrderTypes.INDEX_OF_ELEMENT,
    },
    { value: 'Add to cart', type: TabbingOrderTypes.BUTTON },
    {
      value: ['.cx-product-name', 5],
      type: TabbingOrderTypes.INDEX_OF_ELEMENT,
    },
    { value: 'Add to cart', type: TabbingOrderTypes.BUTTON },
    {
      value: ['.cx-product-name', 6],
      type: TabbingOrderTypes.INDEX_OF_ELEMENT,
    },
    { value: 'Add to cart', type: TabbingOrderTypes.BUTTON },
    {
      value: ['.cx-product-name', 7],
      type: TabbingOrderTypes.INDEX_OF_ELEMENT,
    },
    { value: 'Add to cart', type: TabbingOrderTypes.BUTTON },
    {
      value: ['.cx-product-name', 8],
      type: TabbingOrderTypes.INDEX_OF_ELEMENT,
    },
    { value: 'Add to cart', type: TabbingOrderTypes.BUTTON },
    {
      value: ['.cx-product-name', 9],
      type: TabbingOrderTypes.INDEX_OF_ELEMENT,
    },
    { value: 'Add to cart', type: TabbingOrderTypes.BUTTON },
    {
      type: TabbingOrderTypes.GENERIC_INPUT,
    },
    {
      value: '«',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: '1',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: '3',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: '»',
      type: TabbingOrderTypes.LINK,
    },
    {
      type: TabbingOrderTypes.CX_PRODUCT_VIEW,
    },
  ],
  productListMobileFilters: [
    {
      type: TabbingOrderTypes.GENERIC_BUTTON,
    },
    {
      type: TabbingOrderTypes.GENERIC_ELEMENT_WITH_VALUE,
      value: 'Stores',
    },
    {
      type: TabbingOrderTypes.GENERIC_ELEMENT_WITH_VALUE,
      value: 'Price',
    },
    {
      type: TabbingOrderTypes.GENERIC_ELEMENT_WITH_VALUE,
      value: 'Resolution',
    },
    {
      type: TabbingOrderTypes.GENERIC_ELEMENT_WITH_VALUE,
      value: 'Mounting',
    },
    {
      type: TabbingOrderTypes.GENERIC_ELEMENT_WITH_VALUE,
      value: 'Megapixels',
    },
    {
      type: TabbingOrderTypes.GENERIC_ELEMENT_WITH_VALUE,
      value: 'Lens type',
    },
    {
      type: TabbingOrderTypes.GENERIC_ELEMENT_WITH_VALUE,
      value: 'Color',
    },
    {
      type: TabbingOrderTypes.GENERIC_ELEMENT_WITH_VALUE,
      value: 'Brand',
    },
    {
      type: TabbingOrderTypes.GENERIC_ELEMENT_WITH_VALUE,
      value: 'Category',
    },
  ],
  myInterests: [
    {
      type: TabbingOrderTypes.GENERIC_INPUT,
    },
    {
      value: 'Secure Digital Card 2GB',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'REMOVE',
      type: TabbingOrderTypes.GENERIC_BUTTON,
    },
    {
      type: TabbingOrderTypes.GENERIC_INPUT,
    },
  ],
  coupons: [
    { value: 'couponCode', type: TabbingOrderTypes.FORM_FIELD },
    { value: 'Apply', type: TabbingOrderTypes.BUTTON },
  ],
  appliedCoupons: [{ type: TabbingOrderTypes.CX_ICON }],
  myCoupons: [
    {
      type: TabbingOrderTypes.NG_SELECT,
    },
    {
      value: 'Notification',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    { value: 'Find ', type: TabbingOrderTypes.BUTTON },
    {
      type: TabbingOrderTypes.NG_SELECT,
    },
    {
      value: 'Notification Channels',
      type: TabbingOrderTypes.LINK,
    },
  ],
  storeFinder: [
    {
      type: TabbingOrderTypes.GENERIC_INPUT,
    },
    {
      type: TabbingOrderTypes.CX_ICON,
    },
    {
      value: 'Use my location',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'View all stores',
      type: TabbingOrderTypes.LINK,
    },
    {
      type: TabbingOrderTypes.LINK,
    },
  ],
  storeFinderSearchResults: [
    {
      type: TabbingOrderTypes.GENERIC_INPUT,
    },
    {
      type: TabbingOrderTypes.CX_ICON,
    },
    {
      value: 'Use my location',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'View all stores',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: '«',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: '1',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Yokohama Hotel JAL City Kannai Yokohama',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Get Directions',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Chiba',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Get Directions',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Yokosuka',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Get Directions',
      type: TabbingOrderTypes.LINK,
    },
    {
      type: TabbingOrderTypes.GENERIC_ELEMENT,
    },
    {
      type: TabbingOrderTypes.LINK,
    },
  ],
  storeFinderStoreDetails: [
    {
      value: 'Back to list',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Get Directions',
      type: TabbingOrderTypes.LINK,
    },
  ],
  storeFinderCountriesList: [
    {
      type: TabbingOrderTypes.GENERIC_INPUT,
    },
    {
      type: TabbingOrderTypes.CX_ICON,
    },
    {
      value: 'Use my location',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'View all stores',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Japan(49)',
      type: TabbingOrderTypes.LINK,
    },
    {
      type: TabbingOrderTypes.LINK,
    },
  ],
  storeFinderStoresList: [
    {
      type: TabbingOrderTypes.GENERIC_INPUT,
    },
    {
      type: TabbingOrderTypes.CX_ICON,
    },
    {
      value: 'Use my location',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'View all stores',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Chiba',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Get Directions',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Choshi',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Get Directions',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Fukuoka Best Western Fukuoka Nakasu Inn',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Get Directions',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Fukuoka Canal City Fukuoka Washington Hotel',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Get Directions',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Fukuoka Hilton Fukuoka Sea Hawk',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Get Directions',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Fukuoka Hotel Monterey La Soeur Fukuoka',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Get Directions',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Fukuoka Hotel Nikko Fukuoka',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Get Directions',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Ichikawa',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Get Directions',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Kawasaki Grand Hotel',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Get Directions',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Kawasaki Hotel Sunroute Kawasaki',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Get Directions',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Kawasaki Mets Kawasaki Hotel',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Get Directions',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Kawasaki Mets Mizonokuchi Hotel',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Get Directions',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Kawasaki Pearl Hotel Kawasaki',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Get Directions',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Kobe Bay Sheraton Hotel and Towers',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Get Directions',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Kobe Hotel Monterey Amalie',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Get Directions',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Kobe Hotel Monterey Kobe',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Get Directions',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Kobe Sannomiya Terminal Hotel',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Get Directions',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Kobe the b',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Get Directions',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Koto',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Get Directions',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Matsudo',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Get Directions',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Misato',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Get Directions',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Nagoya Crowne Plaza Ana Grand Court Nagoya',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Get Directions',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Nagoya Hilton Nagoya Hotel',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Get Directions',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Nagoya Marriott Nagoya',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Get Directions',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Nagoya Royal Park Inn Nagoya',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Get Directions',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Nagoya The Westin Nagoya Castle',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Get Directions',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Nakano',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Get Directions',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Osaka Best Western Hotel Fino Osaka Shinsaibashi',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Get Directions',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Osaka Cross Hotel Osaka',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Get Directions',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Osaka Crowne Plaza Hotel Ana Osaka',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Get Directions',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Osaka Hilton Osaka Hotel',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Get Directions',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Osaka Ramada Osaka',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Get Directions',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Sapporo Ana Hotel Sapporo',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Get Directions',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Sapporo Best Western Hotel Sapporo Nakajima Koen',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Get Directions',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Sapporo Hotel Resol Trinity Sapporo',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Get Directions',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Sapporo Hotel Sunroute Sapporo',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Get Directions',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Sapporo Sheraton Sapporo Hotel',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Get Directions',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Shinbashi',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Get Directions',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Tokio Cerulean Tower Tokyu Hotel',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Get Directions',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Tokio Dormy Inn Tokyo Hatchobori',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Get Directions',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Tokio Flexstay Nippori Inn',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Get Directions',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Tokio Hotel Metropolitan Tokyo',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Get Directions',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Tokio Park Hotel Tokyo',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Get Directions',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Yokohama Comfort Hotel Yokohama Kannai',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Get Directions',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Yokohama Hotel JAL City Kannai Yokohama',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Get Directions',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Yokohama Hotel New Grand',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Get Directions',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Yokohama Sakuragicho Washington Hotel',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Get Directions',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Yokohama Shin Yokohama Prince Hotel',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Get Directions',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Yokosuka',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Get Directions',
      type: TabbingOrderTypes.LINK,
    },
    {
      type: TabbingOrderTypes.LINK,
    },
  ],
  stockNotificationNotLogin: [
    {
      value: 'Sign In / Register',
      type: TabbingOrderTypes.LINK,
    },
  ],
  stockNotificationPreferenceNotAllowed: [
    {
      value: 'Notification Channels',
      type: TabbingOrderTypes.LINK,
    },
  ],
  stockNotificationPreferenceAllowed: [
    {
      type: TabbingOrderTypes.GENERIC_BUTTON,
    },
  ],
  stockNotificationSubscribed: [
    {
      type: TabbingOrderTypes.GENERIC_BUTTON,
    },
  ],
  stockNotificationDialog: [
    {
      value: 'Notification Preference',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'My Interests',
      type: TabbingOrderTypes.LINK,
    },
    {
      type: TabbingOrderTypes.GENERIC_BUTTON,
    },
  ],
  consignmentTracking: [
    {
      type: TabbingOrderTypes.GENERIC_BUTTON,
    },
    {
      value: 'Photosmart E317 Digital Camera',
      type: TabbingOrderTypes.LINK,
    },
    {
      type: TabbingOrderTypes.GENERIC_BUTTON,
    },
    {
      value: 'DSC-T90',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Micro Webcam',
      type: TabbingOrderTypes.LINK,
    },
  ],
  consignmentTrackingEvents: [
    {
      type: TabbingOrderTypes.GENERIC_BUTTON,
    },
  ],
  asmNotLoggedIn: [
    {
      type: TabbingOrderTypes.BUTTON,
      value: '',
    },
    {
      type: TabbingOrderTypes.GENERIC_INPUT,
    },
    {
      type: TabbingOrderTypes.GENERIC_INPUT,
    },
    {
      type: TabbingOrderTypes.BUTTON,
      value: 'Sign In',
    },
  ],
  asmNoSelectedUser: [
    {
      type: TabbingOrderTypes.BUTTON,
      value: '',
    },
    {
      type: TabbingOrderTypes.BUTTON,
      value: '',
    },
    {
      type: TabbingOrderTypes.FORM_FIELD,
      value: 'searchTerm',
    },
    {
      type: TabbingOrderTypes.BUTTON,
      value: 'Start Session',
    },
    {
      type: TabbingOrderTypes.BUTTON,
      value: 'Linda Wolf',
    },
    {
      type: TabbingOrderTypes.BUTTON,
      value: 'Linda Wolf',
    },
  ],
  asmWithSelectedUser: [
    {
      type: TabbingOrderTypes.BUTTON,
      value: '',
    },
    {
      type: TabbingOrderTypes.BUTTON,
      value: '',
    },
    {
      type: TabbingOrderTypes.FORM_FIELD,
      value: 'searchTerm',
    },
    {
      type: TabbingOrderTypes.BUTTON,
      value: 'Start Session',
    },
  ],
};
