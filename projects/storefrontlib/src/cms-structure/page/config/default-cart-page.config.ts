import { CmsPageConfig } from '@spartacus/core';

export const defaultCartPageConfig: CmsPageConfig = {
  ignoreBackend: false,
  pageId: 'cartPage',
  type: 'ContentPage',
  template: 'CartPageTemplate',
  title: 'Cart',
  slots: {
    EmptyCartMiddleContent: {
      components: [
        {
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
          uid: 'xyz',
        },
      ],
    },
  },
};
