import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Country } from '../../model/address.model';
import { PaymentDetails } from '../../model/cart.model';
import { OCC_USER_ID_CURRENT } from '../../occ/utils/occ-constants';
import { StateWithProcess } from '../../process/store/process-state';
import { UserActions } from '../store/actions/index';
import { UsersSelectors } from '../store/selectors/index';
import { StateWithUser } from '../store/user-state';

@Injectable({
  providedIn: 'root',
})
export class UserPaymentService {
  constructor(protected store: Store<StateWithUser | StateWithProcess<void>>) {}

  /**
   * Loads all user's payment methods.
   */
  loadPaymentMethods(): void {
    this.store.dispatch(
      new UserActions.LoadUserPaymentMethods(OCC_USER_ID_CURRENT)
    );
  }

  /**
   * Returns all user's payment methods
   */
  getPaymentMethods(): Observable<PaymentDetails[]> {
    return this.store.pipe(select(UsersSelectors.getPaymentMethods));
  }

  /**
   * Returns a loading flag for payment methods
   */
  getPaymentMethodsLoading(): Observable<boolean> {
    return this.store.pipe(select(UsersSelectors.getPaymentMethodsLoading));
  }

  getPaymentMethodsLoadedSuccess(): Observable<boolean> {
    return this.store.pipe(
      select(UsersSelectors.getPaymentMethodsLoadedSuccess)
    );
  }
  /**
   * Sets the payment as a default one
   * @param paymentMethodId a payment method ID
   */
  setPaymentMethodAsDefault(paymentMethodId: string): void {
    this.store.dispatch(
      new UserActions.SetDefaultUserPaymentMethod({
        userId: OCC_USER_ID_CURRENT,
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
      new UserActions.DeleteUserPaymentMethod({
        userId: OCC_USER_ID_CURRENT,
        paymentMethodId,
      })
    );
  }

  /**
   * Returns all billing countries
   */
  getAllBillingCountries(): Observable<Country[]> {
    return this.store.pipe(select(UsersSelectors.getAllBillingCountries));
  }

  /**
   * Retrieves billing countries
   */
  loadBillingCountries(): void {
    this.store.dispatch(new UserActions.LoadBillingCountries());
  }
}
