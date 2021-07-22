import { InjectionToken } from '@angular/core';
import { Converter, Voucher } from '@spartacus/core';

export const CART_VOUCHER_NORMALIZER = new InjectionToken<
  Converter<any, Voucher>
>('CartVoucherNormalizer');
