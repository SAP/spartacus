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
    header: {
      slots: ['SiteLogo', 'SiteContext'],
      md: ['SiteContext', 'SiteLogo']
    },
    footer: {
      slots: ['Footer']
    },
    LandingPage2Template: {
      slots: ['Section1', 'Section2'],
      header: {
        slots: ['SiteLogo', 'SiteContext'],
        md: ['SiteContext', 'SiteLogo']
      }
    }
  }
};
