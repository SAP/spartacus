import { TestBed } from '@angular/core/testing';
import { Product } from '@spartacus/core';
import { ProductListItemContextSource } from './product-list-item.context';

describe('ProductListItemContextSource', () => {
  let contextSource: ProductListItemContextSource;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductListItemContextSource],
    });

    contextSource = TestBed.inject(ProductListItemContextSource);
  });

  it('should transmit product', (done) => {
    const mockProduct: Product = { name: 'Test product' };
    contextSource._product$.next(mockProduct);
    contextSource.product$.subscribe((product) => {
      expect(product).toBe(mockProduct);
      done();
    });
  });
});
