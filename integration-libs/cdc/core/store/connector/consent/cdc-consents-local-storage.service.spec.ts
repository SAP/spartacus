import { TestBed } from '@angular/core/testing';
import { StatePersistenceService } from '@spartacus/core';
import { CdcJsService } from '../../../../root/service';
import { CdcSiteConsentTemplate } from '../../../../core/models/cdc-site-consents.model';
import { CdcConsentsLocalStorageService } from './cdc-consents-local-storage.service';

import createSpy = jasmine.createSpy;
const initialState: string[] = [];
const mockCdcConsents: string[] = [
  'terms.of.use',
  'privacy.statement',
  'consent.survey',
];
const mockCdcSiteConsents: CdcSiteConsentTemplate = {
  siteConsentDetails: {
    'terms.of.use': {},
    'privacy.statement': {},
    'consent.survey': {},
  },
};

class MockStatePersistenceService implements Partial<StatePersistenceService> {
  syncWithStorage = createSpy();
  // readStateFromStorage = createSpy('readStateFromStorage').and.returnValue(
  //   mockCdcConsents
  // );
  readStateFromStorage = createSpy();
}
class MockCdcJsService implements Partial<CdcJsService> {
  getSiteConsentDetails = createSpy();
}
describe('CdcConsentsLocalStorageService', () => {
  let service: CdcConsentsLocalStorageService;
  let persistenceService: StatePersistenceService;
  let cdcJsService: CdcJsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: StatePersistenceService,
          useClass: MockStatePersistenceService,
        },
        {
          provide: CdcJsService,
          useClass: MockCdcJsService,
        },
      ],
    });
    service = TestBed.inject(CdcConsentsLocalStorageService);
    cdcJsService = TestBed.inject(CdcJsService);
    persistenceService = TestBed.inject(StatePersistenceService);
  });

  it('should be created', () => {
    cdcJsService.getSiteConsentDetails = createSpy().and.returnValue(
      mockCdcSiteConsents
    );
    persistenceService.syncWithStorage = createSpy().and.returnValue();
    expect(service).toBeTruthy();
    expect(cdcJsService.getSiteConsentDetails).toHaveBeenCalled();
    expect(service.syncCdcConsentsState).toHaveBeenCalledWith(mockCdcConsents);
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
      service.syncCdcConsentsState(mockCdcConsents);
      let output = service.checkIfConsentExists('consent.survey');
      expect(persistenceService.readStateFromStorage).toHaveBeenCalledWith({
        key: 'cdc-consents-list',
      });
      expect(output).toEqual(true);
    });
    it('should return false if ID passed in request param doesnot exists in store', () => {
      service.syncCdcConsentsState(mockCdcConsents);
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
