export interface UrlCommandRoute {
  route?: string;
  params?: object;
}

export type UrlCommand = UrlCommandRoute | any;

export type UrlCommands = UrlCommand | UrlCommand[];

export interface TranslateUrlOptions {
  relative?: boolean;
}
