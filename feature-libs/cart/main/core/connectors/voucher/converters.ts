import { InjectionToken } from '@angular/core';
import { Voucher } from '@spartacus/cart/main/root';
import { Converter } from '@spartacus/core';

export const CART_VOUCHER_NORMALIZER = new InjectionToken<
  Converter<any, Voucher>
>('CartVoucherNormalizer');
