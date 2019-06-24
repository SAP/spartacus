export enum ContextPersistence {
  NONE = 'none',
  ROUTE = 'route',
  // possible future values:
  // SESSION = 'session',
  // DOMAIN = 'domain',
  // COOKIE = 'cookie'
}

export interface ContextParams {
  persistence?: ContextPersistence | string;
  default?: string;
  values?: string[];
}

export abstract class SiteContextConfig {
  context?: {
    parameters?: {
      [contextName: string]: ContextParams;
    };
    urlEncodingParameters?: string[];
  };
}
