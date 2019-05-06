export interface RoutesConfig {
  [routeName: string]: RouteConfig; // allows User's custom pages
}

export interface RouteConfig {
  paths?: string[];
  paramsMapping?: ParamsMapping;
}

export interface ParamsMapping {
  [paramName: string]: string;
}
