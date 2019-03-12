import { NgModule, ModuleWithProviders } from '@angular/core';
import { TranslatePipe } from './translate.pipe';
import { i18nextProviders } from './i18next';
import { defaultTranslationConfig } from './config/default-translation-config';
import { TranslationConfig } from './config/translation-config';
import { TranslationService } from './translation.service';
import { provideConfig, Config } from '../config/config.module';

@NgModule({
  declarations: [TranslatePipe],
  exports: [TranslatePipe]
})
export class TranslationModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: TranslationModule,
      providers: [
        provideConfig(defaultTranslationConfig),
        { provide: TranslationConfig, useExisting: Config },
        TranslationService,
        ...i18nextProviders
      ]
    };
  }
}
