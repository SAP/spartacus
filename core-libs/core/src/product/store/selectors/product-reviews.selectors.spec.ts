import { TestBed } from '@angular/core/testing';
import * as ngrxStore from '@ngrx/store';
import { select, Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
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
    spyOnProperty(ngrxStore, 'select').and.returnValue(() => () => of(reviews));
  });

  it('getSelectedProductReviewsFactory should return reviews', () => {
    let result: Review[];
    store
      .pipe(
        select(ProductSelectors.getSelectedProductReviewsFactory(productCode))
      )
      .subscribe((data) => (result = data))
      .unsubscribe();

    expect(result).toEqual(reviews);
  });
});
