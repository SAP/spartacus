import { CmsModuleConfig } from './cms/cms-module-config';
import { AuthModuleConfig, OccConfig,
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
