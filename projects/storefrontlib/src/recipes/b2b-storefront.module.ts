import { ModuleWithProviders, NgModule } from '@angular/core';
import {
  ConfigModule,
  OrganizationModule,
  provideConfig,
} from '@spartacus/core';
import { CmsLibModule } from '../cms-components/cms-lib.module';
import { StorefrontConfig } from '../storefront-config';
import { b2bLayoutConfig } from './config/b2b-layout-config';
import { defaultCmsContentConfig } from './config/static-cms-structure/default-cms-content.config';
import { StorefrontModule } from './storefront.module';

@NgModule({
  imports: [
    OrganizationModule.forRoot(),
    StorefrontModule.withConfig(<StorefrontConfig>{
      pwa: {
        enabled: true,
        addToHomeScreen: true,
      },
    }),

    ConfigModule.withConfig(b2bLayoutConfig),
    ConfigModule.withConfigFactory(defaultCmsContentConfig),

    // the cms lib module contains all components that added in the bundle
    CmsLibModule,
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
