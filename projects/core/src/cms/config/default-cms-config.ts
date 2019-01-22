import { CmsConfig } from './cms-config';

export const defaultCmsModuleConfig: CmsConfig = {
  defaultPageIdForType: {
    ProductPage: ['productDetails'],
    CategoryPage: ['productList', 'productGrid', 'category']
  },
  cmsComponents: {
    CMSTabParagraphComponent: { selector: 'cx-paragraph' }
  },
  layoutSlots: {
    LandingPage2Template: {
      slots: [
        'Section1',
        'Section2A',
        'Section2B',
        'Section2C',
        'Section3',
        'Section4',
        'Section5'
      ]
    },
    ContentPage1Template: {
      slots: ['Section2A', 'Section2B']
    },
    ProductDetailsPageTemplate: {
      slots: ['TopHeaderSlot', 'BottomHeaderSlot', 'PlaceholderContentSlot']
    },
    CartPageTemplate: {
      slots: ['BottomContentSlot']
    },
    ProductListPageTemplate: {
      slots: []
    },
    CategoryPageTemplate: {
      slots: ['Section4', 'Section1', 'Section2', 'Section3']
    },
    LoginPageTemplate: {
      slots: ['LeftContentSlot', 'RightContentSlot']
    },
    AccountPageTemplate: {
      slots: ['BodyContent', 'SideContent']
    },
    StoreFinderPageTemplate: {
      slots: ['MiddleContent', 'SideContent']
    },
    MultiStepCheckoutSummaryPageTemplate: {
      slots: ['SideContent']
    },
    OrderConfirmationPageTemplate: {
      slots: ['SideContent', 'BodyContent']
    }
  }
};
