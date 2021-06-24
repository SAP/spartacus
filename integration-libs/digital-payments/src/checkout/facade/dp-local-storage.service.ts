import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { StateWithDigitalPayments } from '../store/digital-payments-state';
import { Store, select } from '@ngrx/store';
import { DpCheckoutPaymentService } from './dp-checkout-payment.service';
import { DpPaymentRequest } from './../models/dp-checkout.model';
import { StatePersistenceService } from '@spartacus/core';
import { Injectable } from '@angular/core';
import { DigitalPaymentSelectors } from '../store';

const KEY = 'digital-payment.checkout.request';

@Injectable({
  providedIn: 'root',
})
export class DpLocalStorageService {
  constructor(
    protected statePersistenceService: StatePersistenceService,
    protected dpService: DpCheckoutPaymentService,
    protected dpStore: Store<StateWithDigitalPayments>
  ) {}

  syncCardRegistrationState(): void {
    this.statePersistenceService.syncWithStorage<DpPaymentRequest|undefined>({
      key: KEY,
      state$: this.getPaymentRequestState(),
    });
  }

  readCardRegistrationState(): DpPaymentRequest {
    const paymentRequest = this.statePersistenceService.readStateFromStorage<DpPaymentRequest>(
      { key: KEY }
    );

    this.clearDpStorage();
    return paymentRequest;
  }

  protected getPaymentRequestState(): Observable<DpPaymentRequest | undefined> {
    return this.dpStore.pipe(
      select(DigitalPaymentSelectors.getDpCheckoutPaymentRequestState),
      map((state) => state.value)
    );
  }

  protected clearDpStorage() {
    this.statePersistenceService.syncWithStorage({
      key: KEY,
      state$: of({}),
    });
  }
}
