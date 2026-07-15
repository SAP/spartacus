import { TestBed } from '@angular/core/testing';
import { select, Store, StoreModule } from '@ngrx/store';
import { firstValueFrom } from 'rxjs';
import { ProductReference } from '../../../model/product.model';
import * as fromProductReducers from '../../store/reducers/index';
import { ProductSelectors } from '../../store/selectors/index';
import { ProductActions } from '../actions';
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

    store = TestBed.inject(Store);
  });

  it('getSelectedProductReferencesFactory should return all references when no referenceType is provided', async () => {
    store.dispatch(
      new ProductActions.LoadProductReferencesSuccess({ productCode, list })
    );
    const result = await firstValueFrom(
      store.pipe(
        select(
          ProductSelectors.getSelectedProductReferencesFactory(productCode, '')
        )
      )
    );
    expect(result).toEqual(list);
  });

  it('getSelectedProductReferencesFactory should filter and return references for referenceType when provided', async () => {
    store.dispatch(
      new ProductActions.LoadProductReferencesSuccess({ productCode, list })
    );
    const result = await firstValueFrom(
      store.pipe(
        select(
          ProductSelectors.getSelectedProductReferencesFactory(
            productCode,
            'ACCESSORIES'
          )
        )
      )
    );
    expect(result).toEqual([{ referenceType: 'ACCESSORIES', target: product }]);
  });

  it('getSelectedProductReferencesFactory should return empty array when there are no references', async () => {
    store.dispatch(
      new ProductActions.LoadProductReferencesSuccess({ productCode, list })
    );

    const result = await firstValueFrom(
      store.pipe(
        select(
          ProductSelectors.getSelectedProductReferencesFactory(productCode, '')
        )
      )
    );
    expect(result).toEqual(list);
  });

  it('getSelectedProductReferencesFactory should filter and return references for referenceType when provided', async () => {
    store.dispatch(
      new ProductActions.LoadProductReferencesSuccess({ productCode, list })
    );
    const result = await firstValueFrom(
      store.pipe(
        select(
          ProductSelectors.getSelectedProductReferencesFactory(
            productCode,
            'ACCESSORIES'
          )
        )
      )
    );
    expect(result).toEqual([{ referenceType: 'ACCESSORIES', target: product }]);
  });

  it('getSelectedProductReferencesFactory should return empty array when there are no references', async () => {
    store.dispatch(
      new ProductActions.LoadProductReferencesSuccess({ productCode, list: [] })
    );
    const result = await firstValueFrom(
      store.pipe(
        select(
          ProductSelectors.getSelectedProductReferencesFactory(productCode, '')
        )
      )
    );
    expect(result).toEqual([]);
  });
});
