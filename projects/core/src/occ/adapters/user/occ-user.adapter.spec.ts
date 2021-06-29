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
  UserSignUp,
  USER_NORMALIZER,
  USER_SIGN_UP_SERIALIZER,
} from '@spartacus/core';
import { OccConfig } from '../../config/occ-config';
import { OccEndpointsService } from '../../services';
import { OccUserAdapter } from './occ-user.adapter';
import {
  MockOccEndpointsService,
  mockOccModuleConfig,
} from './unit-test.helper';

const username = 'mockUsername';
const password = '1234';

const user: User = {
  customerId: username,
  displayUid: password,
};

describe('OccUserAdapter', () => {
  let occUserAdapter: OccUserAdapter;
  let httpMock: HttpTestingController;
  let converter: ConverterService;
  let occEnpointsService: OccEndpointsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OccUserAdapter,
        { provide: OccConfig, useValue: mockOccModuleConfig },
        {
          provide: OccEndpointsService,
          useClass: MockOccEndpointsService,
        },
      ],
    });

    occUserAdapter = TestBed.inject(OccUserAdapter);
    httpMock = TestBed.inject(HttpTestingController);
    converter = TestBed.inject(ConverterService);
    occEnpointsService = TestBed.inject(OccEndpointsService);
    spyOn(converter, 'pipeableMany').and.callThrough();
    spyOn(converter, 'pipeable').and.callThrough();
    spyOn(converter, 'convert').and.callThrough();
    spyOn(occEnpointsService, 'buildUrl').and.callThrough();
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('load user details', () => {
    it('should load user details for given username and access token', () => {
      occUserAdapter.load(username).subscribe((result) => {
        expect(result).toEqual(user);
      });

      const mockReq = httpMock.expectOne((req) => {
        return req.method === 'GET';
      });

      expect(occEnpointsService.buildUrl).toHaveBeenCalledWith('user', {
        urlParams: { userId: user.customerId },
      });
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(user);
    });

    it('should use converter', () => {
      occUserAdapter.load(username).subscribe();
      httpMock
        .expectOne((req) => {
          return req.method === 'GET';
        })
        .flush(user);
      expect(converter.pipeable).toHaveBeenCalledWith(USER_NORMALIZER);
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
      expect(occEnpointsService.buildUrl).toHaveBeenCalledWith('userRegister');

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

  describe('register guest', () => {
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
      expect(occEnpointsService.buildUrl).toHaveBeenCalledWith('userRegister');

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush({});
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

      expect(occEnpointsService.buildUrl).toHaveBeenCalledWith('titles');
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
