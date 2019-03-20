import { CmsStructureConfig } from '@spartacus/core';

export function defaultCmsContentConfig(): CmsStructureConfig {
  return {
    cmsStructure: {
      pages: [
        {
          ignoreBackend: true,
          pageId: 'cartPage',
          type: 'ContentPage',
          // uid: 'cartPage',
          template: 'CartPageTemplate',
          title: 'Cart',
          slots: {
            // SiteContext: {},
            EmptyCartMiddleContent: {
              components: [
                {
                  flexType: 'CMSParagraphComponent',
                  typeCode: 'CMSParagraphComponent',
                  content: `<h2>Your shopping cart is empty</h2>
                    <p>Suggestions</p><ul><li>Browse our products by selecting a category above</li></ul>`,
                  uid: 'xyz'
                }
              ]
            }
          }
        }
      ],
      slots: {
        SiteContext: {
          components: [
            {
              typeCode: 'CMSSiteContextComponent',
              flexType: 'CMSSiteContextComponent',
              uid: 'LanguageComponent',
              context: 'LANGUAGE'
            },
            {
              typeCode: 'CMSSiteContextComponent',
              flexType: 'CMSSiteContextComponent',
              uid: 'CurrencyComponent',
              context: 'CURRENCY'
            }
          ]
        },
        SiteLinks: {
          components: [
            {
              typeCode: 'CMSLinkComponent',
              flexType: 'CMSLinkComponent',
              linkName: 'Find a Store',
              url: '/store-finder'
            }
          ]
        },
        BottomHeaderSlot: {
          components: [
            {
              typeCode: 'BreadcrumbComponent',
              flexType: 'BreadcrumbComponent',
              uid: 'breadcrumbComponent'
            }
          ]
        }
        // {
        //   position: 'SiteLinks',
        //   components: {
        //     component: [
        //       {
        //         typeCode: 'CMSLinkComponent',
        //         linkName: 'Find a Store',
        //         url: '/store-finder'
        //       }
        //     ]
        //   }
        // },
        // {
        //   position: 'BottomHeaderSlot',
        //   components: {
        //     component: [
        //       {
        //         typeCode: 'BreadcrumbComponent',
        //         uid: 'breadcrumbComponent'
        //       }
        //     ]
        //   }
        // }
      }
    }
  };
}
