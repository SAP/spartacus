import { inject, TestBed } from '@angular/core/testing';
import * as ngrxStore from '@ngrx/store';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { Product, ProductReference } from '../../model/product.model';
import { ProductActions } from '../store/actions/index';
import { ProductsState, PRODUCT_FEATURE } from '../store/product-state';
import * as fromStoreReducers from '../store/reducers/index';
import { ProductReferenceService } from './product-reference.service';

const mockProduct: Product = {
  code: 'productCode',
  name: 'testProduct',
};
const mockProductReferences: ProductReference[] = [
  { referenceType: 'SIMILAR', target: mockProduct },
  { referenceType: 'ACCESSORIES', target: mockProduct },
];

describe('ProductReferenceService', () => {
  let service: ProductReferenceService;
  let store: Store<ProductsState>;

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

  it('should be able to load product references', () => {
    service.loadProductReferences(
      mockProduct.code,
      mockProductReferences[0].referenceType
    );

    expect(store.dispatch).toHaveBeenCalledWith(
      new ProductActions.LoadProductReferences({
        productCode: mockProduct.code,
        referenceType: mockProductReferences[0].referenceType,
        pageSize: undefined,
      })
    );
  });

  it('should be able to get product references', () => {
    spyOnProperty(ngrxStore, 'select').and.returnValue(
      () => () => of(mockProductReferences)
    );

    let result: ProductReference[];
    service
      .getProductReferences(
        mockProduct.code,
        mockProductReferences[0].referenceType
      )
      .subscribe((data) => (result = data))
      .unsubscribe();

    expect(result).toEqual(mockProductReferences);
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
