import i18next from 'i18next';
import i18nextXhrBackend from 'i18next-xhr-backend';

import { InjectionToken, Provider, APP_INITIALIZER } from '@angular/core';
import { TranslationConfig } from './config/translation-config';
import { LanguageService } from '../site-context/facade/language.service';

export const I18NEXT_INSTANCE = new InjectionToken<i18next.i18n>('i18next');

export const i18nextProviders: Provider[] = [
  { provide: I18NEXT_INSTANCE, useValue: i18next },
  {
    provide: APP_INITIALIZER,
    useFactory: initI18Next,
    deps: [I18NEXT_INSTANCE, TranslationConfig, LanguageService],
    multi: true
  }
];

export function initI18Next(
  i18n: i18next.i18n,
  config: TranslationConfig,
  language: LanguageService
): () => Promise<any> {
  return () =>
    i18n.use(i18nextXhrBackend).init(
      {
        fallbackLng: config.translation.fallbackLng,
        ns: config.translation.ns,
        backend: config.translation.backend
      },
      // callback invoked after i18next initialization:
      () => {
        // always update language of i18next on site context change
        language.getActive().subscribe(lang => i18n.changeLanguage(lang));
      }
    );
}
