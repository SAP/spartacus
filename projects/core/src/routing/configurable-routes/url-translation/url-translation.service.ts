import { Injectable } from '@angular/core';
import { ConfigurableRoutesService } from '../configurable-routes.service';
import { UrlParsingService } from './url-parsing.service';
import { ServerConfig } from '../../../config/server-config/server-config';
import { RouteTranslation, ParamsMapping } from '../routes-config';
import { getParamName, isParam } from './path-utils';
import { TranslateUrlOptions } from './translate-url-options';

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

    return this.generateUrl(options);
  }

  private validateOptions(options: TranslateUrlOptions): boolean {
    if (!options || !options.route) {
      this.warn(
        `Incorrect options for translating url. Options must have 'route' property. Options: `,
        options
      );
      return false;
    }
    return true;
  }

  private generateUrl(options: TranslateUrlOptions): string[] {
    this.standarizeOptions(options);

    if (!options.route) {
      return this.ROOT_URL;
    }

    const routeTranslation = this.configurableRoutesService.getRouteTranslation(
      options.route
    );

    // if no route translation was configured, return root url:
    if (!routeTranslation || !routeTranslation.paths) {
      return this.ROOT_URL;
    }

    // find first path that can satisfy it's parameters with given parameters
    const path = this.findPathWithFillableParams(
      routeTranslation,
      options.params
    );

    // if there is no configured path that can be satisfied with given params, return root url
    if (!path) {
      return this.ROOT_URL;
    }

    const result = this.provideParamsValues(
      path,
      options.params,
      routeTranslation.paramsMapping
    );

    if (!options.relative) {
      result.unshift(''); // ensure absolute path ( leading '' in path array is equivalent to leading '/' in string)
    }

    return result;
  }

  private standarizeOptions(options: TranslateUrlOptions): void {
    options.params = options.params || {};
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
