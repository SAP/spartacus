import { Observable } from 'rxjs';
import { PaymentDetails } from '../../../occ/occ-models/occ.models';

export abstract class CartPaymentAdapter {
  abstract getPaymentProviderSubInfo(userId: string, cartId: string);
  abstract createSubWithPaymentProvider(
    postUrl: string,
    parameters: any
  ): Observable<any>;
  abstract createPaymentDetails(
    userId: string,
    cartId: string,
    parameters: any
  ): Observable<PaymentDetails>;
  abstract setPaymentDetails(
    userId: string,
    cartId: string,
    paymentDetailsId: any
  );
}
