import i18next from 'i18next';
import i18nextXhrBackend from 'i18next-xhr-backend';
import { ConfigInitializerService } from '../../config/config-initializer/config-initializer.service';
import { LanguageService } from '../../site-context/facade/language.service';
import { TranslationResources } from '../translation-resources';

export function i18nextInit(
  configInit: ConfigInitializerService,
  languageService: LanguageService
): () => Promise<any> {
  return () =>
    configInit.getStableConfig('i18n.fallbackLang').then(config => {
      let i18nextConfig: i18next.InitOptions = {
        ns: [], // don't preload any namespaces
        fallbackLng: config.i18n.fallbackLang,
        debug: config.i18n.debug,
        interpolation: {
          escapeValue: false,
        },
      };
      if (config.i18n.backend) {
        i18next.use(i18nextXhrBackend);
        i18nextConfig = { ...i18nextConfig, backend: config.i18n.backend };
      }

      return i18next.init(i18nextConfig, () => {
        // Don't use i18next's 'resources' config key for adding static translations,
        // because it will disable loading chunks from backend. We add resources here, in the init's callback.
        i18nextAddTranslations(config.i18n.resources);
        syncI18nextWithSiteContext(languageService);
      });
    });
}

export function i18nextAddTranslations(resources: TranslationResources = {}) {
  Object.keys(resources).forEach(lang => {
    Object.keys(resources[lang]).forEach(chunkName => {
      i18next.addResourceBundle(
        lang,
        chunkName,
        resources[lang][chunkName],
        true,
        true
      );
    });
  });
}

export function syncI18nextWithSiteContext(language: LanguageService) {
  // always update language of i18next on site context (language) change
  language.getActive().subscribe(lang => i18next.changeLanguage(lang));
}
