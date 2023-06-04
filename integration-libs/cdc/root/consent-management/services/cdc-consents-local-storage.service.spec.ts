import { TestBed } from '@angular/core/testing';
import { StatePersistenceService } from '@spartacus/core';
import { CdcLocalStorageTemplate, CdcSiteConsentTemplate } from '../model/cdc-consent-management.model';
import { CdcConsentsLocalStorageService } from './cdc-consents-local-storage.service';
import createSpy = jasmine.createSpy;

const mockCdcConsents: CdcLocalStorageTemplate[] = [
  { id: 'terms.of.use', required: true },
  { id: 'privacy.statement', required: true },
  { id: 'consent.survey', required: false },
];
const mockCdcSiteConsents: CdcSiteConsentTemplate = {
  siteConsentDetails: {
    'terms.of.use': { isMandatory: true, isActive: true },
    'privacy.statement': { isMandatory: true, isActive: true },
    'consent.survey': { isMandatory: false, isActive: true },
  },
};
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

  describe('persistCdcConsentsToStorage()', () => {
    it('should sync state with storage', () => {
      service.persistCdcConsentsToStorage(mockCdcSiteConsents);
      expect(persistenceService.syncWithStorage).toHaveBeenCalledWith(
        jasmine.objectContaining({
          key: 'cdc-consents-list',
          state$: jasmine.objectContaining(mockCdcConsents),
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

  describe('clearCdcConsentsFromStorage()', () => {
    it('should reset state to empty', () => {
      spyOn(service as any, 'clearCdcConsentsFromStorage');
      service.ngOnDestroy();
      expect(service['clearCdcConsentsFromStorage']).toHaveBeenCalled();
    });
  });
});
