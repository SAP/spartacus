import { Injectable } from '@angular/core';
import {
  getSegments,
  isParameter,
  getParameterName,
  removeLeadingSlash
} from './path-utils';
import { PathService } from './path.service';
import { ConfigurableRoutesLoader } from '../configurable-routes-loader';
import { RoutesTranslations } from '../routes-config';

@Injectable()
export class DynamicPathService {
  constructor(
    private pathService: PathService,
    private configurableRoutesLoader: ConfigurableRoutesLoader
  ) {}

  transform(url: string) {
    const { pageName, parameters } = this.recognizeRoute(url);

    if (!pageName) {
      return url;
    }
    return this.pathService.transform(pageName, parameters);
  }

  private recognizeRoute(
    url: string
  ): {
    pageName: string;
    parameters: object;
  } {
    url = removeLeadingSlash(url); // url will be compared with paths translations which do not have leading slash

    const urlSegments = getSegments(url);
    const pageName = this.getPageNameWithLongestMatchingSegmentsPrefix(
      urlSegments
    );
    if (!pageName) {
      return { pageName, parameters: {} };
    }

    const pathSchema = this.getPathWithSameSegmentsNumber(
      urlSegments,
      pageName
    );
    return {
      pageName,
      parameters: this.getParametersValues(urlSegments, pathSchema)
    };
  }

  // compares url segments array with segments of path schema. for parameters in path schema it extracts value from relevant segment of url
  private getParametersValues(
    urlSegments: string[],
    pathSchema: string
  ): object {
    const parameters = {};
    const pathSchemaSegments = getSegments(pathSchema);
    const pathSchemaSegmentsLength = pathSchemaSegments.length;
    for (let i = 0; i < pathSchemaSegmentsLength; i++) {
      const pathSchemaSegment = pathSchemaSegments[i];
      if (isParameter(pathSchemaSegment)) {
        const parameterName = getParameterName(pathSchemaSegment);
        parameters[parameterName] = urlSegments[i];
      }
    }
    return parameters;
  }

  private getPathWithSameSegmentsNumber(
    urlSegments: string[],
    pageName: string
  ): string {
    const paths = this.defaultRoutesTranslations[pageName];
    return paths.find(path => urlSegments.length === getSegments(path).length);
  }

  private getPageNameWithLongestMatchingSegmentsPrefix(urlSegments: string[]) {
    return Object.keys(this.defaultRoutesTranslations)
      .map(pageName => {
        const paths = this.defaultRoutesTranslations[pageName];
        const commonPrefixLengths = paths.map(path => {
          const pathSegments = getSegments(path);
          return this.getCommonPrefix(urlSegments, pathSegments).length;
        });
        return {
          pageName,
          maxCommonPrefixLength: Math.max(...commonPrefixLengths)
        };
      })
      .reduce(
        (best, current) =>
          current.maxCommonPrefixLength > best.maxCommonPrefixLength
            ? current
            : best,
        {
          pageName: null,
          maxCommonPrefixLength: 0
        }
      ).pageName;
  }

  private getCommonPrefix(listA: string[], listB: string[]): string[] {
    const commonPrefix = [];
    const listALength = listA.length;
    for (let i = 0; i < listALength; i++) {
      if (listA[i] === listB[i]) {
        commonPrefix.push(listA[i]);
      } else {
        break;
      }
    }
    return commonPrefix;
  }

  private get defaultRoutesTranslations(): RoutesTranslations {
    return this.configurableRoutesLoader.routesConfig.translations.default;
  }
}
