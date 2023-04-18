import { InjectionToken } from "@angular/core";
import { Converter } from "@spartacus/core";
import { finalOrder } from "../root/model";

export const ORDER_NORMALIZER = new InjectionToken<Converter<any,finalOrder>
>('OrderNormalizer');
