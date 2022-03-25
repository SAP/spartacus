import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ConverterService, PRODUCT_NORMALIZER } from '@spartacus/core';
import { OccEndpointsService } from '../../services/occ-endpoints.service';
import { OccProductAdapter } from './occ-product.adapter';
import createSpy = jasmine.createSpy;

const productCode = 'testCode';
const product = {
  code: productCode,
  name: 'testProduct',
};

class MockOccEndpointsService {
  buildUrl = createSpy('MockOccEndpointsService.getEndpoint').and.callFake(
    // eslint-disable-next-line no-shadow
    (url, { urlParams: { productCode }, queryParams: {}, scope }) =>
      `${url}${productCode}` + (scope ? `?fields=${scope}` : '')
  );
}

class MockConvertService {
  pipeable = createSpy().and.returnValue((x) => x);
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
    service = TestBed.inject(OccProductAdapter);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('load product details', () => {
    it('should load product details for given product code', () => {
      let result;
      service.load(productCode).subscribe((res) => (result = res));

      const mockReq = httpMock.expectOne((req) => {
        return req.method === 'GET' && req.url === 'product' + productCode;
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(product);
      expect(result).toEqual(product);
    });

    it('should load product details for given product code and scope', () => {
      let result;
      service.load(productCode, 'scope').subscribe((res) => (result = res));

      const mockReq = httpMock.expectOne(`product${productCode}?fields=scope`);

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(product);
      expect(result).toEqual(product);
    });

    it('should use converter', () => {
      const converter = TestBed.inject(ConverterService);

      service.load(productCode).subscribe();
      httpMock.expectOne('product' + productCode).flush(product);

      expect(converter.pipeable).toHaveBeenCalledWith(PRODUCT_NORMALIZER);
    });
  });

  describe('loadMany', () => {
    it('should load one product', () => {
      const scopedData = service.loadMany([{ code: productCode, scope: '' }]);

      expect(scopedData.length).toEqual(1);

      let result;
      scopedData[0].data$.subscribe((res) => (result = res));

      const mockReq = httpMock.expectOne('product' + productCode);

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(product);
      expect(result).toEqual(product);
    });

    it('should load multiple product scopes and codes product code', () => {
      const scopedData = service.loadMany([
        { code: productCode, scope: '' },
        { code: '333', scope: 'scope' },
      ]);

      expect(scopedData.length).toEqual(2);

      let result1;
      scopedData[0].data$.subscribe((res) => (result1 = res));

      let result2;
      scopedData[1].data$.subscribe((res) => (result2 = res));

      const mockReq1 = httpMock.match(`product${productCode}`)[0];
      const mockReq2 = httpMock.match('product333?fields=scope')[0];

      mockReq1.flush(product);
      mockReq2.flush({ code: '333' });
      expect(result1).toEqual(product);
      expect(result2.code).toEqual('333');
    });

    it('should merge request and split payload for multiple scopes', () => {
      const scopedData = service.loadMany([
        { code: productCode, scope: 'code' },
        { code: productCode, scope: 'name' },
      ]);

      expect(scopedData.length).toEqual(2);

      let result1;
      scopedData[0].data$.subscribe((res) => (result1 = res));
      let result2;
      scopedData[1].data$.subscribe((res) => (result2 = res));

      const mockReq = httpMock.expectOne('producttestCode?fields=code,name');

      mockReq.flush(product);
      expect(result1).toEqual({ code: product.code });
      expect(result2).toEqual({ name: product.name });
    });

    it('should use converter', () => {
      const converter = TestBed.inject(ConverterService);

      const scopedData = service.loadMany([{ code: productCode, scope: '' }]);
      scopedData[0].data$.subscribe();

      httpMock.expectOne('product' + productCode).flush(product);

      expect(converter.pipeable).toHaveBeenCalledWith(PRODUCT_NORMALIZER);
    });
  });
});
