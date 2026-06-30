import { vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { select, Store, StoreModule } from '@ngrx/store';

vi.mock('@ngrx/store', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@ngrx/store')>();
  return { ...actual, select: vi.fn() };
});
import { of } from 'rxjs';
import { ProductReference } from '../../../model/product.model';
import * as fromProductReducers from '../../store/reducers/index';
import { ProductSelectors } from '../../store/selectors/index';
import { PRODUCT_FEATURE, StateWithProduct } from '../product-state';
import { ProductActions } from '../actions';

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

  it('getSelectedProductReferencesFactory should return all references when no referenceType is provided', () => {
    vi.mocked(select).mockReturnValue(() => () => of(list));

    let result: ProductReference[];
    const referenceType = '';
    store
      .pipe(
        select(
          ProductSelectors.getSelectedProductReferencesFactory(
            productCode,
            referenceType
          )
        )
      )
      .subscribe((data) => (result = data))
      .unsubscribe();

    expect(result).toEqual(list);
  });

  it('getSelectedProductReferencesFactory should filter and return references for referenceType when provided', () => {
    store.dispatch(
      new ProductActions.LoadProductReferencesSuccess({
        productCode: productCode,
        list: list,
      })
    );

    let result: ProductReference[];
    const referenceType = 'ACCESSORIES';
    store
      .pipe(
        select(
          ProductSelectors.getSelectedProductReferencesFactory(
            productCode,
            referenceType
          )
        )
      )
      .subscribe((data) => (result = data))
      .unsubscribe();

    expect(result).toEqual([{ referenceType: 'ACCESSORIES', target: product }]);
  });

  it('getSelectedProductReferencesFactory should return empty array when there are no references', () => {
    store.dispatch(
      new ProductActions.LoadProductReferencesSuccess({
        productCode: productCode,
        list: [],
      })
    );

    let result: ProductReference[];
    const referenceType = '';
    store
      .pipe(
        select(
          ProductSelectors.getSelectedProductReferencesFactory(
            productCode,
            referenceType
          )
        )
      )
      .subscribe((data) => (result = data))
      .unsubscribe();

    expect(result).toEqual([]);
  });
});
