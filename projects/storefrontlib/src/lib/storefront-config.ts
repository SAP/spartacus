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
  | ConfigurableRoutesConfig
  | I18nConfig
  | PersonalizationConfig
  | IconConfig;
