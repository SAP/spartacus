import {
  StateWithDigitalPayments,
  DIGITAL_PAYMENTS_FEATURE,
} from './../store/digital-payments-state';
import { TestBed } from '@angular/core/testing';

import { DpLocalStorageService } from './dp-local-storage.service';
import { StatePersistenceService } from '@spartacus/core';
import { Store, StoreModule } from '@ngrx/store';

import * as fromReducers from '../store';

describe('DpLocalStorageService', () => {
  let service: DpLocalStorageService;
  let store: Store<StateWithDigitalPayments>;
  let persistenceService: StatePersistenceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(
          DIGITAL_PAYMENTS_FEATURE,
          fromReducers.getReducers()
        ),
      ],
    });

    service = TestBed.inject(DpLocalStorageService);
    store = TestBed.inject(Store);
    persistenceService = TestBed.inject(StatePersistenceService);

    spyOn(store, 'dispatch').and.callThrough();
    spyOn(persistenceService, 'syncWithStorage').and.stub();
    spyOn(persistenceService, 'readStateFromStorage').and.stub();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('syncCardRegistrationState()', () => {
    it('should sync state with storage', () => {
      service.syncCardRegistrationState();

      expect(persistenceService.syncWithStorage).toHaveBeenCalled();
    });
  });

  describe('readCardRegistrationState()', () => {
    it('should read state from storage', () => {
      service.readCardRegistrationState();

      expect(persistenceService.readStateFromStorage).toHaveBeenCalledWith({
        key: 'digital-payment.checkout.request',
      });
    });

    it('should read state from storage', () => {
      service.readCardRegistrationState();

      expect(persistenceService.syncWithStorage).toHaveBeenCalled();
    });
  });
});
