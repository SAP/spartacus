import { Injectable } from '@angular/core';
import { ConfigurableRoutesService } from '../configurable-routes.service';
import { UrlParsingService } from './url-parsing.service';
import { ServerConfig } from '../../../config/server-config/server-config';
import { RouteTranslation, ParamsMapping } from '../routes-config';
import { getParamName, isParam } from './path-utils';
import {
  TranslateUrlOptions,
  TranslateUrlOptionsRoute,
  TranslateUrlMetaOptions,
} from './translate-url-options';

@Injectable()
export class UrlTranslationService {
  readonly ROOT_URL = ['/'];

  constructor(
    private configurableRoutesService: ConfigurableRoutesService,
    private urlParser: UrlParsingService,
    private config: ServerConfig
  ) {}

  translate(
    optionsList: TranslateUrlOptions,
    metaOptions: TranslateUrlMetaOptions = {}
  ): any[] {
    if (!Array.isArray(optionsList)) {
      optionsList = [optionsList];
    }

    const result: string[] = [];
    for (let i = 0; i < optionsList.length; i++) {
      const options = optionsList[i];
      if (!options || !options.route) {
        // don't modify segments that are not route options:
        result.push(options);
      } else {
        // generate array with url segments for given options object:
        const partialResult = this.generateUrl(options);

        if (partialResult === null) {
          return this.ROOT_URL;
        }

        result.push(...partialResult);
      }
    }

    if (!metaOptions.relative) {
      result.unshift(''); // ensure absolute path ( leading '' in path array is equivalent to leading '/' in string)
    }

    return result;
  }

  private generateUrl(options: TranslateUrlOptionsRoute): string[] | null {
    this.standarizeOptions(options);

    if (!options.route) {
      return null;
    }

    const routeTranslation = this.configurableRoutesService.getRouteTranslation(
      options.route
    );

    // if no route translation was configured, return null:
    if (!routeTranslation || !routeTranslation.paths) {
      return null;
    }

    // find first path that can satisfy it's parameters with given parameters
    const path = this.findPathWithFillableParams(
      routeTranslation,
      options.params
    );

    // if there is no configured path that can be satisfied with given params, return null
    if (!path) {
      return null;
    }

    const result = this.provideParamsValues(
      path,
      options.params,
      routeTranslation.paramsMapping
    );

    return result;
  }

  private standarizeOptions(options: TranslateUrlOptionsRoute): void {
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
