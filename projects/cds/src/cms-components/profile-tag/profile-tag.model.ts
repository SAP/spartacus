export interface ProfileTagWindowObject {
  Y_TRACKING: {
    push?: Function;
    q?: ProfileTagJsConfig[][];
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

export interface ProfileTagEvent {
  eventName;
}
