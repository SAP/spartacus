import { AuthModuleConfig } from './auth/auth-module.config';
import { CmsModuleConfig } from './cms/cms-module-config';
import { OccModuleConfig } from './occ/occ-module-config';
import { RoutingModuleConfig } from './routing/routing-module-config';
import { SiteContextModuleConfig } from '@spartacus/core';

export interface StorefrontModuleConfig
  extends AuthModuleConfig,
    CmsModuleConfig,
    OccModuleConfig,
    RoutingModuleConfig,
    SiteContextModuleConfig {}
