export interface TranslateUrlOptionsRouteObject {
  name?: string;
  params?: object;
}

export type TranslateUrlOptionsRoute = string | TranslateUrlOptionsRouteObject;

export interface TranslateUrlOptions {
  route?: TranslateUrlOptionsRoute[];
  url?: string;
}
