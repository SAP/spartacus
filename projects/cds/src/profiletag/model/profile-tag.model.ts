import { Cart } from '@spartacus/core';

export interface ProfileTagWindowObject extends Window {
  Y_TRACKING: {
    q?: ProfileTagJsConfig[][];
    eventLayer?: PushEvent[];
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
  CONSENT_REFERENCE_LOADED = 'profiletag_consentReferenceLoaded',
  DEBUG_FLAG_CHANGED = 'profiletag_debugFlagChanged',
}

interface ProfileTagCart {
  cart: Cart;
}

export enum PushEventNames {
  NAVIGATED = 'Navigated',
  CONSENT_CHANGED = 'ConsentChanged',
  CART_CHANGED = 'CartSnapshot',
}

interface ProfiletagPushEvent {
  name: PushEventNames;
  data?: any;
}

export type PushEvent =
  | NavigatedPushEvent
  | ConsentChangedPushEvent
  | CartChangedPushEvent;

export class NavigatedPushEvent implements ProfiletagPushEvent {
  name = PushEventNames.NAVIGATED;
}

export class ConsentChangedPushEvent implements ProfiletagPushEvent {
  name = PushEventNames.CONSENT_CHANGED;
  data: { granted: boolean } = { granted: undefined };
  constructor(granted: boolean) {
    this.data.granted = granted;
  }
}

export class CartChangedPushEvent implements ProfiletagPushEvent {
  name: PushEventNames = PushEventNames.CART_CHANGED;
  data: ProfileTagCart;
  constructor(data: ProfileTagCart) {
    this.data = data;
  }
}
