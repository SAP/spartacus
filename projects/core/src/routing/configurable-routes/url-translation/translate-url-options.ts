export interface TranslateUrlOptionsRouteObject {
  name?: string;
  params?: object;
  relative?: boolean;
}

export type TranslateUrlOptionsRoute = string | TranslateUrlOptionsRouteObject;

export interface TranslateUrlOptions {
  route?: TranslateUrlOptionsRoute;
}
