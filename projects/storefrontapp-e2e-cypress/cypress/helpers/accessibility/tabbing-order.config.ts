import { TabElement } from './tabbing-order';

export enum TabbingOrderTypes {
  FORM_FIELD = 'formField',
  LINK = 'link',
  BUTTON = 'button',
  IMG_LINK = 'imgLink',
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
    { value: '', type: TabbingOrderTypes.IMG_LINK },
    { value: '', type: TabbingOrderTypes.IMG_LINK },
    { value: '', type: TabbingOrderTypes.IMG_LINK },
    { value: '', type: TabbingOrderTypes.IMG_LINK },
    { value: '', type: TabbingOrderTypes.IMG_LINK },
    { value: '', type: TabbingOrderTypes.IMG_LINK },
    { value: '', type: TabbingOrderTypes.IMG_LINK },
    { value: '', type: TabbingOrderTypes.IMG_LINK },
    { value: '', type: TabbingOrderTypes.IMG_LINK },
    { value: '', type: TabbingOrderTypes.IMG_LINK },
    { value: '', type: TabbingOrderTypes.IMG_LINK },
    { value: '', type: TabbingOrderTypes.IMG_LINK },
    { value: '', type: TabbingOrderTypes.IMG_LINK },
    { value: '', type: TabbingOrderTypes.IMG_LINK },
    { value: '', type: TabbingOrderTypes.IMG_LINK },
    { value: '', type: TabbingOrderTypes.IMG_LINK },
    { value: '', type: TabbingOrderTypes.IMG_LINK },
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
  resetPassword: [
    { value: 'userEmail', type: TabbingOrderTypes.FORM_FIELD },
    { value: 'Submit', type: TabbingOrderTypes.BUTTON },
    { value: 'Cancel', type: TabbingOrderTypes.BUTTON },
  ],
  footer: [
    { value: 'About SAP Commerce Cloud', type: TabbingOrderTypes.LINK },
    { value: 'Frequently Asked Questions', type: TabbingOrderTypes.LINK },
    { value: 'Visit SAP', type: TabbingOrderTypes.LINK },
    { value: 'Contact Us', type: TabbingOrderTypes.LINK },
    { value: 'Agile Commerce Blog', type: TabbingOrderTypes.LINK },
    { value: 'Linked In', type: TabbingOrderTypes.LINK },
    { value: 'Facebook', type: TabbingOrderTypes.LINK },
    { value: 'Twitter', type: TabbingOrderTypes.LINK },
  ],
  closeAccount: [
    { value: 'Cancel', type: TabbingOrderTypes.LINK },
    { value: 'CLOSE MY ACCOUNT', type: TabbingOrderTypes.BUTTON },
  ],
};
