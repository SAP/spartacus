import { ModuleWithProviders, NgModule } from '@angular/core';
import { filter, map, take } from 'rxjs/operators';
import {
  ConfigInitializer,
  CONFIG_INITIALIZER,
} from '../config/config-initializer';
import { provideDefaultConfig } from '../config/config-providers';
import { BaseSite } from '../model/misc.model';
import { BaseSiteService } from '../site-context/facade/base-site.service';
import { defaultI18nConfig } from './config/default-i18n-config';
import { I18nConfig } from './config/i18n-config';
import { CxDatePipe } from './date.pipe';
import { i18nextProviders } from './i18next/i18next-providers';
import { I18nextTranslationService } from './i18next/i18next-translation.service';
import { TranslatePipe } from './translate.pipe';
import { TranslationService } from './translation.service';

export function initI18nConfig(
  config: I18nConfig,
  baseSiteService: BaseSiteService
): ConfigInitializer | null {
  /**
   * Load config for `I18nConfig` from backend only when there is no static config for `fallbackLang`
   */
  const fallbackLangExists = typeof config?.i18n?.fallbackLang !== 'undefined';
  if (!fallbackLangExists) {
    return {
      scopes: ['i18n.fallbackLang'],
      configFactory: () =>
        baseSiteService
          .get()
          .pipe(
            filter((baseSite: any) => Boolean(baseSite)),
            map((baseSite: BaseSite) => {
              return {
                i18n: {
                  fallbackLang:
                    baseSite.defaultLanguage?.isocode ||
                    baseSite.baseStore?.defaultLanguage?.isocode,
                },
              };
            }),
            take(1)
          )
          .toPromise(),
    };
  }
  return null;
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
          provide: CONFIG_INITIALIZER,
          useFactory: initI18nConfig,
          deps: [I18nConfig, BaseSiteService],
          multi: true,
        },
      ],
    };
  }
}
