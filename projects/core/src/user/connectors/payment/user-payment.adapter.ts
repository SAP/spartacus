import { Observable } from 'rxjs';
import { PaymentDetails } from '../../../model/cart.model';
import { Country, Region } from '../../../model/address.model';

export abstract class UserPaymentAdapter {
  abstract loadAll(userId: string): Observable<PaymentDetails[]>;

  abstract delete(userId: string, paymentMethodID: string): Observable<{}>;

  abstract setDefault(userId: string, paymentMethodID: string): Observable<{}>;

  abstract loadBillingCountries(): Observable<Country[]>;

  abstract loadDeliveryCountries(): Observable<Country[]>;

  abstract loadRegions(countryIsoCode: string): Observable<Region[]>;

}
