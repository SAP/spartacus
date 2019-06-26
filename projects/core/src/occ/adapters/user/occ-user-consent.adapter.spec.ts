import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { OccConfig } from '../../config/occ-config';
import { OccUserConsentAdapter } from './occ-user-consent.adapter';
import {
  CONSENT_TEMPLATE_NORMALIZER,
  ConverterService,
  Occ,
} from '@spartacus/core';
import { ConsentTemplate } from '../../../model/consent.model';

const endpoint = '/users';
const CONSENTS_TEMPLATES_ENDPOINT = '/consenttemplates';
const CONSENTS_ENDPOINT = '/consents';

const MockOccModuleConfig: OccConfig = {
  backend: {
    occ: {
      baseUrl: '',
      prefix: '',
    },
  },

  context: {
    parameters: {
      baseSite: { default: '' },
    },
  },
};

describe('OccUserConsentAdapter', () => {
  let service: OccUserConsentAdapter;
  let httpMock: HttpTestingController;
  let converter: ConverterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OccUserConsentAdapter,
        { provide: OccConfig, useValue: MockOccModuleConfig },
      ],
    });

    service = TestBed.get(OccUserConsentAdapter);
    httpMock = TestBed.get(HttpTestingController);
    converter = TestBed.get(ConverterService);
    spyOn(converter, 'pipeableMany').and.callThrough();
    spyOn(converter, 'pipeable').and.callThrough();
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('loadConsents', () => {
    it('should retrive user consents for the given user id', () => {
      const userId = 'xxx@xxx.xxx';
      const mockConsentTemplateList: Occ.ConsentTemplateList = {
        consentTemplates: [{ id: 'xxx' }],
      };

      service.loadConsents(userId).subscribe(result => {
        expect(result).toEqual(mockConsentTemplateList.consentTemplates);
      });

      const mockReq = httpMock.expectOne(req => {
        return (
          req.method === 'GET' &&
          req.url === endpoint + `/${userId}${CONSENTS_TEMPLATES_ENDPOINT}`
        );
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(mockConsentTemplateList);
    });

    it('should use converter', () => {
      const userId = 'xxx@xxx.xxx';
      service.loadConsents(userId).subscribe();
      httpMock
        .expectOne(endpoint + `/${userId}${CONSENTS_TEMPLATES_ENDPOINT}`)
        .flush([]);
      expect(converter.pipeableMany).toHaveBeenCalledWith(
        CONSENT_TEMPLATE_NORMALIZER
      );
    });
  });

  describe('giveConsent', () => {
    it('should give the user consent', () => {
      const consentTemplateId = 'xxx';
      const consentTemplateVersion = 1;
      const userId = 'xxx@xxx.xxx';

      const expectedConsentTemplate: ConsentTemplate = {
        id: consentTemplateId,
        version: consentTemplateVersion,
        currentConsent: {
          consentGivenDate: new Date(),
        },
      };
      service
        .giveConsent(userId, consentTemplateId, consentTemplateVersion)
        .subscribe(result => expect(result).toEqual(expectedConsentTemplate));

      const mockReq = httpMock.expectOne(
        req =>
          req.method === 'POST' &&
          req.url === `${endpoint}/${userId}${CONSENTS_ENDPOINT}` &&
          req.serializeBody() ===
            `consentTemplateId=${consentTemplateId}&consentTemplateVersion=${consentTemplateVersion}`
      );
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.headers.get('Content-Type')).toEqual(
        'application/x-www-form-urlencoded'
      );
      mockReq.flush(expectedConsentTemplate);
    });

    it('should use converter', () => {
      const userId = 'xxx@xxx.xxx';

      service.giveConsent(userId, 'xxx', 1).subscribe();
      httpMock.expectOne(`${endpoint}/${userId}${CONSENTS_ENDPOINT}`).flush({});
      expect(converter.pipeable).toHaveBeenCalledWith(
        CONSENT_TEMPLATE_NORMALIZER
      );
    });
  });

  describe('withdrawConsent', () => {
    it('should withdraw the user consent', () => {
      service
        .withdrawConsent('xxx@xxx.xxx', 'xxx')
        .subscribe(result => expect(result).toEqual(''));

      const mockReq = httpMock.expectOne(req => {
        return (
          req.method === 'DELETE' &&
          req.url === `${endpoint}/xxx@xxx.xxx${CONSENTS_ENDPOINT}/xxx`
        );
      });

      expect(mockReq.cancelled).toBeFalsy();
      mockReq.flush('');
    });
  });
});
