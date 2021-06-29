import { tap, map } from 'rxjs/operators';
import { StateWithDigitalPayments } from '../store/digital-payments-state';
import { DpPaymentRequest } from '../models/dp-checkout.model';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { PaymentDetails } from '@spartacus/core';
import { DigitalPaymentActions, DigitalPaymentSelectors } from '../store';

@Injectable({
  providedIn: 'root',
})
export class DpCheckoutPaymentService {
  constructor(protected dpStore: Store<StateWithDigitalPayments>) {}
  //w;
  loadCardRegistrationDetails(): void {
    this.dpStore.dispatch(
      new DigitalPaymentActions.LoadCheckoutPaymentRequest()
    );
  }

  getCardRegistrationDetails(): Observable<DpPaymentRequest | undefined> {
    return this.dpStore.pipe(
      select(DigitalPaymentSelectors.getDpCheckoutPaymentRequestState),
      tap((state) => {
        const attemptedLoad = state.loading || state.success || state.error;
        if (!attemptedLoad) {
          this.loadCardRegistrationDetails();
        }
      }),
      map((state) => state.value)
    );
  }

  loadCheckoutPaymentDetails(sessionId: string, signature: string): void {
    this.dpStore.dispatch(
      new DigitalPaymentActions.LoadCheckoutPaymentDetails({
        sessionId,
        signature,
      })
    );
  }

  createPaymentDetails(
    sessionId: string,
    signature: string
  ): Observable<PaymentDetails | undefined> {
    return this.dpStore.pipe(
      select(DigitalPaymentSelectors.getDpCheckoutPaymentDetailsState),
      tap((state) => {
        const attemptedLoad = state.loading || state.success || state.error;
        if (!attemptedLoad) {
          this.loadCheckoutPaymentDetails(sessionId, signature);
        }
      }),
      map((state) => state.value)
    );
  }

  clearCardRegitrationState(): void {
    this.dpStore.dispatch(
      new DigitalPaymentActions.ResetCheckoutPaymentRequest()
    );
  }
}
