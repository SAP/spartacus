import { ModuleWithProviders, NgModule } from '@angular/core';
import { ConfigModule, provideConfig } from '@spartacus/core';
import { defaultCmsContentConfig } from '../cms-structure';
import { StorefrontModule } from '../storefront.module';
import { b2cLayoutConfig } from './layout/b2c-layout-config';
import { provideConfigFromMetaTags } from './provide-config-from-meta-tags';
import { StorefrontModuleConfig } from './storefront-config';

@NgModule({
  imports: [
    StorefrontModule.withConfig(<StorefrontModuleConfig>{
      siteContext: {
        urlEncodingParameters: ['BASE_SITE', 'LANGUAGE', 'CURRENCY'],
        BASE_SITE: {
          persistence: 'route',
        },
      },
      pwa: {
        enabled: true,
        addToHomeScreen: true,
      },
    }),
    ConfigModule.withConfig(b2cLayoutConfig),
    ConfigModule.withConfigFactory(defaultCmsContentConfig),
  ],
})
export class B2cStorefrontModule {
  static withConfig(config?: StorefrontModuleConfig): ModuleWithProviders {
    return {
      ngModule: B2cStorefrontModule,
      providers: [provideConfig(config), ...provideConfigFromMetaTags()],
    };
  }
}
