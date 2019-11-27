export interface ProfileTagWindowObject {
  Y_TRACKING: {
    push?: Function;
    q?: ProfileTagJsConfig[][];
  };
}

export interface ProfileTagJsConfig {
  tenant?: string;
  siteId?: string;
  spa: boolean;
  javascriptUrl?: string;
  configUrl?: string;
  allowInsecureCookies?: boolean;
  gtmId?: string;
}

export interface ConsentReferenceEvent extends CustomEvent {
  detail: {
    consentReference: string;
  };
}
export interface DebugEvent extends CustomEvent {
  detail: {
    debug: boolean;
  };
}

export enum ProfileTagEventNames {
  Loaded = 'profiletag_loaded',
  ConsentReferenceChanged = 'profiletag_consentReferenceChanged',
  DebugFlagChanged = 'profiletag_debugFlagChanged',
}
