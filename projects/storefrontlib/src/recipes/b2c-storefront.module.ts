import { ModuleWithProviders, NgModule } from '@angular/core';
import { ConfigModule, provideConfig } from '@spartacus/core';
import { provideConfigFromMetaTags } from '../config/provide-config-from-meta-tags';
import { StorefrontModuleConfig } from '../config/storefront-config';
import { LayoutModule } from '../layout';
import { StorefrontModule } from '../storefront.module';
import { b2cLayoutConfig } from './config/b2c-layout-config';
import { defaultCmsContentConfig } from './config/static-cms-structure/default-cms-content.config';

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
  exports: [LayoutModule],
})
export class B2cStorefrontModule {
  static withConfig(config?: StorefrontModuleConfig): ModuleWithProviders {
    return {
      ngModule: B2cStorefrontModule,
      providers: [provideConfig(config), ...provideConfigFromMetaTags()],
    };
  }
}
