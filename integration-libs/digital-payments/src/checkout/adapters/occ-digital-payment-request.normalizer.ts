import { Injectable } from '@angular/core';
import { Converter } from '@spartacus/core';
import { DpPaymentRequest } from '../models';
import { OccDpPaymentRequest } from './occ.models';

@Injectable({
  providedIn: 'root',
})
export class OccDpRequestNormalizer
  implements Converter<OccDpPaymentRequest, DpPaymentRequest>
{
  convert(
    source: OccDpPaymentRequest,
    target: DpPaymentRequest
  ): DpPaymentRequest {
    if (target === undefined) {
      target = { ...(source as any) };
    }
    target.url = source.postUrl;
    target.sessionId = source?.parameters?.entry?.find(
      (it: any) => it.key === 'session_id'
    )?.value;
    target.signature = source?.parameters?.entry?.find(
      (it: any) => it.key === 'signature'
    )?.value;
    return target;
  }
}
