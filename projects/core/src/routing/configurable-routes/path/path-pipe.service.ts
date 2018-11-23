import { Injectable } from '@angular/core';
import { ServerConfig } from '../../../config/server-config/server-config';
import { ConfigurableRoutesService } from '../configurable-routes.service';
import { getSegments, isParam, getParamName } from './path-utils';
import { RouteTranslation, ParamsMapping } from '../routes-config';

@Injectable()
export class PathPipeService {
  constructor(
    private configurableRoutesService: ConfigurableRoutesService,
    private config: ServerConfig
  ) {}

  readonly ROOT_PATH = ['/'];

  transform(nestedRoutesNames: string[], paramsObjects?: object[]): string[] {
    // spike todo: support here nested routes given in array (and paramsObjects array for them) - for now we use only first level
    paramsObjects = this.complementParamsObjectsList(
      paramsObjects,
      nestedRoutesNames.length
    );

    const nestedRoutesTranslations = this.configurableRoutesService.getRoutesTranslations(
      nestedRoutesNames
    );
    if (!nestedRoutesTranslations) {
      return this.ROOT_PATH;
    }

    const [leafNestedRouteTranslation] = nestedRoutesTranslations.slice(-1);
    if (!leafNestedRouteTranslation.paths) {
      return this.ROOT_PATH;
    }

    const nestedRoutesPaths = this.findPathsWithFillableParams(
      nestedRoutesTranslations,
      paramsObjects
    );
    if (!nestedRoutesPaths) {
      return this.ROOT_PATH;
    }

    const result = this.provideParamsValues(
      nestedRoutesPaths,
      paramsObjects,
      nestedRoutesTranslations.map(
        routTranslation => routTranslation.paramsMapping
      )
    );

    result.unshift('/'); // ensure absolute path
    return result;
  }

  private complementParamsObjectsList(
    paramsObjects: object[],
    expectedLength: number
  ): object[] {
    paramsObjects = paramsObjects || [];
    const missingLength = expectedLength - paramsObjects.length;
    if (missingLength < 0) {
      return paramsObjects;
    }
    const missingparamsObjects = new Array(missingLength).fill({});
    return paramsObjects.concat(missingparamsObjects);
  }

  private provideParamsValues(
    nestedRoutesPaths: string[],
    paramsObjects: object[],
    paramsMappings: ParamsMapping[]
  ): string[] {
    const length = nestedRoutesPaths.length;
    const result = [];
    for (let i = 0; i < length; i++) {
      const path = nestedRoutesPaths[i];
      const paramsObject = paramsObjects[i];
      const paramsMapping = paramsMappings[i];
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
    paramsObject: object,
    paramsMapping: ParamsMapping
  ): string[] {
    return getSegments(path).map(segment => {
      if (isParam(segment)) {
        const paramName = getParamName(segment);
        const mappedParamName = this.getMappedParamName(
          paramName,
          paramsMapping
        );
        return paramsObject[mappedParamName];
      }
      return segment;
    });
  }

  private findPathsWithFillableParams(
    nestedRoutesTranslations: RouteTranslation[],
    paramsObjects: object[]
  ): string[] {
    const length = nestedRoutesTranslations.length;
    const result = [];
    for (let i = 0; i < length; i++) {
      const routeTranslation = nestedRoutesTranslations[i];
      const paramsObject = paramsObjects[i];
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
          paramsObjects,
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
    paramsObject: object,
    paramsMapping: ParamsMapping
  ): string {
    return paths.find(path =>
      this.getParams(path).every(paramName => {
        const mappedParamName = this.getMappedParamName(
          paramName,
          paramsMapping
        );

        return paramsObject[mappedParamName] !== undefined;
      })
    );
  }

  private getParams(path: string) {
    return getSegments(path)
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
