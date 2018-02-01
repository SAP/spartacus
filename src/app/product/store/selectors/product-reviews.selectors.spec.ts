import { TestBed } from '@angular/core/testing';
import { Store, StoreModule, combineReducers } from '@ngrx/store';
import * as fromStore from './../../store';

fdescribe('Product Reviews selectors', () => {
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

  let store: Store<fromStore.ProductsState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromStore.reducers,
          products: combineReducers(fromStore.reducers)
        })
      ]
    });

    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('getProductReviewsEntities', () => {
    it('should return reviews', () => {
      let result;
      store
        .select(fromStore.getProductReviewsEntities)
        .subscribe(data => (result = data));
      expect(result.productCode).toEqual('');
      expect(result.list).toEqual([]);

      store.dispatch(
        new fromStore.LoadProductReviewsSuccess({
          productCode,
          list: reviews
        })
      );
      expect(result.productCode).toEqual(productCode);
      expect(result.list).toEqual(reviews);
    });
  });
});
