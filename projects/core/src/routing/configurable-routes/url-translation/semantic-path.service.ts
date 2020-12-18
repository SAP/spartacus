import { Injectable } from '@angular/core';
import { ParamsMapping, RouteConfig } from '../routes-config';
import { RoutingConfigService } from '../routing-config.service';
import { getParamName, isParam } from './path-utils';
import { UrlCommand, UrlCommandRoute, UrlCommands } from './url-command';
import { UrlParsingService } from './url-parsing.service';

@Injectable({ providedIn: 'root' })
export class SemanticPathService {
  readonly ROOT_URL = ['/'];

  constructor(
    protected routingConfigService: RoutingConfigService,
    protected urlParser: UrlParsingService
  ) {}

  /**
   * Returns the first path alias configured for a given route name. It adds `/` at the beginning.
   */
  get(routeName: string): string {
    const routeConfig = this.routingConfigService.getRouteConfig(routeName);
    return routeConfig && Array.isArray(routeConfig.paths)
      ? '/' + routeConfig.paths[0]
      : undefined;
  }

  /**
   * Transforms the array of url commands. Each command can be:
   * a) string - will be left untouched
   * b) object { cxRoute: <route name> } - will be replaced with semantic path
   * c) object { cxRoute: <route name>, params: { ... } } - same as above, but with passed params
   *
   * If the first command is the object with the `cxRoute` property, returns an absolute url (with the first element of the array `'/'`)
   */
  transform(commands: UrlCommands): any[] {
    if (!Array.isArray(commands)) {
      commands = [commands];
    }

    const result: string[] = [];
    for (const command of commands) {
      if (!this.isRouteCommand(command)) {
        // don't modify segment that is not route command:
        result.push(command);
      } else {
        // generate array with url segments for given route command:
        const partialResult = this.generateUrlPart(command);

        if (partialResult === null) {
          return this.ROOT_URL;
        }

        result.push(...partialResult);
      }
    }

    if (this.shouldOutputAbsolute(commands)) {
      result.unshift('/');
    }

    return result;
  }

  private isRouteCommand(command: UrlCommand): boolean {
    return command && Boolean(command.cxRoute);
  }

  private shouldOutputAbsolute(commands: UrlCommands): boolean {
    return this.isRouteCommand(commands[0]);
  }

  private generateUrlPart(command: UrlCommandRoute): string[] | null {
    this.standarizeRouteCommand(command);

    if (!command.cxRoute) {
      return null;
    }

    const routeConfig = this.routingConfigService.getRouteConfig(
      command.cxRoute
    );

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
    return this.urlParser.getPrimarySegments(path).map((segment) => {
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
    const foundPath = routeConfig.paths.find((path) =>
      this.getParams(path).every((paramName) => {
        const mappedParamName = this.getMappedParamName(
          paramName,
          routeConfig.paramsMapping
        );

        return params[mappedParamName] !== undefined;
      })
    );

    if (foundPath === undefined || foundPath === null) {
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
}
