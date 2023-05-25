import { TestBed } from '@angular/core/testing';
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
  let consentService: ConsentManagementService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [],
      providers: [CdcConsentsLocalStorageService, ConsentManagementService],
    });
    service = TestBed.inject(CdcConsentManagementService);
    store = TestBed.inject(CdcConsentsLocalStorageService);
    consentService = TestBed.inject(ConsentManagementService);
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
});
