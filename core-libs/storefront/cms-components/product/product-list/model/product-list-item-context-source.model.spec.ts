import { TestBed } from '@angular/core/testing';
import { Product } from '@spartacus/core';
import { firstValueFrom } from 'rxjs';
import { ProductListItemContextSource } from './product-list-item-context-source.model';

describe('ProductListItemContextSource', () => {
  let contextSource: ProductListItemContextSource;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductListItemContextSource],
    });

    contextSource = TestBed.inject(ProductListItemContextSource);
  });

  it('should replay latest value of "product"', async () => {
    const mockProduct: Product = { name: 'Test product' };
    contextSource.product$.next(mockProduct);
    const product = await firstValueFrom(contextSource.product$);
    expect(product).toBe(mockProduct);
  });
});
