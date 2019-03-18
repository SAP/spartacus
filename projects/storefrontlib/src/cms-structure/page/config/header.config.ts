import { CmsContentConfig } from '@spartacus/core';

export function defaultRetailCmsContentConfig(): CmsContentConfig {
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
              {
                position: 'EmptyCartMiddleContent',
                components: {
                  component: [
                    {
                      typeCode: 'CMSParagraphComponent',
                      content: 'empty cart...',
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
        }
      ]
    }
  };
}
