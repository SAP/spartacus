import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CdcUserConsentAdapter } from './cdc-user-consent.adapter';
import { CdcConsentsLocalStorageService } from './services/cdc-consents-local-storage.service';
import { CdcUserConsentService } from './services/cdc-user-consent.service';
import createSpy = jasmine.createSpy;

class MockCdcUserConsentService implements Partial<CdcUserConsentService> {
  updateCdcConsent = createSpy();
  persistCdcSiteConsents = createSpy();
}
class MockCdcConsentsLocalStorageService
  implements Partial<CdcConsentsLocalStorageService>
{
  syncCdcConsentsState = createSpy();
  checkIfConsentExists = createSpy();
}

describe('CdcUserConsentAdapter', () => {
  let service: CdcUserConsentAdapter;
  let httpMock: HttpTestingController;
  let cdcUserConsentService: CdcUserConsentService;
  let storage: CdcConsentsLocalStorageService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [],
      providers: [
        {
          provide: CdcUserConsentService,
          useClass: MockCdcUserConsentService,
        },
        {
          provide: CdcConsentsLocalStorageService,
          useClass: MockCdcConsentsLocalStorageService,
        },
      ],
    });
    service = TestBed.inject(CdcUserConsentAdapter);
    cdcUserConsentService = TestBed.inject(CdcUserConsentService);
    storage = TestBed.inject(CdcConsentsLocalStorageService);
    httpMock = TestBed.inject(HttpTestingController);
    TestBed.compileComponents();
  });
  it('should create service', () => {
    expect(service).toBeTruthy();
  });
  it('loadConsents() - load cdc site consents', () => {
    service.loadConsents('current');
    expect(cdcUserConsentService.persistCdcSiteConsents).toHaveBeenCalled();
  });
  describe('giveConsent()', () => {
    it('should update cdc consent', () => {
      storage.checkIfConsentExists = createSpy().and.returnValue(true);
      service.giveConsent('current', 'xxxx', 0);
      expect(cdcUserConsentService.updateCdcConsent).toHaveBeenCalledWith(
        true,
        'xxxx'
      );
    });
    it('should not update cdc consent', () => {
      storage.checkIfConsentExists = createSpy().and.returnValue(false);
      service.giveConsent('current', 'xxxx', 0);
      expect(cdcUserConsentService.updateCdcConsent).not.toHaveBeenCalledWith(
        true,
        'xxxx'
      );
    });
  });
  describe('withdrawConsent()', () => {
    it('should update cdc consent', () => {
      storage.checkIfConsentExists = createSpy().and.returnValue(true);
      service.withdrawConsent('current', 'code', 'xxxx');
      expect(cdcUserConsentService.updateCdcConsent).toHaveBeenCalledWith(
        false,
        'xxxx'
      );
    });
    it('should not update cdc consent', () => {
      storage.checkIfConsentExists = createSpy().and.returnValue(false);
      service.withdrawConsent('current', 'code', 'xxxx');
      expect(cdcUserConsentService.updateCdcConsent).not.toHaveBeenCalledWith(
        false,
        'xxxx'
      );
    });
  });
});
