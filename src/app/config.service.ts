import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {
  server = {
    baseUrl: 'https://localhost:9002',
    occPrefix: '/rest/v2/'
  };

  site = {
    baseSite: 'electronics',
    language: 'en',
    currency: 'USD'
  };

  // site = {
  //     baseSite: 'apparel-uk',
  //     language: 'en',
  //     currency: 'GBP'
  // };

  defaultPageIdForType = {
    PRODUCT_PAGE: ['productDetails'],
    CATEGORY_PAGE: ['productList', 'productGrid', 'category']
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
    CmsParagraphComponent: 'ParagraphComponent',
    NavigationComponent: 'NavigationComponent',
    FooterNavigationComponent: 'FooterNavigationComponent',
    CategoryNavigationComponent: 'CategoryNavigationComponent',
    ProductAddToCartComponent: 'AddToCartComponent',
    MiniCartComponent: 'MiniCartComponent',
    // ProductCarouselComponent:           'ProductCarouselComponent',
    // SearchBoxComponent:                 'SearchBoxComponent',
    ProductReferencesComponent: 'ProductReferencesComponent',
    CMSTabParagraphComponent: 'TabParagraphContainerComponent'
  };
}
