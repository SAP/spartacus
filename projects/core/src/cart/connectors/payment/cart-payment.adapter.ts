import { Observable } from 'rxjs';
import { PaymentDetails } from '../../../occ/occ-models/occ.models';

export abstract class CartPaymentAdapter {
  /**
   * Abstract method used to create payment details on cart
   *
   * @param userId
   * @param cartId
   * @param paymentDetails
   */
  abstract createDetails(
    userId: string,
    cartId: string,
    paymentDetails: PaymentDetails
  ): Observable<PaymentDetails>;

  /**
   * Abstract method used to set payment details on cart
   *
   * @param userId
   * @param cartId
   * @param paymentDetailsId
   */
  abstract setDetails(
    userId: string,
    cartId: string,
    paymentDetailsId: string
  ): Observable<any>;
}
