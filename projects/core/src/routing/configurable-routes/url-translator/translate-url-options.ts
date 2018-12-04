export interface TranslateUrlOptionsRouteObject {
  name?: string;
  params?: object;
}

export interface TranslateUrlOptions {
  route?: (string | TranslateUrlOptionsRouteObject)[];
  url?: string;
}
