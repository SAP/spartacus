import { of } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { Store, StoreModule, select } from '@ngrx/store';
import * as ngrxStore from '@ngrx/store';
import * as fromStore from './../../store';
import { StateWithProduct } from './../../store';

describe('Product Reviews selectors', () => {
  const productCode = '123';
  const reviews = [
    {
      comment: 'Lorem ipsum 1',
      date: '2018-01-23T13:49:13.586-05:00',
      headline: 'Satisfactory product, but not overwhelmed.',
      id: '8796130902065',
      principal: {
        name: 'Ken Reviewer',
        uid: 'keenreviewer2@hybris.com'
      },
      rating: 3
    },
    {
      comment: 'Lorem ipsum 2',
      date: '2018-01-23T13:49:13.585-05:00',
      headline: 'A good solid product, worthy of a purchase.',
      id: '123456789',
      principal: {
        name: 'Kenneth Reviewer',
        uid: 'keenreviewer1@hybris.com'
      },
      rating: 5
    }
  ];
  const reviewData = {
    productCode: productCode,
    list: reviews
  };

  let store: Store<StateWithProduct>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature('products', fromStore.getReducers())
      ]
    });

    store = TestBed.get(Store);
    spyOnProperty(ngrxStore, 'select').and.returnValue(() => () =>
      of(reviewData)
    );
  });

  it('getSelectedProductReviewsFactory should return reviews', () => {
    let result;
    store
      .pipe(select(fromStore.getSelectedProductReviewsFactory(productCode)))
      .subscribe(data => (result = data));

    expect(result.productCode).toEqual(productCode);
    expect(result.list).toEqual(reviews);
  });
});
