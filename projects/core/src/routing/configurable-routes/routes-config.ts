import { UrlMatcher } from '@angular/router';

export interface RoutesConfig {
  [routeName: string]: RouteConfig; // allows User's custom pages
}

export interface RouteConfig {
  /**
   * List of path aliases used to build the semantic links.
   * It's used also to match the URLs, unless the config property `matchers` is given for this route.
   *
   * See https://angular.io/api/router/Route#path
   */
  paths?: string[];

  /**
   * List of Angular `UrlMatcher` or Spartacus `UrlMatcherFactory`. When not given, the configured `paths` are used to match the URLs.
   *
   * See https://angular.io/api/router/Route#matcher
   */
  matchers?: (UrlMatcher | UrlMatcherFactory)[];

  /**
   * Maps names of route params with params used to build the semantic link.
   */
  paramsMapping?: ParamsMapping;

  /**
   * Disables the url matcher for the route. But still allows for generation of semantic links.
   */
  disabled?: boolean;

  /**
   * When false, the route is public for unauthorized users even when the global flag `routing.protected` is true.
   * Other values (true, undefined) are ignored.
   */
  protected?: boolean;
}

export interface ParamsMapping {
  [paramName: string]: string;
}

/**
 * Configuration of a factory and its injection tokens (deps) to return an Angular `UrlMatcher`.
 */
export class UrlMatcherFactory {
  /**
   * A function to invoke to create an UrlMatcher. The function is invoked with
   * resolved values of `token`s in the `deps` field.
   */
  factory: Function;

  /**
   * A list of `token`s to be resolved by the injector. The list of values is then
   * used as arguments to the `factory` function.
   */
  deps?: any[];
}
