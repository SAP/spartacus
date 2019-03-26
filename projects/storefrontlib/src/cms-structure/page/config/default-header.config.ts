import { CmsPageSlotsConfig } from '@spartacus/core';

export const defaultPageHeaderConfig: CmsPageSlotsConfig = {
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
};
