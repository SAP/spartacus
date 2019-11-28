import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ImageType } from '@spartacus/core';
import { of } from 'rxjs/internal/observable/of';
import { MerchandisingProducts } from '../../model/merchandising-products.model';
import { MerchandisingStrategyAdapter } from './merchandising-strategy.adapter';
import { MerchandisingStrategyConnector } from './merchandising-strategy.connector';
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

class MockStrategyAdapter implements MerchandisingStrategyAdapter {
  loadProductsForStrategy = createSpy(
    'StrategyAdapter.loadProductsForStrategy'
  ).and.callFake(() => of(MERCHANDISING_PRODUCTS));
}

describe('Strategy Connector', () => {
  let strategyConnector: MerchandisingStrategyConnector;
  let strategyAdapter: MerchandisingStrategyAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: MerchandisingStrategyAdapter,
          useClass: MockStrategyAdapter,
        },
      ],
    });
    strategyConnector = TestBed.get(MerchandisingStrategyConnector as Type<
      MerchandisingStrategyConnector
    >);
    strategyAdapter = TestBed.get(MerchandisingStrategyAdapter as Type<
      MerchandisingStrategyAdapter
    >);
  });

  it('should be created', () => {
    expect(strategyConnector).toBeTruthy();
  });

  it('loadProductsForStrategy should call adapter', () => {
    let actualMerchandisingProducts: MerchandisingProducts;

    strategyConnector
      .loadProductsForStrategy(STRATEGY_ID, STRATEGY_REQUEST)
      .subscribe(strategyResult => {
        actualMerchandisingProducts = strategyResult;
      })
      .unsubscribe();

    expect(actualMerchandisingProducts).toEqual(MERCHANDISING_PRODUCTS);
    expect(strategyAdapter.loadProductsForStrategy).toHaveBeenCalledWith(
      STRATEGY_ID,
      STRATEGY_REQUEST
    );
  });
});
