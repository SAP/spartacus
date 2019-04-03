import { CmsPageSlotsConfig, ContentSlotComponentData } from '@spartacus/core';

export const headerComponents: {
  [key: string]: ContentSlotComponentData | any;
} = {
  SkipLinkComponent: {
    typeCode: 'SkipLinkComponent',
    flexType: 'SkipLinkComponent',
    uid: 'SkipLinkComponent',
  },
  LanguageComponent: {
    typeCode: 'CMSSiteContextComponent',
    flexType: 'CMSSiteContextComponent',
    context: 'LANGUAGE',
  },
  CurrencyComponent: {
    typeCode: 'CMSSiteContextComponent',
    flexType: 'CMSSiteContextComponent',
    context: 'CURRENCY',
  },
  StoreFinder: {
    typeCode: 'CMSLinkComponent',
    flexType: 'CMSLinkComponent',
    linkName: 'Find a Store',
    url: '/store-finder',
  },
  BreadcrumbComponent: {
    typeCode: 'BreadcrumbComponent',
    flexType: 'BreadcrumbComponent',
  },
  Logo: {
    typeCode: 'SimpleBannerComponent',
    flexType: 'SimpleBannerComponent',
    uid: 'logo',
    media: {
      mime: 'svg/image/svg+xml',
      url: 'https://www.sap.com/dam/application/shared/logos/sap-logo-svg.svg',
    },
    urlLink: '/',
  },
  SearchBox: {
    typeCode: 'SearchBoxComponent',
    flexType: 'SearchBoxComponent',
    uid: 'SearchBoxComponent',
  },
  MiniCart: {
    typeCode: 'MiniCartComponent',
    flexType: 'MiniCartComponent',
    uid: 'MiniCartComponent',
  },
  LoginComponent: {
    typeCode: 'LoginComponent',
    flexType: 'LoginComponent',
    uid: 'LoginComponent',
  },
  CategoryNavigationComponent: {
    typeCode: 'CategoryNavigationComponent',
    flexType: 'CategoryNavigationComponent',
    uid: 'ElectronicsCategoryNavComponent',
    modifiedTime: '2019-02-07T19:09:51.416Z',
    name: 'Category Navigation Component',
    container: 'false',
    wrapAfter: '10',
    navigationNode: {
      uid: 'ElectronicsCategoryNavNode',
      children: [
        {
          uid: 'CameraLensesNavNode',
          title: 'Electronic catalog',
          entries: [
            {
              itemId: 'CameraLensesCategoryLink',
              itemSuperType: 'AbstractCMSComponent',
              itemType: 'CMSLinkComponent',
            },
          ],
        },
      ],
    },
  },
};

export const defaultPageHeaderConfig: CmsPageSlotsConfig = {
  PreHeader: {
    componentIds: ['SkipLinkComponent'],
  },
  SiteContext: {
    componentIds: ['LanguageComponent', 'CurrencyComponent'],
  },
  SiteLinks: {
    componentIds: ['StoreFinder'],
  },
  SiteLogo: {
    componentIds: ['Logo'],
  },
  SearchBox: {
    componentIds: ['SearchBox'],
  },
  MiniCart: {
    componentIds: ['MiniCart'],
  },
  SiteLogin: {
    componentIds: ['LoginComponent'],
  },
  NavigationBar: {
    componentIds: ['CategoryNavigationComponent'],
  },
  BottomHeaderSlot: {
    componentIds: ['BreadcrumbComponent'],
  },
};
