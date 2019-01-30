import { TestBed } from '@angular/core/testing';

import { Store, StoreModule, select } from '@ngrx/store';

import { CheckoutState, CHECKOUT_FEATURE } from '../checkout-state';
import * as fromActions from '../actions/index';
import * as fromReducers from '../reducers/index';
import * as fromSelectors from '../selectors/index';
import { CardType } from '../../../occ/occ-models/occ.models';

describe('Card Types Selectors', () => {
  let store: Store<CheckoutState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(CHECKOUT_FEATURE, fromReducers.getReducers())
      ]
    });

    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('getAllCardTypes', () => {
    it('should return all card types', () => {
      const cardTypes: CardType[] = [
        {
          code: 'amex',
          name: 'American Express'
        },
        {
          code: 'maestro',
          name: 'Maestro'
        }
      ];

      let result: CardType[];
      store
        .pipe(select(fromSelectors.getAllCardTypes))
        .subscribe(value => (result = value));

      expect(result).toEqual([]);

      store.dispatch(new fromActions.LoadCardTypesSuccess(cardTypes));

      expect(result).toEqual(cardTypes);
    });
  });
});
