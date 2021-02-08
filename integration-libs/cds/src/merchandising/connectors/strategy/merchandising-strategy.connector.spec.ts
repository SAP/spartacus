import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { StrategyProducts } from '../../model/strategy-products.model';
import { MerchandisingStrategyAdapter } from './merchandising-strategy.adapter';
import { MerchandisingStrategyConnector } from './merchandising-strategy.connector';
import createSpy = jasmine.createSpy;

const STRATEGY_ID = 'test-strategy-id';

const STRATEGY_REQUEST = {
  queryParams: {
    site: 'electronics-spa',
    language: 'en',
    pageSize: 10,
  },
};

const STRATEGY_PRODUCTS: StrategyProducts = {
  products: [
    {
      id: 'test-product-id',
    },
  ],
  metadata: {
    'test-metadata-field': 'test-metadata-value',
  },
};

class MockStrategyAdapter implements MerchandisingStrategyAdapter {
  loadProductsForStrategy = createSpy(
    'StrategyAdapter.loadProductsForStrategy'
  ).and.callFake(() => of(STRATEGY_PRODUCTS));
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
    strategyConnector = TestBed.inject(MerchandisingStrategyConnector);
    strategyAdapter = TestBed.inject(MerchandisingStrategyAdapter);
  });

  it('should be created', () => {
    expect(strategyConnector).toBeTruthy();
  });

  it('loadProductsForStrategy should call adapter', () => {
    let actualStrategyProducts: StrategyProducts;

    strategyConnector
      .loadProductsForStrategy(STRATEGY_ID, STRATEGY_REQUEST)
      .subscribe((strategyProducts) => {
        actualStrategyProducts = strategyProducts;
      })
      .unsubscribe();

    expect(actualStrategyProducts).toEqual(STRATEGY_PRODUCTS);
    expect(strategyAdapter.loadProductsForStrategy).toHaveBeenCalledWith(
      STRATEGY_ID,
      STRATEGY_REQUEST
    );
  });
});
