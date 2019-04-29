import {
  AuthConfig,
  CmsConfig,
  ConfigurableRoutesConfig,
  I18nConfig,
  OccConfig,
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
  | ConfigurableRoutesConfig
  | I18nConfig
  | IconConfig;
