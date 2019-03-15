import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { OccConfig } from '../../occ/config/occ-config';

import { OccProductService } from './product.service';
import { OccProductConfig, defaultOccProductConfig } from './product-config';

const productCode = 'testCode';
const product = {
  code: 'testCode',
  name: 'testProduct'
};

const MockOccModuleConfig: OccConfig = {
  server: {
    baseUrl: '',
    occPrefix: ''
  },

  site: {
    baseSite: '',
    language: '',
    currency: ''
  }
};

const endpoint = '/products';

describe('OccProductService', () => {
  let service: OccProductService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OccProductService,
        { provide: OccConfig, useValue: MockOccModuleConfig },
        { provide: OccProductConfig, useValue: defaultOccProductConfig }
      ]
    });

    service = TestBed.get(OccProductService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('load product details', () => {
    it('should load product details for given product code', () => {
      service.load(productCode).subscribe(result => {
        expect(result).toEqual(product);
      });

      const mockReq = httpMock.expectOne(req => {
        return req.method === 'GET' && req.url === endpoint + `/${productCode}`;
      });

      expect(mockReq.request.params.get('fields')).toEqual(
        'DEFAULT,averageRating,images(FULL),classifications,numberOfReviews'
      );

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(product);
    });
  });
});
