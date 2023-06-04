import { TestBed } from '@angular/core/testing';
import { ConsentTemplate } from '@spartacus/core';
import { ConsentManagementService } from '@spartacus/storefront';
import { CdcConsentManagementService } from './cdc-consent-management.service';
import { CdcConsentsLocalStorageService } from './cdc-consents-local-storage.service';
import createSpy = jasmine.createSpy;

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
const mockOutput = ['terms.of.use'];
describe('CdcConsentManagementService', () => {
  let service: CdcConsentManagementService;
  let store: CdcConsentsLocalStorageService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [],
      providers: [CdcConsentsLocalStorageService, ConsentManagementService],
    });
    service = TestBed.inject(CdcConsentManagementService);
    store = TestBed.inject(CdcConsentsLocalStorageService);
    TestBed.compileComponents();
  });
  it('should create service', () => {
    expect(service).toBeTruthy();
  });
  describe('getRequiredConsents()', () => {
    it('return all required consents', () => {
      let templateList: ConsentTemplate[] = [];
      service.getRequiredConsents = createSpy().and.returnValue([]);
      service.getCdcRequiredConsents = createSpy().and.returnValue(['terms.of.use']);
      let result = service.getRequiredConsents(templateList);
      expect(result).toEqual(mockOutput);
      expect(service.getCdcRequiredConsents).toHaveBeenCalled();
    });
  });
  describe('getCdcRequiredConsents()', () => {
    it('return all required cdc consents', () => {
      store.readCdcConsentsFromStorage = createSpy().and.returnValue(mockStore);
      let result = service.getCdcRequiredConsents();
      expect(result).toEqual(mockOutput);
    });
  });
});
