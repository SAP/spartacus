import { PersonalizationAction } from '@spartacus/tracking/personalization/core';
import { Cart } from '@spartacus/cart/base/root';
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
export declare enum InternalProfileTagEventNames {
    CONSENT_REFERENCE_LOADED = "profiletag_consentReferenceLoaded",
    DEBUG_FLAG_CHANGED = "profiletag_debugFlagChanged"
}
export interface ProfileTagPushEvent {
    name: string;
    data?: {
        segments?: string[];
        actions?: PersonalizationAction[];
        [x: string]: any;
    };
}
export declare class NavigatedPushEvent implements ProfileTagPushEvent {
    name: string;
    data: any;
    constructor(data?: any);
}
export declare class ConsentChangedPushEvent implements ProfileTagPushEvent {
    name: string;
    data: {
        granted: boolean;
    };
    constructor(granted: boolean);
}
export declare class KeywordSearchPushEvent implements ProfileTagPushEvent {
    name: string;
    data: any;
    constructor(data: {
        searchTerm: string;
        numResults: Number;
    });
}
export declare class ProductViewPushEvent implements ProfileTagPushEvent {
    name: string;
    data: any;
    constructor(data: {
        productSku: string;
        productName: string;
        productPrice: Number;
        productCategory: string;
        productCategoryName: string;
        categories: Array<string>;
    });
}
export declare class CategoryViewPushEvent implements ProfileTagPushEvent {
    name: string;
    data: any;
    constructor(data: {
        productCategory: string;
        productCategoryName: string;
    });
}
export declare class BrandPageVisitedEvent implements ProfileTagPushEvent {
    name: string;
    data: {
        brandCode: string;
        brandName: string;
    };
    constructor(data: {
        brandCode: string;
        brandName: string;
    });
}
export declare class HomePageViewPushEvent implements ProfileTagPushEvent {
    name: string;
    data: any;
    constructor(data?: any);
}
export declare class OrderConfirmationPushEvent implements ProfileTagPushEvent {
    name: string;
    data: any;
    constructor(data?: any);
}
export declare class CartViewPushEvent implements ProfileTagPushEvent {
    name: string;
    data: any;
    constructor(data?: any);
}
export declare class AddedToCartPushEvent implements ProfileTagPushEvent {
    name: string;
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
    });
}
export declare class RemovedFromCartPushEvent implements ProfileTagPushEvent {
    name: string;
    data: any;
    constructor(data: {
        productSku: string;
        productName: string;
        productCategory: string;
        cartId: string;
        cartCode: string;
        productCategoryName: string;
        categories: Array<string>;
    });
}
export declare class ModifiedCartPushEvent implements ProfileTagPushEvent {
    name: string;
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
    });
}
export declare class CartSnapshotPushEvent implements ProfileTagPushEvent {
    name: string;
    data: any;
    constructor(data: {
        cart: Cart;
    });
}
