import { Injectable } from '@angular/core';
import { RoutesConfigLoader } from '../routes-config-loader';
import { UrlParserService } from './url-parser.service';
import { RoutesTranslations } from '../routes-config';
import { removeLeadingSlash, isParam, getParamName } from './path-utils';

@Injectable()
export class RouteRecognizerService {
  constructor(
    private routesConfigLoader: RoutesConfigLoader,
    private urlParser: UrlParserService
  ) {}

  recognizeByDefaultUrl(url: string): { name: string; params: object }[] {
    url = removeLeadingSlash(url); // url will be compared with paths translations which do not have leading slash
    const routesTranslations = this.defaultRoutesTranslations;
    const urlSegments = this.urlParser.getPrimarySegments(url);
    const recognizedNestedRoutes = this.getNestedRoutesRecursive(
      urlSegments,
      routesTranslations,
      []
    );

    return recognizedNestedRoutes;
  }

  private getNestedRoutesRecursive(
    remainingUrlSegments: string[],
    routesTranslations: RoutesTranslations,
    accResult: { name: string; params: object }[]
  ): { name: string; params: object }[] {
    if (!routesTranslations) {
      return remainingUrlSegments.length ? null : accResult;
    }
    const routeNames = Object.keys(routesTranslations);
    const routeNamesLength = routeNames.length;

    for (let i = 0; i < routeNamesLength; i++) {
      const routeName = routeNames[i];
      const routeTranslation =
        routesTranslations && routesTranslations[routeName];
      const paths = routeTranslation.paths || [];
      const pathsLength = paths.length;
      for (let j = 0; j < pathsLength; j++) {
        const path = paths[j];
        const pathSegments = this.urlParser.getPrimarySegments(path);
        const params = this.extractParamsIfPathMatchesUrlPrefix(
          remainingUrlSegments,
          pathSegments
        );
        // if some path is matching, try to recognize remaining segments
        if (params) {
          const result = this.getNestedRoutesRecursive(
            remainingUrlSegments.slice(pathSegments.length),
            routeTranslation.children,
            accResult.concat({ name: routeName, params })
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

  private extractParamsIfPathMatchesUrlPrefix(
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
