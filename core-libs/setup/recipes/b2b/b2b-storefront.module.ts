import { ModuleWithProviders, NgModule } from '@angular/core';
import {
  CostCenterModule,
  provideConfig,
  provideDefaultConfig,
  provideDefaultConfigFactory,
} from '@spartacus/core';
import {
  CmsLibModule,
  defaultCmsContentConfig,
  layoutConfig,
  mediaConfig,
  StorefrontConfig,
  StorefrontModule,
} from '@spartacus/storefront';
import { OrganizationModule } from '@spartacus/my-account/organization';
import { defaultB2bOccConfig } from './config/b2b-occ-config';
import { defaultB2bCheckoutConfig } from './config/b2b-checkout-config';

@NgModule({
  imports: [
    StorefrontModule,
    // the cms lib module contains all components that added in the bundle
    CmsLibModule,
    CostCenterModule.forRoot(),
    OrganizationModule,
  ],
  providers: [
    provideDefaultConfig(layoutConfig),
    provideDefaultConfig(mediaConfig),
    provideDefaultConfig(defaultB2bOccConfig),
    provideDefaultConfigFactory(defaultCmsContentConfig),
    provideDefaultConfig(defaultB2bCheckoutConfig),
  ],
  exports: [StorefrontModule],
})
export class B2bStorefrontModule {
  static withConfig(
    config?: StorefrontConfig
  ): ModuleWithProviders<B2bStorefrontModule> {
    return {
      ngModule: B2bStorefrontModule,
      providers: [provideConfig(config)],
    };
  }
}
