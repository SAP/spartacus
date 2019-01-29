import {
  AuthConfig,
  OccConfig,
  StateConfig,
  ConfigurableRoutesConfig,
  CmsConfig
} from '@spartacus/core';
import { PWAModuleConfig } from './pwa/pwa.module-config';
import { LayoutConfig } from './ui/layout/config/layout-config';

export interface StorefrontModuleConfig
  extends AuthConfig,
    CmsConfig,
    OccConfig,
    StateConfig,
    PWAModuleConfig,
    LayoutConfig,
    ConfigurableRoutesConfig {}
