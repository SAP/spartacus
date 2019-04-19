import { Observable } from 'rxjs';
import { PaymentDetails } from '../../../occ/occ-models/occ.models';

export abstract class CartPaymentAdapter {
  abstract getProviderSubInfo(userId: string, cartId: string): Observable<any>;
  abstract createSubWithProvider(
    postUrl: string,
    parameters: any
  ): Observable<any>;
  abstract createDetails(
    userId: string,
    cartId: string,
    parameters: any
  ): Observable<PaymentDetails>;
  abstract setDetails(
    userId: string,
    cartId: string,
    paymentDetailsId: any
  ): Observable<any>;
}
