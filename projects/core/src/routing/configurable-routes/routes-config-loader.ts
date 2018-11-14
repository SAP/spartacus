import { HttpClient } from '@angular/common/http';
import { ServerConfig } from '../../config/server-config/server-config';
import { Injectable } from '@angular/core';
import { RoutesConfig } from './routes-config';
import { deepMerge } from '../../config/utils/deep-merge';
import { ConfigurableRoutesModuleConfig } from './configurable-routes-module.config';

@Injectable()
export class RoutesConfigLoader {
  private _routesConfig: RoutesConfig;

  get routesConfig(): RoutesConfig {
    return this._routesConfig;
  }

  constructor(
    private readonly http: HttpClient,
    private readonly serverConfig: ServerConfig,
    private readonly configurableRoutesModuleConfig: ConfigurableRoutesModuleConfig
  ) {}

  async load(): Promise<any> {
    const url = this.serverConfig.server.routesConfigUrl;
    const fetchedRoutesConfig = url ? await this.fetch(url) : null;
    this._routesConfig = this.extendStaticWith(fetchedRoutesConfig);
  }

  private fetch(url: string): Promise<any> {
    // TODO: after fail, retry 2 times (or number of retries taken from configuration) and then show/redirect to error page
    return this.http
      .get(url)
      .toPromise()
      .catch(() => {
        throw new Error(`Could not get routes configutation from url ${url}!`);
      });
  }

  private extendStaticWith(routesConfig: RoutesConfig): RoutesConfig {
    const mergedRoutesConfig = deepMerge(
      {},
      this.configurableRoutesModuleConfig.routesConfig,
      routesConfig
    );
    return this.extendLanguagesTranslationsWithDefault(mergedRoutesConfig);
  }

  private extendLanguagesTranslationsWithDefault(
    routesConfig: RoutesConfig
  ): RoutesConfig {
    const defaultTranslations = routesConfig.translations.default;

    Object.keys(routesConfig.translations).forEach(languageCode => {
      const languageTranslations = routesConfig.translations[languageCode];
      routesConfig.translations[languageCode] = Object.assign(
        {},
        defaultTranslations,
        languageTranslations
      );
    });

    return routesConfig;
  }
}
