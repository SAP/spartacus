import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import {
  ConverterService,
  Occ,
  TITLE_NORMALIZER,
  User,
  USER_NORMALIZER,
  USER_SERIALIZER,
} from '@spartacus/core';
import { OccConfig } from '../../config/occ-config';
import { OccEndpointsService } from '../../services';
import { OccUserAdapter } from './occ-user.adapter';

const usersEndpoint = '/users';
const updatePasswordEndpoint = '/password';

const MockOccModuleConfig: OccConfig = {
  backend: {
    occ: {
      baseUrl: '',
      prefix: '',
    },
  },

  context: {
    baseSite: [''],
  },
};

class MockOccEndpointsService {
  getUrl(endpointKey: string, _urlParams?: object, _queryParams?: object) {
    return this.getEndpoint(endpointKey);
  }
  getEndpoint(endpoint: string) {
    if (!endpoint.startsWith('/')) {
      endpoint = '/' + endpoint;
    }
    return endpoint;
  }
  getBaseEndpoint() {
    return '';
  }
}

const username = 'mockUsername';
const password = '1234';

const user: User = {
  customerId: username,
  displayUid: password,
};

describe('OccUserAdapter', () => {
  let service: OccUserAdapter;
  let httpMock: HttpTestingController;
  let converter: ConverterService;
  let occEnpointsService: OccEndpointsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OccUserAdapter,
        { provide: OccConfig, useValue: MockOccModuleConfig },
        {
          provide: OccEndpointsService,
          useClass: MockOccEndpointsService,
        },
      ],
    });

    service = TestBed.get(OccUserAdapter);
    httpMock = TestBed.get(HttpTestingController);
    converter = TestBed.get(ConverterService);
    occEnpointsService = TestBed.get(OccEndpointsService);
    spyOn(converter, 'pipeableMany').and.callThrough();
    spyOn(converter, 'pipeable').and.callThrough();
    spyOn(converter, 'convert').and.callThrough();
    spyOn(occEnpointsService, 'getUrl').and.callThrough();
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('load user details', () => {
    it('should load user details for given username and access token', () => {
      service.load(username).subscribe(result => {
        expect(result).toEqual(user);
      });

      const mockReq = httpMock.expectOne(req => {
        return req.method === 'GET';
      });

      expect(occEnpointsService.getUrl).toHaveBeenCalledWith('user', {
        userId: user.customerId,
      });
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(user);
    });

    it('should use converter', () => {
      service.load(username).subscribe();
      httpMock
        .expectOne(req => {
          return req.method === 'GET';
        })
        .flush(user);
      expect(converter.pipeable).toHaveBeenCalledWith(USER_NORMALIZER);
    });
  });

  describe('update user details', () => {
    it('should update user details for the given username', () => {
      const userUpdates: User = {
        title: 'mr',
      };
      service.update(username, userUpdates).subscribe(_ => _);

      const mockReq = httpMock.expectOne(req => {
        return req.method === 'PATCH';
      });
      expect(occEnpointsService.getUrl).toHaveBeenCalledWith('user', {
        userId: user.customerId,
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      expect(mockReq.request.body).toEqual(userUpdates);
      mockReq.flush(userUpdates);
    });

    it('should use converter', () => {
      const userUpdates: User = {
        title: 'mr',
      };

      service.update(username, userUpdates).subscribe();
      httpMock
        .expectOne(req => {
          return req.method === 'PATCH';
        })
        .flush(userUpdates);
      expect(converter.convert).toHaveBeenCalledWith(
        userUpdates,
        USER_SERIALIZER
      );
    });
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
          req.serializeBody() === `userId=${testUserId}`
        );
      });
      expect(occEnpointsService.getUrl).toHaveBeenCalledWith(
        'userForgotPassword'
      );

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
        return req.method === 'POST';
      });

      expect(occEnpointsService.getUrl).toHaveBeenCalledWith(
        'userResetPassword'
      );
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
        return (
          req.method === 'DELETE' && req.url === `${usersEndpoint}/testUserId`
        );
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
          req.serializeBody() ===
            `password=${currentPassword}&newLogin=${newUserId}`
        );
      });

      expect(occEnpointsService.getUrl).toHaveBeenCalledWith(
        'userUpdateLoginId',
        { userId }
      );
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
          req.url === `${usersEndpoint}/${userId}${updatePasswordEndpoint}` &&
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
});
