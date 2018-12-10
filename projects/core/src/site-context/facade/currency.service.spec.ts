import { TestBed, inject } from '@angular/core/testing';

import { StoreModule, Store } from '@ngrx/store';

import * as fromStore from '../store';
import { StateWithSiteContext } from '../store/state';
import { Currency } from '../../occ-models/occ.models';
import { defaultOccConfig } from '../../occ/config/default-occ-config';
import { OccConfig } from '../../occ/config/occ-config';

import { CurrencyService } from './currency.service';

const mockCurrencies: Currency[] = [
  { active: false, isocode: 'USD', name: 'US Dollar', symbol: '$' }
];

const mockActiveCurr = 'USD';

describe('CurrencyService', () => {
  let service: CurrencyService;
  let store: Store<StateWithSiteContext>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature('siteContext', fromStore.getReducers())
      ],
      providers: [
        CurrencyService,
        { provide: OccConfig, useValue: defaultOccConfig }
      ]
    });

    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
    service = TestBed.get(CurrencyService);
  });

  it('should CurrencyService is injected', inject(
    [CurrencyService],
    (currencyService: CurrencyService) => {
      expect(currencyService).toBeTruthy();
    }
  ));

  it('should load currencies and set active currency when service is constructed', () => {
    store.dispatch(new fromStore.LoadCurrenciesSuccess(mockCurrencies));

    expect(store.dispatch).toHaveBeenCalledWith(new fromStore.LoadCurrencies());
    let activeCurr = sessionStorage.getItem('currency');
    if (!activeCurr) {
      activeCurr = defaultOccConfig.site.currency;
    }
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromStore.SetActiveCurrency(activeCurr)
    );
  });

  it('should be able to get currencies', () => {
    store.dispatch(new fromStore.LoadCurrenciesSuccess(mockCurrencies));

    let result: Currency[];
    service
      .get()
      .subscribe(results => (result = results))
      .unsubscribe();
    expect(result).toEqual(mockCurrencies);
  });

  it('should be able to get active currencies', () => {
    store.dispatch(new fromStore.LoadCurrenciesSuccess(mockCurrencies));

    service.getActive().subscribe(results => {
      expect(results).toEqual(mockActiveCurr);
    });
  });

  describe('set activeCurrency(isocode)', () => {
    it('should be able to set active currency', () => {
      store.dispatch(new fromStore.LoadCurrenciesSuccess(mockCurrencies));
      service.setActive('USD');
      expect(store.dispatch).toHaveBeenCalledWith(
        new fromStore.SetActiveCurrency('USD')
      );
    });
  });
});
