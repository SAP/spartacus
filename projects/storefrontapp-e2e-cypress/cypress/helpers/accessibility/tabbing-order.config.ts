import { TabbingOrderTypes, TabbingOrderConfig } from './tabbing-order.model';

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
    {
      value: '/electronics-spa/en/USD/faq',
      type: TabbingOrderTypes.IMG_LINK,
    },
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
    {
      value: 'newsletter',
      type: TabbingOrderTypes.FORM_FIELD,
    },
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
      value: 'FUN Flash Single Use Camera, 27+12 pic',
      type: TabbingOrderTypes.LINK,
    },
    { value: '-', type: TabbingOrderTypes.BUTTON },
    { type: TabbingOrderTypes.GENERIC_INPUT },
    { value: '+', type: TabbingOrderTypes.BUTTON },
    { value: 'Remove', type: TabbingOrderTypes.LINK },
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
      value: 'I approve to this sample PERSONALIZATION consent',
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
    { value: '-', type: TabbingOrderTypes.BUTTON },
    { type: TabbingOrderTypes.GENERIC_INPUT },
    { value: '+', type: TabbingOrderTypes.BUTTON },
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
  orderDetails: [
    {
      value: 'Alpha 350',
      type: TabbingOrderTypes.LINK,
    },
  ],
  headerDesktopNotLoggedIn: [
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
      type: TabbingOrderTypes.CX_ICON,
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
      value: 'Digital Cameras',
      type: TabbingOrderTypes.NAV_CATEGORY_DROPDOWN,
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
      value: 'Orders',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Wish List',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Find a Store',
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
      type: TabbingOrderTypes.CX_ICON,
    },
    {
      value: 'My Account',
      type: TabbingOrderTypes.NAV_CATEGORY_DROPDOWN,
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
      value: 'Digital Cameras',
      type: TabbingOrderTypes.NAV_CATEGORY_DROPDOWN,
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
  ],
  checkoutReviewOrder: [
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
  productPage: [
    {
      value: 'FUN Flash Single Use Camera, 27+12 pic',
      type: TabbingOrderTypes.CX_MEDIA,
    },
    {
      value: 'FUN Flash Single Use Camera, 27+12 pic',
      type: TabbingOrderTypes.CX_MEDIA,
    },
    { value: 'Show reviews', type: TabbingOrderTypes.LINK },
    { value: '-', type: TabbingOrderTypes.BUTTON },
    { type: TabbingOrderTypes.GENERIC_INPUT },
    { value: '+', type: TabbingOrderTypes.BUTTON },
    { value: 'Add to cart', type: TabbingOrderTypes.BUTTON },
    { value: 'add to wish list', type: TabbingOrderTypes.LINK },
  ],
  headerMobileNotLoggedIn: [
    {
      type: TabbingOrderTypes.GENERIC_BUTTON,
    },
    {
      value: '/electronics-spa/en/USD/',
      type: TabbingOrderTypes.IMG_LINK,
    },
    {
      type: TabbingOrderTypes.GENERIC_INPUT,
    },
    {
      type: TabbingOrderTypes.CX_ICON,
    },
    {
      value: '/electronics-spa/en/USD/cart',
      type: TabbingOrderTypes.IMG_LINK,
    },
    {
      value: 'Sign In / Register',
      type: TabbingOrderTypes.LINK,
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
      value: 'Cameras',
      type: TabbingOrderTypes.NAV_CATEGORY_DROPDOWN,
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
      value: 'Accessories',
      type: TabbingOrderTypes.NAV_CATEGORY_DROPDOWN,
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
      value: 'Gear',
      type: TabbingOrderTypes.NAV_CATEGORY_DROPDOWN,
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
      value: 'Supplies',
      type: TabbingOrderTypes.NAV_CATEGORY_DROPDOWN,
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
      value: 'Contact Us',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Help',
      type: TabbingOrderTypes.LINK,
    },
  ],
  headerMobileLoggedIn: [
    {
      type: TabbingOrderTypes.GENERIC_BUTTON,
    },
    {
      value: '/electronics-spa/en/USD/',
      type: TabbingOrderTypes.IMG_LINK,
    },
    {
      type: TabbingOrderTypes.GENERIC_INPUT,
    },
    {
      type: TabbingOrderTypes.CX_ICON,
    },
    {
      value: '/electronics-spa/en/USD/cart',
      type: TabbingOrderTypes.IMG_LINK,
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
      value: 'Wish List',
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
      value: 'My Interests',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Notification Preference',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'My Coupons',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Sign Out',
      type: TabbingOrderTypes.LINK,
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
      value: 'Cameras',
      type: TabbingOrderTypes.NAV_CATEGORY_DROPDOWN,
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
      value: 'Accessories',
      type: TabbingOrderTypes.NAV_CATEGORY_DROPDOWN,
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
      value: 'Gear',
      type: TabbingOrderTypes.NAV_CATEGORY_DROPDOWN,
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
      value: 'Supplies',
      type: TabbingOrderTypes.NAV_CATEGORY_DROPDOWN,
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
    {
      value: 'Language',
      type: TabbingOrderTypes.SELECT,
    },
    {
      value: 'Currency',
      type: TabbingOrderTypes.SELECT,
    },
    {
      value: 'Orders',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Wish List',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Find a Store',
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
  ],
  productListDesktop: [
    {
      value: 'Stores',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Chiba',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: 'Choshi',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: 'Fukuoka Best Western Fukuoka Nakasu Inn',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: 'Fukuoka Canal City Fukuoka Washington Hotel',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: 'Fukuoka Hilton Fukuoka Sea Hawk',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: 'Fukuoka Hotel Monterey La Soeur Fukuoka',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: 'Show more...',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Price',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: '$0-$49.99',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: '$50-$199.99',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: '$200-$499.99',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: '$500-$999.99',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: '$1,000-$100,000',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: 'Resolution',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: '1280 x 720',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: 'Mounting',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Floor-standing',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: 'Quick-release Mounting Shoe',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: 'Megapixels',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: '20 - 29.9 mp',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: '15 - 15.9 mp',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: '14 - 14.9 mp',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: '12 - 12.9 mp',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: '10 - 10.9 mp',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: '9 - 9.9 mp',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: 'Show more...',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Lens type',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'fixed',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: 'telephoto',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: 'fisheye',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: 'wide-angle',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: 'zoom',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: 'Color',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Black',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: 'Brand',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Sony',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: 'Canon',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: 'Kodak',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: 'Kingston',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: 'Samsung',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: 'Toshiba',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: 'Show more...',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Category',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Cameras',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: 'Digital Cameras',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: 'Digital SLR',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: 'Digital Compacts',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: 'Components',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: 'Power Supplies',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: 'Show more...',
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
      value: '2',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: '3',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: '18',
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
      value: '2',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: '3',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: '18',
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
      type: TabbingOrderTypes.GENERIC_BUTTON,
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
      value: '2',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: '3',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: '18',
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
      value: '2',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: '3',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: '18',
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
      value: 'Chiba',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: 'Choshi',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: 'Fukuoka Best Western Fukuoka Nakasu Inn',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: 'Fukuoka Canal City Fukuoka Washington Hotel',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: 'Fukuoka Hilton Fukuoka Sea Hawk',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: 'Fukuoka Hotel Monterey La Soeur Fukuoka',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: 'Fukuoka Hotel Nikko Fukuoka',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: 'Ichikawa',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: 'Kawasaki Grand Hotel',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: 'Kawasaki Hotel Sunroute Kawasaki',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: 'Kawasaki Mets Kawasaki Hotel',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: 'Kawasaki Mets Mizonokuchi Hotel',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: 'Kawasaki Pearl Hotel Kawasaki',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: 'Kobe Bay Sheraton Hotel and Towers',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: 'Kobe Hotel Monterey Amalie',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: 'Kobe Hotel Monterey Kobe',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: 'Kobe Sannomiya Terminal Hotel',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: 'Kobe the b',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: 'Koto',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: 'Matsudo',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: 'Misato',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: 'Nagoya Crowne Plaza Ana Grand Court Nagoya',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: 'Nagoya Hilton Nagoya Hotel',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: 'Nagoya Marriott Nagoya',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: 'Nagoya Royal Park Inn Nagoya',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: 'Nagoya The Westin Nagoya Castle',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: 'Nakano',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: 'Osaka Best Western Hotel Fino Osaka Shinsaibashi',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: 'Osaka Cross Hotel Osaka',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: 'Osaka Crowne Plaza Hotel Ana Osaka',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: 'Osaka Hilton Osaka Hotel',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: 'Osaka Ramada Osaka',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: 'Sapporo Ana Hotel Sapporo',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: 'Sapporo Best Western Hotel Sapporo Nakajima Koen',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: 'Sapporo Hotel Resol Trinity Sapporo',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: 'Sapporo Hotel Sunroute Sapporo',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: 'Sapporo Sheraton Sapporo Hotel',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: 'Shinbashi',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: 'Tokio Cerulean Tower Tokyu Hotel',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: 'Tokio Dormy Inn Tokyo Hatchobori',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: 'Tokio Flexstay Nippori Inn',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: 'Tokio Hotel Metropolitan Tokyo',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: 'Tokio Park Hotel Tokyo',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: 'Yokohama Comfort Hotel Yokohama Kannai',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: 'Yokohama Hotel JAL City Kannai Yokohama',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: 'Yokohama Hotel New Grand',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: 'Yokohama Sakuragicho Washington Hotel',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: 'Yokohama Shin Yokohama Prince Hotel',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: 'Yokosuka',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: '$0-$49.99',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: '$50-$199.99',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: '$200-$499.99',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: '$500-$999.99',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: '$1,000-$100,000',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: '1280 x 720',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: 'Floor-standing',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: 'Quick-release Mounting Shoe',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: '20 - 29.9 mp',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: '15 - 15.9 mp',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: '14 - 14.9 mp',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: '12 - 12.9 mp',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: '10 - 10.9 mp',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: '9 - 9.9 mp',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: '8 - 8.9 mp',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: '7 - 7.9 mp',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: '5 - 5.9 mp',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: 'fixed',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: 'telephoto',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: 'fisheye',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: 'wide-angle',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: 'zoom',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: 'Black',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: 'Sony',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: 'Canon',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: 'Kodak',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: 'Kingston',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: 'Samsung',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: 'Toshiba',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: 'ICIDU',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: 'TDK',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: 'Sweex',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: 'HP',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: 'NEC',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: 'Targus',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: 'Canyon',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: 'Fujifilm',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: 'Logitech',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: 'Cameras',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: 'Digital Cameras',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: 'Digital SLR',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: 'Digital Compacts',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: 'Components',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: 'Power Supplies',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: 'Camera Accessories & Supplies',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: 'Data storage',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: 'Flash Memory',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: 'Rechargeable Batteries',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: 'Camera Lenses',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: 'Battery Chargers',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: 'Camera Kits',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: 'Tripods',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: 'Power Adapters & Inverters',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: 'Hand-held Camcorders',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: 'Blank Video Tapes',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: 'Webcams',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: 'Camera Flashes',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: 'Colour Films',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: 'Black & White Films',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: 'Camera Cables',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: 'Binoculars',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: 'Film cameras',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
    {
      value: 'Fixatives',
      type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
    },
  ],
  myInterests: [
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
      value: '»',
      type: TabbingOrderTypes.LINK,
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
    {
      value: '«',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: '1',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: '»',
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
      type: TabbingOrderTypes.GENERIC_BUTTON,
    },
    {
      value: 'View all stores',
      type: TabbingOrderTypes.GENERIC_BUTTON,
    },
  ],
  storeFinderSearchResults: [
    {
      value: 'Nakano',
      type: TabbingOrderTypes.GENERIC_INPUT,
    },
    {
      type: TabbingOrderTypes.CX_ICON,
    },
    {
      value: 'Use my location',
      type: TabbingOrderTypes.GENERIC_BUTTON,
    },
    {
      value: 'View all stores',
      type: TabbingOrderTypes.GENERIC_BUTTON,
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
      value: '2',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: '»',
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
  ],
  storeFinderStoreDetails: [
    {
      value: 'Back to list',
      type: TabbingOrderTypes.GENERIC_BUTTON,
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
      type: TabbingOrderTypes.GENERIC_BUTTON,
    },
    {
      value: 'View all stores',
      type: TabbingOrderTypes.GENERIC_BUTTON,
    },
    {
      value: 'Japan (49)',
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
      type: TabbingOrderTypes.GENERIC_BUTTON,
    },
    {
      value: 'View all stores',
      type: TabbingOrderTypes.GENERIC_BUTTON,
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
      value: 'Chiba',
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
      value: 'Koto',
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
      value: 'Yokosuka',
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
      value: 'Nakano',
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
      value: 'Shinbashi',
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
      value: 'Kobe the b',
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
      value: 'Ichikawa',
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
      value: 'Fukuoka Hilton Fukuoka Sea Hawk',
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
      value: 'Choshi',
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
      value: 'Fukuoka Best Western Fukuoka Nakasu Inn',
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
      value: 'Fukuoka Hotel Monterey La Soeur Fukuoka',
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
      value: 'Osaka Best Western Hotel Fino Osaka Shinsaibashi',
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
  ],
};
