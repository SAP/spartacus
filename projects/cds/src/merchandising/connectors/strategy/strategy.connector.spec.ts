import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs/internal/observable/of';
import { StrategyConnector } from './strategy.connector'
import { StrategyResult } from '../../model/strategy.result'
import createSpy = jasmine.createSpy;
import { StrategyAdapter } from '../../adapters/strategy/strategy.adapter';
import { StrategyAdapter, StrategyAdapter } from './strategy.adapter';

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

class MockStrategyAdapter implements StrategyAdapter {
  loadProductsForStrategy = createSpy('StrategyAdapter.loadProductsForStrategy').and.callFake(strategyId => of(strategyResult));
}

describe('Strategy Connector', () => {
  let strategyConnector: StrategyConnector;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: StrategyAdapter, useClass: MockStrategyAdapter }]
    });
  });

  it('should be created', () => {
    expect(strategyConnector).toBeTruthy();
  });

  it('getProductsForStrategy should call adapter', () => {
    const strategyAdapter = TestBed.get(StrategyAdapter as Type<StrategyAdapter>);
  });
});