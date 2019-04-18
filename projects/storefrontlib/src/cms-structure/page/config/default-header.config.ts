import { CmsPageSlotsConfig, ContentSlotComponentData } from '@spartacus/core';

export const headerComponents: {
  [key: string]: ContentSlotComponentData | any;
} = {
  SkipLinkComponent: {
    typeCode: 'SkipLinkComponent',
    flexType: 'SkipLinkComponent',
    uid: 'SkipLinkComponent',
  },
  HamburgerMenuComponent: {
    typeCode: 'HamburgerMenuComponent',
    flexType: 'HamburgerMenuComponent',
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
  LanguageCurrencyComponent: {
    typeCode: 'LanguageCurrencyComponent',
    flexType: 'LanguageCurrencyComponent',
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
    componentIds: ['SkipLinkComponent', 'HamburgerMenuComponent'],
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
