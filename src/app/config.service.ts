import { Injectable } from '@angular/core';

const packageJson = require('../../package.json');

export enum StorageSyncType {
  NO_STORAGE,
  LOCAL_STORAGE,
  SESSION_STORAGE
}

@Injectable()
export class ConfigService {
  server = {
    baseUrl:
      'https://' + packageJson.config.host + ':' + packageJson.config.port,
    occPrefix: '/rest/v2/'
  };

  lang = sessionStorage.getItem('language') === null
    ? 'en'
    : sessionStorage.getItem('language');
  curr = sessionStorage.getItem('currency') === null
    ? 'USD'
    : sessionStorage.getItem('currency');

  site = {
    baseSite: 'electronics',
    language: this.lang,
    currency: this.curr
  };

  // site = {
  //     baseSite: 'apparel-uk',
  //     language: 'en',
  //     currency: 'GBP'
  // };
  storageSyncType = StorageSyncType.SESSION_STORAGE;

  defaultPageIdForType = {
    ProductPage: ['productDetails'],
    CategoryPage: ['productList', 'productGrid', 'category']
  };

  authentication = {
    client_id: 'mobile_android',
    client_secret: 'secret'
  };

  cmsComponentMapping = {
    CMSLinkComponent: 'LinkComponent',
    SimpleResponsiveBannerComponent: 'ResponsiveBannerComponent',
    SimpleBannerComponent: 'BannerComponent',
    // BreadcrumbComponent:                'BreadcrumbComponent',
    CMSParagraphComponent: 'ParagraphComponent',
    NavigationComponent: 'NavigationComponent',
    FooterNavigationComponent: 'FooterNavigationComponent',
    CategoryNavigationComponent: 'CategoryNavigationComponent',
    ProductAddToCartComponent: 'AddToCartComponent',
    MiniCartComponent: 'MiniCartComponent',
    ProductCarouselComponent: 'ProductCarouselComponent',
    SearchBoxComponent: 'SearchBoxComponent',
    ProductReferencesComponent: 'ProductReferencesComponent',
    // CMSTabParagraphComponent: 'TabParagraphContainerComponent'
    CMSTabParagraphComponent: 'ParagraphComponent'
  };
}
