import { TestBed } from '@angular/core/testing';

import { Store, StoreModule, select } from '@ngrx/store';
import * as ngrxStore from '@ngrx/store';

import { of } from 'rxjs';

import * as fromStore from './../../store';
import { StateWithProduct } from './../../store';
import { Review } from '../../../occ/occ-models/occ.models';

describe('Product Reviews selectors', () => {
  const productCode = '123';
  const reviews: Review[] = [
    {
      comment: 'Lorem ipsum 1',
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
      headline: 'A good solid product, worthy of a purchase.',
      id: '123456789',
      principal: {
        name: 'Kenneth Reviewer',
        uid: 'keenreviewer1@hybris.com'
      },
      rating: 5
    }
  ];

  let store: Store<StateWithProduct>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature('products', fromStore.getReducers())
      ]
    });

    store = TestBed.get(Store);
    spyOnProperty(ngrxStore, 'select').and.returnValue(() => () => of(reviews));
  });

  it('getSelectedProductReviewsFactory should return reviews', () => {
    let result: Review[];
    store
      .pipe(select(fromStore.getSelectedProductReviewsFactory(productCode)))
      .subscribe(data => (result = data))
      .unsubscribe();

    expect(result).toEqual(reviews);
  });
});
