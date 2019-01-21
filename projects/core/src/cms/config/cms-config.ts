import { StaticProvider } from '@angular/core';
import { OccConfig } from '../../occ/config/occ-config';
import { AuthConfig } from '../../auth/config/auth-config';

export type CmsComponentId =
  | 'SiteContextSelectorComponent'
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

export type layoutSections =
  | 'header'
  | 'footer'
  | 'LandingPage2Template'
  | string;

export type SlotGroup = {
  slots?: string[];
};

export type LayoutSlotConfig = {
  [section in layoutSections]: SlotGroup | LayoutSlotConfig
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

  layoutSlots?: LayoutSlotConfig;
}
