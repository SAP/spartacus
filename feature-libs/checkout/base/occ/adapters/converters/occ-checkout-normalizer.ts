import { Injectable } from '@angular/core';
import { CheckoutState } from '@spartacus/checkout/base/root';
import { Converter } from '@spartacus/core';

@Injectable({ providedIn: 'root' })
export class OccCheckoutNormalizer
  implements Converter<CheckoutState, CheckoutState>
{
  constructor() {}

  convert(source: CheckoutState): CheckoutState {
    return source;
  }
}
