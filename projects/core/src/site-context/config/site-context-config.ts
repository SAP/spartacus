export abstract class SiteContextConfig {
  context?: {
    urlParameters?: string[];
    [contextName: string]: string[];
  };
}
