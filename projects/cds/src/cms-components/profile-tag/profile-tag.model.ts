export interface ProfileTagWindowObject {
  Y_TRACKING: {
    push?: Function;
    q?: any[][];
  };
}

export interface ProfileTagJsConfig {
  tenant: string;
  siteId: string;
  spa: boolean;
  javascriptUrl: string;
  configUrl: string;
  allowInsecureCookies?: boolean;
  gtmId?: string;
  profileTagEventReciever: Function;
}
