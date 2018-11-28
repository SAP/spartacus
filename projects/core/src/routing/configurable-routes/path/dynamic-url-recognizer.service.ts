import { Injectable } from '@angular/core';
import { RoutesConfigLoader } from '../routes-config-loader';
import { UrlParser } from './url-parser.service';
import { RoutesTranslations } from '../routes-config';
import { removeLeadingSlash, isParam, getParamName } from './path-utils';

@Injectable()
export class DynamicUrlRecognizerService {
  constructor(
    private routesConfigLoader: RoutesConfigLoader,
    private urlParser: UrlParser
  ) {}

  getNestedRoutes(
    url: string
  ): {
    nestedRoutesNames: string[];
    nestedRoutesParams: object[];
  } {
    url = removeLeadingSlash(url); // url will be compared with paths translations which do not have leading slash
    const routesTranslations = this.defaultRoutesTranslations;
    const urlSegments = this.urlParser.getPrimarySegments(url);
    const recognizedNestedRoutes = this.getNestedRoutesRecursive(
      urlSegments,
      routesTranslations,
      []
    );

    if (recognizedNestedRoutes) {
      const nestedRoutesNames: string[] = [];
      const nestedRoutesParams: object[] = [];
      recognizedNestedRoutes.forEach(recognizedNestedRoute => {
        nestedRoutesNames.push(recognizedNestedRoute.routeName);
        nestedRoutesParams.push(recognizedNestedRoute.params);
      });
      return { nestedRoutesNames, nestedRoutesParams };
    }
    return { nestedRoutesNames: null, nestedRoutesParams: null };
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
      const paths = routeTranslation.paths;
      // SPIKE TODO: improve readability here:
      const pathsLength = paths.length;
      for (let j = 0; j < pathsLength; j++) {
        const path = paths[j];
        const pathSegments = this.urlParser.getPrimarySegments(path);
        const params = this.extractParamsIfMatchingStaticSegments(
          remainingUrlSegments,
          pathSegments
        );
        // if some path is matching, try to match remaining segments
        if (params) {
          const result = this.getNestedRoutesRecursive(
            remainingUrlSegments.slice(pathSegments.length),
            routeTranslation.children,
            accResult.concat({ routeName, params })
          );
          // if remaining segments were successfuly matched, return result. otherwise continue loop for other paths and routes
          if (result) {
            return result;
          }
        }
      }
    }

    return remainingUrlSegments.length ? null : accResult;
  }

  private extractParamsIfMatchingStaticSegments(
    urlSegments: string[],
    pathSegments: string[]
  ): object {
    const params = {};
    const pathSegmentsLength = pathSegments.length;
    const urlSegmentsLength = urlSegments.length;
    if (urlSegmentsLength < pathSegmentsLength) {
      return null;
    }

    for (let i = 0; i < pathSegmentsLength; i++) {
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
    return this.routesConfigLoader.routesConfig.translations
      .default as RoutesTranslations;
  }
}
