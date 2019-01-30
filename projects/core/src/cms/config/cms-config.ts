import { StaticProvider } from '@angular/core';
import { OccConfig } from '../../occ/config/occ-config';
import { AuthConfig } from '../../auth/config/auth-config';

export interface StandardCmsComponentsMapping {
  SiteContextSelectorComponent?: CmsComponentMapping;
  CMSLinkComponent?: CmsComponentMapping;
  SimpleResponsiveBannerComponent?: CmsComponentMapping;
  SimpleBannerComponent?: CmsComponentMapping;
  CMSParagraphComponent?: CmsComponentMapping;
  BreadcrumbComponent?: CmsComponentMapping;
  NavigationComponent?: CmsComponentMapping;
  FooterNavigationComponent?: CmsComponentMapping;
  CategoryNavigationComponent?: CmsComponentMapping;
  ProductAddToCartComponent?: CmsComponentMapping;
  MiniCartComponent?: CmsComponentMapping;
  ProductCarouselComponent?: CmsComponentMapping;
  SearchBoxComponent?: CmsComponentMapping;
  ProductReferencesComponent?: CmsComponentMapping;
  CMSTabParagraphComponent?: CmsComponentMapping;
}

export interface JspIncludeCmsComponentsMapping {
  AccountAddressBookComponent?: CmsComponentMapping;
}

export const JSP_INCLUDE_CMS_COMPONENT_TYPE = 'JspIncludeComponent';

export interface CmsComponentMapping {
  selector?: string;
  providers?: StaticProvider[];
}

export interface CMSComponentConfig
  extends StandardCmsComponentsMapping,
    JspIncludeCmsComponentsMapping {
  [_: string]: CmsComponentMapping;
}

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
