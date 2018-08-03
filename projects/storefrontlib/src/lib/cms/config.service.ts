import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {
  server = {
    baseUrl: 'https://backoffice.christian-spartacus1-s2-public.model-t.myhybris.cloud',
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

  authentication = {
    client_id: 'mobile_android',
    client_secret: 'secret'
  };

  defaultPageIdForType = {
    ProductPage: ['productDetails'],
    CategoryPage: ['productList', 'productGrid', 'category']
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
    // ProductCarouselComponent:           'ProductCarouselComponent',
    // SearchBoxComponent:                 'SearchBoxComponent',
    ProductReferencesComponent: 'ProductReferencesComponent',
    CMSTabParagraphComponent: 'TabParagraphContainerComponent'
  };
}
