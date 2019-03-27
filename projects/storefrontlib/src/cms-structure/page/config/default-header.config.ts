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
        url: '/store-finder',
        uid: 'storefinder'
      }
    ]
  },
  SiteLogo: {
    components: [
      {
        typeCode: 'CMSParagraphComponent',
        flexType: 'CMSParagraphComponent',
        content: '<b>BRAND</b>',
        uid: 'logo'
      }
    ]
  },
  SearchBox: {
    components: [
      {
        typeCode: 'SearchBoxComponent',
        flexType: 'SearchBoxComponent',
        uid: 'SearchBoxComponent'
      }
    ]
  },
  MiniCart: {
    components: [
      {
        typeCode: 'MiniCartComponent',
        flexType: 'MiniCartComponent',
        uid: 'MiniCartComponent'
      }
    ]
  },
  SiteLogin: {
    components: [
      {
        typeCode: 'LoginComponent',
        flexType: 'LoginComponent',
        uid: 'LoginComponent'
      }
    ]
  },
  NavigationBar: {
    components: [
      {
        uid: 'CategoryNavigationComponent',
        typeCode: 'CategoryNavigationComponent',
        flexType: 'CategoryNavigationComponent',
        navigationNode: {
          uid: 'ElectronicsCategoryNavNode',
          children: [
            {
              uid: 'DigitalCamerasNavNode',
              entries: [
                {
                  itemId: 'DigitalCamerasCategoryLink',
                  itemType: 'CMSLinkComponent'
                }
              ]
            }
          ]
        }
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
