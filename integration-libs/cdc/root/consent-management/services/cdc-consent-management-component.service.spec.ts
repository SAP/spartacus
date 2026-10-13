import { TestBed } from '@angular/core/testing';
import { ConsentTemplate } from '@spartacus/core';
import { CdcConsentManagementComponentService } from './cdc-consent-management-component.service';
import { CdcConsentsLocalStorageService } from './cdc-consents-local-storage.service';

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
const mockRequiredOutput = ['terms.of.use'];
const mockActiveOutput = ['terms.of.use', 'others.survey'];
class MockCdcConsentsLocalStorageService
  implements Partial<CdcConsentsLocalStorageService>
{
  readCdcConsentsFromStorage = vi.fn();
}

describe('CdcConsentManagementService', () => {
  let service: CdcConsentManagementComponentService;
  let store: CdcConsentsLocalStorageService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      providers: [
        {
          provide: CdcConsentsLocalStorageService,
          useClass: MockCdcConsentsLocalStorageService,
        },
      ],
    });
    service = TestBed.inject(CdcConsentManagementComponentService);
    store = TestBed.inject(CdcConsentsLocalStorageService);
    TestBed.compileComponents();
  });
  it('should create service', () => {
    expect(service).toBeTruthy();
  });
  describe('getRequiredConsents()', () => {
    it('return all required consents', () => {
      let templateList: ConsentTemplate[] = [];
      service.getCdcConsentIDs = vi.fn().mockReturnValue(['terms.of.use']);
      let result = service.getRequiredConsents(templateList);
      expect(result).toEqual(mockRequiredOutput);
      expect(service.getCdcConsentIDs).toHaveBeenCalledWith(true);
    });
  });
  describe('getCdcConsentIDs()', () => {
    it('return all required cdc consents', () => {
      vi.spyOn(service, 'getCdcConsentIDs');
      store.readCdcConsentsFromStorage = vi.fn().mockReturnValue(mockStore);
      let result: string[] = [];
      result = service.getCdcConsentIDs(true);
      expect(result).toEqual(mockRequiredOutput);
      expect(service.getCdcConsentIDs).toHaveBeenCalledWith(true);
    });
    it('return all active cdc consents', () => {
      vi.spyOn(service, 'getCdcConsentIDs');
      store.readCdcConsentsFromStorage = vi.fn().mockReturnValue(mockStore);
      let result: string[] = [];
      result = service.getCdcConsentIDs();
      expect(result).toEqual(mockActiveOutput);
      expect(service.getCdcConsentIDs).toHaveBeenCalled();
    });
  });
  describe('isConsentMandatory', () => {
    it('should return true if consent is mandatory', () => {
      service.getCdcConsentIDs = vi.fn().mockReturnValue(['a']);
      expect(service.isConsentMandatory('a')).toEqual(true);
    });
    it('should return false if consent is not mandatory', () => {
      service.getCdcConsentIDs = vi.fn().mockReturnValue(['a']);
      expect(service.isConsentMandatory('b')).toEqual(false);
    });
  });
});
