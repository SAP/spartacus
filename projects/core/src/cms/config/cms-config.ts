import { StaticProvider } from '@angular/core';

import { AuthConfig } from '../../auth/config/auth-config';
import { OccConfig } from '../../occ/config/occ-config';

export interface StandardCmsComponentConfig {
  SiteContextSelectorComponent?: CmsComponentMapping;
  CMSLinkComponent?: CmsComponentMapping;
  SimpleResponsiveBannerComponent?: CmsComponentMapping;
  SimpleBannerComponent?: CmsComponentMapping;
  BannerComponent?: CmsComponentMapping;
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

export interface JspIncludeCmsComponentConfig {
  AccountAddressBookComponent?: CmsComponentMapping;
  ForgotPasswordComponent?: CmsComponentMapping;
  ResetPasswordComponent?: CmsComponentMapping;
}

export const JSP_INCLUDE_CMS_COMPONENT_TYPE = 'JspIncludeComponent';
export const FLEX_CMS_COMPONENT_TYPE = 'FlexCmsComponent';

export interface CmsComponentMapping {
  selector?: string;
  providers?: StaticProvider[];
  disableSSR?: boolean;
}

export interface CMSComponentConfig
  extends StandardCmsComponentConfig,
    JspIncludeCmsComponentConfig {
  [_: string]: CmsComponentMapping;
}

export abstract class CmsConfig extends OccConfig implements AuthConfig {
  authentication?: {
    client_id?: string;
    client_secret?: string;
  };

  cmsComponents?: CMSComponentConfig;
}
