import { Injectable } from '@angular/core';
import { ConfigurableRoutesService } from '../configurable-routes.service';
import { UrlParsingService } from './url-parsing.service';
import { ServerConfig } from '../../../config/server-config/server-config';
import { RouteTranslation, ParamsMapping } from '../routes-config';
import { getParamName, isParam } from './path-utils';
import {
  TranslateUrlOptions,
  TranslateUrlOptionsRoute,
  TranslateUrlOptionsRouteObject,
} from './translate-url-options';

@Injectable()
export class UrlTranslationService {
  readonly ROOT_URL = ['/'];

  constructor(
    private configurableRoutesService: ConfigurableRoutesService,
    private urlParser: UrlParsingService,
    private config: ServerConfig
  ) {}

  translate(options: TranslateUrlOptions): string[] {
    // if options are invalid, return the root url
    if (!this.validateOptions(options)) {
      return this.ROOT_URL;
    }

    return this.generateUrl(options.route);
  }

  private validateOptions(options: TranslateUrlOptions): boolean {
    if (!options || typeof options !== 'object') {
      this.warn(
        `Incorrect options for translating url. Options have to be an object. Options: `,
        options
      );
      return false;
    }

    if (!options.route) {
      this.warn(
        `Incorrect options for translating url. Options must have 'route' array property. Options: `,
        options
      );
      return false;
    }

    if (typeof options.route !== 'string' && !options.route.name) {
      this.warn(
        `Incorrect options for translating url.`,
        `'route' can be only string or object with 'name' property. Route: `,
        options.route
      );
      return false;
    }
    return true;
  }

  private generateUrl(route: TranslateUrlOptionsRoute): string[] {
    const standarizedRoute = this.standarizeRoute(route);

    if (!standarizedRoute.name) {
      return this.ROOT_URL;
    }

    const routeTranslation = this.configurableRoutesService.getRouteTranslation(
      standarizedRoute.name
    );

    // if no route translation was configured, return root url:
    if (!routeTranslation || !routeTranslation.paths) {
      return this.ROOT_URL;
    }

    // find first path that can satisfy it's parameters with given parameters
    const path = this.findPathWithFillableParams(
      routeTranslation,
      standarizedRoute.params
    );

    // if there is no configured path that can be satisfied with given params, return root url
    if (!path) {
      return this.ROOT_URL;
    }

    const result = this.provideParamsValues(
      path,
      standarizedRoute.params,
      routeTranslation.paramsMapping
    );

    if (!standarizedRoute.relative) {
      result.unshift(''); // ensure absolute path ( leading '' in path array is equivalent to leading '/' in string)
    }

    return result;
  }

  /**
   * Converts route options to object
   */
  private standarizeRoute(
    route: TranslateUrlOptionsRoute
  ): TranslateUrlOptionsRouteObject {
    return typeof route === 'string'
      ? { name: route, params: {} }
      : {
          name: route.name,
          params: route.params || {},
          relative: route.relative,
        };
  }

  private provideParamsValues(
    path: string,
    params: object,
    paramsMapping: ParamsMapping
  ): string[] {
    return this.urlParser.getPrimarySegments(path).map(segment => {
      if (isParam(segment)) {
        const paramName = getParamName(segment);
        const mappedParamName = this.getMappedParamName(
          paramName,
          paramsMapping
        );
        return params[mappedParamName];
      }
      return segment;
    });
  }

  private findPathWithFillableParams(
    routeTranslation: RouteTranslation,
    params: object
  ): string {
    const foundPath = routeTranslation.paths.find(path =>
      this.getParams(path).every(paramName => {
        const mappedParamName = this.getMappedParamName(
          paramName,
          routeTranslation.paramsMapping
        );

        return params[mappedParamName] !== undefined;
      })
    );

    if (foundPath === undefined || foundPath === null) {
      this.warn(
        `No configured path matches all its params to given object. `,
        `Route translation: `,
        routeTranslation,
        `Params object: `,
        params
      );
      return null;
    }
    return foundPath;
  }

  private getParams(path: string) {
    return this.urlParser
      .getPrimarySegments(path)
      .filter(isParam)
      .map(getParamName);
  }

  private getMappedParamName(paramName: string, paramsMapping: object): string {
    if (paramsMapping) {
      return paramsMapping[paramName] || paramName;
    }
    return paramName;
  }

  private warn(...args) {
    if (!this.config.production) {
      console.warn(...args);
    }
  }
}
