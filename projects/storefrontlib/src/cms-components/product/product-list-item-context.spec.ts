import { TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { I18nTestingModule } from '@spartacus/core';
import {
  ProductListItemContext,
  ProductListItemContextOwner,
} from './product-list-item-context';

describe('ProductListItemContext', () => {
  let productListItemContext: ProductListItemContext;

  const mockProduct = {
    name: 'Test product',
    nameHtml: 'Test product',
    summary: 'Test summary',
    code: '1',
  };

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule, I18nTestingModule],

        providers: [
          {
            provide: ProductListItemContext,
            useClass: ProductListItemContextOwner,
          },
        ],
      });
    })
  );

  beforeEach(() => {
    productListItemContext = TestBed.inject(ProductListItemContext);
  });

  it('should create', () => {
    expect(productListItemContext).toBeTruthy();
  });

  it('should transmit product', (done) => {
    (productListItemContext as ProductListItemContextOwner).setProduct(
      mockProduct
    );
    productListItemContext.product$.subscribe((product) => {
      expect(product).toBe(mockProduct);
      done();
    });
  });
});
