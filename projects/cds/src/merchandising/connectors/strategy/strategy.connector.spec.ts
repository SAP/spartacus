import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ImageType } from '@spartacus/core';
import { of } from 'rxjs/internal/observable/of';
import { MerchandisingProducts } from '../../model/merchandising.products.model';
import { StrategyAdapter } from './strategy.adapter';
import { StrategyConnector } from './strategy.connector';
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

class MockStrategyAdapter implements StrategyAdapter {
  loadProductsForStrategy = createSpy(
    'StrategyAdapter.loadProductsForStrategy'
  ).and.callFake(() => of(MERCHANDISING_PRODUCTS));
}

describe('Strategy Connector', () => {
  let strategyConnector: StrategyConnector;
  let strategyAdapter: StrategyAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: StrategyAdapter, useClass: MockStrategyAdapter }],
    });
    strategyConnector = TestBed.get(StrategyConnector as Type<
      StrategyConnector
    >);
    strategyAdapter = TestBed.get(StrategyAdapter as Type<StrategyAdapter>);
  });

  it('should be created', () => {
    expect(strategyConnector).toBeTruthy();
  });

  it('getProductsForStrategy should call adapter', () => {
    let actualMerchandisingProducts: MerchandisingProducts;

    strategyConnector
      .loadProductsForStrategy(STRATEGY_ID)
      .subscribe(strategyResult => {
        actualMerchandisingProducts = strategyResult;
      })
      .unsubscribe();

    expect(actualMerchandisingProducts).toEqual(MERCHANDISING_PRODUCTS);
    expect(strategyAdapter.loadProductsForStrategy).toHaveBeenCalledWith(
      STRATEGY_ID
    );
  });
});
