import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { CdsEndpointsService } from '../../../services/cds-endpoints.service';
import { MerchandisingStrategyAdapter } from './merchandising.strategy.adapter';
import { StrategyResult } from '../../model/strategy.result';
import createSpy = jasmine.createSpy;

const strategyId = 'test-strategy-id';

const strategyResultMetadata: Map<string, string> = new Map<string, string>();
strategyResultMetadata.set('test-metadata-field', 'test-metadata-value');
const productMetadata: Map<string, string> = new Map<string, string>();
productMetadata.set('test-product-metadata-field', 'test-product-metadata-field');
const strategyResult: StrategyResult = {
  resultCount: 1,
  products: [
    {
      id: 'test-product-id',
      name: 'test-product',
      description: 'test-product',
      brand: 'test-brand',
      pageUrl: 'http://some-product-url',
      thumbNailImage: 'http://some-thumbnail-imgae-url',
      mainImage: 'http://some-main-imgae-url',
      price: 20.99,
      metadata: productMetadata
    }
  ],
  paged: {
    from: 1,
    size: 5
  },
  metadata: strategyResultMetadata
}

class MockCdsEndpointsService {
  getUrl = createSpy('StrategyAdapter.loadProductsForStrategy').and.callFake(endpoint => endpoint);
}

describe('MerchandisingStrategyAdapter', () => {
  let strategyAdapter: MerchandisingStrategyAdapter;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: CdsEndpointsService,
          useClass: MockCdsEndpointsService
        },
        MerchandisingStrategyAdapter
      ],
    });

    httpMock = TestBed.get(HttpTestingController as Type<HttpTestingController>);
    strategyAdapter = TestBed.get(MerchandisingStrategyAdapter as Type<MerchandisingStrategyAdapter>);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(strategyAdapter).toBeTruthy();
  });

  describe('load products for strategy', () => {
    it('should load products for the given strategy id', () => {
      strategyAdapter.loadProductsForStrategy(strategyId).subscribe(result => {
        expect(result).toEqual(strategyResult);
      });

      const mockStrategyProductsRequest = httpMock.expectOne(request => {
        /*
         * Our mock CdsEndpointsService returns the given endpoint key as the url,
         * so the adapter will make the http request with the endpoint key rather than a url
         */
        return request.method === 'GET' &&
          request.url === 'strategyProducts';
      });

      expect(mockStrategyProductsRequest.cancelled).toBeFalsy();
      expect(mockStrategyProductsRequest.request.responseType).toEqual('json');
      mockStrategyProductsRequest.flush(strategyResult);
    });
  });
});
