import { CmsPageConfig, ContentSlotComponentData } from '@spartacus/core';

export const cartComponents: {
  [key: string]: ContentSlotComponentData | any;
} = {
  emptyCartText: {
    flexType: 'CMSParagraphComponent',
    typeCode: 'CMSParagraphComponent',
    content: `
      <h2>Your shopping cart is empty</h2>
      <p>Suggestions</p>
      <ul>
          <li>
          Browse our products by selecting a category above
          </li>
      </ul>`,
  },
};

export const defaultCartPageConfig: CmsPageConfig = {
  ignoreBackend: false,
  pageId: 'cartPage',
  type: 'ContentPage',
  template: 'CartPageTemplate',
  title: 'Cart',
  slots: {
    EmptyCartMiddleContent: {
      componentIds: ['emptyCartText'],
    },
  },
};
