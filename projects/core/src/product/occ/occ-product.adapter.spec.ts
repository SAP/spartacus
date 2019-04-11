import { TestBed } from '@angular/core/testing';

import { OccProductAdapter } from './occ-product.adapter';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { OccEndpointsService } from '../../occ/services/occ-endpoints.service';
import { ConverterService, PRODUCT_NORMALIZER } from '@spartacus/core';
import createSpy = jasmine.createSpy;

const productCode = 'testCode';
const product = {
  code: productCode,
  name: 'testProduct',
};

class MockOccEndpointsService {
  getUrl = createSpy('MockOccEndpointsService.getEndpoint').and.callFake(
    // tslint:disable-next-line:no-shadowed-variable
    (url, { productCode }) => url + productCode
  );
}

class MockConvertService {
  pipeable = createSpy().and.returnValue(x => x);
}

describe('OccProductAdapter', () => {
  let service: OccProductAdapter;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OccProductAdapter,
        {
          provide: OccEndpointsService,
          useClass: MockOccEndpointsService,
        },
        { provide: ConverterService, useClass: MockConvertService },
      ],
    });

    service = TestBed.get(OccProductAdapter);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('load product details', () => {
    it('should load product details for given product code', () => {
      service.load(productCode).subscribe(result => {
        expect(result).toEqual(product);
      });

      const mockReq = httpMock.expectOne(req => {
        return req.method === 'GET' && req.url === 'product' + productCode;
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(product);
    });

    it('should use converter', () => {
      const converter = TestBed.get(ConverterService);

      service.load(productCode).subscribe();
      httpMock.expectOne('product' + productCode).flush(product);

      expect(converter.pipeable).toHaveBeenCalledWith(PRODUCT_NORMALIZER);
    });
  });
});
