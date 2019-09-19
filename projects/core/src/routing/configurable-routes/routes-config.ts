export interface RoutesConfig {
  [routeName: string]: RouteConfig; // allows User's custom pages
}

export interface RouteConfig {
  paths?: string[];
  paramsMapping?: ParamsMapping;
  disabled?: boolean;
  protected?: boolean;
}

export interface ParamsMapping {
  [paramName: string]: string;
}
