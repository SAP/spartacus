import { Injectable, StaticProvider } from '@angular/core';
import { Route } from '@angular/router';
import { Config } from '../../config/config-tokens';
import { CmsComponent } from '../../model/cms.model';
import { OccConfig } from '../../occ/config/occ-config';

export interface StandardCmsComponentConfig {
  CMSSiteContextComponent?: CmsComponentMapping;
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
  LoginComponent?: CmsComponentMapping;
}

export interface JspIncludeCmsComponentConfig {
  AccountAddressBookComponent?: CmsComponentMapping;
  ForgotPasswordComponent?: CmsComponentMapping;
  ResetPasswordComponent?: CmsComponentMapping;
  ProductDetailsTabComponent?: CmsComponentMapping;
  ProductSpecsTabComponent?: CmsComponentMapping;
  ProductReviewsTabComponent?: CmsComponentMapping;
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
  /**
   * Configurable component providers for cms components.
   *
   * Component services are designed to be non-singleton services and are scoped
   * to the component injection tree. The advantage of these services is that they can
   * resolve services injected to the component injection tree. However, these services
   * cannot be extended with the native Angular DI system.
   *
   * The configurable component providers mitigate this downside, by allowing you to provide
   * component providers through services.
   */
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

export interface CMSComponentConfig
  extends StandardCmsComponentConfig,
    JspIncludeCmsComponentConfig {
  [componentType: string]: CmsComponentMapping | undefined;
}

export interface FeatureModuleConfig {
  /**
   * Lazy resolved feature module
   */
  module?: () => Promise<any>;
  /**
   * Lazy resolved dependency modules or features referenced by name
   */
  dependencies?: ((() => Promise<any>) | string)[];
  /**
   * Cms components covered by this feature
   */
  cmsComponents?: string[];
}

@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class CmsConfig extends OccConfig {
  featureModules?: { [featureName: string]: FeatureModuleConfig | string };
  cmsComponents?: CMSComponentConfig;
}

declare module '../../config/config-tokens' {
  interface Config extends CmsConfig {}
}
