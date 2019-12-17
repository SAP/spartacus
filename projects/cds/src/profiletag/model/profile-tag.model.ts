import { Cart, OrderEntry } from '@spartacus/core';

export interface ProfileTagWindowObject extends Window {
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

export class NavigatedPushEvent {
  event: ProfileTagPushEventNames.NAVIGATED;
}

export class ConsentChangedPushEvent {
  event: ProfileTagPushEventNames.CONSENT_CHANGED;
  granted: boolean;
  constructor(granted: boolean) {
    this.granted = granted;
  }
}

export class CartChangedPushEvent {
  event: ProfileTagPushEventNames.CART_CHANGED;
  data: ProfileTagCart;
  constructor(data: ProfileTagCart) {
    this.data = data;
  }
}

interface ProfileTagCart {
  entries: OrderEntry[];
  cart: Cart;
}

export type PushEvent =
  | NavigatedPushEvent
  | ConsentChangedPushEvent
  | CartChangedPushEvent;

export enum ProfileTagPushEventNames {
  NAVIGATED = 'Navigated',
  CONSENT_CHANGED = 'ConsentChanged',
  CART_CHANGED = 'CartSnapshot',
}

export enum ProfileTagEventNames {
  LOADED = 'profiletag_loaded',
  CONSENT_REFERENCE_CHANGED = 'profiletag_consentReferenceChanged',
  DEBUG_FLAG_CHANGED = 'profiletag_debugFlagChanged',
}
