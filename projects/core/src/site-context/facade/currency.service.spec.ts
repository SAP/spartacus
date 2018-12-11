import { TestBed, inject } from '@angular/core/testing';
import { StoreModule, Store } from '@ngrx/store';
import * as ngrxStore from '@ngrx/store';
import { of } from 'rxjs';
import createSpy = jasmine.createSpy;

import * as fromStore from '../store';
import { StateWithSiteContext } from '../store/state';
import { CurrencyService } from './currency.service';
import { OccConfig } from '../../occ/config/occ-config';
import { defaultOccConfig } from '../../occ/config/default-occ-config';
import { Currency } from '../../occ/occ-models/occ.models';

const mockCurrencies: Currency[] = [
  { active: false, isocode: 'USD', name: 'US Dollar', symbol: '$' }
];

const mockActiveCurr = 'USD';

describe('CurrencyService', () => {
  const mockSelect1 = createSpy('select').and.returnValue(() =>
    of(mockCurrencies)
  );
  const mockSelect2 = createSpy('select').and.returnValue(() =>
    of(mockActiveCurr)
  );

  let service: CurrencyService;
  let store: Store<StateWithSiteContext>;

  beforeEach(() => {
    spyOnProperty(ngrxStore, 'select').and.returnValues(
      mockSelect1,
      mockSelect2
    );

    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
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
    service.currencies$.subscribe(results => {
      expect(results).toEqual(mockCurrencies);
    });
  });

  it('should be able to get active currencies', () => {
    service.activeCurrency$.subscribe(results => {
      expect(results).toEqual(mockActiveCurr);
    });
  });

  describe('set activeCurrency(isocode)', () => {
    it('should be able to set active currency', () => {
      service.activeCurrency = 'USD';
      expect(store.dispatch).toHaveBeenCalledWith(
        new fromStore.SetActiveCurrency('USD')
      );
    });
  });
});
