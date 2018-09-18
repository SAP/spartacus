import { ServerConfig } from '../config/server-config';
import { SiteContextModuleConfig } from '../site-context/site-context-module-config';
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
}

export const defaultCmsModuleConfig: CmsModuleConfig = {
  defaultPageIdForType: {
    ProductPage: ['productDetails'],
    CategoryPage: ['productList', 'productGrid', 'category']
  },

  cmsComponentMapping: {
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
  }
};
