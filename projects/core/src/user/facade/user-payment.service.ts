import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserIdService } from '../../auth/user-auth/facade/user-id.service';
import { Country } from '../../model/address.model';
import { PaymentDetails } from '../../model/cart.model';
import { StateWithProcess } from '../../process/store/process-state';
import { UserActions } from '../store/actions/index';
import { UsersSelectors } from '../store/selectors/index';
import { StateWithUser } from '../store/user-state';

@Injectable({
  providedIn: 'root',
})
export class UserPaymentService {
  constructor(
    protected store: Store<StateWithUser | StateWithProcess<void>>,
    protected userIdService: UserIdService
  ) {}

  /**
   * Loads all user's payment methods.
   */
  loadPaymentMethods(): void {
    this.userIdService.takeUserId().subscribe((userId) => {
      this.store.dispatch(new UserActions.LoadUserPaymentMethods(userId));
    });
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
    this.userIdService.takeUserId().subscribe((userId) => {
      this.store.dispatch(
        new UserActions.SetDefaultUserPaymentMethod({
          userId,
          paymentMethodId,
        })
      );
    });
  }

  /**
   * Deletes the payment method
   *
   * @param paymentMethodId a payment method ID
   */
  deletePaymentMethod(paymentMethodId: string): void {
    this.userIdService.takeUserId().subscribe((userId) => {
      this.store.dispatch(
        new UserActions.DeleteUserPaymentMethod({
          userId,
          paymentMethodId,
        })
      );
    });
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
