import { AuthModuleConfig } from './auth/auth-module.config';
import { CmsModuleConfig } from './cms/cms-module-config';
import {
  OccConfig,
  RoutingModuleConfig,
  ConfigurableRoutesConfig
} from '@spartacus/core';
import { PWAModuleConfig } from './pwa/pwa.module-config';

export interface StorefrontModuleConfig
  extends AuthModuleConfig,
    CmsModuleConfig,
    OccConfig,
    RoutingModuleConfig,
    PWAModuleConfig,
    ConfigurableRoutesConfig {}
