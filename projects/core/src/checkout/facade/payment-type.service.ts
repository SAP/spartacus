import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { pluck, shareReplay, tap, withLatestFrom } from 'rxjs/operators';
import { PaymentType } from '../../model/cart.model';
import { StateWithProcess } from '../../process/store/process-state';
import { getProcessStateFactory } from '../../process/store/selectors/process-group.selectors';
import { CheckoutActions } from '../store/actions/index';
import {
  GET_PAYMENT_TYPES_PROCESS_ID,
  StateWithCheckout,
} from '../store/checkout-state';
import { CheckoutSelectors } from '../store/selectors/index';

@Injectable({
  providedIn: 'root',
})
export class PaymentTypeService {
  constructor(
    protected checkoutStore: Store<StateWithCheckout | StateWithProcess<void>>
  ) {}

  /**
   * Get payment types
   */
  getPaymentTypes(): Observable<PaymentType[]> {
    return this.checkoutStore.pipe(
      select(CheckoutSelectors.getAllPaymentTypes),
      withLatestFrom(
        this.checkoutStore.pipe(
          select(getProcessStateFactory(GET_PAYMENT_TYPES_PROCESS_ID))
        )
      ),
      tap(([, loadingState]) => {
        if (
          !(loadingState.loading || loadingState.success || loadingState.error)
        ) {
          this.loadPaymentTypes();
        }
      }),
      pluck(0),
      shareReplay({ bufferSize: 1, refCount: true })
    );
  }

  /**
   * Load the supported payment types
   */
  loadPaymentTypes(): void {
    this.checkoutStore.dispatch(new CheckoutActions.LoadPaymentTypes());
  }
}
