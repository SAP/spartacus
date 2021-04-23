import { Observable } from 'rxjs';
import { CardType, PaymentDetails } from '../../../model/cart.model';

/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export abstract class CheckoutPaymentAdapter {
  /**
   * Abstract method used to create payment details on cart
   *
   * @param userId
   * @param cartId
   * @param paymentDetails
   */
  abstract create(
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
  abstract set(
    userId: string,
    cartId: string,
    paymentDetailsId: string
  ): Observable<any>;

  /**
   * Abstract method used to get available cart types
   */
  abstract loadCardTypes(): Observable<CardType[]>;
}
