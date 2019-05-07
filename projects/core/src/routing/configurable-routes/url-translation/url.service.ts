import { Injectable } from '@angular/core';
import { UrlParsingService } from './url-parsing.service';
import { ServerConfig } from '../../../config/server-config/server-config';
import { RouteConfig, ParamsMapping } from '../routes-config';
import { getParamName, isParam } from './path-utils';
import {
  UrlCommandRoute,
  UrlCommands,
  UrlGenerationOptions,
} from './url-command';
import { RoutingConfigService } from '../routing-config.service';

@Injectable({ providedIn: 'root' })
export class UrlService {
  readonly ROOT_URL = ['/'];

  constructor(
    private routingConfigService: RoutingConfigService,
    private urlParser: UrlParsingService,
    private config: ServerConfig
  ) {}

  generateUrl(
    commands: UrlCommands,
    options: UrlGenerationOptions = {}
  ): any[] {
    if (!Array.isArray(commands)) {
      commands = [commands];
    }

    const result: string[] = [];
    for (const command of commands) {
      if (!command || !command.route) {
        // don't modify segment that is not route command:
        result.push(command);
      } else {
        // generate array with url segments for given options object:
        const partialResult = this.generateUrlPart(command);

        if (partialResult === null) {
          return this.ROOT_URL;
        }

        result.push(...partialResult);
      }
    }

    if (!options.relative) {
      result.unshift(''); // ensure absolute path ( leading '' in path array is equivalent to leading '/' in string)
    }

    return result;
  }

  private generateUrlPart(command: UrlCommandRoute): string[] | null {
    this.standarizeRouteCommand(command);

    if (!command.route) {
      return null;
    }

    const routeConfig = this.routingConfigService.getRouteConfig(command.route);

    // if no route translation was configured, return null:
    if (!routeConfig || !routeConfig.paths) {
      return null;
    }

    // find first path that can satisfy it's parameters with given parameters
    const path = this.findPathWithFillableParams(routeConfig, command.params);

    // if there is no configured path that can be satisfied with given params, return null
    if (!path) {
      return null;
    }

    const result = this.provideParamsValues(
      path,
      command.params,
      routeConfig.paramsMapping
    );

    return result;
  }

  private standarizeRouteCommand(command: UrlCommandRoute): void {
    command.params = command.params || {};
  }

  private provideParamsValues(
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

  private findPathWithFillableParams(
    routeConfig: RouteConfig,
    params: object
  ): string {
    const foundPath = routeConfig.paths.find(path =>
      this.getParams(path).every(paramName => {
        const mappedParamName = this.getMappedParamName(
          paramName,
          routeConfig.paramsMapping
        );

        return params[mappedParamName] !== undefined;
      })
    );

    if (foundPath === undefined || foundPath === null) {
      this.warn(
        `No configured path matches all its params to given object. `,
        `Route config: `,
        routeConfig,
        `Params object: `,
        params
      );
      return null;
    }
    return foundPath;
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
