import { InjectionToken } from '@angular/core';
import { Converter } from '@spartacus/core';
import { Cart, CartModification, PromotionResult, SaveCartResult, Voucher } from '../models/cart.model';
export declare const CART_NORMALIZER: InjectionToken<Converter<any, Cart>>;
export declare const ORDER_ENTRY_PROMOTIONS_NORMALIZER: InjectionToken<Converter<any, PromotionResult[]>>;
export declare const CART_MODIFICATION_NORMALIZER: InjectionToken<Converter<any, CartModification>>;
export declare const SAVE_CART_NORMALIZER: InjectionToken<Converter<any, SaveCartResult>>;
export declare const CART_VOUCHER_NORMALIZER: InjectionToken<Converter<any, Voucher>>;
