import {
  AuthConfig,
  OccConfig,
  RoutingModuleConfig,
  ConfigurableRoutesConfig,
  CmsConfig
} from '@spartacus/core';
import { PWAModuleConfig } from './pwa/pwa.module-config';

export interface StorefrontModuleConfig
  extends AuthConfig,
    CmsConfig,
    OccConfig,
    RoutingModuleConfig,
    PWAModuleConfig,
    ConfigurableRoutesConfig {}
