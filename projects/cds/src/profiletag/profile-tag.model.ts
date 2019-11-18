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
  profileTagEventReceiver: Function;
}

export interface ProfileTagEvent {
  eventName: ProfileTagEventNames;
  data: any;
}

export enum ProfileTagEventNames {
  Loaded = 'Loaded',
  ConsentReferenceChanged = 'ConsentReferenceChanged',
}
