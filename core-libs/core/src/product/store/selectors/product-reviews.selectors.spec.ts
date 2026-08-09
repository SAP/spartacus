import { vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { select, Store, StoreModule } from '@ngrx/store';

vi.mock('@ngrx/store', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@ngrx/store')>();
  return { ...actual, select: vi.fn() };
});
import { firstValueFrom, of } from 'rxjs';
import { Review } from '../../../model/product.model';
import * as fromProductReducers from '../../store/reducers/index';
import { ProductSelectors } from '../../store/selectors/index';
import { StateWithProduct } from '../product-state';

describe('Product Reviews selectors', () => {
  const productCode = '123';
  const reviews: Review[] = [
    {
      comment: 'Lorem ipsum 1',
      headline: 'Satisfactory product, but not overwhelmed.',
      id: '8796130902065',
      principal: {
        name: 'Ken Reviewer',
        uid: 'keenreviewer2@hybris.com',
      },
      rating: 3,
    },
    {
      comment: 'Lorem ipsum 2',
      headline: 'A good solid product, worthy of a purchase.',
      id: '123456789',
      principal: {
        name: 'Kenneth Reviewer',
        uid: 'keenreviewer1@hybris.com',
      },
      rating: 5,
    },
  ];

  let store: Store<StateWithProduct>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature('products', fromProductReducers.getReducers()),
      ],
    });

    store = TestBed.inject(Store);
    vi.mocked(select).mockReturnValue(() => of(reviews));
  });

  it('getSelectedProductReviewsFactory should return reviews', async () => {
    let result: Review[] | undefined = await firstValueFrom(
      store.pipe(
        select(ProductSelectors.getSelectedProductReviewsFactory(productCode))
      )
    );

    expect(result).toEqual(reviews);
  });
});
