import { TabElement } from './tabbing-order';

export enum TabbingOrderTypes {
  FORM_FIELD = 'formField',
  LINK = 'link',
  BUTTON = 'button',
  NG_SELECT = 'ngSelect',
  GENERIC_CHECKBOX = 'genericCheckbox',
  CHECKBOX_WITH_LABEL = 'checkboxWithLabel',
  IMG_LINK = 'imgLink',
  GENERIC_INPUT = 'genericInput',
  GENERIC_BUTTON = 'genericButton',
  GENERIC_NG_SELECT = 'genericNgSelect',
  ITEM_COUNTER = 'itemCounter',
  RADIO = 'radio',
  SELECT = 'select',
  NAV_CATEGORY_DROPDOWN = 'navCategoryDropdown',
  CAROUSEL = 'carousel',
}

export interface TabbingOrderConfig {
  [name: string]: TabElement[];
}

export const tabbingOrderConfig: TabbingOrderConfig = {
  home: [
    {
      value:
        '/electronics-spa/en/USD/OpenCatalogue/Cameras/Digital-Cameras/Digital-SLR/c/578',
      type: TabbingOrderTypes.IMG_LINK,
    },
    {
      value:
        '/electronics-spa/en/USD/Open-Catalogue/Cameras/Camera-Accessories-%2526-Supplies/c/585',
      type: TabbingOrderTypes.IMG_LINK,
    },
    {
      value:
        '/electronics-spa/en/USD/Open-Catalogue/Cameras/DigitalCameras/Digital-Compacts/c/576',
      type: TabbingOrderTypes.IMG_LINK,
    },
    {
      value:
        '/electronics-spa/en/USD/Open-Catalogue/Cameras/CameraAccessories-%2526-Supplies/CameraLenses/c/588',
      type: TabbingOrderTypes.IMG_LINK,
    },
    {
      value:
        '/electronics-spa/en/USD/Open-Catalogue/Cameras/Hand-held-Camcorders/c/584',
      type: TabbingOrderTypes.IMG_LINK,
    },
    {
      value:
        '/electronics-spa/en/USD/Open-Catalogue/Components/PowerSupplies/c/816',
      type: TabbingOrderTypes.IMG_LINK,
    },
    {
      value:
        '/electronics-spa/en/USD/product/300938/Photosmart%20E317%20Digital%20Camera',
      type: TabbingOrderTypes.IMG_LINK,
    },
    {
      value: '/electronics-spa/en/USD/product/358639/DSC-N1',
      type: TabbingOrderTypes.IMG_LINK,
    },
    {
      value: '/electronics-spa/en/USD/product/553637/NV10',
      type: TabbingOrderTypes.IMG_LINK,
    },
    {
      value: '/electronics-spa/en/USD/product/816802/Cyber-shot%20W55',
      type: TabbingOrderTypes.IMG_LINK,
    },
    {
      value: '/electronics-spa/en/USD/product/1934793/PowerShot%20A480',
      type: TabbingOrderTypes.IMG_LINK,
    },
    {
      value:
        '/electronics-spa/en/USD/product/1382080/EOS450D%20%2B%2018-55%20IS%20Kit',
      type: TabbingOrderTypes.IMG_LINK,
    },
    {
      value: '/electronics-spa/en/USD/product/1981415/PL60%20Silver',
      type: TabbingOrderTypes.IMG_LINK,
    },
    {
      value: '/electronics-spa/en/USD/product/816780/DSLR-A100H',
      type: TabbingOrderTypes.IMG_LINK,
    },
    {
      value: '/electronics-spa/en/USD/product/1934406/HDR-CX105E%20%20Red',
      type: TabbingOrderTypes.IMG_LINK,
    },
    {
      value: '/electronics-spa/en/USD/product/1986316/LEGRIA%20HF%20S100',
      type: TabbingOrderTypes.IMG_LINK,
    },
    {
      value:
        '/electronics-spa/en/USD/product/592506/AV%20Cable,%20Model%20AV-8',
      type: TabbingOrderTypes.IMG_LINK,
    },
    {
      value: '/electronics-spa/en/USD/product/1776948/Camileo%20S10%20EU',
      type: TabbingOrderTypes.IMG_LINK,
    },
    {
      value: '/electronics-spa/en/USD/product/1934796/PowerShot%20A480',
      type: TabbingOrderTypes.IMG_LINK,
    },
    {
      value: '/electronics-spa/en/USD/product/1981415/PL60%20Silver',
      type: TabbingOrderTypes.IMG_LINK,
    },
    {
      value: '/electronics-spa/en/USD/product/1992693/DSC-T90',
      type: TabbingOrderTypes.IMG_LINK,
    },
    {
      value: '/electronics-spa/en/USD/product/2278102/miniDV%20Head%20Cleaner',
      type: TabbingOrderTypes.IMG_LINK,
    },
    {
      value: '/electronics-spa/en/USD/product/1641905/32GB%20SDHC%20Card',
      type: TabbingOrderTypes.IMG_LINK,
    },
    {
      value: '/electronics-spa/en/USD/product/932577/Digital%20Camera%20Tripod',
      type: TabbingOrderTypes.IMG_LINK,
    },
    {
      value:
        '/electronics-spa/en/USD/Open-Catalogue/Cameras/Webcams/Web-Camera-%2528100KpixelM-CMOS%252C-640X480%252C-USB-1-1%2529-Black/p/280916',
      type: TabbingOrderTypes.IMG_LINK,
    },
    {
      value:
        '/electronics-spa/en/USD/Open-Catalogue/Cameras/Webcams/QuickCam-for-Notebooks-Pro/p/479742',
      type: TabbingOrderTypes.IMG_LINK,
    },
    {
      value:
        '/electronics-spa/en/USD/Open-Catalogue/Cameras/DigitalCameras/Digital-Compacts/NV10/p/553637',
      type: TabbingOrderTypes.IMG_LINK,
    },
    {
      value:
        '/electronics-spa/en/USD/Open-Catalogue/Cameras/CameraAccessories-%2526-Supplies/CameraFlashes/Light-HVL-20DW2/p/289540',
      type: TabbingOrderTypes.IMG_LINK,
    },
    { value: '/electronics-spa/en/USD/faq', type: TabbingOrderTypes.IMG_LINK },
  ],
  login: [
    { value: 'userId', type: TabbingOrderTypes.FORM_FIELD },
    { value: 'password', type: TabbingOrderTypes.FORM_FIELD },
    { value: 'Forgot password?', type: TabbingOrderTypes.LINK },
    { value: 'Sign In', type: TabbingOrderTypes.BUTTON },
    { value: 'Register', type: TabbingOrderTypes.BUTTON },
  ],
  register: [
    { value: 'titleCode', type: TabbingOrderTypes.FORM_FIELD },
    { value: 'firstName', type: TabbingOrderTypes.FORM_FIELD },
    { value: 'lastName', type: TabbingOrderTypes.FORM_FIELD },
    { value: 'email', type: TabbingOrderTypes.FORM_FIELD },
    { value: 'password', type: TabbingOrderTypes.FORM_FIELD },
    { value: 'passwordconf', type: TabbingOrderTypes.FORM_FIELD },
    { value: 'newsletter', type: TabbingOrderTypes.FORM_FIELD },
    {
      value: 'termsandconditions',
      type: TabbingOrderTypes.FORM_FIELD,
    },
    { value: 'Terms & Conditions', type: TabbingOrderTypes.LINK },
    { value: 'Register', type: TabbingOrderTypes.BUTTON },
    {
      value: 'I already have an account. Sign In',
      type: TabbingOrderTypes.LINK,
    },
  ],
  resetPassword: [
    { value: 'userEmail', type: TabbingOrderTypes.FORM_FIELD },
    { value: 'Submit', type: TabbingOrderTypes.BUTTON },
    { value: 'Cancel', type: TabbingOrderTypes.BUTTON },
  ],
  cart: [
    {
      value:
        '/electronics-spa/en/USD/product/3708646/EOS%20500D%20%2B%2018-55mm%20IS%20%2B%20EF-S%2055-250%20IS',
      type: TabbingOrderTypes.IMG_LINK,
    },
    {
      value: 'EOS 500D + 18-55mm IS + EF-S 55-250 IS',
      type: TabbingOrderTypes.LINK,
    },
    { value: 'quantity', type: TabbingOrderTypes.ITEM_COUNTER },
    { value: '-', type: TabbingOrderTypes.BUTTON },
    { type: TabbingOrderTypes.GENERIC_INPUT },
    { value: '+', type: TabbingOrderTypes.BUTTON },
    { value: 'Remove', type: TabbingOrderTypes.LINK },
    {
      value: 'Proceed to Checkout',
      type: TabbingOrderTypes.BUTTON,
    },
  ],
  changePassword: [
    {
      value: 'oldPassword',
      type: TabbingOrderTypes.FORM_FIELD,
    },
    {
      value: 'newPassword',
      type: TabbingOrderTypes.FORM_FIELD,
    },
    {
      value: 'newPasswordConfirm',
      type: TabbingOrderTypes.FORM_FIELD,
    },
  ],
  updateEmail: [
    { value: 'email', type: TabbingOrderTypes.FORM_FIELD },
    { value: 'confirmEmail', type: TabbingOrderTypes.FORM_FIELD },
    { value: 'password', type: TabbingOrderTypes.FORM_FIELD },
    { value: 'Cancel', type: TabbingOrderTypes.BUTTON },
    { value: 'Save', type: TabbingOrderTypes.BUTTON },
  ],
  footer: [
    {
      value: 'About SAP Commerce Cloud',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Frequently Asked Questions',
      type: TabbingOrderTypes.LINK,
    },
    { value: 'Visit SAP', type: TabbingOrderTypes.LINK },
    { value: 'Contact Us', type: TabbingOrderTypes.LINK },
    {
      value: 'Agile Commerce Blog',
      type: TabbingOrderTypes.LINK,
    },
    { value: 'Linked In', type: TabbingOrderTypes.LINK },
    { value: 'Facebook', type: TabbingOrderTypes.LINK },
    { value: 'Twitter', type: TabbingOrderTypes.LINK },
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
      value: 'isocode',
      type: TabbingOrderTypes.NG_SELECT,
    },
    {
      value: 'postalCode',
      type: TabbingOrderTypes.FORM_FIELD,
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
  addressBookDirectory: [
    {
      value: 'Add new address',
      type: TabbingOrderTypes.BUTTON,
    },
    {
      value: 'Edit',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Delete',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Set as default',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Edit',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Delete',
      type: TabbingOrderTypes.LINK,
    },
  ],
  consentManagement: [
    {
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
      value:
        'This is a sample consent description that will need to be updated or replaced, based on the valid registration consent required',
    },
    {
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
      value:
        'This is a sample storage consent description that will need to be updated or replaced, based on the valid registration consent required.',
    },
  ],
  addToCart: [
    { value: 'view cart', type: TabbingOrderTypes.BUTTON },
    {
      value: 'proceed to checkout',
      type: TabbingOrderTypes.BUTTON,
    },
    { type: TabbingOrderTypes.GENERIC_BUTTON },
    {
      value:
        '/electronics-spa/en/USD/product/3708646/EOS%20500D%20%2B%2018-55mm%20IS%20%2B%20EF-S%2055-250%20IS',
      type: TabbingOrderTypes.IMG_LINK,
    },
    {
      value: 'EOS 500D + 18-55mm IS + EF-S 55-250 IS',
      type: TabbingOrderTypes.LINK,
    },
    { value: 'quantity', type: TabbingOrderTypes.ITEM_COUNTER },
    { value: '-', type: TabbingOrderTypes.BUTTON },
    { type: TabbingOrderTypes.GENERIC_INPUT },
    { value: '+', type: TabbingOrderTypes.BUTTON },
    { value: 'Remove', type: TabbingOrderTypes.LINK },
    { value: 'view cart', type: TabbingOrderTypes.BUTTON },
  ],
  shippingAddressNew: [
    { value: 'isocode', type: TabbingOrderTypes.GENERIC_INPUT },
    { value: 'titleCode', type: TabbingOrderTypes.GENERIC_INPUT },
    { value: 'firstName', type: TabbingOrderTypes.FORM_FIELD },
    { value: 'lastName', type: TabbingOrderTypes.FORM_FIELD },
    { value: 'line1', type: TabbingOrderTypes.FORM_FIELD },
    { value: 'line2', type: TabbingOrderTypes.FORM_FIELD },
    { value: 'town', type: TabbingOrderTypes.FORM_FIELD },
    { value: 'isocode', type: TabbingOrderTypes.GENERIC_INPUT },
    { value: 'postalCode', type: TabbingOrderTypes.FORM_FIELD },
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
    { value: 'deliveryModeId', type: TabbingOrderTypes.RADIO },
    { value: 'deliveryModeId', type: TabbingOrderTypes.RADIO },
    { value: 'Back', type: TabbingOrderTypes.BUTTON },
    { value: 'Continue', type: TabbingOrderTypes.BUTTON },
  ],
  orderHistoryNoOrders: [
    { value: 'Start Shopping', type: TabbingOrderTypes.BUTTON },
  ],
  paymentDetailsCard: [
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
    { type: TabbingOrderTypes.GENERIC_INPUT },
    { value: 'firstName', type: TabbingOrderTypes.FORM_FIELD },
    { value: 'lastName', type: TabbingOrderTypes.FORM_FIELD },
    { value: 'line1', type: TabbingOrderTypes.FORM_FIELD },
    { value: 'line2', type: TabbingOrderTypes.FORM_FIELD },
    { value: 'town', type: TabbingOrderTypes.FORM_FIELD },
    { value: 'isocodeShort', type: TabbingOrderTypes.NG_SELECT },
    { value: 'postalCode', type: TabbingOrderTypes.FORM_FIELD },
    { value: 'Back', type: TabbingOrderTypes.BUTTON },
    { value: 'Continue', type: TabbingOrderTypes.BUTTON },
  ],
  reviewOrder: [
    {
      value: '/electronics-spa/en/USD/product/1446509/Alpha%20350',
      type: TabbingOrderTypes.IMG_LINK,
    },
    {
      value: 'Alpha 350',
      type: TabbingOrderTypes.LINK,
    },
  ],
  headerDesktop: [
    {
      value: 'Language',
      type: TabbingOrderTypes.SELECT,
    },
    {
      value: 'Currency',
      type: TabbingOrderTypes.SELECT,
    },
    {
      value: 'Find a Store',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Sale',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Contact Us',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Help',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: '/electronics-spa/en/USD/',
      type: TabbingOrderTypes.IMG_LINK,
    },
    {
      type: TabbingOrderTypes.GENERIC_INPUT,
    },
    {
      value: 'Sign In / Register',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: '/electronics-spa/en/USD/cart',
      type: TabbingOrderTypes.IMG_LINK,
    },
    {
      value: 'Brands',
      type: TabbingOrderTypes.NAV_CATEGORY_DROPDOWN,
    },
    {
      value: 'Shop all Brands >',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Canon',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Sony',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Kodak',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Samsung',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Toshiba',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Fujifilm',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Kingston',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Icidu',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'TDK',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Sweex',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Digital Cameras',
      type: TabbingOrderTypes.NAV_CATEGORY_DROPDOWN,
    },
    {
      value: 'Shop all Digital Cameras >',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Compact Cameras',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'SLR Cameras',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Film Cameras',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Camcorders',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Webcams',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Accessories',
      type: TabbingOrderTypes.NAV_CATEGORY_DROPDOWN,
    },
    {
      value: 'Shop all Accessories >',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Camera Flashes',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Tripods',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Camera Lenses',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Flash Memory',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Power Supplies',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Color Films',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Black & White Films',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Blank Videotapes',
      type: TabbingOrderTypes.LINK,
    },
  ],
  headerDesktopLoggedIn: [
    {
      value: 'Language',
      type: TabbingOrderTypes.SELECT,
    },
    {
      value: 'Currency',
      type: TabbingOrderTypes.SELECT,
    },
    {
      value: 'Find a Store',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Sale',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Contact Us',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Help',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: '/electronics-spa/en/USD/',
      type: TabbingOrderTypes.IMG_LINK,
    },
    {
      type: TabbingOrderTypes.GENERIC_INPUT,
    },
    {
      value: 'My Account',
      type: TabbingOrderTypes.NAV_CATEGORY_DROPDOWN,
    },
    {
      value: 'Order History',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Address Book',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Payment Details',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Personal Details',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Password',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Email Address',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Consent Management',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Close Account',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Sign Out',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: '/electronics-spa/en/USD/cart',
      type: TabbingOrderTypes.IMG_LINK,
    },
    {
      value: 'Brands',
      type: TabbingOrderTypes.NAV_CATEGORY_DROPDOWN,
    },
    {
      value: 'Shop all Brands >',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Canon',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Sony',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Kodak',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Samsung',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Toshiba',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Fujifilm',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Kingston',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Icidu',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'TDK',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Sweex',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Digital Cameras',
      type: TabbingOrderTypes.NAV_CATEGORY_DROPDOWN,
    },
    {
      value: 'Shop all Digital Cameras >',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Compact Cameras',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'SLR Cameras',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Film Cameras',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Camcorders',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Webcams',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Accessories',
      type: TabbingOrderTypes.NAV_CATEGORY_DROPDOWN,
    },
    {
      value: 'Shop all Accessories >',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Camera Flashes',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Tripods',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Camera Lenses',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Flash Memory',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Power Supplies',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Color Films',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Black & White Films',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Blank Videotapes',
      type: TabbingOrderTypes.LINK,
    },
  ],
};
