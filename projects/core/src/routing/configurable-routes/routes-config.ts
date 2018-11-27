import { StorefrontRoutesTranslations } from './config/storefront-routes-translations';

export interface RoutesConfig {
  translations?: {
    default?: RoutesTranslations | StorefrontRoutesTranslations;
    [languageCode: string]: RoutesTranslations | StorefrontRoutesTranslations;
  };
  fetch?: boolean;
}

export interface RoutesTranslations {
  [routeName: string]: RouteTranslation; // allows User's custom pages
}

export interface RouteTranslation {
  paths?: string[];
  paramsMapping?: ParamsMapping;
  children?: RoutesTranslations;
}

export interface ParamsMapping {
  [paramName: string]: string;
}
