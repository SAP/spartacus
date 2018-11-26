import { Injectable } from '@angular/core';
import { Routes, Router, Route } from '@angular/router';
import { ServerConfig } from '../../config/server-config/server-config';
import { RoutesConfigLoader } from './routes-config-loader';
import {
  RoutesConfig,
  RoutesTranslations,
  RouteTranslation
} from './routes-config';

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

  getNestedRoutesTranslations(
    nestedRouteNames: string[],
    routesTranslations: RoutesTranslations = this.currentRoutesTranslations
  ): RouteTranslation[] {
    if (nestedRouteNames.length === 0) {
      return null;
    }
    const result = [];
    const nestedRouteNamesLength = nestedRouteNames.length;

    // traverse down the routesTranslations tree along nestedRouteNames:
    for (let i = 0; i < nestedRouteNamesLength; i++) {
      const routeName = nestedRouteNames[i];
      result.push(this.getRouteTranslation(routeName, routesTranslations));

      // if it's not the last nested page name, go one level deeper in the translations tree:
      if (i < nestedRouteNamesLength - 1) {
        routesTranslations = this.getChildrenRoutesTranslations(
          routeName,
          routesTranslations
        );
        if (!routesTranslations) {
          this.warn(
            // tslint:disable-next-line:max-line-length
            `No children routes translations were configured for page '${routeName}' in nested sequence '${nestedRouteNames}' in language '${
              this.currentLanguageCode
            }'!`
          );
          return null;
        }
      }
    }
    return result;
  }

  private getChildrenRoutesTranslations(
    routeName: string,
    routesTranslations: RoutesTranslations
  ): RoutesTranslations {
    const routeTranslation = this.getRouteTranslation(
      routeName,
      routesTranslations
    );
    return routeTranslation && routeTranslation.children;
  }

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
      const routeName = this.getConfigurable(route, 'cxPath');
      const childrenTranslations = this.getChildrenRoutesTranslations(
        routeName,
        routesTranslations
      );
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
      return this.translateRoutePath(route, routesTranslations);
    }

    if (this.isConfigurable(route, 'cxRedirectTo')) {
      return this.translateRouteRedirectTo(route, routesTranslations);
    }

    return [route]; // if nothing is configurable, just pass the original route
  }

  private isConfigurable(route: Route, key: ConfigurableRouteKey): boolean {
    return !!this.getConfigurable(route, key);
  }

  private getConfigurable(route: Route, key: ConfigurableRouteKey): string {
    return route.data && route.data[key];
  }

  private translateRoutePath(
    route: Route,
    routesTranslations: RoutesTranslations
  ): Route[] {
    return this.getTranslatedPaths(route, 'cxPath', routesTranslations).map(
      translatedPath => {
        return Object.assign({}, route, {
          path: translatedPath
        });
      }
    );
  }

  private translateRouteRedirectTo(
    route: Route,
    translations: RoutesTranslations
  ): Route[] {
    const translatedPaths = this.getTranslatedPaths(
      route,
      'cxRedirectTo',
      translations
    );
    return translatedPaths.length
      ? [Object.assign({}, route, { redirectTo: translatedPaths[0] })] // take the first path from list by convention
      : [];
  }

  private getRouteTranslation(
    routeName: string,
    routesTranslations: RoutesTranslations
  ): RouteTranslation {
    if (!routesTranslations) {
      this.warn(
        `No route translation was configured for page '${routeName}' in language '${
          this.currentLanguageCode
        }'!`
      );
      return null;
    }
    return routesTranslations[routeName];
  }

  private getTranslatedPaths(
    route: Route,
    key: ConfigurableRouteKey,
    routesTranslations: RoutesTranslations
  ): string[] {
    const routeName = this.getConfigurable(route, key);
    const translation = this.getRouteTranslation(routeName, routesTranslations);
    if (!translation) {
      return [];
    }

    if (translation.paths === undefined) {
      this.warn(
        `No route translation paths was configured for page '${routeName}' in language '${
          this.currentLanguageCode
        }'!`
      );
      return [];
    }

    return translation.paths || [];
  }

  private warn(...args) {
    if (!this.config.production) {
      console.warn(...args);
    }
  }
}
