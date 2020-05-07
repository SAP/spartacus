import { Observable } from 'rxjs';
import { PaymentType } from '../../../model/cart.model';

export abstract class PaymentTypeAdapter {
  /**
   * Abstract method used to get available payment types
   */
  abstract loadPaymentTypes(): Observable<PaymentType[]>;
}
