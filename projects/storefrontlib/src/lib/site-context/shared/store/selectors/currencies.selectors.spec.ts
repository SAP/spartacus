import { TestBed } from '@angular/core/testing';
import { StoreModule, Store, combineReducers } from '@ngrx/store';

import * as fromRoot from '../../../../routing/store';
import * as fromReducers from '../reducers';
import * as fromActions from '../actions';
import * as fromSelectors from '../selectors/currencies.selectors';

describe('Currencies Selectors', () => {
  let store: Store<fromReducers.SiteContextState>;

  const currencies: any[] = [
    { active: false, isocode: 'USD', name: 'US Dollar', symbol: '$' }
  ];

  const entities = {
    USD: currencies[0]
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromRoot.getReducers(),
          siteContext: combineReducers(fromReducers.getReducers())
        })
      ]
    });
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('getCurrenciesEntities', () => {
    it('should return currencies entities', () => {
      let result;

      store
        .select(fromSelectors.getCurrenciesEntities)
        .subscribe(value => (result = value));

      expect(result).toEqual({});

      store.dispatch(new fromActions.LoadCurrenciesSuccess(currencies));

      expect(result).toEqual(entities);
    });
  });

  describe('getActiveCurrency', () => {
    it('should return the active currency', () => {
      let result;

      store
        .select(fromSelectors.getActiveCurrency)
        .subscribe(value => (result = value));

      expect(result).toEqual(null);

      store.dispatch(new fromActions.SetActiveCurrency('USD'));

      expect(result).toEqual('USD');
    });
  });

  describe('getAllCurrencies', () => {
    it('should return all currencies', () => {
      let result;

      store
        .select(fromSelectors.getAllCurrencies)
        .subscribe(value => (result = value));

      expect(result).toEqual([]);

      store.dispatch(new fromActions.LoadCurrenciesSuccess(currencies));

      expect(result).toEqual(currencies);
    });
  });

  describe('getCurrenciesLoaded', () => {
    it('should return whether currencies are loaded', () => {
      let result;

      store
        .select(fromSelectors.getCurrenciesLoaded)
        .subscribe(value => (result = value));

      expect(result).toEqual(false);

      store.dispatch(new fromActions.LoadCurrenciesSuccess(currencies));

      expect(result).toEqual(true);
    });
  });
});
