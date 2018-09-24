import { TestBed, inject } from '@angular/core/testing';
import { StoreModule, Store } from '@ngrx/store';
import { of } from 'rxjs';

import * as fromRoot from '../../routing/store';
import * as fromStore from '../store';

import { ProductService } from './product.service';

describe('ProductService', () => {
  let service: ProductService;
  let store: Store<fromStore.ProductsState>;
  const mockProduct = { code: 'testId' };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromRoot.getReducers()
        })
      ],
      providers: [ProductService]
    });

    store = TestBed.get(Store);
    service = TestBed.get(ProductService);
  });

  it('should ProductService is injected', inject(
    [ProductService],
    (productService: ProductService) => {
      expect(productService).toBeTruthy();
    }
  ));

  describe('get(productCode)', () => {
    it('should be able to get product by code', () => {
      spyOn(store, 'select').and.returnValue(of(mockProduct));
      service.get('testId').subscribe(product => {
        expect(product).toBe(mockProduct);
      });
    });
  });
});
