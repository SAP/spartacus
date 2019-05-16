import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { OccConfig } from '../../occ/config/occ-config';
import { User } from '../../model/misc.model';
import { OccUserDetailsAdapter } from './occ-user-details.adapter';
import {
  ConverterService,
  USER_NORMALIZER,
  USER_SERIALIZER,
} from '@spartacus/core';

const username = 'mockUsername';
const password = '1234';

const user: User = {
  customerId: username,
  displayUid: password,
};
const endpoint = '/users';

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

fdescribe('OccUserDetailsAdapter', () => {
  let service: OccUserDetailsAdapter;
  let httpMock: HttpTestingController;
  let converter: ConverterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OccUserDetailsAdapter,
        { provide: OccConfig, useValue: MockOccModuleConfig },
      ],
    });

    service = TestBed.get(OccUserDetailsAdapter);
    httpMock = TestBed.get(HttpTestingController);
    converter = TestBed.get(ConverterService);
    spyOn(converter, 'pipeable').and.callThrough();
    spyOn(converter, 'convert').and.callThrough();
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
        return req.method === 'GET' && req.url === endpoint + `/${username}`;
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(user);
    });

    it('should use converter', () => {
      service.load(username).subscribe();
      httpMock.expectOne(endpoint + `/${username}`).flush(user);
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
        return req.method === 'PATCH' && req.url === endpoint + `/${username}`;
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
      httpMock.expectOne(endpoint + `/${username}`).flush(userUpdates);
      expect(converter.convert).toHaveBeenCalledWith(
        userUpdates,
        USER_SERIALIZER
      );
    });
  });
});
