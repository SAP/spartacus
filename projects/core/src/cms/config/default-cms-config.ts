import { CmsConfig } from './cms-config';

export const defaultCmsModuleConfig: CmsConfig = {
  defaultPageIdForType: {
    ProductPage: ['productDetails'],
    CategoryPage: ['productList', 'productGrid', 'category']
  },
  cmsComponents: {
    CMSTabParagraphComponent: { selector: 'cx-paragraph' }
  }
};
