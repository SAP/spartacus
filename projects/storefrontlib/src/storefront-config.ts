import {
  AnonymousConsentsConfig,
  AsmConfig,
  AuthConfig,
  CartConfig,
  CmsConfig,
  ExternalRoutesConfig,
  GlobalMessageConfig,
  I18nConfig,
  OccConfig,
  PageMetaConfig,
  PersonalizationConfig,
  RoutingConfig,
  SiteContextConfig,
  StateConfig,
} from '@spartacus/core';
import { CheckoutConfig } from './cms-components/checkout/config/checkout-config';
import { IconConfig } from './cms-components/misc/icon/icon.model';
import { QualtricsConfig } from './cms-components/misc/qualtrics/config/qualtrics-config';
import { PWAModuleConfig } from './cms-structure/pwa/pwa.module-config';
import { SeoConfig } from './cms-structure/seo/config';
import { FeatureToggles } from './feature-toggles';
import { KeyboardFocusConfig } from './layout';
import { SkipLinkConfig } from './layout/a11y/skip-link/config/index';
import { LayoutConfig } from './layout/config/layout-config';
import { DirectionConfig } from './layout/direction/config/direction.config';
import { PaginationConfig } from './shared/components/list-navigation/pagination/index';
import { MediaConfig } from './shared/components/media/media.config';
import { ViewConfig } from './shared/config/view-config';

export type StorefrontConfig =
  | AnonymousConsentsConfig
  | AuthConfig
  | CmsConfig
  | OccConfig
  | QualtricsConfig
  | StateConfig
  | PWAModuleConfig
  | SiteContextConfig
  | LayoutConfig
  | DirectionConfig
  | MediaConfig
  | RoutingConfig
  | I18nConfig
  | PersonalizationConfig
  | IconConfig
  | CheckoutConfig
  | GlobalMessageConfig
  | ExternalRoutesConfig
  | ViewConfig
  | FeatureToggles
  | AsmConfig
  | SkipLinkConfig
  | PaginationConfig
  | CartConfig
  | SeoConfig
  | PageMetaConfig
  | KeyboardFocusConfig;
