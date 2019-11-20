import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { BaseSiteService, ImageType, LanguageService } from '@spartacus/core';
import { of } from 'rxjs';
import { MerchandisingStrategyConnector } from './../connectors/strategy/merchandising-strategy.connector';
import { MerchandisingProducts } from './../model/merchandising.products.model';
import { CdsMerchandisingProductService } from './cds-merchandising-product.service';
import createSpy = jasmine.createSpy;

const STRATEGY_ID = 'test-strategy-id';

const STRATEGY_REQUEST = {
  site: 'electronics-spa',
  language: 'en',
  pageSize: 10,
};

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

class MockStrategyConnector {
  loadProductsForStrategy = createSpy(
    'StrategyAdapter.loadProductsForStrategy'
  ).and.callFake(() => of(MERCHANDISING_PRODUCTS));
}
class MockBaseSiteService {
  getActive = createSpy('baseSiteService.getActive').and.callFake(() =>
    of('electronics-spa')
  );
}
class MockLanguageService {
  getActive = createSpy('languageService.getActive').and.callFake(() =>
    of('en')
  );
}

describe('CdsMerchandisingProductService', () => {
  let cdsMerchandisingPrductService: CdsMerchandisingProductService;
  let strategyConnector: MerchandisingStrategyConnector;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: MerchandisingStrategyConnector,
          useClass: MockStrategyConnector,
        },
        {
          provide: BaseSiteService,
          useClass: MockBaseSiteService,
        },
        {
          provide: LanguageService,
          useClass: MockLanguageService,
        },
      ],
    });
    cdsMerchandisingPrductService = TestBed.get(
      CdsMerchandisingProductService as Type<CdsMerchandisingProductService>
    );
    strategyConnector = TestBed.get(MerchandisingStrategyConnector as Type<
      MerchandisingStrategyConnector
    >);
  });

  it('should be created', () => {
    expect(cdsMerchandisingPrductService).toBeTruthy();
  });

  it('loadProductsForStrategy should call connector', () => {
    let actualMerchandisingProducts: MerchandisingProducts;
    cdsMerchandisingPrductService
      .loadProductsForStrategy(STRATEGY_ID, 10)
      .subscribe(strategyResult => {
        actualMerchandisingProducts = strategyResult;
      })
      .unsubscribe();
    expect(actualMerchandisingProducts).toEqual(MERCHANDISING_PRODUCTS);
    expect(strategyConnector.loadProductsForStrategy).toHaveBeenCalledWith(
      STRATEGY_ID,
      STRATEGY_REQUEST
    );
  });
});
