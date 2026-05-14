import { TestBed } from '@angular/core/testing';
import { Product } from '@spartacus/core';
import { ProductListItemContextSource } from './product-list-item-context-source.model';

describe('ProductListItemContextSource', () => {
  let contextSource: ProductListItemContextSource;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductListItemContextSource],
    });

    contextSource = TestBed.inject(ProductListItemContextSource);
  });

  it('should replay latest value of "product"', (done) => {
    const mockProduct: Product = { name: 'Test product' };
    contextSource.product$.next(mockProduct);
    contextSource.product$.subscribe((product) => {
      expect(product).toBe(mockProduct);
      done();
    });
  });
});
