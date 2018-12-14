import { TestBed } from '@angular/core/testing';
import { Store, select, StoreModule } from '@ngrx/store';

import * as fromActions from '../actions';
import * as fromReducers from '../reducers';
import * as fromSelectors from '../selectors/currencies.selectors';
import { StateWithSiteContext, SITE_CONTEXT_FEATURE } from '../state';
import { Currency } from '../../../occ/occ-models';

describe('Currencies Selectors', () => {
  let store: Store<StateWithSiteContext>;

  const currencies: Currency[] = [
    { active: false, isocode: 'USD', name: 'US Dollar', symbol: '$' }
  ];

  const entities: { [key: string]: Currency } = {
    USD: currencies[0]
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(SITE_CONTEXT_FEATURE, fromReducers.getReducers())
      ]
    });
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('getCurrenciesEntities', () => {
    it('should return currencies entities', () => {
      let result: Currency;

      store
        .pipe(select(fromSelectors.getCurrenciesEntities))
        .subscribe(value => (result = value));

      expect(result).toEqual({});

      store.dispatch(new fromActions.LoadCurrenciesSuccess(currencies));
      expect(result).toEqual(entities);
    });
  });

  describe('getActiveCurrency', () => {
    it('should return the active currency', () => {
      let result: string;

      store
        .pipe(select(fromSelectors.getActiveCurrency))
        .subscribe(value => (result = value));

      expect(result).toEqual(null);

      store.dispatch(new fromActions.SetActiveCurrency('USD'));
      expect(result).toEqual('USD');
    });
  });

  describe('getAllCurrencies', () => {
    it('should return all currencies', () => {
      let result: Currency[];

      store
        .pipe(select(fromSelectors.getAllCurrencies))
        .subscribe(value => (result = value));

      expect(result).toEqual([]);

      store.dispatch(new fromActions.LoadCurrenciesSuccess(currencies));
      expect(result).toEqual(currencies);
    });
  });
});
