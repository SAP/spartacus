import { Injectable } from '@angular/core';
import {
  getSegments,
  isParameter,
  getParameterName,
  removeLeadingSlash
} from './path-utils';
import { PathService } from './path.service';
import { RoutesTranslations } from '../routes-config';
import { RoutesConfigLoader } from '../routes-config-loader';

@Injectable()
export class DynamicPathService {
  constructor(
    private pathService: PathService,
    private routesConfigLoader: RoutesConfigLoader
  ) {}

  transform(url: string) {
    const { pageName, parameters } = this.recognizePageAndParameters(url);

    if (!pageName) {
      return url;
    }
    return this.pathService.transform(pageName, parameters);
  }

  private recognizePageAndParameters(
    url: string
  ): {
    pageName: string;
    parameters: object;
  } {
    url = removeLeadingSlash(url); // url will be compared with paths translations which do not have leading slash

    const { pageName, matchedPath } = this.recognizePageAndPath(url);
    return pageName !== null
      ? {
          pageName,
          parameters: this.getParametersValues(url, matchedPath)
        }
      : { pageName: null, parameters: {} };
  }

  private recognizePageAndPath(
    url: string
  ): {
    pageName: string;
    matchedPath: string;
  } {
    const result = Object.keys(this.defaultRoutesTranslations)
      .map(pageName => {
        const paths = this.defaultRoutesTranslations[pageName];
        const matchedPath = paths.find(path => this.match(url, path));
        return { pageName, matchedPath };
      })
      .find(({ matchedPath }) => !!matchedPath);

    return result || { pageName: null, matchedPath: null };
  }

  private match(url: string, pathSchema: string): boolean {
    const urlSegments = getSegments(url);
    const pathSchemaSegments = getSegments(pathSchema);

    if (urlSegments.length !== pathSchemaSegments.length) {
      return false;
    }

    const segmentsLength = pathSchemaSegments.length;
    for (let i = 0; i < segmentsLength; i++) {
      const pathSchemaSegment = pathSchemaSegments[i];
      const urlSegment = urlSegments[i];

      if (!isParameter(pathSchemaSegment) && pathSchemaSegment !== urlSegment) {
        return false;
      }
    }
    return true;
  }

  // compares url segments array with segments of path schema. for parameters in path schema it extracts value from relevant segment of url
  private getParametersValues(url: string, pathSchema: string): object {
    const urlSegments = getSegments(url);
    const pathSchemaSegments = getSegments(pathSchema);

    return pathSchemaSegments.reduce((accParameters, pathSchemaSegment, i) => {
      if (isParameter(pathSchemaSegment)) {
        const parameterName = getParameterName(pathSchemaSegment);
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
