import { CmsContentConfig } from '@spartacus/core';

export function defaultCmsContentConfig(): CmsContentConfig {
  return {
    cmsData: {
      pages: [
        {
          uid: 'cartPage',
          template: 'CartPageTemplate',
          title: 'Cart',
          typeCode: 'ContentPage',
          contentSlots: {
            contentSlot: [
              // force empty slot, overriding global slots
              // {
              //   position: 'BottomHeaderSlot',
              //   components: {
              //     component: []
              //   }
              // },
              {
                position: 'EmptyCartMiddleContent',
                components: {
                  component: [
                    {
                      typeCode: 'CMSParagraphComponent',
                      content: `<h2>Your shopping cart is empty</h2>
                        <p>Suggestions</p><ul><li>Browse our products by selecting a category above</li></ul>`,
                      uid: 'xyz'
                    }
                  ]
                }
              }
            ]
          }
        }
      ],
      slots: [
        {
          position: 'SiteContext',
          components: {
            component: [
              {
                typeCode: 'CMSSiteContextComponent',
                uid: 'LanguageComponent',
                context: 'LANGUAGE'
              },
              {
                typeCode: 'CMSSiteContextComponent',
                uid: 'CurrencyComponent',
                context: 'CURRENCY'
              }
            ]
          }
        },
        {
          position: 'SiteLinks',
          components: {
            component: [
              {
                typeCode: 'CMSLinkComponent',
                linkName: 'Find a Store',
                url: '/store-finder'
              }
            ]
          }
        },
        {
          position: 'BottomHeaderSlot',
          components: {
            component: [
              {
                typeCode: 'BreadcrumbComponent',
                uid: 'breadcrumbComponent'
              }
            ]
          }
        }
      ]
    }
  };
}
