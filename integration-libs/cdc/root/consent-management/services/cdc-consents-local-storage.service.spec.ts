import { TestBed } from '@angular/core/testing';
import { StatePersistenceService } from '@spartacus/core';
import { CdcLocalStorageTemplate, CdcSiteConsentTemplate } from '../model';
import { CdcConsentsLocalStorageService } from './cdc-consents-local-storage.service';
import createSpy = jasmine.createSpy;

const mockCdcSiteConsents: CdcSiteConsentTemplate = {
  siteConsentDetails: {
    'terms.of.use': { isMandatory: true, isActive: true },
    'privacy.statement': { isMandatory: true, isActive: true },
    'consent.survey': { isMandatory: false, isActive: true },
  },
};
const mockCdcConsents: CdcLocalStorageTemplate[] = [
  { id: 'terms.of.use', required: true },
  { id: 'privacy.statement', required: true },
  { id: 'consent.survey', required: false },
];
describe('CdcConsentsLocalStorageService', () => {
  let service: CdcConsentsLocalStorageService;
  let persistenceService: StatePersistenceService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StatePersistenceService],
    });
    service = TestBed.inject(CdcConsentsLocalStorageService);
    persistenceService = TestBed.inject(StatePersistenceService);
    spyOn(persistenceService, 'syncWithStorage').and.stub();
  });

  it('should inject service', () => {
    expect(service).toBeTruthy();
  });
  it('should update storage', () => {
    service.persistCdcConsentsToStorage(mockCdcSiteConsents);
    expect(persistenceService.syncWithStorage).toHaveBeenCalled();
  });
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
