import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ConverterService, ImageType } from '@spartacus/core';
import { map } from 'rxjs/operators';
import { CdsEndpointsService } from '../../../services/cds-endpoints.service';
import { MERCHANDISING_PRODUCTS_NORMALIZER } from '../../connectors/strategy/converters';
import { MerchandisingProducts } from '../../model/merchandising.products.model';
import { StrategyResult } from '../../model/strategy.result';
import { CdsMerchandisingStrategyAdapter } from './cds-merchandising-strategy.adapter';
import createSpy = jasmine.createSpy;

const STRATEGY_ID = 'test-strategy-id';

const MERCHANDISING_PRODUCTS_METADATA: Map<string, string> = new Map<
  string,
  string
>();
MERCHANDISING_PRODUCTS_METADATA.set(
  'test-metadata-field',
  'test-metadata-value'
);

const MERCHANDISING_PRODUCTS: MerchandisingProducts = {
  products: [
    {
      code: 'test-product-id',
      name: 'test-product',
      price: {
        formattedValue: '20.99',
        value: 20.99,
      },
      images: {
        PRIMARY: {
          product: {
            url: 'http://some-main-imgae-url',
            format: 'product',
            imageType: ImageType.PRIMARY,
          },
        },
      },
    },
  ],
  metadata: MERCHANDISING_PRODUCTS_METADATA,
};

const STRATEGY_RESULT_METADATA: Map<string, string> = new Map<string, string>();
STRATEGY_RESULT_METADATA.set('test-metadata-field', 'test-metadata-value');
const PRODUCT_METADATA: Map<string, string> = new Map<string, string>();
PRODUCT_METADATA.set(
  'test-product-metadata-field',
  'test-product-metadata-field'
);
const STRATEGY_RESULT: StrategyResult = {
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
      metadata: PRODUCT_METADATA,
    },
  ],
  paged: {
    from: 1,
    size: 5,
  },
  metadata: STRATEGY_RESULT_METADATA,
};

class MockConverterService {
  pipeable = createSpy().and.returnValue(map(() => MERCHANDISING_PRODUCTS));
}

class MockCdsEndpointsService {
  getUrl = createSpy('MockCdsEndpointsService.getUrl').and.callFake(
    endpoint => endpoint
  );
}

describe('MerchandisingStrategyAdapter', () => {
  let strategyAdapter: CdsMerchandisingStrategyAdapter;
  let httpMock: HttpTestingController;
  let converterService: ConverterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: CdsEndpointsService,
          useClass: MockCdsEndpointsService,
        },
        {
          provide: ConverterService,
          useClass: MockConverterService,
        },
        CdsMerchandisingStrategyAdapter,
      ],
    });

    converterService = TestBed.get(ConverterService as Type<ConverterService>);
    httpMock = TestBed.get(HttpTestingController as Type<
      HttpTestingController
    >);
    strategyAdapter = TestBed.get(CdsMerchandisingStrategyAdapter as Type<
      CdsMerchandisingStrategyAdapter
    >);
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
        .subscribe(merchandisingProducts => {
          expect(merchandisingProducts).toEqual(MERCHANDISING_PRODUCTS);
        });

      const MOCK_STRATEGY_PRODUCTS_REQUEST = httpMock.expectOne(request => {
        /*
         * Our mock CdsEndpointsService returns the given endpoint key as the url,
         * so the adapter will make the http request with the endpoint key rather than a url
         */
        return request.method === 'GET' && request.url === 'strategyProducts';
      });
      expect(MOCK_STRATEGY_PRODUCTS_REQUEST.cancelled).toBeFalsy();
      expect(MOCK_STRATEGY_PRODUCTS_REQUEST.request.responseType).toEqual(
        'json'
      );
      expect(converterService.pipeable).toHaveBeenCalledWith(
        MERCHANDISING_PRODUCTS_NORMALIZER
      );
      MOCK_STRATEGY_PRODUCTS_REQUEST.flush(STRATEGY_RESULT);
    });
  });
});
