import { TestBed } from '@angular/core/testing';
import * as ngrxStore from '@ngrx/store';
import { select, Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { ProductReference } from '../../../model/product.model';
import * as fromProductReducers from '../../store/reducers/index';
import { ProductSelectors } from '../../store/selectors/index';
import { PRODUCT_FEATURE, StateWithProduct } from '../product-state';

const productCode = 'productCode';
const product = {
  code: productCode,
  name: 'testProduct',
};

const list: ProductReference[] = [
  { referenceType: 'SIMILAR', target: product },
  { referenceType: 'ACCESSORIES', target: product },
];

describe('Product References selectors', () => {
  let store: Store<StateWithProduct>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(
          PRODUCT_FEATURE,
          fromProductReducers.getReducers()
        ),
      ],
    });

    store = TestBed.get(Store);
    spyOnProperty(ngrxStore, 'select').and.returnValue(() => () => of(list));
  });

  it('getSelectedProductReferencesFactory should return references', () => {
    let result: ProductReference[];
    store
      .pipe(
        select(
          ProductSelectors.getSelectedProductReferencesFactory(productCode)
        )
      )
      .subscribe(data => (result = data))
      .unsubscribe();

    expect(result).toEqual(list);
  });
});
