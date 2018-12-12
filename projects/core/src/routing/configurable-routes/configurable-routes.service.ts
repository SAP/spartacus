import { Injectable } from '@angular/core';
import { Routes, Router, Route } from '@angular/router';
import { ServerConfig } from '../../config/server-config/server-config';
import { RoutesConfigLoader } from './routes-config-loader';
import { RoutesConfig, RoutesTranslations } from './routes-config';

type ConfigurableRouteKey = 'cxPath' | 'cxRedirectTo';

@Injectable()
export class ConfigurableRoutesService {
  constructor(
    private readonly config: ServerConfig,
    private readonly router: Router,
    private readonly loader: RoutesConfigLoader
  ) {
    this._routesConfig = this.loader.routesConfig;
  }

  private readonly DEFAULT_LANGUAGE_CODE = 'default';

  private _routesConfig: RoutesConfig;
  private currentLanguageCode: string = this.DEFAULT_LANGUAGE_CODE;

  private get currentRoutesTranslations(): RoutesTranslations {
    return this._routesConfig.translations[this.currentLanguageCode];
  }

  changeLanguage(languageCode: string): void {
    if (this._routesConfig.translations[languageCode] === undefined) {
      if (!this.config.production) {
        console.warn(
          `There are no translations in routes config for language code '${languageCode}'.`,
          `The default routes translations will be used instead: `,
          this._routesConfig.translations.default
        );
      }
      this.currentLanguageCode = this.DEFAULT_LANGUAGE_CODE;
    } else {
      this.currentLanguageCode = languageCode;
    }

    this.router.resetConfig(this.translateRoutes(this.router.config));
  }

  getPathsForPage(pageName: string): string[] {
    const paths: string[] = this.currentRoutesTranslations[pageName];
    if (paths === undefined && !this.config.production) {
      console.warn(
        `No paths were configured for page '${pageName}' in language '${
          this.currentLanguageCode
        }'!`
      );
    }
    return paths;
  }

  getParameterNamesMapping(pageName: string): object {
    return this._routesConfig.parameterNamesMapping[pageName] || {};
  }

  // TODO #187: spike of handling properly nested routes
  private translateRoutes(routes: Routes): Routes {
    const translatedRoutes: Routes = [];
    routes.forEach(route => {
      if (this.isConfigurable(route, 'cxPath')) {
        translatedRoutes.push(...this.translatePath(route));

        // we assume that 'path' and 'redirectTo' cannot be both configurable for one route
        if (
          this.isConfigurable(route, 'cxRedirectTo') &&
          !this.config.production
        ) {
          console.warn(
            `A path should not have set both "cxPath" and "cxRedirectTo" properties! Route: '${route}`
          );
        }
        return;
      }

      if (this.isConfigurable(route, 'cxRedirectTo')) {
        translatedRoutes.push(...this.translateRedirectTo(route));
        return;
      }

      translatedRoutes.push(route); // if nothing is configurable, just pass the original route
    });
    return translatedRoutes;
  }

  private isConfigurable(route: Route, key: ConfigurableRouteKey): boolean {
    return !!this.getConfigurable(route, key);
  }

  private getConfigurable(route: Route, key: ConfigurableRouteKey): string {
    return route.data && route.data[key];
  }

  private translatePath(route: Route): Route[] {
    return this.getConfiguredPaths(route, 'cxPath').map(translatedPath => {
      return Object.assign({}, route, {
        path: translatedPath
      });
    });
  }

  private translateRedirectTo(route: Route): Route[] {
    const translatedPaths = this.getConfiguredPaths(route, 'cxRedirectTo');
    return translatedPaths.length
      ? [Object.assign({}, route, { redirectTo: translatedPaths[0] })] // take the first path from list by convention
      : [];
  }

  private getConfiguredPaths(
    route: Route,
    key: ConfigurableRouteKey
  ): string[] {
    const pageName = this.getConfigurable(route, key);
    const paths = this.getPathsForPage(pageName);

    return paths === undefined || paths === null ? [] : paths;
  }
}
