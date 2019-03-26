import {
  AuthConfig,
  OccConfig,
  StateConfig,
  ConfigurableRoutesConfig,
  CmsConfig,
  SiteContextConfig
} from '@spartacus/core';
import { PWAModuleConfig } from './pwa/pwa.module-config';
import { LayoutConfig } from './ui/layout/config/layout-config';
import { YotpoConfig } from 'vendor';

export interface StorefrontModuleConfig
  extends AuthConfig,
    CmsConfig,
    OccConfig,
    StateConfig,
    PWAModuleConfig,
    SiteContextConfig,
    LayoutConfig,
    ConfigurableRoutesConfig,
    YotpoConfig {}
