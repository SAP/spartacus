import { HttpClient } from '@angular/common/http';
import { ServerConfig } from '../config/server-config/server-config';
import { Injectable } from '@angular/core';
import { RoutesConfig, defaultRoutesConfig } from './routes-config';
import { deepMerge } from '../config/utils/deep-merge';
import { ConfigurableRoutesModuleConfig } from './configurable-routes-module.config';

@Injectable()
export class ConfigurableRoutesLoader {
  private _routesConfig: RoutesConfig;

  get routesConfig(): RoutesConfig {
    return this._routesConfig;
  }

  constructor(
    private readonly http: HttpClient,
    private readonly serverConfig: ServerConfig,
    private readonly configurableRoutesModuleConfig: ConfigurableRoutesModuleConfig
  ) {}

  loadRoutesConfig(): Promise<any> {
    const url = this.serverConfig.server.routesConfigUrl;
    return url ? this.fetchRoutesConfig(url) : this.setStaticRoutesConfig();
  }

  private fetchRoutesConfig(url: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(url).subscribe(
        (res: RoutesConfig) => {
          this._routesConfig = this.extendStaticRoutesConfig(res);
          return resolve();
        },

        // TODO #185: after fail, retry 2 times (or number of retries taken from configuration) and then show/redirect to error page
        () => reject(`Could not get routes configutation from url ${url}!`)
      );
    });
  }

  setStaticRoutesConfig(): Promise<any> {
    this._routesConfig = this.extendStaticRoutesConfig(null);
    return Promise.resolve();
  }

  private extendStaticRoutesConfig(routesConfig: RoutesConfig): RoutesConfig {
    const mergedRoutesConfig = deepMerge(
      {},
      defaultRoutesConfig,
      this.configurableRoutesModuleConfig.routesConfig,
      routesConfig
    );
    return this.extendTranslationsWithDefault(mergedRoutesConfig);
  }

  private extendTranslationsWithDefault(
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
