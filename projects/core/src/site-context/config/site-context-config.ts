export type ContextParamPersistence = 'session' | 'cookie' | 'route' | 'domain';

export interface ContextParams {
  persistence?: ContextParamPersistence;
  defaultValue?: string;
  values?: string[];
}

export abstract class SiteContextConfig {
  siteContext?: {
    parameters?: {
      [contextName: string]: ContextParams;
    };
    urlEncodingParameters?: string[];
  };
}
