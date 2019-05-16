import { Observable } from 'rxjs';
import { PaymentDetails } from '../../../model/cart.model';

export abstract class UserPaymentMethodAdapter {
  abstract loadList(userId: string): Observable<PaymentDetails[]>;

  abstract delete(userId: string, paymentMethodID: string): Observable<{}>;

  abstract setDefault(userId: string, paymentMethodID: string): Observable<{}>;
}
