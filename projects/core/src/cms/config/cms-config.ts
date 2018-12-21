import { StaticProvider } from '@angular/core';
import { OccConfig } from '../../occ/config/occ-config';
import { AuthConfig } from '../../auth/config/auth-config';

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

export abstract class CmsConfig extends OccConfig implements AuthConfig {
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
