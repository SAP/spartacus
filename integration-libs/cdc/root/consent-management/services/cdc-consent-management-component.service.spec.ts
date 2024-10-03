import { TestBed } from '@angular/core/testing';
import { ConsentTemplate } from '@spartacus/core';
import { CdcConsentManagementComponentService } from './cdc-consent-management-component.service';
import { CdcConsentsLocalStorageService } from './cdc-consents-local-storage.service';
import createSpy = jasmine.createSpy;

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
  readCdcConsentsFromStorage = createSpy();
}

describe('CdcConsentManagementService', () => {
  let service: CdcConsentManagementComponentService;
  let store: CdcConsentsLocalStorageService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
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
      service.getCdcConsentIDs = createSpy().and.returnValue(['terms.of.use']);
      let result = service.getRequiredConsents(templateList);
      expect(result).toEqual(mockRequiredOutput);
      expect(service.getCdcConsentIDs).toHaveBeenCalledWith(true);
    });
  });
  describe('getCdcConsentIDs()', () => {
    it('return all required cdc consents', () => {
      spyOn(service, 'getCdcConsentIDs').and.callThrough();
      store.readCdcConsentsFromStorage = createSpy().and.returnValue(mockStore);
      let result: string[] = [];
      result = service.getCdcConsentIDs(true);
      expect(result).toEqual(mockRequiredOutput);
      expect(service.getCdcConsentIDs).toHaveBeenCalledWith(true);
    });
    it('return all active cdc consents', () => {
      spyOn(service, 'getCdcConsentIDs').and.callThrough();
      store.readCdcConsentsFromStorage = createSpy().and.returnValue(mockStore);
      let result: string[] = [];
      result = service.getCdcConsentIDs();
      expect(result).toEqual(mockActiveOutput);
      expect(service.getCdcConsentIDs).toHaveBeenCalled();
    });
  });
});
