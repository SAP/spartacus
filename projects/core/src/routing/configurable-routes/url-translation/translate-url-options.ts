export interface TranslateUrlOptionsRoute {
  route?: string;
  params?: object;
}

export type TranslateUrlOptions =
  | TranslateUrlOptionsRoute
  | (TranslateUrlOptionsRoute | string)[];

export interface TranslateUrlMetaOptions {
  relative?: boolean;
}
