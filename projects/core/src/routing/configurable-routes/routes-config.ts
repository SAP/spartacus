export interface RoutesConfig {
  translations?: {
    default?: RoutesTranslations;
    [languageCode: string]: RoutesTranslations;
  };
}

export interface RoutesTranslations {
  [routeName: string]: RouteTranslation;
}

export interface RouteTranslation {
  paths?: string[];
  paramsMapping?: ParamsMapping;
  children?: RoutesTranslations;
}

export interface ParamsMapping {
  [paramName: string]: string;
}
