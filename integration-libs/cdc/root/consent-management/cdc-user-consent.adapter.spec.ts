import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { CdcUserConsentAdapter } from './cdc-user-consent.adapter';
import { CdcConsentsLocalStorageService } from './services/cdc-consents-local-storage.service';
import { CdcUserConsentService } from './services/cdc-user-consent.service';
import createSpy = jasmine.createSpy;

const consentTemplateId = 'xxxx';
const consentTemplateVersion = 0;
class MockCdcUserConsentService implements Partial<CdcUserConsentService> {
  updateCdcConsent = createSpy();
}
class MockCdcConsentsLocalStorageService
  implements Partial<CdcConsentsLocalStorageService>
{
  syncCdcConsentsState = createSpy();
  checkIfConsentExists = createSpy();
}

describe('CdcUserConsentAdapter', () => {
  let service: CdcUserConsentAdapter;
  let cdcUserConsentService: CdcUserConsentService;
  let storage: CdcConsentsLocalStorageService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, StoreModule.forRoot()],
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
    httpMock = TestBed.inject(HttpTestingController);
    storage = TestBed.inject(CdcConsentsLocalStorageService);
    TestBed.compileComponents();
  });

  it('should create service', () => {
    expect(service).toBeTruthy();
  });
  describe('giveConsent()', () => {
    it('should update cdc consent', () => {
      storage.checkIfConsentExists = createSpy().and.returnValue(true);
      cdcUserConsentService.updateCdcConsent = createSpy().and.returnValue(
        of({ errorCode: 0 })
      );
      service
        .giveConsent('current', consentTemplateId, consentTemplateVersion)
        .subscribe();
      expect(cdcUserConsentService.updateCdcConsent).toHaveBeenCalledWith(
        true,
        ['xxxx']
      );
      httpMock.expectOne((req) => {
        return (
          req.method === 'POST' &&
          req.serializeBody() ===
            `consentTemplateId=${consentTemplateId}&consentTemplateVersion=${consentTemplateVersion}`
        );
      });
      httpMock.verify();
    });
    it('should not call CDC SDK', () => {
      storage.checkIfConsentExists = createSpy().and.returnValue(false);
      cdcUserConsentService.updateCdcConsent = createSpy().and.returnValue(
        of({ errorCode: 0 })
      );
      service.giveConsent('current', 'xxxx', 0).subscribe();
      expect(cdcUserConsentService.updateCdcConsent).not.toHaveBeenCalledWith(
        true,
        ['xxxx']
      );
    });
    it('should not call Commerce API', () => {
      storage.checkIfConsentExists = createSpy().and.returnValue(true);
      cdcUserConsentService.updateCdcConsent = createSpy().and.returnValue(
        of({ errorCode: 2 })
      );
      service.giveConsent('current', 'xxxx', 0).subscribe();
      expect(cdcUserConsentService.updateCdcConsent).toHaveBeenCalledWith(
        true,
        ['xxxx']
      );
      httpMock.expectNone((req) => {
        return (
          req.method === 'POST' &&
          req.serializeBody() ===
            `consentTemplateId=${consentTemplateId}&consentTemplateVersion=${consentTemplateVersion}`
        );
      });
      httpMock.verify();
    });
  });
  describe('withdrawConsent()', () => {
    it('should update cdc consent', () => {
      storage.checkIfConsentExists = createSpy().and.returnValue(true);
      cdcUserConsentService.updateCdcConsent = createSpy().and.returnValue(
        of({ errorCode: 0 })
      );
      service.withdrawConsent('current', 'code', 'xxxx').subscribe();
      expect(cdcUserConsentService.updateCdcConsent).toHaveBeenCalledWith(
        false,
        ['xxxx']
      );
      httpMock.expectOne((req) => {
        return req.method === 'DELETE';
      });
      httpMock.verify();
    });
    it('should not call CDC SDK', () => {
      storage.checkIfConsentExists = createSpy().and.returnValue(false);
      cdcUserConsentService.updateCdcConsent = createSpy().and.returnValue(
        of({ errorCode: 0 })
      );
      service.withdrawConsent('current', 'code', 'xxxx').subscribe();
      expect(cdcUserConsentService.updateCdcConsent).not.toHaveBeenCalledWith(
        false,
        ['xxxx']
      );
    });
    it('should not call Commerce API', () => {
      storage.checkIfConsentExists = createSpy().and.returnValue(true);
      cdcUserConsentService.updateCdcConsent = createSpy().and.returnValue(
        of({ errorCode: 2 })
      );
      service.withdrawConsent('current', 'code', 'xxxx').subscribe();
      expect(cdcUserConsentService.updateCdcConsent).toHaveBeenCalledWith(
        false,
        ['xxxx']
      );
      httpMock.expectNone((req) => {
        return req.method === 'DELETE';
      });
      httpMock.verify();
    });
  });
});
