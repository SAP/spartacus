import { TestBed } from '@angular/core/testing';
import { DpLocalStorageService } from './dp-local-storage.service';
import { StatePersistenceService } from '@spartacus/core';
import { DpPaymentRequest } from './../models/dp-checkout.model';

import createSpy = jasmine.createSpy;
const initialState: DpPaymentRequest = {};
const mockDpPaymentRequest: DpPaymentRequest = {
  url: 'https://dummy.url',
  signature: 'ASDFGHJKE456789',
  sessionId: 'QWERTYUIOPASDFGHJKLZXCVBNM',
};

class MockStatePersistenceService implements Partial<StatePersistenceService> {
  syncWithStorage = createSpy('syncWithStorage');
  readStateFromStorage = createSpy('readStateFromStorage').and.returnValue(
    mockDpPaymentRequest
  );
}
describe('DpLocalStorageService', () => {
  let service: DpLocalStorageService;
  let persistenceService: StatePersistenceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: StatePersistenceService,
          useClass: MockStatePersistenceService,
        },
      ],
    });
    service = TestBed.inject(DpLocalStorageService);
    persistenceService = TestBed.inject(StatePersistenceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('syncCardRegistrationState()', () => {
    it('should sync state with storage', () => {
      service.syncCardRegistrationState(initialState);
      expect(persistenceService.syncWithStorage).toHaveBeenCalledWith(
        jasmine.objectContaining({
          key: 'digital-payment.checkout.request',
          state$: jasmine.objectContaining(initialState),
        })
      );
    });
  });

  describe('readCardRegistrationState()', () => {
    it('should read state from storage', () => {
      service.readCardRegistrationState();
      expect(persistenceService.readStateFromStorage).toHaveBeenCalledWith({
        key: 'digital-payment.checkout.request',
      });
    });

    it('should call clearDpStorage() to reset state to empty', () => {
      spyOn(service as any, 'clearDpStorage');
      let state = service.readCardRegistrationState();
      expect(service['clearDpStorage']).toHaveBeenCalled();
      expect(state).toEqual(mockDpPaymentRequest);
    });
  });
});
