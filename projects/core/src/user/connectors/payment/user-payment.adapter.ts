import { Observable } from 'rxjs';
import { PaymentDetails } from '../../../model/cart.model';
import { Country } from '../../../model/address.model';

export abstract class UserPaymentAdapter {
  abstract loadAll(userId: string): Observable<PaymentDetails[]>;

  abstract delete(userId: string, paymentMethodID: string): Observable<{}>;

  abstract setDefault(userId: string, paymentMethodID: string): Observable<{}>;

  abstract loadBillingCountries(): Observable<Country[]>;

  abstract loadDeliveryCountries(): Observable<Country[]>;

}
