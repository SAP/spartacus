import { TestBed } from '@angular/core/testing';
import { ConsentManagementService } from '@spartacus/storefront';
import {
  CdcLocalStorageTemplate,
  CdcSiteConsentTemplate,
} from '../../../core/models/cdc-consent-management.model';
import { of } from 'rxjs';
import { CdcConsentManagementService } from './cdc-consent-management.service';
import { CdcConsentsLocalStorageService } from './cdc-consents-local-storage.service';
import { CdcJsService } from '@spartacus/cdc/root';
import createSpy = jasmine.createSpy;
const mockCdcSiteConsents: CdcSiteConsentTemplate = {
  siteConsentDetails: {
    'terms.of.use': { isMandatory: true, isActive: true },
    'privacy.statement': { isMandatory: true, isActive: true },
    'consent.survey': { isMandatory: false, isActive: true },
  },
};
const mockStoredConsents: CdcLocalStorageTemplate[] = [
  { id: 'terms.of.use', required: true },
  { id: 'privacy.statement', required: true },
  { id: 'consent.survey', required: false },
];
const mockInput = [
  {
    id: 'terms.of.use',
    currentConsent: {
      code: 'terms.of.use',
      consentGivenDate: new Date('3 march 2022'),
      consentWithdrawnDate: undefined,
    },
    required: true,
  },
  {
    id: 'others.survey',
    currentConsent: {
      code: 'others.survey',
      consentGivenDate: new Date('3 march 2022'),
      consentWithdrawnDate: undefined,
    },
    required: false,
  },
];
const mockStore = [
  {
    id: 'terms.of.use',
    required: true,
  },
  {
    id: 'others.survey',
    required: false,
  },
];
class MockCdcJsService implements Partial<CdcJsService> {
  getSiteConsentDetails = createSpy();
}
const mockOutput = ['terms.of.use'];
describe('CdcConsentManagementService', () => {
  let service: CdcConsentManagementService;
  let store: CdcConsentsLocalStorageService;
  let consentService: ConsentManagementService;
  let cdcJsService: CdcJsService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [],
      providers: [
        CdcConsentsLocalStorageService,
        ConsentManagementService,
        {
          provide: CdcJsService,
          useClass: MockCdcJsService,
        },
      ],
    });
    service = TestBed.inject(CdcConsentManagementService);
    store = TestBed.inject(CdcConsentsLocalStorageService);
    consentService = TestBed.inject(ConsentManagementService);
    cdcJsService = TestBed.inject(CdcJsService);
    TestBed.compileComponents();
  });
  it('should create service', () => {
    expect(service).toBeTruthy();
  });
  describe('getRequiredConsents()', () => {
    it('return all required consents', () => {
      store.readCdcConsentState = createSpy().and.returnValue(mockStore);
      consentService.getRequiredConsents = createSpy().and.returnValue([]);
      let result = service.getRequiredConsents(mockInput);
      expect(result).toEqual(mockOutput);
    });
  });
  describe('persistCdcSiteConsents()', () => {
    it('should persist cdc site consents into local storage', () => {
      cdcJsService.getSiteConsentDetails = createSpy().and.returnValue(
        of(mockCdcSiteConsents)
      );
      store.syncCdcConsentsState = createSpy().and.returnValue({});
      service.persistCdcSiteConsents();
      expect(cdcJsService.getSiteConsentDetails).toHaveBeenCalled();
      expect(store.syncCdcConsentsState).toHaveBeenCalledWith(
        mockStoredConsents
      );
    });
  });
});
