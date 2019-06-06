import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { PaymentDetails } from '../../model/cart.model';
import { USERID_CURRENT } from '../../occ/utils/occ-constants';
import * as fromProcessStore from '../../process/store/process-state';
import * as fromStore from '../store/index';
import { Country } from '../../model/address.model';

@Injectable({
  providedIn: 'root',
})
export class UserPaymentService {
  constructor(
    protected store: Store<
      fromStore.StateWithUser | fromProcessStore.StateWithProcess<void>
    >
  ) {}

  /**
   * Loads all user's payment methods.
   */
  loadPaymentMethods(): void {
    this.store.dispatch(new fromStore.LoadUserPaymentMethods(USERID_CURRENT));
  }

  /**
   * Returns all user's payment methods
   */
  getPaymentMethods(): Observable<PaymentDetails[]> {
    return this.store.pipe(select(fromStore.getPaymentMethods));
  }

  /**
   * Returns a loading flag for payment methods
   */
  getPaymentMethodsLoading(): Observable<boolean> {
    return this.store.pipe(select(fromStore.getPaymentMethodsLoading));
  }

  /**
   * Sets the payment as a default one
   * @param paymentMethodId a payment method ID
   */
  setPaymentMethodAsDefault(paymentMethodId: string): void {
    this.store.dispatch(
      new fromStore.SetDefaultUserPaymentMethod({
        userId: USERID_CURRENT,
        paymentMethodId,
      })
    );
  }

  /**
   * Deletes the payment method
   *
   * @param paymentMethodId a payment method ID
   */
  deletePaymentMethod(paymentMethodId: string): void {
    this.store.dispatch(
      new fromStore.DeleteUserPaymentMethod({
        userId: USERID_CURRENT,
        paymentMethodId,
      })
    );
  }

  /**
   * Returns all billing countries
   */
  getAllBillingCountries(): Observable<Country[]> {
    return this.store.pipe(select(fromStore.getAllBillingCountries));
  }

  /**
   * Retrieves billing countries
   */
  loadBillingCountries(): void {
    this.store.dispatch(new fromStore.LoadBillingCountries());
  }
}
