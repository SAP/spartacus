import {
  OccConfig,
  RoutingModuleConfig,
  ConfigurableRoutesConfig
} from '@spartacus/core';

import { AuthModuleConfig } from './auth/auth-module.config';
import { CmsModuleConfig } from './cms/cms-module-config';
import { ProductModuleConfig } from './product/product-config';
import { PWAModuleConfig } from './pwa/pwa.module-config';

export interface StorefrontModuleConfig
  extends AuthModuleConfig,
    CmsModuleConfig,
    OccConfig,
    RoutingModuleConfig,
    PWAModuleConfig,
    ProductModuleConfig,
    ConfigurableRoutesConfig {}
