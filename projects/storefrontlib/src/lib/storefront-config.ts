import {
  AuthConfig,
  CmsConfig,
  I18nConfig,
  OccConfig,
  RoutingConfig,
  SiteContextConfig,
  StateConfig,
} from '@spartacus/core';
import { IconConfig } from '../cms-components/misc/icon/index';
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
  | I18nConfig
  | IconConfig;
