import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { AuthService } from '../../auth/facade/auth.service';
import { Country } from '../../model/address.model';
import { PaymentDetails } from '../../model/cart.model';
import { OCC_USER_ID_CURRENT } from '../../occ';
import { StateWithProcess } from '../../process/store/process-state';
import { UserActions } from '../store/actions/index';
import { UsersSelectors } from '../store/selectors/index';
import { StateWithUser } from '../store/user-state';

@Injectable({
  providedIn: 'root',
})
export class UserPaymentService {
  constructor(
    store: Store<StateWithUser | StateWithProcess<void>>,
    // tslint:disable-next-line:unified-signatures
    authService: AuthService
  );
  /**
   * @deprecated since version 1.3
   *  Use constructor(store: Store<StateWithUser | StateWithProcess<void>>,
   *  authService: AuthService) instead
   *
   *  TODO(issue:#5628) Deprecated since 1.3.0
   */
  constructor(store: Store<StateWithUser | StateWithProcess<void>>);
  constructor(
    protected store: Store<StateWithUser | StateWithProcess<void>>,
    protected authService?: AuthService
  ) {}

  /**
   * Loads all user's payment methods.
   */
  loadPaymentMethods(): void {
    if (this.authService) {
      this.authService
        .getOccUserId()
        .pipe(take(1))
        .subscribe(occUserId =>
          this.store.dispatch(new UserActions.LoadUserPaymentMethods(occUserId))
        )
        .unsubscribe();
    } else {
      // TODO(issue:#5628) Deprecated since 1.3.0
      this.store.dispatch(
        new UserActions.LoadUserPaymentMethods(OCC_USER_ID_CURRENT)
      );
    }
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
    if (this.authService) {
      this.authService
        .getOccUserId()
        .pipe(take(1))
        .subscribe(occUserId =>
          this.store.dispatch(
            new UserActions.SetDefaultUserPaymentMethod({
              userId: occUserId,
              paymentMethodId,
            })
          )
        )
        .unsubscribe();
    } else {
      // TODO(issue:#5628) Deprecated since 1.3.0
      this.store.dispatch(
        new UserActions.SetDefaultUserPaymentMethod({
          userId: OCC_USER_ID_CURRENT,
          paymentMethodId,
        })
      );
    }
  }

  /**
   * Deletes the payment method
   *
   * @param paymentMethodId a payment method ID
   */
  deletePaymentMethod(paymentMethodId: string): void {
    if (this.authService) {
      this.authService
        .getOccUserId()
        .pipe(take(1))
        .subscribe(occUserId =>
          this.store.dispatch(
            new UserActions.DeleteUserPaymentMethod({
              userId: occUserId,
              paymentMethodId,
            })
          )
        )
        .unsubscribe();
    } else {
      // TODO(issue:#5628) Deprecated since 1.3.0
      this.store.dispatch(
        new UserActions.DeleteUserPaymentMethod({
          userId: OCC_USER_ID_CURRENT,
          paymentMethodId,
        })
      );
    }
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
