export type ContextParamPersistence = 'session' | 'cookie' | 'route' | 'domain';

export interface ContextParams {
  persistence?: ContextParamPersistence;
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
