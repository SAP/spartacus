import { TestBed, inject } from '@angular/core/testing';
import { StoreModule, combineReducers } from '@ngrx/store';
import * as ngrxStore from '@ngrx/store';
import { of } from 'rxjs';

import * as fromRoot from '../../routing/store';
import * as fromStore from '../store';

import { ProductService } from './product.service';

describe('ProductService', () => {
  let service: ProductService;
  const mockProduct = { code: 'testId' };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromRoot.getReducers(),
          products: combineReducers(fromStore.getReducers())
        })
      ],
      providers: [ProductService]
    });

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
      spyOnProperty(ngrxStore, 'select').and.returnValue(() => () =>
        of(mockProduct)
      );
      service.get('testId').subscribe(product => {
        expect(product).toBe(mockProduct);
      });
    });
  });
});
