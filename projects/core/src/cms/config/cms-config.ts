import { Injectable, StaticProvider } from '@angular/core';
import { Route } from '@angular/router';
import { Config } from '../../config/config-tokens';
import { CmsComponent } from '../../model';
import { OccConfig } from '../../occ/config/occ-config';

export interface StandardCmsComponentConfig<T> {
  CMSSiteContextComponent?: CmsComponentMapping<T>;
  CMSLinkComponent?: CmsComponentMapping<T>;
  SimpleResponsiveBannerComponent?: CmsComponentMapping<T>;
  SimpleBannerComponent?: CmsComponentMapping<T>;
  BannerComponent?: CmsComponentMapping<T>;
  CMSParagraphComponent?: CmsComponentMapping<T>;
  BreadcrumbComponent?: CmsComponentMapping<T>;
  NavigationComponent?: CmsComponentMapping<T>;
  FooterNavigationComponent?: CmsComponentMapping<T>;
  CategoryNavigationComponent?: CmsComponentMapping<T>;
  ProductAddToCartComponent?: CmsComponentMapping<T>;
  MiniCartComponent?: CmsComponentMapping<T>;
  ProductCarouselComponent?: CmsComponentMapping<T>;
  SearchBoxComponent?: CmsComponentMapping<T>;
  ProductReferencesComponent?: CmsComponentMapping<T>;
  CMSTabParagraphComponent?: CmsComponentMapping<T>;
  LoginComponent?: CmsComponentMapping<T>;
}

export interface JspIncludeCmsComponentConfig<T> {
  AccountAddressBookComponent?: CmsComponentMapping<T>;
  ForgotPasswordComponent?: CmsComponentMapping<T>;
  ResetPasswordComponent?: CmsComponentMapping<T>;
  ProductDetailsTabComponent?: CmsComponentMapping<T>;
  ProductSpecsTabComponent?: CmsComponentMapping<T>;
  ProductReviewsTabComponent?: CmsComponentMapping<T>;
}

export const JSP_INCLUDE_CMS_COMPONENT_TYPE = 'JspIncludeComponent';
export const CMS_FLEX_COMPONENT_TYPE = 'CMSFlexComponent';

/**
 * Configuration of the CMS component's child routes
 */
export interface CmsComponentChildRoutesConfig {
  /**
   * Route `data` property to apply on the parent (host) route of the CMS child routes.
   */
  parent?: Pick<Route, 'data'>;

  /**
   * Child routes defined by the existence of the CMS component on the page.
   */
  children?: Route[];
}

export interface CmsComponentMapping<T = CmsComponent> {
  component?: any;
  providers?: StaticProvider[];
  childRoutes?: Route[] | CmsComponentChildRoutesConfig;
  disableSSR?: boolean;
  i18nKeys?: string[];
  guards?: any[];

  /**
   * The component data can be statically configured. The data can be used for various reasons:
   * - Improve performance with an initial data that doesn't require API response
   * - Introduce UI properties that are not available on the API
   * - Build ghost design based on the initial data that is used prior to the backend data is loaded
   */
  data?: T;

  /**
   * DeferLoading can be specified globally, but also per component.
   * Some components require direct loading while it's not initially
   * in the viewport.
   */
  deferLoading?: DeferLoadingStrategy;
}

/** Strategy to control the loading strategy of DOM elements. */
export enum DeferLoadingStrategy {
  /** Defers loading of DOM elements until element is near/in the users view port */
  DEFER = 'DEFERRED-LOADING',
  /** Renders the DOM instantly without being concerned with the view port */
  INSTANT = 'INSTANT-LOADING',
}

export interface CMSComponentConfig<T = CmsComponent>
  extends StandardCmsComponentConfig<T>,
    JspIncludeCmsComponentConfig<T> {
  [componentType: string]: CmsComponentMapping<T>;
}

export interface FeatureModuleConfig {
  /**
   * Lazy resolved feature module
   */
  module?: () => Promise<any>;
  /**
   * Lazy resolved dependency modules
   */
  dependencies?: (() => Promise<any>)[];
  /**
   * Cms components covered by this feature
   */
  cmsComponents?: string[];
}

@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class CmsConfig<T = CmsComponent> extends OccConfig {
  featureModules?: { [featureName: string]: FeatureModuleConfig };
  cmsComponents?: CMSComponentConfig<T>;
}
