import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { provideConfig, provideDefaultConfig } from '@spartacus/core';
import { CmsLibModule } from '../cms-components/cms-lib.module';
import { StorefrontConfig } from '../storefront-config';
import { layoutConfig, mediaConfig } from './config/index';
import { defaultCmsContentProviders } from './config/static-cms-structure';
import { StorefrontModule } from './storefront.module';

@NgModule({
  imports: [
    HttpClientModule,
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
    provideDefaultConfig(mediaConfig),
    ...defaultCmsContentProviders,
  ],
  exports: [StorefrontModule],
})
export class B2cStorefrontModule {
  static withConfig(
    config?: StorefrontConfig
  ): ModuleWithProviders<B2cStorefrontModule> {
    return {
      ngModule: B2cStorefrontModule,
      providers: [provideConfig(config)],
    };
  }
}
