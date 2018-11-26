import { Injectable } from '@angular/core';
import {
  getSegments,
  isParam,
  getParamName,
  removeLeadingSlash
} from './path-utils';
import { RoutesTranslations } from '../routes-config';
import { RoutesConfigLoader } from '../routes-config-loader';

@Injectable()
export class DynamicUrlRecognizerService {
  constructor(private routesConfigLoader: RoutesConfigLoader) {}

  getNestedRoutes(
    url: string
  ): {
    nestedRouteNames: string[];
    paramsObjects: object[];
  } {
    url = removeLeadingSlash(url); // url will be compared with paths translations which do not have leading slash
    const routesTranslations = this.defaultRoutesTranslations;
    const urlSegments = getSegments(url); // spike todo parse it using angular Router.parseUrl()
    const recognizedNestedRoutes = this.getNestedRoutesRecursive(
      urlSegments,
      routesTranslations,
      []
    );

    if (recognizedNestedRoutes) {
      const nestedRouteNames: string[] = [];
      const paramsObjects: object[] = [];
      recognizedNestedRoutes.forEach(recognizedNestedRoute => {
        nestedRouteNames.push(recognizedNestedRoute.routeName);
        paramsObjects.push(recognizedNestedRoute.params);
      });
      return { nestedRouteNames, paramsObjects };
    }
    return { nestedRouteNames: null, paramsObjects: null };
  }

  private getNestedRoutesRecursive(
    remainingUrlSegments: string[],
    routesTranslations: RoutesTranslations,
    accResult: { routeName: string; params: object }[]
  ): { routeName: string; params: object }[] {
    if (!routesTranslations) {
      return remainingUrlSegments.length ? null : accResult;
    }
    const routeNames = Object.keys(routesTranslations);
    const routeNamesLength = routeNames.length;
    for (let i = 0; i < routeNamesLength; i++) {
      const routeName = routeNames[i];
      const routeTranslation = routesTranslations[routeName];

      // SPIKE TODO: improve readability here:
      const {
        matchingPathSegments,
        params
      } = this.extractParamsFromMatchingPath(
        remainingUrlSegments,
        routeTranslation.paths
      );
      // if some path is matching:
      if (matchingPathSegments) {
        return this.getNestedRoutesRecursive(
          remainingUrlSegments.slice(matchingPathSegments.length),
          routeTranslation.children,
          accResult.concat({ routeName, params })
        );
      }
    }

    return remainingUrlSegments.length ? null : accResult;
  }

  private extractParamsFromMatchingPath(
    urlSegments: string[],
    paths: string[]
  ): {
    matchingPathSegments: string[];
    params: object;
  } {
    const pathsLength = paths.length;
    for (let i = 0; i < pathsLength; i++) {
      const path = paths[i];
      const pathSegments = getSegments(path);
      const params = this.extractParamsIfMatchingPath(
        urlSegments,
        pathSegments
      );
      if (params) {
        return { matchingPathSegments: pathSegments, params };
      }
    }
    return { matchingPathSegments: null, params: null };
  }

  // returns extracted params when static params are matching or null otherwise
  private extractParamsIfMatchingPath(
    urlSegments: string[],
    pathSegments: string[]
  ): object {
    const params = {};
    const segmentsLength = pathSegments.length;
    for (let i = 0; i < segmentsLength; i++) {
      const pathSegment = pathSegments[i];
      const urlSegment = urlSegments[i];

      if (isParam(pathSegment)) {
        const paramName = getParamName(pathSegment);
        params[paramName] = urlSegment;
      } else {
        if (pathSegment !== urlSegment) {
          return null;
        }
      }
    }
    return params;
  }

  private get defaultRoutesTranslations(): RoutesTranslations {
    return this.routesConfigLoader.routesConfig.translations.default;
  }
}
