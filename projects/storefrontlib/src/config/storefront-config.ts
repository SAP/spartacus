import {
  AuthConfig,
  CmsConfig,
  I18nConfig,
  OccConfig,
  PersonalizationConfig,
  RoutingConfig,
  SiteContextConfig,
  StateConfig,
  GlobalMessageConfig,
} from '@spartacus/core';
import { CheckoutConfig } from '../cms-components/checkout/config/checkout-config';
import { IconConfig } from '../cms-components/misc/icon/index';
import { PWAModuleConfig } from '../cms-structure/pwa/index';
import { LayoutConfig } from '../layout/config/layout-config';

export type StorefrontModuleConfig =
  | AuthConfig
  | CmsConfig
  | OccConfig
  | StateConfig
  | PWAModuleConfig
  | SiteContextConfig
  | LayoutConfig
  | RoutingConfig
  | I18nConfig
  | PersonalizationConfig
  | IconConfig
  | CheckoutConfig
  | GlobalMessageConfig;
