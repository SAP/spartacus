import { TestBed } from '@angular/core/testing';
import { Store, StoreModule, select } from '@ngrx/store';

import * as fromActions from '../actions';
import * as fromReducers from '../reducers';
import * as fromSelectors from '../selectors';

describe('Card Types Selectors', () => {
  let store: Store<fromReducers.CheckoutState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature('checkout', fromReducers.getReducers())
      ]
    });

    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('getAllCardTypes', () => {
    it('should return all card types', () => {
      const cardTypes = [
        {
          code: 'amex',
          name: 'American Express'
        },
        {
          code: 'maestro',
          name: 'Maestro'
        }
      ];

      let result;
      store
        .pipe(select(fromSelectors.getAllCardTypes))
        .subscribe(value => (result = value));

      expect(result).toEqual([]);

      store.dispatch(new fromActions.LoadCardTypesSuccess(cardTypes));

      expect(result).toEqual(cardTypes);
    });
  });
});
