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
  LOADED = 'profiletag_loaded',
  CONSENT_REFERENCE_CHANGED = 'profiletag_consentReferenceChanged',
  DEBUG_FLAG_CHANGED = 'profiletag_debugFlagChanged',
}
