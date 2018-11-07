import { Injectable } from '@angular/core';
import { Routes, Router, Route } from '@angular/router';
import { ServerConfig } from '../config/server-config/server-config';
import { ConfigurableRoutesLoader } from './configurable-routes-loader';
import { RoutesConfig, RoutesTranslations } from './routes-config';

type ConfigurableRouteKey = 'cxPath' | 'cxRedirectTo';

@Injectable()
export class ConfigurableRoutesService {
  constructor(
    private readonly config: ServerConfig,
    private readonly router: Router,
    private readonly loader: ConfigurableRoutesLoader
  ) {
    this.routesConfig = this.loader.routesConfig;
  }

  private readonly DEFAULT_LANGUAGE_CODE = 'default';

  private routesConfig: RoutesConfig;
  private currentLanguageCode: string = this.DEFAULT_LANGUAGE_CODE;

  private get currentRoutesTranslations(): RoutesTranslations {
    return this.routesConfig.translations[this.currentLanguageCode];
  }

  changeLanguage(languageCode: string) {
    if (this.routesConfig.translations[languageCode] === undefined) {
      if (!this.config.production) {
        console.warn(
          `There are no translations in routes config for language code '${languageCode}'.`,
          `The default routes translations will be used instead: `,
          this.routesConfig.translations.default
        );
      }
      this.currentLanguageCode = this.DEFAULT_LANGUAGE_CODE;
    } else {
      this.currentLanguageCode = languageCode;
    }

    this.router.resetConfig(this.translateRoutes(this.router.config));
  }

  getPathsForPage(pageName: string): string[] {
    const paths = this.currentRoutesTranslations[pageName];
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
    return this.routesConfig.parameterNamesMapping[pageName] || {};
  }

  // TODO #187: spike of handling properly nested routes
  private translateRoutes(routes: Routes): Routes {
    const translatedRoutes = [];
    routes.forEach(route => {
      // we assume that 'path' and 'redirectTo' cannot be both configurable for one route
      if (this.isConfigurable(route, 'cxPath')) {
        translatedRoutes.push(...this.translatePath(route));
        return;
      }

      if (this.isConfigurable(route, 'cxRedirectTo')) {
        translatedRoutes.push(this.translateRedirectTo(route));
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
        path: translatedPath,
        matcher:
          translatedPath === null
            ? () => false // soft delete route - it won't match any url
            : null
      });
    });
  }

  private translateRedirectTo(route: Route): Route {
    const translatedPaths = this.getConfiguredPaths(route, 'cxRedirectTo');
    const newRedirectTo = translatedPaths[0]; // get the first path from list by convention
    return Object.assign({}, route, { redirectTo: newRedirectTo });
  }

  private getConfiguredPaths(
    route: Route,
    key: ConfigurableRouteKey
  ): string[] {
    const pageName = this.getConfigurable(route, key);
    const paths = this.getPathsForPage(pageName);

    return paths === undefined || paths === null ? [null] : paths;
  }
}
