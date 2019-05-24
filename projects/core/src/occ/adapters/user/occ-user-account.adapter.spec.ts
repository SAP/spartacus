import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { OccConfig } from '../../config/occ-config';
import {
  ConsentTemplate,
  ConsentTemplateList,
} from '../../occ-models/additional-occ.models';
import { OccUserAccountAdapter } from './occ-user-account.adapter';
import { ConverterService, Occ, TITLE_NORMALIZER } from '@spartacus/core';

const endpoint = '/users';
const forgotPasswordEndpoint = '/forgottenpasswordtokens';
const resetPasswordEndpoint = '/resetpassword';
const updateEmailEndpoint = '/login';
const updatePasswordEndpoint = '/password';
const CONSENTS_TEMPLATES_ENDPOINT = '/consenttemplates';
const CONSENTS_ENDPOINT = '/consents';

const MockOccModuleConfig: OccConfig = {
  backend: {
    occ: {
      baseUrl: '',
      prefix: '',
    },
  },

  site: {
    baseSite: '',
  },
};

describe('OccUserAccountAdapter', () => {
  let service: OccUserAccountAdapter;
  let httpMock: HttpTestingController;
  let converter: ConverterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OccUserAccountAdapter,
        { provide: OccConfig, useValue: MockOccModuleConfig },
      ],
    });

    service = TestBed.get(OccUserAccountAdapter);
    httpMock = TestBed.get(HttpTestingController);
    converter = TestBed.get(ConverterService);
    spyOn(converter, 'pipeableMany').and.callThrough();
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('forgot password: ', () => {
    it('should request a forgot password email for userId', () => {
      const testUserId = 'test@test.com';
      service
        .requestForgotPasswordEmail(testUserId)
        .subscribe(result => expect(result).toEqual(''));

      const mockReq = httpMock.expectOne(req => {
        return (
          req.method === 'POST' &&
          req.url === `${forgotPasswordEndpoint}` &&
          req.serializeBody() === `userId=${testUserId}`
        );
      });
      expect(mockReq.cancelled).toBeFalsy();
      mockReq.flush('');
    });
  });

  describe('reset password: ', () => {
    it('should be able to reset a new password', () => {
      const token = 'test token';
      const newPassword = 'new password';

      service
        .resetPassword(token, newPassword)
        .subscribe(result => expect(result).toEqual(''));

      const mockReq = httpMock.expectOne(req => {
        return req.method === 'POST' && req.url === `${resetPasswordEndpoint}`;
      });

      expect(mockReq.request.headers.get('cx-use-client-token')).toBeTruthy();
      expect(mockReq.request.body).toEqual({
        token: 'test token',
        newPassword: 'new password',
      });
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush('');
    });
  });

  describe('remove user account: ', () => {
    it('should be able to close user account', () => {
      service
        .remove('testUserId')
        .subscribe(result => expect(result).toEqual(''));

      const mockReq = httpMock.expectOne(req => {
        return req.method === 'DELETE' && req.url === `${endpoint}/testUserId`;
      });

      expect(mockReq.cancelled).toBeFalsy();
      mockReq.flush('');
    });
  });

  describe('update email: ', () => {
    it('should be able to update the email address', () => {
      const userId = 'test@test.com';
      const currentPassword = 'Qwe123!';
      const newUserId = 'tester@sap.com';

      let result: Object;

      service
        .updateEmail(userId, currentPassword, newUserId)
        .subscribe(value => (result = value));

      const mockReq = httpMock.expectOne(req => {
        return (
          req.method === 'PUT' &&
          req.url === `${endpoint}/${userId}${updateEmailEndpoint}` &&
          req.serializeBody() ===
            `password=${currentPassword}&newLogin=${newUserId}`
        );
      });

      expect(mockReq.cancelled).toBeFalsy();

      mockReq.flush('');
      expect(result).toEqual('');
    });
  });

  describe('update password: ', () => {
    it('should update the password for userId', () => {
      const userId = 'test@test.com';
      const oldPassword = 'OldPass123!';
      const newPassword = 'NewPass456!';

      let result: Object;

      service
        .updatePassword(userId, oldPassword, newPassword)
        .subscribe(value => (result = value));

      const mockReq = httpMock.expectOne(req => {
        return (
          req.method === 'PUT' &&
          req.url === `${endpoint}/${userId}${updatePasswordEndpoint}` &&
          req.serializeBody() === `old=${oldPassword}&new=${newPassword}`
        );
      });
      expect(mockReq.cancelled).toBeFalsy();
      mockReq.flush('');
      expect(result).toEqual('');
    });
  });

  describe('loadTitles', () => {
    it('load return titles list', () => {
      const titlesList: Occ.TitleList = {
        titles: [
          {
            code: 'mr',
            name: 'Mr.',
          },
          {
            code: 'mrs',
            name: 'Mrs.',
          },
        ],
      };

      service.loadTitles().subscribe(result => {
        expect(result).toEqual(titlesList.titles);
      });

      const mockReq = httpMock.expectOne(req => {
        return req.method === 'GET' && req.url === '/titles';
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(titlesList);
    });

    it('should use converter', () => {
      service.loadTitles().subscribe();
      httpMock.expectOne('/titles').flush({});
      expect(converter.pipeableMany).toHaveBeenCalledWith(TITLE_NORMALIZER);
    });
  });

  describe('loadConsents', () => {
    it('should retrive user consents for the given user id', () => {
      const userId = 'xxx@xxx.xxx';
      const mockConsentTemplateList: ConsentTemplateList = {
        consentTemplates: [{ id: 'xxx' }],
      };

      service.loadConsents(userId).subscribe(result => {
        expect(result).toEqual(mockConsentTemplateList);
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
