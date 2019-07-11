import {
  AuthConfig,
  CmsConfig,
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
import { PWAModuleConfig } from './cms-structure/pwa/index';
import { SuffixRoutesConfig } from './cms-structure/routing/suffix-routes/suffix-routes-config';
import { LayoutConfig } from './layout/config/layout-config';

export type StorefrontConfig =
  | AuthConfig
  | CmsConfig
  | OccConfig
  | StateConfig
  | PWAModuleConfig
  | SiteContextConfig
  | LayoutConfig
  | RoutingConfig
  | SuffixRoutesConfig
  | I18nConfig
  | PersonalizationConfig
  | IconConfig
  | CheckoutConfig
  | KymaConfig
  | GlobalMessageConfig;
