export interface UrlCommandRoute {
  route?: string;
  params?: { [param: string]: any };
}

export type UrlCommand = UrlCommandRoute | any;

export type UrlCommands = UrlCommand | UrlCommand[];
