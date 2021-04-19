import { TestBed } from '@angular/core/testing';
import { select, Store, StoreModule } from '@ngrx/store';
import { CardType } from '@spartacus/core';
import { CheckoutActions } from '../actions/index';
import { CHECKOUT_FEATURE, StateWithCheckout } from '../checkout-state';
import * as fromReducers from '../reducers/index';
import { CheckoutSelectors } from '../selectors/index';

describe('Card Types Selectors', () => {
  let store: Store<StateWithCheckout>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(CHECKOUT_FEATURE, fromReducers.getReducers()),
      ],
    });

    store = TestBed.inject(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('getAllCardTypes', () => {
    it('should return all card types', () => {
      const cardTypes: CardType[] = [
        {
          code: 'amex',
          name: 'American Express',
        },
        {
          code: 'maestro',
          name: 'Maestro',
        },
      ];

      let result: CardType[];
      store
        .pipe(select(CheckoutSelectors.getAllCardTypes))
        .subscribe((value) => (result = value));

      expect(result).toEqual([]);

      store.dispatch(new CheckoutActions.LoadCardTypesSuccess(cardTypes));

      expect(result).toEqual(cardTypes);
    });
  });
});
