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
  languageService: LanguageService
): () => Promise<any> {
  return () => {
    let i18NextConfig: i18next.InitOptions = {
      fallbackLng: config.translation.fallbackLng,
      ns: config.translation.ns,
      debug: config.translation.debug
    };
    if (config.translation.backend) {
      i18n.use(i18nextXhrBackend);
      i18NextConfig = { ...i18NextConfig, backend: config.translation.backend };
    }
    return i18n.init(i18NextConfig, () => {
      // Don't use i18next's 'resources' config key, because it will disable loading chunks from backend.
      // Resources should be added, in the callback.
      addTranslations(i18n, config.translation.resources);
      syncSiteContextWithI18Next(i18n, languageService);
    });
  };
}

export function addTranslations(
  i18n: i18next.i18n,
  resources: i18next.Resource = {}
) {
  Object.keys(resources).forEach(lang => {
    Object.keys(resources[lang]).forEach(namespace => {
      i18n.addResourceBundle(
        lang,
        namespace,
        resources[lang][namespace],
        true,
        true
      );
    });
  });
}

export function syncSiteContextWithI18Next(
  i18n: i18next.i18n,
  language: LanguageService
) {
  // always update language of i18next on site context change
  language.getActive().subscribe(lang => i18n.changeLanguage(lang));
}
