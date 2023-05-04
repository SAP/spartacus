import { TestBed } from '@angular/core/testing';
import { ConverterService } from '@spartacus/core';
import { of } from 'rxjs';
import { CdcJsService } from '../root/service';
import { CdcSiteConsentAdapter } from './cdc-site-consent.adapter';
import { CdcSiteConsentService } from './cdc-site-consent.service';
import { CDC_SITE_CONSENT_NORMALIZER } from './converters/cdc-site-consent.converters';
import createSpy = jasmine.createSpy;
class MockCdcSiteConsentService implements Partial<CdcSiteConsentService> {
  maintainUserConsentPreferences = createSpy();
}
class MockCdcJsService implements Partial<CdcJsService> {
  getSiteConsentDetails = createSpy();
}
describe('CdcSiteConsentAdapter', () => {
  let service: CdcSiteConsentAdapter;
  let cdcSiteConsentService: CdcSiteConsentService;
  let cdcJsService: CdcJsService;
  let converter: ConverterService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [],
      providers: [
        {
          provide: CdcSiteConsentService,
          useClass: MockCdcSiteConsentService,
        },
        {
          provide: CdcJsService,
          useClass: MockCdcJsService,
        },
      ],
    });
    service = TestBed.inject(CdcSiteConsentAdapter);
    cdcSiteConsentService = TestBed.inject(CdcSiteConsentService);
    cdcJsService = TestBed.inject(CdcJsService);
    converter = TestBed.inject(ConverterService);
    spyOn(converter, 'pipeable').and.callThrough();
    TestBed.compileComponents();
  });
  it('should create service', () => {
    expect(service).toBeTruthy();
  });
  describe('loadConsents()', () => {
    it('load cdc site consents', () => {
      cdcJsService.getSiteConsentDetails = createSpy().and.returnValue(
        of({
          callId: '28239be1f45241c5b2f04b4b7a7bc968',
          errorCode: 0,
          siteConsentDetails: {
            'terms.of.use': {
              isActive: false,
              isMandatory: true,
              legalStatements: {
                en: {
                  purpose: 'Accept the terms of use to proceed further',
                  documentUrl: 'https://accounts.gigya.com/',
                  currentDocVersion: 1,
                  minDocVersion: 1,
                },
              },
            },
          },
        })
      );
      var output = [
        {
          id: 'terms.of.use',
          name: '',
          description: 'Accept the terms of use to proceed further',
          version: 1,
          documentUrl: 'https://accounts.gigya.com/',
          required: true,
          currentConsent: {
            code: 'terms.of.use',
            consentGivenDate: new Date('3 march 2022'),
            consentWithdrawnDate: undefined,
          },
        },
      ];
      cdcSiteConsentService.maintainUserConsentPreferences =
        createSpy().and.returnValue(of(output));
      service.loadConsents().subscribe((result) => {
        expect(result).toEqual(output);
        expect(cdcJsService.getSiteConsentDetails).toHaveBeenCalled();
        expect(converter.pipeable).toHaveBeenCalledWith(
          CDC_SITE_CONSENT_NORMALIZER
        );
        expect(
          cdcSiteConsentService.maintainUserConsentPreferences
        ).toHaveBeenCalled();
      });
    });
  });
});
