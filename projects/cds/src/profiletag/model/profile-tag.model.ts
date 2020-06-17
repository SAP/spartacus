import { Cart, PersonalizationAction } from '@spartacus/core';

export interface ProfileTagWindowObject extends Window {
  Y_TRACKING: {
    q?: ProfileTagJsConfig[][];
    eventLayer?: ProfileTagPushEvent[];
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

export interface ProfileTagPushEvent {
  name: string;
  data?: {
    segments?: string[];
    actions?: PersonalizationAction[];
    [x: string]: any;
  };
}

export class NavigatedPushEvent implements ProfileTagPushEvent {
  name = 'Navigated';
}

export class ConsentChangedPushEvent implements ProfileTagPushEvent {
  name = 'ConsentChanged';
  data: { granted: boolean } = { granted: undefined };
  constructor(granted: boolean) {
    this.data.granted = granted;
  }
}

export class KeywordSearchPushEvent implements ProfileTagPushEvent {
  name = 'KeywordSearch';
  data;
  constructor(data: { searchTerm: string; numResults: Number }) {
    this.data = data;
  }
}

export class ProductViewPushEvent implements ProfileTagPushEvent {
  name = 'ProductDetailsPageViewed';
  data;
  constructor(data: {
    productSku: string;
    productName: string;
    productPrice: Number;
    productCategory: string;
    productCategoryName: string;
  }) {
    this.data = data;
  }
}

export class CategoryViewPushEvent implements ProfileTagPushEvent {
  name = 'CategoryPageViewed';
  data;
  constructor(data: { productCategory: string; productCategoryName: string }) {
    this.data = data;
  }
}

export class HomePageViewPushEvent implements ProfileTagPushEvent {
  name = 'HomePageViewed';
  data;
  constructor(data?) {
    this.data = data;
  }
}

export class OrderConfirmationPushEvent implements ProfileTagPushEvent {
  name = 'OrderConfirmationPageViewed';
  data;
  constructor(data?) {
    this.data = data;
  }
}

export class CartViewPushEvent implements ProfileTagPushEvent {
  name = 'CartPageViewed';
  data;
  constructor(data?) {
    this.data = data;
  }
}

export class PageViewPushEvent implements ProfileTagPushEvent {
  name = 'PageViewed';
  data;
  constructor(data?) {
    this.data = data;
  }
}

export class CartChangedPushEvent implements ProfileTagPushEvent {
  name = 'CartSnapshot';
  data: ProfileTagCart;
  constructor(data: ProfileTagCart) {
    this.data = data;
  }
}
