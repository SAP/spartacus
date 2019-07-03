export interface ContextParameter {
  default?: string;
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
