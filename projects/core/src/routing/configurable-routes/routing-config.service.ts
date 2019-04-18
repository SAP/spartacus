import { Injectable } from '@angular/core';
import { RoutesConfigTranslations, RouteTranslation } from './routes-config';
import { deepMerge } from '../../config/utils/deep-merge';
import { RoutingConfig } from './config/routing-config';

@Injectable()
export class RoutingConfigService {
  private readonly activeLanguage = 'en'; // TODO: hardcoded! should be removed when more languages are supported by localized routes

  private _translations: RoutesConfigTranslations;

  get translations(): RoutesConfigTranslations {
    return this._translations;
  }

  constructor(private config: RoutingConfig) {}

  async init(): Promise<void> {
    this._translations = this.extendTranslationsWithDefault(
      this.config.routing.translations
    );
  }

  getRouteTranslation(routeName: string): RouteTranslation {
    const routesTranslations = this._translations[this.activeLanguage];

    const result = routesTranslations && routesTranslations[routeName];
    if (!routesTranslations || result === undefined) {
      this.warn(
        `No route translation was configured for page '${routeName}' in language '${
          this.activeLanguage
        }'!`
      );
    }
    return result;
  }

  private extendTranslationsWithDefault(
    translations: RoutesConfigTranslations
  ): RoutesConfigTranslations {
    Object.keys(translations).forEach(languageCode => {
      translations[languageCode] = deepMerge(
        {},
        translations.default,
        translations[languageCode]
      );
    });

    return translations;
  }

  private warn(...args) {
    if (!this.config.production) {
      console.warn(...args);
    }
  }
}
