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

  changeLanguage(languageCode: string) {
    this._routesConfig = this.loader.routesConfig; // spike todo quickfix - use only line in constructor and fix

    if (this._routesConfig.translations[languageCode] === undefined) {
      this.warn(
        `There are no translations in routes config for language code '${languageCode}'.`,
        `The default routes translations will be used instead: `,
        this._routesConfig.translations.default
      );
      this.currentLanguageCode = this.DEFAULT_LANGUAGE_CODE;
    } else {
      this.currentLanguageCode = languageCode;
    }

    this.router.resetConfig(
      this.translateRoutes(this.router.config, this.currentRoutesTranslations)
    );
  }

  getPathsForPage(
    pageName: string,
    routesTranslations: RoutesTranslations = this.currentRoutesTranslations
  ): string[] {
    const paths =
      routesTranslations[pageName] && routesTranslations[pageName].paths;
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
  private translateRoutes(
    routes: Routes,
    routesTranslations: RoutesTranslations
  ): Routes {
    const result = [];
    routes.forEach(route => {
      const translatedRouteAliases = this.translateRoute(
        route,
        routesTranslations
      );
      if (route.children && route.children.length) {
        const translatedChildrenRoutes = this.translateChildrenRoutes(
          route,
          routesTranslations
        );
        translatedRouteAliases.forEach(translatedRouteAlias => {
          translatedRouteAlias.children = translatedChildrenRoutes;
        });
      }
      result.push(...translatedRouteAliases);
    });
    return result;
  }

  private translateChildrenRoutes(
    route: Route,
    routesTranslations: RoutesTranslations
  ): Routes {
    if (this.isConfigurable(route, 'cxPath')) {
      const pageName = this.getConfigurable(route, 'cxPath');
      const childrenTranslations = routesTranslations[pageName].children;
      return this.translateRoutes(route.children, childrenTranslations);
    }
    return null;
  }

  private translateRoute(
    route: Route,
    routesTranslations: RoutesTranslations
  ): Routes {
    if (this.isConfigurable(route, 'cxPath')) {
      // we assume that 'path' and 'redirectTo' cannot be both configured for one route
      if (
        this.isConfigurable(route, 'cxRedirectTo') &&
        !this.config.production
      ) {
        this.warn(
          `A path should not have set both "cxPath" and "cxRedirectTo" properties! Route: '${route}`
        );
      }
      return this.translatePath(route, routesTranslations);
    }

    if (this.isConfigurable(route, 'cxRedirectTo')) {
      return this.translateRedirectTo(route, routesTranslations);
    }

    return [route]; // if nothing is configurable, just pass the original route
  }

  private isConfigurable(route: Route, key: ConfigurableRouteKey): boolean {
    return !!this.getConfigurable(route, key);
  }

  private getConfigurable(route: Route, key: ConfigurableRouteKey): string {
    return route.data && route.data[key];
  }

  private translatePath(
    route: Route,
    routesTranslations: RoutesTranslations
  ): Route[] {
    return this.getConfiguredPaths(route, 'cxPath', routesTranslations).map(
      translatedPath => {
        return Object.assign({}, route, {
          path: translatedPath
        });
      }
    );
  }

  private translateRedirectTo(
    route: Route,
    translations: RoutesTranslations
  ): Route[] {
    const translatedPaths = this.getConfiguredPaths(
      route,
      'cxRedirectTo',
      translations
    );
    return translatedPaths.length
      ? [Object.assign({}, route, { redirectTo: translatedPaths[0] })] // take the first path from list by convention
      : [];
  }

  private getConfiguredPaths(
    route: Route,
    key: ConfigurableRouteKey,
    translations: RoutesTranslations
  ): string[] {
    const pageName = this.getConfigurable(route, key);
    const paths = this.getPathsForPage(pageName, translations);

    return paths === undefined || paths === null ? [] : paths;
  }

  private warn(...args) {
    if (!this.config.production) {
      console.warn(...args);
    }
  }
}
