import { TestBed } from '@angular/core/testing';

import { Store, StoreModule, select } from '@ngrx/store';

import * as fromReducers from '../reducers/index';
import * as fromSelectors from './index';
import {
  PRODUCT_INTERESTS_FEATURE,
  StateWithProductInterests,
} from '../product-interests-state';

describe('Back In Stock Selectors', () => {
  let store: Store<StateWithProductInterests>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(
          PRODUCT_INTERESTS_FEATURE,
          fromReducers.getReducers()
        ),
      ],
    });

    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('getBackInStockState', () => {
    it('should return product interests state', () => {
      let result: boolean;
      store
        .pipe(select(fromSelectors.getBackInStockState))
        .subscribe(value => (result = value));

      expect(result).toBeUndefined();
    });
  });
});
