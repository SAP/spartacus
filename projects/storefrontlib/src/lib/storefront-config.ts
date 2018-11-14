import { CmsModuleConfig } from './cms/cms-module-config';
import { AuthModuleConfig, OccConfig, RoutingModuleConfig } from '@spartacus/core';
import { PWAModuleConfig } from './pwa/pwa.module-config';
import { SiteContextConfig } from '@spartacus/core';

export interface StorefrontModuleConfig
  extends AuthModuleConfig,
    CmsModuleConfig,
    OccConfig,
    RoutingModuleConfig,
    PWAModuleConfig,
    SiteContextConfig {}
