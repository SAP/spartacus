import {
  AuthConfig,
  CmsConfig,
  ConfigurableRoutesConfig,
  I18nConfig,
  OccConfig,
  PersonalizationConfig,
  SiteContextConfig,
  StateConfig,
} from '@spartacus/core';
import { IconConfig } from '../cms-components/misc/icon/index';
import { LayoutConfig } from '../layout/config/layout-config';
import { PWAModuleConfig } from './pwa/pwa.module-config';

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
  | PersonalizationConfig
  | IconConfig;
