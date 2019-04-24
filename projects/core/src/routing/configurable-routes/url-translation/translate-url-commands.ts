export interface TranslateUrlCommandRoute {
  route?: string;
  params?: object;
}

export type TranslateUrlCommand = TranslateUrlCommandRoute | any;

export type TranslateUrlCommands = TranslateUrlCommand | TranslateUrlCommand[];

export interface TranslateUrlOptions {
  relative?: boolean;
}
