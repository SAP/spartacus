import { ServerConfig } from '../config/server-config/server-config';
import { SiteContextModuleConfig } from '../site-context/site-context-module-config';
import { AuthModuleConfig } from '../auth/auth-module.config';
import { SearchBoxComponentService } from '../cms-lib/search-box/search-box-component.service';

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

export interface CMSComponentProviders {
  [CMSComponent: string]: any;
  SearchBoxComponent?: any;
}

export abstract class CmsModuleConfig extends ServerConfig
  implements SiteContextModuleConfig, AuthModuleConfig {
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
  cmsComponentServiceProviders?: CMSComponentProviders;
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
  },

  cmsComponentServiceProviders: {
    SearchBoxComponent: {
      provide: SearchBoxComponentService,
      useClass: SearchBoxComponentService
    }
  }
};
