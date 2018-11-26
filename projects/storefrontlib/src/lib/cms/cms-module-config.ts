import { OccConfig } from '@spartacus/core';
import { AuthModuleConfig } from '../auth/auth-module.config';
import { StaticProvider } from '@angular/core';

export type CmsComponentId =
  | 'CMSLinkComponent'
  | 'SimpleResponsiveBannerComponent'
  | 'SimpleBannerComponent'
  | 'CMSParagraphComponent'
  | 'BreadcrumbComponent'
  | 'NavigationComponent'
  | 'FooterNavigationComponent'
  | 'CategoryNavigationComponent'
  | 'ProductAddToCartComponent'
  | 'MiniCartComponent'
  | 'ProductCarouselComponent'
  | 'SearchBoxComponent'
  | 'ProductReferencesComponent'
  | 'CMSTabParagraphComponent'
  | string;

export type CMSComponentConfig = {
  [CMSComponent in CmsComponentId]?: {
    selector?: string;
    providers?: StaticProvider[];
  }
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

  cmsComponents?: CMSComponentConfig;
}

export const defaultCmsModuleConfig: CmsModuleConfig = {
  defaultPageIdForType: {
    ProductPage: ['productDetails'],
    CategoryPage: ['productList', 'productGrid', 'category']
  }
};
