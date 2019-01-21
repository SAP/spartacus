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
      slots: ['Section1', 'Section2']
    },
    ExamplePageTemplate: {
      slots: ['Section1', 'Section2'],
      header: ['Section1']
    }
  }
};
