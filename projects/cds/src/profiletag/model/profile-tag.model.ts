import { Cart, PersonalizationAction } from '@spartacus/core';

export interface ProfileTagWindowObject extends Window {
  Y_TRACKING: {
    q?: ProfileTagJsConfig[][];
    eventLayer?: ProfileTagEvent[];
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

export enum InternalProfileTagEventNames {
  CONSENT_REFERENCE_LOADED = 'profiletag_consentReferenceLoaded',
  DEBUG_FLAG_CHANGED = 'profiletag_debugFlagChanged',
}

interface ProfileTagCart {
  cart: Cart;
}

export interface ProfileTagEvent {
  name: string;
  data?: any;
}

export class NavigatedPushEvent implements ProfileTagEvent {
  name = 'Navigated';
}

export class ConsentChangedPushEvent implements ProfileTagEvent {
  name = 'ConsentChanged';
  data: { granted: boolean } = { granted: undefined };
  constructor(granted: boolean) {
    this.data.granted = granted;
  }
}

export class KeywordSearchPushEvent implements ProfileTagEvent {
  name = 'KeywordSearch';
  data;
  constructor(data: {
    searchTerm: string;
    numResults: Number;
    segments: string[];
    actions: PersonalizationAction[];
  }) {
    this.data = data;
  }
}

export class ProductViewPushEvent implements ProfileTagEvent {
  name = 'ProductView';
  data;
  constructor(data: {
    productSku: string;
    productName: string;
    productPrice: Number;
    productCategory: string;
    productCategoryName: string;
    segments: string[];
    actions: PersonalizationAction[];
  }) {
    this.data = data;
  }
}

export class CategoryViewPushEvent implements ProfileTagEvent {
  name = 'CategoryView';
  data;
  constructor(data: {
    productCategory: string;
    productCategoryName: string;
    segments: string[];
    actions: PersonalizationAction[];
  }) {
    this.data = data;
  }
}

export class HomePageViewPushEvent implements ProfileTagEvent {
  name = 'HomePageView';
  data;
  constructor(data: { segments: string[]; actions: PersonalizationAction[] }) {
    this.data = data;
  }
}

export class PageViewPushEvent implements ProfileTagEvent {
  name = 'PageView';
  data;
  constructor(data: { segments: string[]; actions: PersonalizationAction[] }) {
    this.data = data;
  }
}

export class CartChangedPushEvent implements ProfileTagEvent {
  name = 'CartSnapshot';
  data: ProfileTagCart;
  constructor(data: ProfileTagCart) {
    this.data = data;
  }
}
