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

  getPageAndParameters(
    url: string
  ): {
    pageName: string;
    parameters: object;
  } {
    url = removeLeadingSlash(url); // url will be compared with paths translations which do not have leading slash

    // spike todo - it should support nested routes - so return list of page names and matched paths
    const { pageName, matchedPath } = this.getPageAndMatchedPath(url);
    const parameters =
      matchedPath === null ? {} : this.getParametersValues(url, matchedPath);
    return { pageName, parameters };
  }

  private getPageAndMatchedPath(
    url: string
  ): {
    pageName: string;
    matchedPath: string;
  } {
    const pageNames = Object.keys(this.defaultRoutesTranslations);
    const pageNamesLength = pageNames.length;
    for (let i = 0; i < pageNamesLength; i++) {
      const pageName = pageNames[i];
      const paths = this.getDefaultPathsForPage(pageName);
      const matchedPath = paths.find(path =>
        this.areStaticSegmentsIdentical(url, path)
      );
      if (matchedPath) {
        return { pageName, matchedPath };
      }
    }
    return { pageName: null, matchedPath: null };
  }

  private getDefaultPathsForPage(pageName: string): string[] {
    return (
      (this.defaultRoutesTranslations[pageName] &&
        this.defaultRoutesTranslations[pageName].paths) ||
      []
    );
  }

  // compares non-parameter segments
  private areStaticSegmentsIdentical(url: string, path: string): boolean {
    const urlSegments = getSegments(url);
    const pathSegments = getSegments(path);

    if (urlSegments.length !== pathSegments.length) {
      return false;
    }

    const segmentsLength = pathSegments.length;
    for (let i = 0; i < segmentsLength; i++) {
      const pathSegment = pathSegments[i];
      const urlSegment = urlSegments[i];

      if (!isParam(pathSegment) && pathSegment !== urlSegment) {
        return false;
      }
    }
    return true;
  }

  // compares url segments array with segments of path schema. for parameters in path schema it extracts value from relevant segment of url
  private getParametersValues(url: string, path: string): object {
    const urlSegments = getSegments(url);
    const pathSegments = getSegments(path);

    return pathSegments.reduce((accParameters, pathSegment, i) => {
      if (isParam(pathSegment)) {
        const parameterName = getParamName(pathSegment);
        const parameterValue = urlSegments[i];
        return Object.assign(accParameters, {
          [parameterName]: parameterValue
        });
      }
      return accParameters;
    }, {});
  }

  private get defaultRoutesTranslations(): RoutesTranslations {
    return this.routesConfigLoader.routesConfig.translations.default;
  }
}
