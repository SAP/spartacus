import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs/internal/observable/of';
import { StrategyResult } from '../../model/strategy.result';
import { StrategyAdapter } from './strategy.adapter';
import { StrategyConnector } from './strategy.connector';
import createSpy = jasmine.createSpy;

const strategyId = 'test-strategy-id';

const strategyResultMetadata: Map<string, string> = new Map<string, string>();
strategyResultMetadata.set('test-metadata-field', 'test-metadata-value');
const productMetadata: Map<string, string> = new Map<string, string>();
productMetadata.set(
  'test-product-metadata-field',
  'test-product-metadata-field'
);
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
      metadata: productMetadata,
    },
  ],
  paged: {
    from: 1,
    size: 5,
  },
  metadata: strategyResultMetadata,
};

class MockStrategyAdapter implements StrategyAdapter {
  loadProductsForStrategy = createSpy(
    'StrategyAdapter.loadProductsForStrategy'
  ).and.callFake(() => of(strategyResult));
}

describe('Strategy Connector', () => {
  let strategyConnector: StrategyConnector;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: StrategyAdapter, useClass: MockStrategyAdapter }],
    });
    strategyConnector = TestBed.get(StrategyConnector as Type<
      StrategyConnector
    >);
  });

  it('should be created', () => {
    expect(strategyConnector).toBeTruthy();
  });

  it('getProductsForStrategy should call adapter', () => {
    const strategyAdapter = TestBed.get(StrategyAdapter as Type<
      StrategyAdapter
    >);

    strategyConnector
      .loadProductsForStrategy(strategyId)
      .subscribe(actualStrategyResult => {
        expect(actualStrategyResult).toEqual(strategyResult);
        expect(strategyAdapter.loadProductsForStrategy).toHaveBeenCalledWith(
          strategyId
        );
      });
  });
});
