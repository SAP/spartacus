import { InjectionToken } from '@angular/core';
import { CartModificationList } from '@spartacus/cart/base/root';
import { Converter } from '@spartacus/core';
export declare const CART_VALIDATION_NORMALIZER: InjectionToken<Converter<any, CartModificationList>>;
