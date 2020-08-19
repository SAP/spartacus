import { ModuleWithProviders, NgModule } from '@angular/core';
import {
  provideConfig,
  provideDefaultConfig,
  provideDefaultConfigFactory,
} from '@spartacus/core';
import {
  CmsLibModule,
  defaultCmsContentConfig,
  mediaConfig,
  StorefrontConfig,
  StorefrontModule,
} from '@spartacus/storefront';
import { OrganizationModule } from '../organization.module';
import { b2bLayoutConfig } from './config/b2b-layout-config';
import { defaultB2bOccConfig } from './config/b2b-occ-config';

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
    provideDefaultConfig(b2bLayoutConfig),
    provideDefaultConfig(mediaConfig),
    provideDefaultConfig(defaultB2bOccConfig),
    provideDefaultConfigFactory(defaultCmsContentConfig),
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
