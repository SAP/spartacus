import { Injectable } from '@angular/core';
import { ConfigurableRoutesService } from '../configurable-routes.service';
import { RouteRecognizerService } from './route-recognizer.service';
import { UrlParserService } from './url-parser.service';
import { ServerConfig } from 'projects/core/src/config/server-config/server-config';
import { RouteTranslation, ParamsMapping } from '../routes-config';
import { getParamName, isParam } from './path-utils';
import { TranslateUrlOptions } from './translate-url-options';

@Injectable()
export class UrlTranslatorService {
  readonly ROOT_URL = ['/'];

  constructor(
    private configurableRoutesService: ConfigurableRoutesService,
    private routeRecognizer: RouteRecognizerService,
    private urlParser: UrlParserService,
    private config: ServerConfig
  ) {}

  translate(options: TranslateUrlOptions): string | string[] {
    /**
     * SPIKE TODO: write it
     * It has to:
     * - be object
     * - contain string 'url'
     * or
     * - contain array 'route'
     *  - every item has to be:
     *    - string
     *    or
     *    - object with at least 'name' property
     */
    // this.validateOptions(options); // spike todo implement

    let nestedRoutesNames;
    let nestedRoutesParams;

    // if string url was passed, try to recognize route by default url shape:
    if (options.url && typeof options.url === 'string') {
      ({
        nestedRoutesNames,
        nestedRoutesParams
      } = this.routeRecognizer.recognizeByDefaultUrl(options.url));

      // if cannot recognize route, return original url
      if (!nestedRoutesNames) {
        return options.url;
      }
    } else if (options.route) {
      // spike todo pass route definition, not split it to 2 arrays: spliting is temporary here:
      nestedRoutesNames = [];
      nestedRoutesParams = [];
      options.route.map(routeOptions => {
        if (typeof routeOptions === 'string') {
          nestedRoutesNames.push(routeOptions);
          nestedRoutesParams.push(undefined);
        } else {
          nestedRoutesNames.push(routeOptions.name);
          nestedRoutesParams.push(routeOptions.params);
        }
      });
    } else {
      return this.ROOT_URL;
    }

    return this.generateUrl(nestedRoutesNames, nestedRoutesParams);
  }

  private generateUrl(
    nestedRoutesNames: string[],
    nestedRoutesParams?: object[]
  ): string[] {
    // if no routes names given, return root url
    if (!nestedRoutesNames || !nestedRoutesNames.length) {
      return this.ROOT_URL;
    }

    nestedRoutesParams = this.ensureListLength(
      nestedRoutesParams,
      nestedRoutesNames.length,
      {}
    );

    const nestedRoutesTranslations = this.configurableRoutesService.getNestedRoutesTranslations(
      nestedRoutesNames
    );

    // if no routes translations were configured, return root url:
    if (!nestedRoutesTranslations) {
      return this.ROOT_URL;
    }

    const [leafNestedRouteTranslation] = nestedRoutesTranslations.slice(-1);

    // if no route was switched off in config (set to null), return root url:
    if (!leafNestedRouteTranslation.paths) {
      return this.ROOT_URL;
    }

    // find first path for every nested route that can staisfy it's parameters with given parameters
    const nestedRoutesPaths = this.findPathsWithFillableParams(
      nestedRoutesTranslations,
      nestedRoutesParams
    );

    // if not every nested route had configured path that can be satisfied with given params, return root url
    if (!nestedRoutesPaths) {
      return this.ROOT_URL;
    }

    const result = this.provideParamsValues(
      nestedRoutesPaths,
      nestedRoutesParams,
      nestedRoutesTranslations.map(
        routTranslation => routTranslation.paramsMapping
      )
    );

    result.unshift(''); // ensure absolute path ( leading '' in path array is equvalent to leading '/' in string)
    return result;
  }

  private ensureListLength(
    list: any[],
    expectedLength: number,
    fillingElement: any
  ): object[] {
    list = list || [];
    const missingLength = expectedLength - list.length;
    if (missingLength < 0) {
      return list;
    }
    const missingArray = new Array(missingLength).fill(fillingElement);
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
