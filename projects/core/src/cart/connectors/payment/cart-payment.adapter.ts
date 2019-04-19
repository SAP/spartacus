import { Observable } from 'rxjs';
import { PaymentDetails } from '../../../occ/occ-models/occ.models';

export abstract class CartPaymentAdapter {
  abstract create(
    userId: string,
    cartId: string,
    paymentDetails: PaymentDetails
  ): Observable<PaymentDetails>;

  abstract setDetails(
    userId: string,
    cartId: string,
    paymentDetailsId: string
  ): Observable<any>;
}
