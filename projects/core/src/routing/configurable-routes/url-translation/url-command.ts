export interface UrlCommandRoute {
  cxRoute?: string;
  params?: { [param: string]: any };
}

export type UrlCommand = UrlCommandRoute | any;

export type UrlCommands = UrlCommand | UrlCommand[];
