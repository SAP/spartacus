export interface TranslateUrlOptionsRoute {
  route?: string;
  params?: object;
}

export type TranslateUrlOptions =
  | TranslateUrlOptionsRoute
  | any
  | (TranslateUrlOptionsRoute | any)[];

export interface TranslateUrlMetaOptions {
  relative?: boolean;
}
