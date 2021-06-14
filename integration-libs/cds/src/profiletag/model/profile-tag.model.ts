import { PersonalizationAction } from '@spartacus/tracking/personalization/core';

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
  data: any;
  constructor(data?) {
    this.data = data;
  }
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
  data: any;
  constructor(data: { searchTerm: string; numResults: Number }) {
    this.data = data;
  }
}

export class ProductViewPushEvent implements ProfileTagPushEvent {
  name = 'ProductDetailsPageViewed';
  data: any;
  constructor(data: {
    productSku: string;
    productName: string;
    productPrice: Number;
    productCategory: string;
    productCategoryName: string;
    categories: Array<string>;
  }) {
    this.data = data;
  }
}

export class CategoryViewPushEvent implements ProfileTagPushEvent {
  name = 'CategoryPageViewed';
  data: any;
  constructor(data: { productCategory: string; productCategoryName: string }) {
    this.data = data;
  }
}

// TODO:#cds - check the class name and the `name` property
export class BrandPageVisitedEvent implements ProfileTagPushEvent {
  name = 'BrandPageVisitedEvent';
  data: { brandCode: string; brandName: string };
  constructor(data: { brandCode: string; brandName: string }) {
    this.data = data;
  }
}

export class HomePageViewPushEvent implements ProfileTagPushEvent {
  name = 'HomePageViewed';
  data: any;
  constructor(data?: any) {
    this.data = data;
  }
}

export class OrderConfirmationPushEvent implements ProfileTagPushEvent {
  name = 'OrderConfirmationPageViewed';
  data: any;
  constructor(data?: any) {
    this.data = data;
  }
}

export class CartViewPushEvent implements ProfileTagPushEvent {
  name = 'CartPageViewed';
  data: any;
  constructor(data?: any) {
    this.data = data;
  }
}

export class AddedToCartPushEvent implements ProfileTagPushEvent {
  name = 'AddedToCart';
  data: any;
  constructor(data: {
    productQty: number;
    productSku: string;
    productName: string;
    cartId: string;
    cartCode: string;
    categories: Array<string>;
    productCategoryName: string;
    productCategory: string;
    productPrice: Number;
  }) {
    this.data = data;
  }
}

export class RemovedFromCartPushEvent implements ProfileTagPushEvent {
  name = 'RemovedFromCart';
  data: any;
  constructor(data: {
    productSku: string;
    productName: string;
    productCategory: string;
    cartId: string;
    cartCode: string;
    productCategoryName: string;
    categories: Array<string>;
  }) {
    this.data = data;
  }
}

export class ModifiedCartPushEvent implements ProfileTagPushEvent {
  name = 'ModifiedCart';
  data: any;
  constructor(data: {
    productQty: number;
    productSku: string;
    productName: string;
    cartId: string;
    cartCode: string;
    categories: Array<string>;
    productCategoryName: string;
    productCategory: string;
  }) {
    this.data = data;
  }
}
