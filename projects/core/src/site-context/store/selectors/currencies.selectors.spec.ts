import { TestBed } from '@angular/core/testing';
import { select, Store, StoreModule } from '@ngrx/store';
import { Currency } from '../../../model/misc.model';
import { SiteContextActions } from '../actions/index';
import * as fromReducers from '../reducers/index';
import { SiteContextSelectors } from '../selectors/index';
import { SITE_CONTEXT_FEATURE, StateWithSiteContext } from '../state';

describe('Currencies Selectors', () => {
  let store: Store<StateWithSiteContext>;

  const currencies: Currency[] = [
    { active: false, isocode: 'USD', name: 'US Dollar', symbol: '$' },
  ];

  const entities: { [key: string]: Currency } = {
    USD: currencies[0],
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(
          SITE_CONTEXT_FEATURE,
          fromReducers.getReducers()
        ),
      ],
    });

    store = TestBed.inject(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('getCurrenciesEntities', () => {
    it('should return currencies entities', () => {
      let result: Currency;

      store
        .pipe(select(SiteContextSelectors.getCurrenciesEntities))
        .subscribe((value) => (result = value));

      expect(result).toEqual(null);

      store.dispatch(new SiteContextActions.LoadCurrenciesSuccess(currencies));
      expect(result).toEqual(entities);
    });
  });

  describe('getActiveCurrency', () => {
    it('should return the active currency', () => {
      let result: string;

      store
        .pipe(select(SiteContextSelectors.getActiveCurrency))
        .subscribe((value) => (result = value));

      expect(result).toEqual(null);

      store.dispatch(new SiteContextActions.SetActiveCurrency('USD'));
      expect(result).toEqual('USD');
    });
  });

  describe('getAllCurrencies', () => {
    it('should return all currencies', () => {
      let result: Currency[];

      store
        .pipe(select(SiteContextSelectors.getAllCurrencies))
        .subscribe((value) => (result = value));

      expect(result).toEqual(null);

      store.dispatch(new SiteContextActions.LoadCurrenciesSuccess(currencies));
      expect(result).toEqual(currencies);
    });
  });
});
