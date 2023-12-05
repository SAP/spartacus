import { InjectionToken } from '@angular/core';
import { DeliveryMode } from '@spartacus/cart/base/root';
import { Converter } from '@spartacus/core';
export declare const DELIVERY_MODE_NORMALIZER: InjectionToken<Converter<any, DeliveryMode>>;
