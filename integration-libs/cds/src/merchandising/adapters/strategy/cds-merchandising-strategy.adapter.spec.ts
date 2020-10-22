import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CdsEndpointsService } from '../../../services/cds-endpoints.service';
import { StrategyProducts } from '../../model/strategy-products.model';
import { CdsMerchandisingStrategyAdapter } from './cds-merchandising-strategy.adapter';
import createSpy = jasmine.createSpy;

const STRATEGY_ID = 'test-strategy-id';
const STRATEGY_PRODUCTS_ENDPOINT_KEY = 'strategyProducts';
const strategyIdObject = { strategyId: STRATEGY_ID };

const expectedProductsFromStrategy: StrategyProducts = {
  resultCount: 1,
  products: [
    {
      id: 'test-product-id',
      metadata: {
        'test-product-metadata-field': 'test-product-metadata-value',
      },
    },
  ],
  paged: {
    from: 1,
    size: 5,
  },
  metadata: {
    'test-metadata-field': 'test-metadata-value',
  },
};
const strategyRequest = {
  queryParams: {
    site: 'electronics-spa',
    language: 'en',
    pageSize: 10,
  },
};
const strategyRequestUndefinedConsentReference = {
  ...strategyRequest,
  headers: {
    consentReference: undefined,
  },
};

class MockCdsEndpointsService {
  getUrl = createSpy('MockCdsEndpointsService.getUrl').and.callFake(
    (endpoint) => endpoint
  );
}

describe('MerchandisingStrategyAdapter', () => {
  let strategyAdapter: CdsMerchandisingStrategyAdapter;
  let httpMock: HttpTestingController;
  let cdsEndpointsService: CdsEndpointsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: CdsEndpointsService,
          useClass: MockCdsEndpointsService,
        },
        CdsMerchandisingStrategyAdapter,
      ],
    });

    httpMock = TestBed.inject(HttpTestingController);
    strategyAdapter = TestBed.inject(CdsMerchandisingStrategyAdapter);
    cdsEndpointsService = TestBed.inject(CdsEndpointsService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(strategyAdapter).toBeTruthy();
  });

  describe('load products for strategy', () => {
    it('should load products for the given strategy id', () => {
      strategyAdapter
        .loadProductsForStrategy(STRATEGY_ID)
        .subscribe((products) => {
          expect(products).toEqual(expectedProductsFromStrategy);
        });

      const mockStrategyProductsRequest = httpMock.expectOne((request) => {
        /*
         * Our mock CdsEndpointsService returns the given endpoint key as the url,
         * so the adapter will make the http request with the endpoint key rather than a url
         */
        return (
          request.method === 'GET' &&
          request.url === STRATEGY_PRODUCTS_ENDPOINT_KEY
        );
      });
      expect(mockStrategyProductsRequest.cancelled).toBeFalsy();
      expect(mockStrategyProductsRequest.request.responseType).toEqual('json');

      mockStrategyProductsRequest.flush(expectedProductsFromStrategy);
    });

    it('should load the products for a given strategy id, and the request URL should include the parameters in the StrategyRequest', () => {
      strategyAdapter
        .loadProductsForStrategy(STRATEGY_ID, strategyRequest)
        .subscribe((products) => {
          expect(products).toEqual(expectedProductsFromStrategy);
        });
      const mockStrategyProductsRequest = httpMock.expectOne((request) => {
        /*
         * Our mock CdsEndpointsService returns the given endpoint key as the url,
         * so the adapter will make the http request with the endpoint key rather than a url
         */
        return (
          request.method === 'GET' &&
          request.url === STRATEGY_PRODUCTS_ENDPOINT_KEY
        );
      });

      expect(cdsEndpointsService.getUrl).toHaveBeenCalledWith(
        STRATEGY_PRODUCTS_ENDPOINT_KEY,
        strategyIdObject,
        strategyRequest.queryParams
      );

      mockStrategyProductsRequest.flush(expectedProductsFromStrategy);
    });

    it('should load the products for a given strategy id, the request URL should include the parameters in the StrategyRequest, and no HTTP header for consent-reference', () => {
      strategyAdapter
        .loadProductsForStrategy(
          STRATEGY_ID,
          strategyRequestUndefinedConsentReference
        )
        .subscribe((products) => {
          expect(products).toEqual(expectedProductsFromStrategy);
        });
      const mockStrategyProductsRequest = httpMock.expectOne((request) => {
        /*
         * Our mock CdsEndpointsService returns the given endpoint key as the url,
         * so the adapter will make the http request with the endpoint key rather than a url
         */
        return (
          request.method === 'GET' &&
          request.url === STRATEGY_PRODUCTS_ENDPOINT_KEY
        );
      });

      expect(
        mockStrategyProductsRequest.request.headers.get('consent-reference')
      ).toBeFalsy();

      expect(cdsEndpointsService.getUrl).toHaveBeenCalledWith(
        STRATEGY_PRODUCTS_ENDPOINT_KEY,
        strategyIdObject,
        strategyRequest.queryParams
      );

      mockStrategyProductsRequest.flush(expectedProductsFromStrategy);
    });
  });
});
