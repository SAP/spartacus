import { AuthConfig, OccConfig, StateConfig, CmsConfig } from '@spartacus/core';
import { PWAModuleConfig } from './pwa/pwa.module-config';
import { StorefrontConfigurableRoutesConfig } from './storefront-configurable-routes-config';
import { LayoutConfig } from './ui/layout/config/layout-config';

export interface StorefrontModuleConfig
  extends AuthConfig,
    CmsConfig,
    OccConfig,
    StateConfig,
    PWAModuleConfig,
    LayoutConfig,
    StorefrontConfigurableRoutesConfig {}
