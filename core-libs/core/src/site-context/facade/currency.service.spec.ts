import { vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { SiteContextConfig } from '@spartacus/core';
import { firstValueFrom, of } from 'rxjs';
import { FeatureToggles } from '../../features-config/feature-toggles/feature-toggles-tokens';
import { Currency } from '../../model/misc.model';
import { SiteConnector } from '../connectors/site.connector';
import { SiteContextActions } from '../store/actions/index';
import { SiteContextStoreModule } from '../store/site-context-store.module';
import { StateWithSiteContext } from '../store/state';
import { CurrencyService } from './currency.service';
import { provideMockFeatureToggles } from '../../features-config/feature-toggles/testing';

const mockCurrencies: Currency[] = [
  { active: true, isocode: 'USD', name: 'US Dollar', symbol: '$' },
  { active: true, isocode: 'JPY', name: 'Japanese Yen', symbol: '¥' },
  { active: false, isocode: 'EUR', name: 'Euro', symbol: '€' },
];

const mockActiveCurrencies: Currency[] = [
  { active: true, isocode: 'USD', name: 'US Dollar', symbol: '$' },
  { active: true, isocode: 'JPY', name: 'Japanese Yen', symbol: '¥' },
];

const mockActiveCurr = 'USD';

const mockSiteContextConfig: SiteContextConfig = {
  context: {
    currency: ['USD', 'JPY'],
  },
};

class MockSiteConnector {
  getCurrencies() {
    return of([]);
  }

  getLanguages() {
    return of([]);
  }
}

const mockFeatureToggles: FeatureToggles = {
  showOnlyActiveCurrencies: false,
};

describe('CurrencyService', () => {
  let service: CurrencyService;
  let store: Store<StateWithSiteContext>;
  let featureToggles: FeatureToggles;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        SiteContextStoreModule,
      ],
      providers: [
        CurrencyService,
        { provide: SiteConnector, useClass: MockSiteConnector },
        { provide: SiteContextConfig, useValue: mockSiteContextConfig },
        provideMockFeatureToggles({ ...mockFeatureToggles }),
      ],
    });

    store = TestBed.inject(Store);
    vi.spyOn(store, 'dispatch');
    service = TestBed.inject(CurrencyService);
    featureToggles = TestBed.inject(FeatureToggles);
  });

  it('should CurrencyService is injected', () => {
    expect(service).toBeTruthy();
  });

  it('should not load currencies when service is constructed', () => {
    expect(store.dispatch).toHaveBeenCalledTimes(0);
  });

  it('should be able to load currencies', async () => {
    // no currencies loaded yet — getAll() should dispatch LoadCurrencies
    service.getAll().subscribe();
    expect(store.dispatch).toHaveBeenCalledWith(
      new SiteContextActions.LoadCurrencies()
    );
  });

  it('should be able to get currencies and filter out inactive ones when showOnlyActiveCurrencies is enabled', async () => {
    featureToggles.showOnlyActiveCurrencies = true;
    store.dispatch(
      new SiteContextActions.LoadCurrenciesSuccess(mockCurrencies)
    );
    const results = await firstValueFrom(service.getAll());
    expect(results).toEqual(mockActiveCurrencies);
    expect(results.length).toBe(2);
    expect(results.every((currency) => currency.active === true)).toBe(true);
  });

  it('should return all currencies when showOnlyActiveCurrencies is disabled', async () => {
    featureToggles.showOnlyActiveCurrencies = false;
    store.dispatch(
      new SiteContextActions.LoadCurrenciesSuccess(mockCurrencies)
    );
    const results = await firstValueFrom(service.getAll());
    expect(results).toEqual(mockCurrencies);
    expect(results.length).toBe(3);
  });

  it('should be able to get active currencies', async () => {
    store.dispatch(new SiteContextActions.SetActiveCurrency(mockActiveCurr));
    const result = await firstValueFrom(service.getActive());
    expect(result).toEqual(mockActiveCurr);
  });

  describe('setActive(isocode)', () => {
    it('should be able to set active currency', () => {
      service.setActive('JPY');
      expect(store.dispatch).toHaveBeenCalledWith(
        new SiteContextActions.SetActiveCurrency('JPY')
      );
    });

    it('should not dispatch action if isocode is currenyly actuve', () => {
      store.dispatch(new SiteContextActions.SetActiveCurrency(mockActiveCurr));
      vi.mocked(store.dispatch).mockClear();
      service.setActive(mockActiveCurr);
      expect(store.dispatch).not.toHaveBeenCalledWith(
        new SiteContextActions.SetActiveCurrency(mockActiveCurr)
      );
    });
  });

  describe('isInitialized', () => {
    it('should return TRUE if a currency is initialized', () => {
      store.dispatch(new SiteContextActions.SetActiveCurrency(mockActiveCurr));
      expect(service.isInitialized()).toBeTruthy();
    });
  });

  describe('isValid', () => {
    it('should return TRUE if the iso is valid', () => {
      expect(service['isValid'](mockActiveCurr)).toBeTruthy();
    });
    it('should return FALSE if the iso is not valid', () => {
      expect(service['isValid']('EUR')).toBeFalsy();
    });
  });
});
