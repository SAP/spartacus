import { OccConfig } from '@spartacus/core';

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

export abstract class CmsModuleConfig extends OccConfig
  implements AuthModuleConfig {
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
    CMSLinkComponent: 'cx-link',
    SimpleResponsiveBannerComponent: 'cx-responsive-banner',
    SimpleBannerComponent: 'cx-banner',
    // BreadcrumbComponent:                'cx-breadcrumb',
    CMSParagraphComponent: 'cx-paragraph',
    NavigationComponent: 'cx-navigation',
    FooterNavigationComponent: 'cx-footer-navigation',
    CategoryNavigationComponent: 'cx-category-navigation',
    ProductAddToCartComponent: 'cx-add-to-cart',
    MiniCartComponent: 'cx-mini-cart',
    ProductCarouselComponent: 'cx-product-carousel',
    SearchBoxComponent: 'cx-searchbox',
    ProductReferencesComponent: 'cx-product-references',
    // CMSTabParagraphComponent: 'cx-tab-paragraph-container'
    CMSTabParagraphComponent: 'cx-paragraph'
  }
};
