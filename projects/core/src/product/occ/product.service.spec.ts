import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { OccProductService } from './product.service';
import { OccProductConfig, defaultOccProductConfig } from './product-config';
import { DynamicTemplate } from '../../config/utils/dynamic-template';

const productCode = 'testCode';
const product = {
  code: 'testCode',
  name: 'testProduct'
};

const MockOccModuleConfig: OccProductConfig = {
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

describe('OccProductService', () => {
  let service: OccProductService;
  let httpMock: HttpTestingController;
  let dynamicTemplate: DynamicTemplate;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OccProductService,
        {
          provide: OccProductConfig,
          useValue: Object.assign(MockOccModuleConfig, defaultOccProductConfig)
        }
      ]
    });

    dynamicTemplate = TestBed.get(DynamicTemplate);
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
        return (
          req.method === 'GET' &&
          req.url ===
            `/${dynamicTemplate.resolve(
              defaultOccProductConfig.endpoints.product,
              { productCode }
            )}`
        );
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(product);
    });
  });
});
