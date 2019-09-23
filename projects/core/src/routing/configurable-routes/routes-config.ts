export interface RoutesConfig {
  [routeName: string]: RouteConfig; // allows User's custom pages
}

export interface RouteConfig {
  /**
   * List of path aliases to match with URL. Also used to build the semantic links.
   */
  paths?: string[];

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
