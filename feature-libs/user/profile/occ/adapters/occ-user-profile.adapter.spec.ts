import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import {
  ConverterService,
  Occ,
  OccConfig,
  OccEndpointsService,
} from '@spartacus/core';
import { User } from '@spartacus/user/account/root';
import {
  TITLE_NORMALIZER,
  USER_PROFILE_SERIALIZER,
  USER_SIGN_UP_SERIALIZER,
} from '@spartacus/user/profile/core';
import { UserSignUp } from '@spartacus/user/profile/root';
import { OccUserProfileAdapter } from './occ-user-profile.adapter';

export const mockOccModuleConfig: OccConfig = {
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

export class MockOccEndpointsService implements Partial<OccEndpointsService> {
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
  isConfigured() {
    return true;
  }
}

const username = 'mockUsername';
const password = '1234';

const user: User = {
  customerId: username,
  displayUid: password,
};

describe('OccUserProfileAdapter', () => {
  let occUserAdapter: OccUserProfileAdapter;
  let httpMock: HttpTestingController;
  let converter: ConverterService;
  let occEndpointsService: OccEndpointsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OccUserProfileAdapter,
        { provide: OccConfig, useValue: mockOccModuleConfig },
        {
          provide: OccEndpointsService,
          useClass: MockOccEndpointsService,
        },
      ],
    });

    occUserAdapter = TestBed.inject(OccUserProfileAdapter);
    httpMock = TestBed.inject(HttpTestingController);
    converter = TestBed.inject(ConverterService);
    occEndpointsService = TestBed.inject(OccEndpointsService);
    spyOn(converter, 'pipeableMany').and.callThrough();
    spyOn(converter, 'pipeable').and.callThrough();
    spyOn(converter, 'convert').and.callThrough();
    spyOn(occEndpointsService, 'getUrl').and.callThrough();
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('update user details', () => {
    it('should update user details for the given username', () => {
      const userUpdates: User = {
        title: 'mr',
      };
      occUserAdapter.update(username, userUpdates).subscribe();

      const mockReq = httpMock.expectOne((req) => {
        return req.method === 'PATCH';
      });
      expect(occEndpointsService.getUrl).toHaveBeenCalledWith(
        'userUpdateProfile',
        {
          userId: user.customerId,
        }
      );

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      expect(mockReq.request.body).toEqual(userUpdates);
      mockReq.flush(userUpdates);
    });

    it('should use converter', () => {
      const userUpdates: User = {
        title: 'mr',
      };

      occUserAdapter.update(username, userUpdates).subscribe();
      httpMock
        .expectOne((req) => {
          return req.method === 'PATCH';
        })
        .flush(userUpdates);
      expect(converter.convert).toHaveBeenCalledWith(
        userUpdates,
        USER_PROFILE_SERIALIZER
      );
    });
  });

  describe('register user', () => {
    it('should able to register a new user', () => {
      const userSignUp: UserSignUp = {
        uid: 'uid',
        password: 'password',
      };
      occUserAdapter.register(userSignUp).subscribe();

      const mockReq = httpMock.expectOne((req) => {
        return req.method === 'POST';
      });
      expect(occEndpointsService.getUrl).toHaveBeenCalledWith('userRegister');

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      expect(mockReq.request.body).toEqual(userSignUp);
      mockReq.flush(userSignUp);
    });

    it('should use converter', () => {
      const userSignUp: UserSignUp = {
        uid: 'uid',
        password: 'password',
      };
      occUserAdapter.register(userSignUp).subscribe();
      httpMock
        .expectOne((req) => {
          return req.method === 'POST';
        })
        .flush(userSignUp);
      expect(converter.convert).toHaveBeenCalledWith(
        userSignUp,
        USER_SIGN_UP_SERIALIZER
      );
    });
  });

  describe('resiter guest', () => {
    it('should able to register a new user from guest', () => {
      const guid = 'guid';
      const pwd = 'password';
      occUserAdapter.registerGuest(guid, pwd).subscribe();

      const mockReq = httpMock.expectOne((req) => {
        return (
          req.method === 'POST' &&
          req.serializeBody() === `guid=${guid}&password=${pwd}`
        );
      });
      expect(occEndpointsService.getUrl).toHaveBeenCalledWith('userRegister');

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush({});
    });
  });

  describe('forgot password: ', () => {
    it('should request a forgot password email for userId', () => {
      const testUserId = 'test@test.com';
      occUserAdapter
        .requestForgotPasswordEmail(testUserId)
        .subscribe((result) => expect(result).toEqual(''));

      const mockReq = httpMock.expectOne((req) => {
        return (
          req.method === 'POST' &&
          req.serializeBody() === `userId=${testUserId}`
        );
      });
      expect(occEndpointsService.getUrl).toHaveBeenCalledWith(
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

      occUserAdapter
        .resetPassword(token, newPassword)
        .subscribe((result) => expect(result).toEqual(''));

      const mockReq = httpMock.expectOne((req) => {
        return req.method === 'POST';
      });

      expect(occEndpointsService.getUrl).toHaveBeenCalledWith(
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

  describe('close user account: ', () => {
    it('should be able to close user account', () => {
      occUserAdapter
        .close('testUserId')
        .subscribe((result) => expect(result).toEqual(''));

      const mockReq = httpMock.expectOne((req) => {
        return req.method === 'DELETE';
      });

      expect(occEndpointsService.getUrl).toHaveBeenCalledWith(
        'userCloseAccount',
        {
          userId: 'testUserId',
        }
      );
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

      occUserAdapter
        .updateEmail(userId, currentPassword, newUserId)
        .subscribe((value) => (result = value));

      const mockReq = httpMock.expectOne((req) => {
        return (
          req.method === 'PUT' &&
          req.serializeBody() ===
            `password=${currentPassword}&newLogin=${newUserId}`
        );
      });

      expect(
        occEndpointsService.getUrl
      ).toHaveBeenCalledWith('userUpdateLoginId', { userId });
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

      occUserAdapter
        .updatePassword(userId, oldPassword, newPassword)
        .subscribe((value) => (result = value));

      const mockReq = httpMock.expectOne((req) => {
        return (
          req.method === 'PUT' &&
          req.serializeBody() === `old=${oldPassword}&new=${newPassword}`
        );
      });

      expect(
        occEndpointsService.getUrl
      ).toHaveBeenCalledWith('userUpdatePassword', { userId });

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

      occUserAdapter.loadTitles().subscribe((result) => {
        expect(result).toEqual(titlesList.titles);
      });

      const mockReq = httpMock.expectOne((req) => {
        return req.method === 'GET';
      });

      expect(occEndpointsService.getUrl).toHaveBeenCalledWith('titles');
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(titlesList);
    });

    it('should use converter', () => {
      occUserAdapter.loadTitles().subscribe();
      httpMock.expectOne('/titles').flush({});
      expect(converter.pipeableMany).toHaveBeenCalledWith(TITLE_NORMALIZER);
    });
  });
});
