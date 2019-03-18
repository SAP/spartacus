import i18next from 'i18next';
import i18nextXhrBackend from 'i18next-xhr-backend';
import { I18NConfig } from '../config/i18n-config';
import { LanguageService } from '../../site-context/facade/language.service';

export function i18NextInit(
  config: I18NConfig,
  languageService: LanguageService
): () => Promise<any> {
  return () => {
    let i18NextConfig: i18next.InitOptions = {
      fallbackLng: config.i18n.fallbackLang,
      ns: config.i18n.preloadNamespaces,
      debug: config.i18n.debug
    };
    if (config.i18n.backend) {
      i18next.use(i18nextXhrBackend);
      i18NextConfig = { ...i18NextConfig, backend: config.i18n.backend };
    }
    return i18next.init(i18NextConfig, () => {
      // Don't use i18next's 'resources' config key for adding static translations,
      // because it will disable loading chunks from backend. We add resources here, in the init's callback.
      i18NextAddTranslations(config.i18n.resources);
      syncI18NextWithSiteContext(languageService);
    });
  };
}

export function i18NextAddTranslations(resources: i18next.Resource = {}) {
  Object.keys(resources).forEach(lang => {
    Object.keys(resources[lang]).forEach(namespace => {
      i18next.addResourceBundle(
        lang,
        namespace,
        resources[lang][namespace],
        true,
        true
      );
    });
  });
}

export function syncI18NextWithSiteContext(language: LanguageService) {
  // always update language of i18next on site context (language) change
  language.getActive().subscribe(lang => i18next.changeLanguage(lang));
}
