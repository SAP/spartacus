import {
  AnonymousConsentsConfig,
  AsmConfig,
  AuthConfig,
  CmsConfig,
  ExternalRoutesConfig,
  GlobalMessageConfig,
  I18nConfig,
  KymaConfig,
  OccConfig,
  PersonalizationConfig,
  RoutingConfig,
  SiteContextConfig,
  StateConfig,
} from '@spartacus/core';
import { CheckoutConfig } from './cms-components/checkout/config/checkout-config';
import { IconConfig } from './cms-components/misc/icon/index';
import { QualtricsConfig } from './cms-components/misc/qualtrics/index';
import { PWAModuleConfig } from './cms-structure/pwa/index';
import { FeatureToggles } from './feature-toggles';
import { SkipLinkConfig } from './layout/a11y/skip-link/config/index';
import { LayoutConfig } from './layout/config/layout-config';
import { PaginationConfig } from './shared/components/list-navigation/pagination/index';
import { ViewConfig } from './shared/config/view-config';

export type StorefrontConfig =
  | AnonymousConsentsConfig
  | AuthConfig
  | CmsConfig
  | OccConfig
  | QualtricsConfig
  | StateConfig
  | PWAModuleConfig
  | SiteContextConfig
  | LayoutConfig
  | RoutingConfig
  | I18nConfig
  | PersonalizationConfig
  | IconConfig
  | CheckoutConfig
  | KymaConfig
  | GlobalMessageConfig
  | ExternalRoutesConfig
  | ViewConfig
  | FeatureToggles
  | AsmConfig
  | SkipLinkConfig
  | PaginationConfig;
