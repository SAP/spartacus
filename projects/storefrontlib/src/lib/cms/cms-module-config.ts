import { OccConfig } from '@spartacus/core';
import { AuthModuleConfig } from '../auth/auth-module.config';
import { StaticProvider } from '@angular/core';

export type CmsComponentId =
  | 'CMSLinkComponent'
  | 'SimpleResponsiveBannerComponent'
  | 'SimpleBannerComponent'
  | 'CMSParagraphComponent'
  // | 'BreadcrumbComponent'
  | 'NavigationComponent'
  | 'FooterNavigationComponent'
  | 'CategoryNavigationComponent'
  | 'ProductAddToCartComponent'
  | 'MiniCartComponent'
  | 'ProductCarouselComponent'
  | 'SearchBoxComponent'
  | 'ProductReferencesComponent'
  // | CMSTabParagraphComponent'
  | 'CMSTabParagraphComponent'
  | string;

export type CMSComponentMappingConfig = {
  [CMSComponent in CmsComponentId]?: string
};

export type CMSComponentProviders = {
  [CMSComponent in CmsComponentId]?: StaticProvider[]
};

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
  cmsComponentProviders?: CMSComponentProviders;
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
  },
  cmsComponentProviders: {}
};
