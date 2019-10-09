import { HttpClientModule, HttpRequest } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { async, TestBed } from '@angular/core/testing';
import { OccConfig } from '../../../occ/config/occ-config';

import { OccUserInterestsAdapter } from './occ-user-interests.adapter';
import { ProductInterestRelation } from '../../../model/product-interest.model';

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

describe('OccUserInterestsAdapter', () => {
  let service: OccUserInterestsAdapter;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [
        OccUserInterestsAdapter,
        { provide: OccConfig, useValue: MockOccModuleConfig },
      ],
    });

    service = TestBed.get(OccUserInterestsAdapter);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('getInterests', () => {
    it('should be able to fetch interests with parameters', async(() => {
      const userId = 'jack.ma@hybris.com';
      const pageSize = 1;
      const page = 1;
      const sort = 'name:asc';

      service.getInterests(userId, pageSize, page, sort).subscribe();
      const mockReq = httpMock.expectOne((req: HttpRequest<any>) => {
        return (
          req.url === '/users' + `/${userId}` + '/productinterests' &&
          req.method === 'GET'
        );
      }, `GET method and url`);
      expect(mockReq.request.params.get('pageSize')).toEqual(
        pageSize.toString()
      );
      expect(mockReq.request.params.get('currentPage')).toEqual(
        page.toString()
      );
      expect(mockReq.request.params.get('sort')).toEqual(sort);
    }));
  });

  describe('removeInterests', () => {
    it('should remove interests for given user', () => {
      const mockRelation: ProductInterestRelation = {
        product: {},
      };
      const userId = 'jack.ma@hybris.com';

      service
        .removeInterests(userId, mockRelation)
        .subscribe(result => expect(result).toEqual([]));

      const mockReq = httpMock.expectOne(req => {
        return (
          req.method === 'DELETE' &&
          req.url === '/users' + `/${userId}` + '/productinterests'
        );
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush('');
    });
  });
});
