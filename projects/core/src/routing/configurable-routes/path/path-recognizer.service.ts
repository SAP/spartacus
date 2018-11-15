import { Injectable } from '@angular/core';
import {
  getSegments,
  isParameter,
  getParameterName,
  removeLeadingSlash
} from './path-utils';
import { RoutesTranslations } from '../routes-config';
import { RoutesConfigLoader } from '../routes-config-loader';

@Injectable()
export class PathRecognizerService {
  constructor(private routesConfigLoader: RoutesConfigLoader) {}

  getPageAndParameters(
    url: string
  ): {
    pageName: string;
    parameters: object;
  } {
    url = removeLeadingSlash(url); // url will be compared with paths translations which do not have leading slash
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
    const result = Object.keys(this.defaultRoutesTranslations)
      .map(pageName => {
        const paths = this.defaultRoutesTranslations[pageName];
        const matchedPath = paths.find(path =>
          this.areStaticSegmentsIdentical(url, path)
        );
        return { pageName, matchedPath };
      })
      .find(({ matchedPath }) => !!matchedPath);

    return result || { pageName: null, matchedPath: null };
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

      if (!isParameter(pathSegment) && pathSegment !== urlSegment) {
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
      if (isParameter(pathSegment)) {
        const parameterName = getParameterName(pathSegment);
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
