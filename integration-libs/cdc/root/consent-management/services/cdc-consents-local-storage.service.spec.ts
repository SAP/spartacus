import { TestBed } from '@angular/core/testing';
import { StatePersistenceService } from '@spartacus/core';
import { CdcLocalStorageTemplate } from '../cdc-consent-management.model';
import { CdcConsentsLocalStorageService } from './cdc-consents-local-storage.service';

import createSpy = jasmine.createSpy;
const initialState: CdcLocalStorageTemplate[] = [];
const mockCdcConsents: CdcLocalStorageTemplate[] = [
  { id: 'terms.of.use', required: true },
  { id: 'privacy.statement', required: true },
  { id: 'consent.survey', required: false },
];

class MockStatePersistenceService implements Partial<StatePersistenceService> {
  syncWithStorage = createSpy();
  readStateFromStorage = createSpy('readStateFromStorage').and.returnValue(
    mockCdcConsents
  );
}
describe('CdcConsentsLocalStorageService', () => {
  let service: CdcConsentsLocalStorageService;
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
    service = TestBed.inject(CdcConsentsLocalStorageService);
    persistenceService = TestBed.inject(StatePersistenceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('syncCdcConsentsState()', () => {
    it('should sync state with storage', () => {
      service.syncCdcConsentsState(initialState);
      expect(persistenceService.syncWithStorage).toHaveBeenCalledWith(
        jasmine.objectContaining({
          key: 'cdc-consents-list',
          state$: jasmine.objectContaining(initialState),
        })
      );
    });
  });

  describe('checkIfConsentExists()', () => {
    it('should return true if ID passed in request param exists in store', () => {
      persistenceService.readStateFromStorage =
        createSpy().and.returnValue(mockCdcConsents);
      let output = service.checkIfConsentExists('consent.survey');
      expect(persistenceService.readStateFromStorage).toHaveBeenCalledWith({
        key: 'cdc-consents-list',
      });
      expect(output).toEqual(true);
    });
    it('should return false if ID passed in request param doesnot exists in store', () => {
      persistenceService.readStateFromStorage =
        createSpy().and.returnValue(mockCdcConsents);
      let output = service.checkIfConsentExists('consent.training');
      expect(persistenceService.readStateFromStorage).toHaveBeenCalledWith({
        key: 'cdc-consents-list',
      });
      expect(output).toEqual(false);
    });
  });

  describe('clearCdcConsentsStorage()', () => {
    it('should reset state to empty', () => {
      spyOn(service as any, 'clearCdcConsentsStorage');
      service.ngOnDestroy();
      expect(service['clearCdcConsentsStorage']).toHaveBeenCalled();
    });
  });
});
