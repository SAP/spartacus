import { ModuleWithProviders, NgModule } from '@angular/core';
import {
  provideConfig,
  provideDefaultConfig,
  provideDefaultConfigFactory,
} from '@spartacus/core';
import {
  CmsLibModule,
  StorefrontConfig,
  StorefrontModule,
} from '@spartacus/storefront';
import { OrganizationModule } from '../organization.module';
import {
  b2bLayoutConfig,
  defaultB2bOccConfig,
  mediaConfig,
} from './config/index';
import { defaultCmsContentConfig } from './config/static-cms-structure/default-cms-content.config';

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
