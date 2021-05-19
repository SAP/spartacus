import { HttpClientModule } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { OccConfig } from '../../config/occ-config';

import { OccUserInterestsAdapter } from './occ-user-interests.adapter';
import {
  NotificationType,
  ProductInterestEntryRelation,
} from '../../../model/product-interest.model';
import { OccEndpointsService } from '../../services/occ-endpoints.service';
import { MockOccEndpointsService } from './unit-test.helper';
import { ConverterService } from '../../../util/converter.service';
import { PRODUCT_INTERESTS_NORMALIZER } from '../../../user/connectors/interests/converters';

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
const userId = 'qingyu.sap.com';

describe('OccUserInterestsAdapter', () => {
  let occUserInterestsAdapter: OccUserInterestsAdapter;
  let httpMock: HttpTestingController;
  let converter: ConverterService;
  let occEnpointsService: OccEndpointsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [
        OccUserInterestsAdapter,
        { provide: OccConfig, useValue: MockOccModuleConfig },
        {
          provide: OccEndpointsService,
          useClass: MockOccEndpointsService,
        },
      ],
    });

    occUserInterestsAdapter = TestBed.inject(OccUserInterestsAdapter);
    httpMock = TestBed.inject(HttpTestingController);
    converter = TestBed.inject(ConverterService);
    occEnpointsService = TestBed.inject(OccEndpointsService);

    spyOn(converter, 'pipeable').and.callThrough();
    spyOn(occEnpointsService, 'buildUrl').and.callThrough();
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('getInterests', () => {
    const pageSize = 1;
    const page = 1;
    const sort = 'name:asc';

    it('should be able to fetch interests with parameters', () => {
      occUserInterestsAdapter
        .getInterests(userId, pageSize, page, sort)
        .subscribe();
      const mockReq = httpMock.expectOne((req) => {
        return req.method === 'GET';
      });

      expect(occEnpointsService.buildUrl).toHaveBeenCalledWith(
        'getProductInterests',
        {
          urlParams: { userId: userId },
        }
      );

      expect(mockReq.request.params.get('pageSize')).toEqual(
        pageSize.toString()
      );
      expect(mockReq.request.params.get('currentPage')).toEqual(
        page.toString()
      );
      expect(mockReq.request.params.get('sort')).toEqual(sort);
    });

    it('should use converter', () => {
      occUserInterestsAdapter
        .getInterests(userId, pageSize, page, sort)
        .subscribe();
      httpMock
        .expectOne((req) => {
          return req.method === 'GET';
        })
        .flush({});
      expect(converter.pipeable).toHaveBeenCalledWith(
        PRODUCT_INTERESTS_NORMALIZER
      );
    });
  });

  describe('removeInterest', () => {
    it('should remove interests for given user', () => {
      const mockRelation: ProductInterestEntryRelation = {
        product: {
          code: '553637',
          name: 'NV10',
        },
        productInterestEntry: [
          {
            dateAdded: new Date().toString(),
            interestType: NotificationType.BACK_IN_STOCK,
          },
        ],
      };

      occUserInterestsAdapter
        .removeInterest(userId, mockRelation)
        .subscribe((result) => expect(result).toEqual(['']));

      const mockReq = httpMock.expectOne((req) => {
        return req.method === 'DELETE';
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush('');
    });
  });
});
