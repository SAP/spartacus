import {
  AuthConfig,
  OccConfig,
  StateConfig,
  RoutingConfig,
  CmsConfig,
  SiteContextConfig,
  I18nConfig,
} from '@spartacus/core';
import { PWAModuleConfig } from './pwa/pwa.module-config';
import { LayoutConfig } from './ui/layout/config/layout-config';

export type StorefrontModuleConfig =
  | AuthConfig
  | CmsConfig
  | OccConfig
  | StateConfig
  | PWAModuleConfig
  | SiteContextConfig
  | LayoutConfig
  | RoutingConfig
  | I18nConfig;
