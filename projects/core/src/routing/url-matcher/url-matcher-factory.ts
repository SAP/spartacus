import { Route, UrlMatcher } from '@angular/router';

/**
 * Configuration of a factory and its injection tokens (deps) to return an Angular `UrlMatcher`.
 */
export class UrlMatcherFactory {
  /**
   * A function to invoke to create an UrlMatcher. The function is invoked with
   * resolved values of `token`s in the `deps` field.
   */
  factory: (...deps) => (route: Route) => UrlMatcher;

  /**
   * A list of `token`s to be resolved by the injector. The list of values is then
   * used as arguments to the `factory` function.
   */
  deps?: any[];
}
