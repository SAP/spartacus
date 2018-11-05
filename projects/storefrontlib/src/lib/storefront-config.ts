import { AuthModuleConfig } from './auth/auth-module.config';
import { CmsModuleConfig } from './cms/cms-module-config';
import { OccConfig } from '@spartacus/core';
import { RoutingModuleConfig } from './routing/routing-module-config';
import { SiteContextConfig } from '@spartacus/core';

export interface StorefrontModuleConfig
  extends AuthModuleConfig,
    CmsModuleConfig,
    OccConfig,
    RoutingModuleConfig,
    SiteContextConfig {}
