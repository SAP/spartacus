import { Injectable } from '@angular/core';
import { ServerConfig } from '../../../config/server-config/server-config';
import { ConfigurableRoutesService } from '../configurable-routes.service';
import {
  getSegments,
  isParameter,
  getParameterName,
  ensureLeadingSlash
} from './path-utils';

@Injectable()
export class PathService {
  constructor(
    private configurableRoutesService: ConfigurableRoutesService,
    private config: ServerConfig
  ) {}

  // always returns an absolute path (with leading /)
  transform(pageName: string, parametersObject: object = {}): string {
    const paths = this.configurableRoutesService.getPathsForPage(pageName);

    if (paths === undefined || paths === null) {
      return '/';
    }
    const parameterNamesMapping = this.configurableRoutesService.getParameterNamesMapping(
      pageName
    );

    const path = this.getFirstPathMatchingAllParameters(
      paths,
      parametersObject,
      parameterNamesMapping
    );

    if (path === undefined) {
      if (!this.config.production) {
        console.warn(
          `No configured path matches all its parameters to given object using parameter names mapping. `,
          `Configured paths: `,
          path,
          `. Parameters object: `,
          parametersObject,
          `. Parameter names mapping: `,
          parameterNamesMapping
        );
      }
      return '/';
    }

    const absolutePath = ensureLeadingSlash(path);

    return this.provideParametersValues(
      absolutePath,
      parametersObject,
      parameterNamesMapping
    );
  }

  private provideParametersValues(
    path: string,
    parametersObject: object,
    parameterNamesMapping: object
  ): string {
    return getSegments(path)
      .map(segment => {
        if (isParameter(segment)) {
          const parameterName = getParameterName(segment);
          const mappedParameterName = this.getMappedParameterName(
            parameterName,
            parameterNamesMapping
          );
          const parameterValue = parametersObject[mappedParameterName];
          return this.sanitizeParameterValue(parameterValue);
        }
        return segment;
      })
      .join('/');
  }

  private sanitizeParameterValue(parameterValue: string) {
    return (parameterValue || '').replace(new RegExp('/', 'g'), '%2F');
  }

  private getFirstPathMatchingAllParameters(
    paths: string[],
    parametersObject: object,
    parameterNamesMapping: object
  ): string {
    return paths.find(path =>
      this.getParameters(path).every(parameterName => {
        const mappedParameterName = this.getMappedParameterName(
          parameterName,
          parameterNamesMapping
        );

        return parametersObject[mappedParameterName] !== undefined;
      })
    );
  }

  private getParameters(path: string) {
    return getSegments(path)
      .filter(isParameter)
      .map(getParameterName);
  }

  private getMappedParameterName(
    parameterName: string,
    parameterNamesMapping: object
  ): string {
    return parameterNamesMapping[parameterName] || parameterName;
  }
}
