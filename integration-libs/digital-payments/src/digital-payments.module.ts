import { dpTranslations } from './translations/translations';
import { dpTranslationChunksConfig } from './translations/translation-chunks-config';
import { DpCheckoutModule } from './checkout/dp-checkout.module';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { provideConfig, ConfigModule, provideDefaultConfig} from '@spartacus/core';
import { DigitalPaymentsConfig } from './config/digital-payments-config';
import { occDigitalPaymentsConfig } from './checkout/adapters/config/occ-digital-payments-endpoint.config';

@NgModule({
  imports: [
    DpCheckoutModule,
    ConfigModule.withConfig({
      i18n: {
        resources: dpTranslations,
        chunks: dpTranslationChunksConfig,
        fallbackLang: 'en',
      },
    }),
  ],
  providers:[provideDefaultConfig(occDigitalPaymentsConfig)],
})
export class DigitalPaymentsModule {
  static forRoot(
    config: DigitalPaymentsConfig
  ): ModuleWithProviders<DigitalPaymentsModule> {
    return {
      ngModule: DigitalPaymentsModule,
      providers: [provideConfig(config)],
    };
  }
}
