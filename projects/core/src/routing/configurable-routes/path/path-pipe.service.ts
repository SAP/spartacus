import { Injectable } from '@angular/core';
import { ServerConfig } from '../../../config/server-config/server-config';
import { ConfigurableRoutesService } from '../configurable-routes.service';
import { RouteTranslation, ParamsMapping } from '../routes-config';
import { UrlParser } from './url-parser.service';
import { isParam, getParamName } from './path-utils';

@Injectable()
export class PathPipeService {
  constructor(
    private configurableRoutesService: ConfigurableRoutesService,
    private urlParser: UrlParser,
    private config: ServerConfig
  ) {}

  readonly ROOT_PATH = ['/'];

  transform(
    nestedRoutesNames: string[],
    nestedRoutesParams?: object[]
  ): string[] {
    if (!nestedRoutesNames.length) {
      return this.ROOT_PATH;
    }

    nestedRoutesParams = this.complementListWithEmptyObjects(
      nestedRoutesParams,
      nestedRoutesNames.length
    );

    const nestedRoutesTranslations = this.configurableRoutesService.getNestedRoutesTranslations(
      nestedRoutesNames
    );
    if (!nestedRoutesTranslations) {
      return this.ROOT_PATH;
    }

    const [leafNestedRouteTranslation] = nestedRoutesTranslations.slice(-1);
    if (!leafNestedRouteTranslation.paths) {
      return this.ROOT_PATH;
    }

    const nestedRoutesFoundPaths = this.findPathsWithFillableParams(
      nestedRoutesTranslations,
      nestedRoutesParams
    );
    if (!nestedRoutesFoundPaths) {
      return this.ROOT_PATH;
    }

    const result = this.provideParamsValues(
      nestedRoutesFoundPaths,
      nestedRoutesParams,
      nestedRoutesTranslations.map(
        routTranslation => routTranslation.paramsMapping
      )
    );

    result.unshift(''); // ensure absolute path ( leading '' in array is equvalent to leading '/' in string)
    return result;
  }

  private complementListWithEmptyObjects(
    list: any[],
    expectedLength: number
  ): object[] {
    list = list || [];
    const missingLength = expectedLength - list.length;
    if (missingLength < 0) {
      return list;
    }
    const missingArray = new Array(missingLength).fill({});
    return list.concat(missingArray);
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
