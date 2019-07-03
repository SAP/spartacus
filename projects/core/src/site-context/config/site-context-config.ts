export interface ContextParameter {
  values?: string[];
}

export abstract class SiteContextConfig {
  context?: {
    parameters?: {
      [contextName: string]: ContextParameter;
    };
    urlEncodingParameters?: string[];
  };
}
