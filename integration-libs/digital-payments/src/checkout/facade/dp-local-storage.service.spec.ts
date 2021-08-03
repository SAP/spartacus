import { TestBed } from '@angular/core/testing';
import { DpLocalStorageService } from './dp-local-storage.service';
import { StatePersistenceService } from '@spartacus/core';
import { DpPaymentRequest } from './../models/dp-checkout.model';
const initialState: DpPaymentRequest = {};

describe('DpLocalStorageService', () => {
  let service: DpLocalStorageService;
  let persistenceService: StatePersistenceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
      ],
    });

    service = TestBed.inject(DpLocalStorageService);
    persistenceService = TestBed.inject(StatePersistenceService);
    spyOn(persistenceService, 'syncWithStorage').and.stub();
    spyOn(persistenceService, 'readStateFromStorage').and.stub();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('syncCardRegistrationState()', () => {
    it('should sync state with storage', () => {
      service.syncCardRegistrationState(initialState);

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

