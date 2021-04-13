import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { BundleStarter } from '@spartacus/cart/bundle/core';
import {
  ConverterService,
  OccEndpointsService,
  PRODUCT_SEARCH_PAGE_NORMALIZER,
  CART_MODIFICATION_NORMALIZER,
  SearchConfig,
} from '@spartacus/core';
import { OccBundleAdapter } from './occ-bundle.adapter';

const mockBundleStarter: BundleStarter = {
  productCode: '12345',
  quantity: 1,
  templateId: 'MockBundle',
};
const mockSearchConfig: SearchConfig = { pageSize: 5 };
const userId = 'anonymous';
const cartId = 'xxxxx';
const entryGroupNumber = 5;

class MockOccEndpointsService {
  getUrl(endpoint: string, _urlParams?: object, _queryParams?: object) {
    return this.getEndpoint(endpoint);
  }
  getEndpoint(url: string) {
    return url;
  }
}

describe('OccBundleAdapter', () => {
  let occBundleAdapter: OccBundleAdapter;
  let converterService: ConverterService;
  let httpMock: HttpTestingController;
  let occEndpointsService: OccEndpointsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OccBundleAdapter,
        { provide: OccEndpointsService, useClass: MockOccEndpointsService },
      ],
    });

    occBundleAdapter = TestBed.inject(OccBundleAdapter);
    httpMock = TestBed.inject(HttpTestingController);
    converterService = TestBed.inject(ConverterService);
    occEndpointsService = TestBed.inject(OccEndpointsService);
    spyOn(converterService, 'pipeable').and.callThrough();
    spyOn(converterService, 'pipeableMany').and.callThrough();
    spyOn(occEndpointsService, 'getUrl').and.callThrough();
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('bundleStart', () => {
    it('should request to start a bundle', () => {
      occBundleAdapter
        .bundleStart(userId, cartId, mockBundleStarter)
        .subscribe()
        .unsubscribe();

      httpMock.expectOne({
        method: 'POST',
        url: 'bundleStart',
      });

      expect(occEndpointsService.getUrl).toHaveBeenCalledWith('bundleStart', {
        userId: userId,
        cartId: cartId,
      });
    });

    it('should use converter', () => {
      occBundleAdapter
        .bundleStart(userId, cartId, mockBundleStarter)
        .subscribe();
      httpMock.expectOne({});
      expect(converterService.pipeable).toHaveBeenCalledWith(
        CART_MODIFICATION_NORMALIZER
      );
    });
  });

  describe('bundleAllowedProductsSearch', () => {
    it('should request allowed products', () => {
      occBundleAdapter
        .bundleAllowedProductsSearch(userId, cartId, entryGroupNumber)
        .subscribe()
        .unsubscribe();

      httpMock.expectOne({
        method: 'GET',
        url: 'bundleAllowedProductsSearch',
      });

      expect(occEndpointsService.getUrl).toHaveBeenCalledWith(
        'bundleAllowedProductsSearch',
        {
          userId: userId,
          cartId: cartId,
          entryGroupNumber: entryGroupNumber,
        }
      );
    });

    it('should use search config', () => {
      occBundleAdapter
        .bundleAllowedProductsSearch(
          userId,
          cartId,
          entryGroupNumber,
          mockSearchConfig
        )
        .subscribe()
        .unsubscribe();

      httpMock.expectOne({
        method: 'GET',
        url: 'bundleAllowedProductsSearch?pageSize=5',
      });

      expect(occEndpointsService.getUrl).toHaveBeenCalledWith(
        'bundleAllowedProductsSearch',
        {
          userId: userId,
          cartId: cartId,
          entryGroupNumber: entryGroupNumber,
        }
      );
    });

    it('should use converter', () => {
      occBundleAdapter
        .bundleAllowedProductsSearch(
          userId,
          cartId,
          entryGroupNumber,
          mockSearchConfig
        )
        .subscribe();
      httpMock.expectOne({});
      expect(converterService.pipeable).toHaveBeenCalledWith(
        PRODUCT_SEARCH_PAGE_NORMALIZER
      );
    });
  });
});
