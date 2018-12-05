import {
  AuthConfig,
  OccConfig,
  RoutingModuleConfig,
  ConfigurableRoutesConfig,
  CmsModuleConfig
} from '@spartacus/core';
import { PWAModuleConfig } from './pwa/pwa.module-config';

export interface StorefrontModuleConfig
  extends AuthConfig,
    CmsModuleConfig,
    OccConfig,
    RoutingModuleConfig,
    PWAModuleConfig,
    ConfigurableRoutesConfig {}
