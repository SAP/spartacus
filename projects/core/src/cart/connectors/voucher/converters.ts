import { InjectionToken } from '@angular/core';
import { Voucher } from '../../../model/cart.model';
import { Converter } from '../../../util/converter.service';

/**
 * @deprecated since 4.1 - use cart lib instead
 */
export const CART_VOUCHER_NORMALIZER = new InjectionToken<
  Converter<any, Voucher>
>('CartVoucherNormalizer');
