import { inject, TestBed } from '@angular/core/testing';
import * as ngrxStore from '@ngrx/store';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { Product, ProductReference } from '../../occ/occ-models';
import * as fromStore from '../store';
import { PRODUCT_FEATURE } from '../store/product-state';
import { ProductReferenceService } from './product-reference.service';

describe('ReferenceService', () => {
  let service: ProductReferenceService;
  let store: Store<fromStore.ProductsState>;
  const mockProduct: Product = { code: 'productCode' };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(PRODUCT_FEATURE, fromStore.getReducers()),
      ],
      providers: [ProductReferenceService],
    });

    store = TestBed.get(Store);
    service = TestBed.get(ProductReferenceService);
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
        of([mockProduct])
      );
      let result: ProductReference[];
      service.get(mockProduct.code).subscribe(productReferences => {
        result = productReferences;
      });
      expect(result).toEqual([mockProduct]);
    });

    it('should be able to load product references', () => {
      spyOnProperty(ngrxStore, 'select').and.returnValue(() => () =>
        of(undefined)
      );
      service
        .get(mockProduct.code)
        .subscribe()
        .unsubscribe();

      expect(store.dispatch).toHaveBeenCalledWith(
        new fromStore.LoadProductReferences({
          productCode: 'productCode',
          referenceType: undefined,
          pageSize: undefined,
        })
      );
    });
  });
});
