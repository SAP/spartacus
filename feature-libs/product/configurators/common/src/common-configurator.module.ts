import { NgModule } from '@angular/core';
import { translationChunksConfig, translations } from '@spartacus/assets';
import { provideConfig } from '@spartacus/core';
import {
  configuratorTranslationChunksConfig,
  configuratorTranslations,
} from './assets/translations/translations';
import { CommonConfiguratorComponentsModule } from './components/common-configurator-components.module';
import { ConfigurationMessageLoaderModule } from './components/message/configurator-message-loader.module';
import { CommonConfiguratorCoreModule } from './core/common-configurator-core.module';

@NgModule({
  imports: [
    CommonConfiguratorCoreModule,
    CommonConfiguratorComponentsModule,
    ConfigurationMessageLoaderModule,
  ],
  providers: [
    provideConfig({
      i18n: {
        resources: {
          en: { ...translations.en, ...configuratorTranslations.en },
        },
        chunks: {
          ...translationChunksConfig,
          ...configuratorTranslationChunksConfig,
        },

        fallbackLang: 'en',
      },
    }),
  ],
})
export class CommonConfiguratorModule {}
