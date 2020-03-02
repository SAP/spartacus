import { inject, TestBed } from '@angular/core/testing';
import * as ngrxStore from '@ngrx/store';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { ProductReference } from '../../model/product.model';
import { ProductActions } from '../store/actions/index';
import { PRODUCT_FEATURE, ProductsState } from '../store/product-state';
import * as fromStoreReducers from '../store/reducers/index';
import { ProductReferenceService } from './product-reference.service';

describe('ReferenceService', () => {
  let service: ProductReferenceService;
  let store: Store<ProductsState>;
  const productCode = 'productCode';
  const product = {
    code: productCode,
    name: 'testProduct',
  };
  const productReferences: ProductReference[] = [
    { referenceType: 'SIMILAR', target: product },
    { referenceType: 'ACCESSORIES', target: product },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(
          PRODUCT_FEATURE,
          fromStoreReducers.getReducers()
        ),
      ],
      providers: [ProductReferenceService],
    });

    store = TestBed.inject(Store);
    service = TestBed.inject(ProductReferenceService);
    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should ProductReferenceService is injected', inject(
    [ProductReferenceService],
    (productReferenceService: ProductReferenceService) => {
      expect(productReferenceService).toBeTruthy();
    }
  ));

  describe('get(productCode)', () => {
    it('should be able to get product references', () => {
      spyOnProperty(ngrxStore, 'select').and.returnValue(() => () =>
        of(productReferences)
      );
      let result: ProductReference[];
      service.get(productCode).subscribe(data => {
        result = data;
      });

      expect(result).toEqual(productReferences);
    });

    it('should be able to load product references', () => {
      spyOnProperty(ngrxStore, 'select').and.returnValue(() => () =>
        of(undefined)
      );
      service
        .get(productCode)
        .subscribe()
        .unsubscribe();

      expect(store.dispatch).toHaveBeenCalledWith(
        new ProductActions.LoadProductReferences({
          productCode: 'productCode',
          referenceType: undefined,
          pageSize: undefined,
        })
      );
    });
  });

  describe('cleanReferences', () => {
    it('should clean references', () => {
      service.cleanReferences();
      expect(store.dispatch).toHaveBeenCalledWith(
        new ProductActions.CleanProductReferences()
      );
    });
  });
});
