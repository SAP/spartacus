import { Injectable } from '@angular/core';
import { ConfigurableRoutesService } from '../configurable-routes.service';
import { RouteRecognizerService } from './route-recognizer.service';
import { UrlParsingService } from './url-parsing.service';
import { ServerConfig } from '../../../config/server-config/server-config';
import { RouteTranslation, ParamsMapping } from '../routes-config';
import { getParamName, isParam } from './path-utils';
import {
  TranslateUrlOptions,
  TranslateUrlOptionsRoute,
  TranslateUrlOptionsRouteObject
} from './translate-url-options';

@Injectable()
export class UrlTranslationService {
  readonly ROOT_URL = ['/'];

  constructor(
    private configurableRoutesService: ConfigurableRoutesService,
    private routeRecognizer: RouteRecognizerService,
    private urlParser: UrlParsingService,
    private config: ServerConfig
  ) {}

  translate(options: TranslateUrlOptions): string | string[] {
    // if options are invalid, return the root url
    if (!this.validateOptions(options)) {
      return this.ROOT_URL;
    }

    if (typeof options.url === 'string') {
      const recognizedRoute = this.routeRecognizer.recognizeByDefaultUrl(
        options.url
      );
      return recognizedRoute ? this.generateUrl(recognizedRoute) : options.url;
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

    const urlDefined = options.url || options.url === '';
    const routeDefined = Array.isArray(options.route);
    if (!urlDefined && !routeDefined) {
      this.warn(
        `Incorrect options for translating url. Options must have 'url' or 'route' property. Options: `,
        options
      );
      return false;
    }
    if (urlDefined && routeDefined) {
      this.warn(
        `Incorrect options for translating url. Options cannot have both 'url' and 'route' property. Options: `,
        options
      );
      return false;
    }
    if (urlDefined) {
      return this.validateOptionsUrl(options.url);
    }
    if (routeDefined) {
      return this.validateOptionsRoute(options.route);
    }
    return true;
  }

  private validateOptionsUrl(url: string): boolean {
    if (typeof url !== 'string') {
      this.warn(
        `Incorrect options for translating url.`,
        `'url' property should be a string. Url: `,
        url
      );
      return false;
    }
    return true;
  }

  private validateOptionsRoute(
    nestedRoutes: TranslateUrlOptionsRoute[]
  ): boolean {
    const length = nestedRoutes.length;
    if (!length) {
      this.warn(
        `Incorrect options for translating url.`,
        `'route' array should not be empty. Route: `,
        nestedRoutes
      );
      return false;
    }

    for (let i = 0; i < length; i++) {
      const nestedRoute = nestedRoutes[i];
      if (typeof nestedRoute !== 'string' && !nestedRoute.name) {
        this.warn(
          `Incorrect options for translating url.`,
          `'route' array can contain only elements which are string or object with 'name' property. Route: `,
          nestedRoutes
        );
        return false;
      }
    }
    return true;
  }

  private generateUrl(nestedRoutes: TranslateUrlOptionsRoute[]): string[] {
    const standarizedNestedRoutes = this.standarizeNestedRoutes(nestedRoutes);

    // if no routes given, return root url
    if (!standarizedNestedRoutes.length) {
      return this.ROOT_URL;
    }

    const {
      nestedRoutesNames,
      nestedRoutesParams
    } = this.splitRoutesNamesAndParams(standarizedNestedRoutes);

    const nestedRoutesTranslations = this.configurableRoutesService.getNestedRoutesTranslations(
      nestedRoutesNames
    );

    // if no routes translations were configured, return root url:
    if (!nestedRoutesTranslations) {
      return this.ROOT_URL;
    }

    const [leafNestedRouteTranslation] = nestedRoutesTranslations.slice(-1);

    // if leaf route was disabled in config (set to null), return root url:
    if (!leafNestedRouteTranslation.paths) {
      return this.ROOT_URL;
    }

    // find first path for every nested route that can satisfy it's parameters with given parameters
    const nestedRoutesPaths = this.findPathsWithFillableParams(
      nestedRoutesTranslations,
      nestedRoutesParams
    );

    // if not every nested route had configured path that can be satisfied with given params, return root url
    if (!nestedRoutesPaths) {
      return this.ROOT_URL;
    }

    const result = this.provideParamsValues(
      nestedRoutesPaths,
      nestedRoutesParams,
      nestedRoutesTranslations.map(
        routTranslation => routTranslation.paramsMapping
      )
    );

    result.unshift(''); // ensure absolute path ( leading '' in path array is equvalent to leading '/' in string)
    return result;
  }

  /**
   * Converts all elements to objects
   */
  private standarizeNestedRoutes(
    nestedRoutes: TranslateUrlOptionsRoute[]
  ): TranslateUrlOptionsRouteObject[] {
    return (nestedRoutes || []).map(route =>
      typeof route === 'string'
        ? { name: route, params: {} }
        : { name: route.name, params: route.params || {} }
    );
  }

  private splitRoutesNamesAndParams(
    nestedRoutes: TranslateUrlOptionsRouteObject[]
  ): {
    nestedRoutesNames: string[];
    nestedRoutesParams: object[];
  } {
    return (nestedRoutes || []).reduce(
      ({ nestedRoutesNames, nestedRoutesParams }, route) => ({
        nestedRoutesNames: [...nestedRoutesNames, route.name],
        nestedRoutesParams: [...nestedRoutesParams, route.params]
      }),
      { nestedRoutesNames: [], nestedRoutesParams: [] }
    );
  }

  private provideParamsValues(
    nestedRoutesPaths: string[],
    nestedRoutesParams: object[],
    nestedRoutesParamsMappings: ParamsMapping[]
  ): string[] {
    const length = nestedRoutesPaths.length;
    const result = [];
    for (let i = 0; i < length; i++) {
      const path = nestedRoutesPaths[i];
      const paramsObject = nestedRoutesParams[i];
      const paramsMapping = nestedRoutesParamsMappings[i];
      const pathSegments = this.provideParamsValuesForSingleRoute(
        path,
        paramsObject,
        paramsMapping
      );
      result.push(...pathSegments);
    }
    return result;
  }

  private provideParamsValuesForSingleRoute(
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

  private findPathsWithFillableParams(
    nestedRoutesTranslations: RouteTranslation[],
    nestedRoutesParams: object[]
  ): string[] {
    const length = nestedRoutesTranslations.length;
    const result = [];
    for (let i = 0; i < length; i++) {
      const routeTranslation = nestedRoutesTranslations[i];
      const paramsObject = nestedRoutesParams[i];
      const path = this.findPartialPathWithFillableParams(
        routeTranslation.paths,
        paramsObject,
        routeTranslation.paramsMapping
      );
      if (path === undefined || path === null) {
        this.warn(
          `No configured path matches all its params to given object. `,
          `Route translation: `,
          routeTranslation,
          `(in nested routes translations list`,
          nestedRoutesTranslations,
          `). Params object: `,
          paramsObject,
          `(in params objects list`,
          nestedRoutesParams,
          `)`
        );
        return null;
      }
      result.push(path);
    }
    return result;
  }

  // find first path that can fill all its params with values from given object
  private findPartialPathWithFillableParams(
    paths: string[],
    params: object,
    paramsMapping: ParamsMapping
  ): string {
    return paths.find(path =>
      this.getParams(path).every(paramName => {
        const mappedParamName = this.getMappedParamName(
          paramName,
          paramsMapping
        );

        return params[mappedParamName] !== undefined;
      })
    );
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
