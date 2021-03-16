import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { map, take } from 'rxjs/operators';
import { ConfigInitializerService } from '../config/config-initializer/config-initializer.service';
import { provideDefaultConfig } from '../config/config-providers';
import { defaultI18nConfig } from './config/default-i18n-config';
import { CxDatePipe } from './date.pipe';
import { i18nextProviders } from './i18next/i18next-providers';
import { I18nextTranslationService } from './i18next/i18next-translation.service';
import { TranslatePipe } from './translate.pipe';
import { TranslationService } from './translation.service';

export function initI18nConfig(configInit: ConfigInitializerService) {
  const result = () =>
    configInit
      .getStable('context.language')
      .pipe(
        map((config) => {
          if (config?.i18n?.fallbackLang !== undefined) {
            return {
              i18n: {
                // the first language in the array is the default one
                fallbackLang: config?.context?.langauge?.[0],
              },
            };
          }
        }),
        take(1)
      )
      .toPromise();
  return result;
}

@NgModule({
  declarations: [TranslatePipe, CxDatePipe],
  exports: [TranslatePipe, CxDatePipe],
})
export class I18nModule {
  static forRoot(): ModuleWithProviders<I18nModule> {
    return {
      ngModule: I18nModule,
      providers: [
        provideDefaultConfig(defaultI18nConfig),
        { provide: TranslationService, useExisting: I18nextTranslationService },
        ...i18nextProviders,
        {
          provide: APP_INITIALIZER,
          useFactory: initI18nConfig,
          deps: [ConfigInitializerService],
          multi: true,
        },
      ],
    };
  }
}
