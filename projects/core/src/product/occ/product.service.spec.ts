import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { ProductLoaderService } from './product.service';
import { defaultOccProductConfig } from '../config/product-config';
import { DynamicTemplate } from '../../config/utils/dynamic-template';
import { OccConfig } from '@spartacus/core';

const productCode = 'testCode';
const product = {
  code: 'testCode',
  name: 'testProduct',
};

const MockOccModuleConfig: OccConfig = {
  server: {
    baseUrl: '',
    occPrefix: '',
  },

  site: {
    baseSite: '',
    language: '',
    currency: '',
  },
};

describe('ProductLoaderService', () => {
  let service: ProductLoaderService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ProductLoaderService,
        {
          provide: OccConfig,
          useValue: Object.assign(MockOccModuleConfig, defaultOccProductConfig),
        },
      ],
    });

    service = TestBed.get(ProductLoaderService);
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
            `/${DynamicTemplate.resolve(
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
