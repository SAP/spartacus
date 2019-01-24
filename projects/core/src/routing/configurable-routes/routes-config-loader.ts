import { HttpClient } from '@angular/common/http';
import { ServerConfig } from '../../config/server-config/server-config';
import { Injectable } from '@angular/core';
import { RoutesConfig } from './routes-config';
import { deepMerge } from '../../config/utils/deep-merge';
import { ConfigurableRoutesConfig } from './config/configurable-routes-config';
import { retry } from 'rxjs/operators';
import { ConfigurableRoutesService } from './configurable-routes.service';

const ENDPOINT_ROUTES_CONFIG = 'routes-config';

@Injectable()
export class RoutesConfigLoader {
  private _routesConfig: RoutesConfig;

  get routesConfig(): RoutesConfig {
    return this._routesConfig;
  }

  get endpoint(): string {
    return 'http://localhost:3000/routes-config';
  }

  constructor(
    private readonly http: HttpClient,
    private readonly serverConfig: ServerConfig,
    private readonly configurableRoutesConfig: ConfigurableRoutesConfig,
    private readonly configurableRoutesService: ConfigurableRoutesService
  ) {}

  async load(): Promise<void> {
    const shouldFetch = this.configurableRoutesConfig.routesConfig.fetch;
    const fetchedRoutesConfig = shouldFetch
      ? await this.fetch(this.endpoint)
      : null;
    this._routesConfig = this.extendStaticWith(fetchedRoutesConfig);
    this.configurableRoutesService.init(this._routesConfig.translations);
  }

  private fetch(url: string): Promise<any> {
    return this.http
      .get(url)
      .pipe(retry(2))
      .toPromise()
      .catch(() => {
        throw new Error(`Could not get routes configutation from url ${url}!`);
      });
  }

  private extendStaticWith(routesConfig: RoutesConfig): RoutesConfig {
    const mergedRoutesConfig = deepMerge(
      {},
      this.configurableRoutesConfig.routesConfig,
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
      routesConfig.translations[languageCode] = deepMerge(
        {},
        defaultTranslations,
        languageTranslations
      );
    });

    return routesConfig;
  }
}
