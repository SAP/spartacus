import { Observable } from 'rxjs';
import { PaymentDetails } from '../../../occ/occ-models/occ.models';

export abstract class CartPaymentAdapter {
  abstract getProviderSubInfo(userId: string, cartId: string);
  abstract createSubWithProvider(
    postUrl: string,
    parameters: any
  ): Observable<any>;
  abstract create(
    userId: string,
    cartId: string,
    parameters: any
  ): Observable<PaymentDetails>;
  abstract set(
    userId: string,
    cartId: string,
    paymentDetailsId: any
  );
}
