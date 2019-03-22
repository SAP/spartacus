import { NgModule, ModuleWithProviders } from '@angular/core';
import { TranslatePipe } from './translate.pipe';
import { i18nextProviders } from './i18next/i18next-providers';
import { defaultI18nConfig } from './config/default-i18n-config';
import { I18nConfig } from './config/i18n-config';
import { TranslationService } from './translation.service';
import { provideConfig, Config } from '../config/config.module';

@NgModule({
  declarations: [TranslatePipe],
  exports: [TranslatePipe]
})
export class I18nModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: I18nModule,
      providers: [
        provideConfig(defaultI18nConfig),
        { provide: I18nConfig, useExisting: Config },
        TranslationService,
        ...i18nextProviders
      ]
    };
  }
}
