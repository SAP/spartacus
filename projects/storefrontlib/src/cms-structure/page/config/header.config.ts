import { CmsContentConfig } from '@spartacus/core';

export function defaultRetailCmsContentConfig(): CmsContentConfig {
  return {
    global: {
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
