import { ModuleWithProviders, NgModule } from '@angular/core';
import {
  provideConfig,
  provideDefaultConfig,
  provideDefaultConfigFactory,
} from '@spartacus/core';
import {
  CmsLibModule,
  defaultB2bCheckoutConfig,
  defaultCmsContentConfig,
  layoutConfig,
  mediaConfig,
  StorefrontConfig,
  StorefrontModule,
} from '@spartacus/storefront';
import { OrganizationModule } from '../organization.module';
import { defaultB2bOccConfig } from './config/b2b-occ-config';
import { organizationLayoutConfig } from './config/organization-layout.config';

@NgModule({
  imports: [
    OrganizationModule,
    StorefrontModule,
    // the cms lib module contains all components that added in the bundle
    CmsLibModule,
  ],
  providers: [
    provideDefaultConfig({
      pwa: {
        enabled: true,
        addToHomeScreen: true,
      },
    }),
    provideDefaultConfig(layoutConfig),
    provideDefaultConfig(organizationLayoutConfig),
    provideDefaultConfig(mediaConfig),
    provideDefaultConfig(defaultB2bOccConfig),
    provideDefaultConfigFactory(defaultCmsContentConfig),
    provideDefaultConfig(defaultB2bCheckoutConfig),
  ],
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
