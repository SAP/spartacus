import {
  AuthConfig,
  CmsConfig,
  I18nConfig,
  OccConfig,
  RoutingConfig,
  PersonalizationConfig,
  SiteContextConfig,
  StateConfig,
} from '@spartacus/core';
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
  | IconConfig;
