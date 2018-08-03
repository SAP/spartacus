import { Injectable } from '@angular/core';

export enum StorageSyncType {
  NO_STORAGE,
  LOCAL_STORAGE,
  SESSION_STORAGE
}

@Injectable()
export class DefaultConfigService {
  server = {
    baseUrl: 'https://localhost:9002',
    occPrefix: '/rest/v2/'
  };

  lang =
    sessionStorage.getItem('language') === null
      ? 'en'
      : sessionStorage.getItem('language');
  curr =
    sessionStorage.getItem('currency') === null
      ? 'USD'
      : sessionStorage.getItem('currency');

  site = {
    baseSite: 'electronics',
    language: this.lang,
    currency: this.curr
  };

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
    CMSParagraphComponent: 'ParagraphComponent',
    NavigationComponent: 'NavigationComponent',
    FooterNavigationComponent: 'FooterNavigationComponent',
    CategoryNavigationComponent: 'CategoryNavigationComponent',
    ProductAddToCartComponent: 'AddToCartComponent',
    MiniCartComponent: 'MiniCartComponent',
    ProductCarouselComponent: 'ProductCarouselComponent',
    SearchBoxComponent: 'SearchBoxComponent',
    ProductReferencesComponent: 'ProductReferencesComponent',
    CMSTabParagraphComponent: 'ParagraphComponent'
  };
}
