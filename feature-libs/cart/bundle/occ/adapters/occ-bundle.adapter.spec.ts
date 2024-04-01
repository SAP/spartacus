import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CART_MODIFICATION_NORMALIZER } from '@spartacus/cart/base/core';
import {
  ConverterService,
  OccEndpointsService,
  PRODUCT_SEARCH_PAGE_NORMALIZER,
} from '@spartacus/core';
import { MockOccEndpointsService } from 'projects/core/src/occ/adapters/user/unit-test.helper';
import { BundleStarter } from '../../core/model/bundle.model';
import { OccBundleAdapter } from './occ-bundle.adapter';

const mockCartId = 'test-cart';
const mockUserId = 'test-user';
const mockAllowedProducts = {
  allowedEntries: [{ entryNumber: 0, product: { name: 'test-product' } }],
};
const mockBundleStarter: BundleStarter = {
  productCode: '123',
  quantity: 1,
  templateId: 'MockBundle',
};

describe('OccBundleAdapter', () => {
  let adapter: OccBundleAdapter;
  let converterService: ConverterService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OccBundleAdapter,
        { provide: OccEndpointsService, useClass: MockOccEndpointsService },
      ],
    });
    converterService = TestBed.inject(ConverterService);
    adapter = TestBed.inject(OccBundleAdapter);
    httpMock = TestBed.inject(HttpTestingController);
    spyOn(converterService, 'pipeable').and.callThrough();
    spyOn(converterService, 'pipeableMany').and.callThrough();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(adapter).toBeTruthy();
  });

  describe('should load a list of products from bundles endpoint', () => {
    it('should load a list of products', () => {
      adapter
        .bundleAllowedProductsSearch(mockUserId, mockCartId, 1, {
          pageSize: 10,
        })
        .subscribe((data) => expect(data).toEqual(mockAllowedProducts));

      const mockReq = httpMock.expectOne(
        (req) =>
          req.method === 'GET' && req.url === `/bundleAllowedProductsSearch`
      );

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(mockAllowedProducts);
      expect(converterService.pipeable).toHaveBeenCalledWith(
        PRODUCT_SEARCH_PAGE_NORMALIZER
      );
    });
  });

  describe('should start a bundle from bundles endpoint', () => {
    it('should start a bundle', () => {
      adapter
        .bundleStart(mockUserId, mockCartId, mockBundleStarter)
        .subscribe((data) => expect(data).toEqual({}));

      const mockReq = httpMock.expectOne(
        (req) => req.method === 'POST' && req.url === `/bundleStart`
      );

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush({});
      expect(converterService.pipeable).toHaveBeenCalledWith(
        CART_MODIFICATION_NORMALIZER
      );
    });
  });
});
