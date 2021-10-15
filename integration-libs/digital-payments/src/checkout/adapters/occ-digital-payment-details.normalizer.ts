import { Injectable } from '@angular/core';
import { Converter, Occ, PaymentDetails } from '@spartacus/core';

@Injectable({
  providedIn: 'root',
})
export class OccDpDetailsNormalizer
  implements Converter<Occ.PaymentDetails, PaymentDetails>
{
  convert(source: Occ.PaymentDetails, target: PaymentDetails): PaymentDetails {
    if (target === undefined) {
      target = { ...(source as any) };
    }
    return target;
  }
}
