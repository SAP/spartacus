import { Injectable } from '@angular/core';

@Injectable()
export class CmsModuleConfig {
  server = {
    baseUrl: 'https://localhost:9002',
    occPrefix: '/rest/v2/'
  };

  site = {
    baseSite: 'electronics',
    language: 'en',
    currency: 'USD'
  };

  authentication = {
    client_id: 'mobile_android',
    client_secret: 'secret'
  };

  defaultPageIdForType = {
    ProductPage: ['productDetails'],
    CategoryPage: ['productList', 'productGrid', 'category']
  };

  cmsComponentMapping = {
    CMSLinkComponent: 'y-link',
    SimpleResponsiveBannerComponent: 'y-responsive-banner',
    SimpleBannerComponent: 'y-banner',
    // BreadcrumbComponent:                'y-breadcrumb',
    CMSParagraphComponent: 'y-paragraph',
    NavigationComponent: 'y-navigation',
    FooterNavigationComponent: 'y-footer-navigation',
    CategoryNavigationComponent: 'y-category-navigation',
    ProductAddToCartComponent: 'y-add-to-cart',
    MiniCartComponent: 'y-mini-cart',
    ProductCarouselComponent: 'y-product-carousel',
    SearchBoxComponent: 'y-searchbox',
    ProductReferencesComponent: 'y-product-references',
    // CMSTabParagraphComponent: 'y-tab-paragraph-container'
    CMSTabParagraphComponent: 'y-paragraph'
  };
}
