import {
  Inject,
  InjectionToken,
  Optional,
  Pipe,
  PipeTransform,
} from '@angular/core';
import { UrlCommand, UrlCommands } from '../url-command';

export const URL_TESTING_ALLOWLISTED_PARAMS = new InjectionToken<string[]>(
  'Array of params keys that will be rendered by the mock cxUrl pipe'
);

/**
 * Prints the arguments of the cxUrl pipe as a raw string. For example:
 * ```
 * { cxRoute:'product', params: { name: 'ABC', code: 123 } } | cxUrl
 * ```
 *
 * will be transformed to:
 *
 * ```
 * cxRoute:product code:123 name:ABC
 * ```
 *
 * **Notes**
 * - `params` are sorted alphabetically by key.
 * - only primitive parameters are be printed (objects won't be printed)
 * - if an input is an array, the parts of output will be separated with space
 * - if an input is a string, it will be printed as string
 * - if the `params` object has too many properties that pollute the output,
 *    they can be allowlisted by using module's method. For example `UrlTestingModule.allowlistParams(['code', 'name'])`
 */
@Pipe({
  name: 'cxUrl',
})
export class MockUrlPipe implements PipeTransform {
  constructor(
    @Inject(URL_TESTING_ALLOWLISTED_PARAMS)
    @Optional()
    private readonly allowlistedParams
  ) {}
  transform(commands: UrlCommands) {
    if (!Array.isArray(commands)) {
      commands = [commands];
    }
    return commands.map((command) => this.transformCommand(command)).join(' ');
  }

  /**
   * Transforms:
   * ```
   * { cxRoute:'product', params: { name: 'ABC', code: 123 } } | cxUrl
   * ```
   *
   * into a string:
   *
   * ```
   * cxRoute:product code:123 name:ABC
   * ```
   *
   * where params are sorted by key.
   */
  private transformCommand(command: UrlCommand): string {
    if (command && command.cxRoute) {
      const route = `cxRoute:${command.cxRoute}`;

      const params = [];
      Object.keys(command.params || {})
        .sort()
        .forEach((paramKey) => {
          const paramValue = command.params[paramKey];
          if (this.shouldShowParam(paramKey, paramValue)) {
            params.push(`${paramKey}:${paramValue}`);
          }
        });

      return params.length ? `${route} ${params.join(' ')}` : route;
    } else if (!isObject(command)) {
      return command;
    }

    // Only primitives and objects with `cxRoute` property are handled by the mock pipe.
    // That being said, objects are valid url commands for Angular
    // (see https://angular.io/guide/router#add-a-secondary-route)
    return '';
  }

  /**
   * When defined allowlisted keys, don't show any non-allowlisted keys.
   * Show only primitive keys.
   */
  private shouldShowParam(key: string, value: any): boolean {
    if (this.allowlistedParams && !this.allowlistedParams.includes(key)) {
      return false;
    }

    return !isObject(value);
  }
}

function isObject(item: any): boolean {
  return item && typeof item === 'object' && !Array.isArray(item);
}
