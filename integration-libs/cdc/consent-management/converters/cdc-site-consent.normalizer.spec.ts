import { TestBed } from '@angular/core/testing';
import { ConsentTemplate } from '@spartacus/core';
import { CdcSiteConsentTemplate } from '../cdc-consent.model';
import { CdcSiteConsentService } from '../cdc-site-consent.service';
import { CDC_SITE_CONSENT_NORMALIZER } from './cdc-site-consent.converters';
import { CdcSiteConsentNormalizer } from './cdc-site-consent.normalizer';
import createSpy = jasmine.createSpy;
const mockInput: CdcSiteConsentTemplate = {
  status: 200,
  statusMessage: '',
  errorMessage: '',
  errorCode: 0,
  siteConsentDetails: {},
};
mockInput.siteConsentDetails['terms.of.use'] = {
  defaultLang: 'en',
  isActive: true,
  isMandatory: true,
  legalStatements: {
    en: {
      purpose: 'Accept the terms of use to proceed further',
      documentUrl: 'https://accounts.gigya.com/',
      currentDocVersion: 1,
      minDocVersion: 1,
    },
  },
};
mockInput.siteConsentDetails['others.survey'] = {
  defaultLang: 'en',
  isActive: true,
  isMandatory: false,
  legalStatements: {
    en: {
      purpose: 'Accept to receive survey emails',
      documentUrl: 'https://accounts.gigya.com/',
      currentDocVersion: 1,
      minDocVersion: 1,
    },
  },
};

const mockOutput: ConsentTemplate[] = [
  {
    id: 'terms.of.use',
    name: '',
    description: 'Accept the terms of use to proceed further',
    version: 1,
    documentUrl: 'https://accounts.gigya.com/',
    required: true,
    currentConsent: {
      code: 'terms.of.use',
      consentGivenDate: undefined,
      consentWithdrawnDate: undefined,
    },
  },
  {
    id: 'others.survey',
    name: '',
    description: 'Accept to receive survey emails',
    version: 1,
    documentUrl: 'https://accounts.gigya.com/',
    required: false,
    currentConsent: {
      code: 'others.survey',
      consentGivenDate: undefined,
      consentWithdrawnDate: undefined,
    },
  },
];

class MockCdcSiteConsentService implements Partial<CdcSiteConsentService> {
  getActiveLanguage = createSpy();
}

describe('CdcSiteConsentNormalizer()', () => {
  let service: CdcSiteConsentNormalizer;
  let cdcSiteConsentService: CdcSiteConsentService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [],
      providers: [
        {
          provide: CdcSiteConsentService,
          useClass: MockCdcSiteConsentService,
        },
      ],
    });
    service = TestBed.inject(CdcSiteConsentNormalizer);
    cdcSiteConsentService = TestBed.inject(CdcSiteConsentService);
    TestBed.compileComponents();
  });
  it('should create service', () => {
    expect(service).toBeTruthy();
  });
  describe('convert()', () => {
    it('convert cdc site consents to consent template', () => {
      cdcSiteConsentService.getActiveLanguage =
        createSpy().and.returnValue('en');
      let target: ConsentTemplate[] = [];
      target = service.convert(mockInput, target);
      console.log(target);
      expect(service.convert).toHaveBeenCalledWith(
        mockInput,
        CDC_SITE_CONSENT_NORMALIZER
      );
      expect(target).toEqual(mockOutput);
    });
  });
});
