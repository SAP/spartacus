import { ServerConfig, SiteContextConfig } from '@spartacus/core';

import { AuthModuleConfig } from '../auth/auth-module.config';

export interface CMSComponentMappingConfig {
  [CMSComponent: string]: string;
  CMSLinkComponent?: string;
  SimpleResponsiveBannerComponent?: string;
  SimpleBannerComponent?: string;
  // BreadcrumbComponent: string;
  CMSParagraphComponent?: string;
  NavigationComponent?: string;
  FooterNavigationComponent?: string;
  CategoryNavigationComponent?: string;
  ProductAddToCartComponent?: string;
  MiniCartComponent?: string;
  ProductCarouselComponent?: string;
  SearchBoxComponent?: string;
  ProductReferencesComponent?: string;
  // CMSTabParagraphComponent: string;
  CMSTabParagraphComponent?: string;
}

export abstract class CmsModuleConfig extends ServerConfig
  implements SiteContextConfig, AuthModuleConfig {
  site?: {
    baseSite?: string;
    language?: string;
    currency?: string;
  };

  authentication?: {
    client_id?: string;
    client_secret?: string;
  };

  defaultPageIdForType?: {
    ProductPage?: string[];
    CategoryPage?: string[];
  };

  cmsComponentMapping?: CMSComponentMappingConfig;
}

export const defaultCmsModuleConfig: CmsModuleConfig = {
  defaultPageIdForType: {
    ProductPage: ['productDetails'],
    CategoryPage: ['productList', 'productGrid', 'category']
  },

  cmsComponentMapping: {
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
  }
};
