import { Observable } from 'rxjs';
import { PaymentDetails } from '../../../model/cart.model';

export abstract class UserPaymentAdapter {
  abstract loadAll(userId: string): Observable<PaymentDetails[]>;

  abstract delete(userId: string, paymentMethodID: string): Observable<{}>;

  abstract setDefault(userId: string, paymentMethodID: string): Observable<{}>;
}
