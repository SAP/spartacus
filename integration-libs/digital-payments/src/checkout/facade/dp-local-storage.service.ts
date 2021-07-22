import { of } from 'rxjs';
import { DpCheckoutPaymentService } from './dp-checkout-payment.service';
import { DpPaymentRequest } from './../models/dp-checkout.model';
import { StatePersistenceService } from '@spartacus/core';
import { Injectable } from '@angular/core';

const KEY = 'digital-payment.checkout.request';

@Injectable({
  providedIn: 'root',
})
export class DpLocalStorageService {
  constructor(
    protected statePersistenceService: StatePersistenceService,
    protected dpService: DpCheckoutPaymentService
  ) {}

  syncCardRegistrationState(request: DpPaymentRequest): void {
    this.statePersistenceService.syncWithStorage<DpPaymentRequest | undefined>({
      key: KEY,
      state$: of(request),
    });
  }

  readCardRegistrationState(): DpPaymentRequest {
    const paymentRequest = this.statePersistenceService.readStateFromStorage({
      key: KEY,
    }) as DpPaymentRequest;

    this.clearDpStorage();
    return paymentRequest;
  }

  protected clearDpStorage() {
    this.statePersistenceService.syncWithStorage({
      key: KEY,
      state$: of({}),
    });
  }
}
