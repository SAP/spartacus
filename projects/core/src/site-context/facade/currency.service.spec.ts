import { TestBed, inject } from '@angular/core/testing';
import { StoreModule, Store } from '@ngrx/store';
import * as ngrxStore from '@ngrx/store';
import { of } from 'rxjs';
import createSpy = jasmine.createSpy;

import * as fromStore from '../store';
import { StateWithSiteContext } from '../store/state';
import { CurrencyService } from './currency.service';
import { SiteContextConfig, defaultSiteContextConfig } from '../config/config';

const mockCurrencies: any[] = [
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
        { provide: SiteContextConfig, useValue: defaultSiteContextConfig }
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
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromStore.SetActiveCurrency(defaultSiteContextConfig.site.currency)
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
