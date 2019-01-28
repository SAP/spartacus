import { AuthConfig, OccConfig, StateConfig, CmsConfig } from '@spartacus/core';
import { PWAModuleConfig } from './pwa/pwa.module-config';
import { StorefrontConfigurableRoutesConfig } from './storefront-configurable-routes-config';

export interface StorefrontModuleConfig
  extends AuthConfig,
    CmsConfig,
    OccConfig,
    StateConfig,
    PWAModuleConfig,
    StorefrontConfigurableRoutesConfig {}
