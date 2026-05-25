import { inject, TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import * as ngrxStore from '@ngrx/store';
import { Store, StoreModule } from '@ngrx/store';
import { SiteContextConfig } from '@spartacus/core';
import { of } from 'rxjs';
import { FeatureConfigService } from '../../features-config/services/feature-config.service';
import { Currency } from '../../model/misc.model';
import { SiteConnector } from '../connectors/site.connector';
import { SiteContextActions } from '../store/actions/index';
import { SiteContextStoreModule } from '../store/site-context-store.module';
import { StateWithSiteContext } from '../store/state';
import { CurrencyService } from './currency.service';
import createSpy = jasmine.createSpy;

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

class MockFeatureConfigService {
  isEnabled = jasmine.createSpy('isEnabled').and.returnValue(false);
}

describe('CurrencyService', () => {
  const mockSelect0 = createSpy('select').and.returnValue(() => of(undefined));
  const mockSelect1 = createSpy('select').and.returnValue(() =>
    of(mockCurrencies)
  );
  const mockSelect2 = createSpy('select').and.returnValue(() =>
    of(mockActiveCurr)
  );

  let service: CurrencyService;
  let store: Store<StateWithSiteContext>;
  let featureConfigService: MockFeatureConfigService;

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
        { provide: FeatureConfigService, useClass: MockFeatureConfigService },
      ],
    });

    store = TestBed.inject(Store);
    spyOn(store, 'dispatch').and.callThrough();
    service = TestBed.inject(CurrencyService);
    featureConfigService = TestBed.inject(
      FeatureConfigService
    ) as unknown as MockFeatureConfigService;
  });

  it('should CurrencyService is injected', inject(
    [CurrencyService],
    (currencyService: CurrencyService) => {
      expect(currencyService).toBeTruthy();
    }
  ));

  it('should not load currencies when service is constructed', () => {
    expect(store.dispatch).toHaveBeenCalledTimes(0);
  });

  it('should be able to load currencies', () => {
    spyOnProperty(ngrxStore, 'select').and.returnValues(mockSelect0);
    service.getAll().subscribe();
    expect(store.dispatch).toHaveBeenCalledWith(
      new SiteContextActions.LoadCurrencies()
    );
  });

  it('should be able to get currencies and filter out inactive ones when showOnlyActiveCurrencies is enabled', () => {
    featureConfigService.isEnabled.and.returnValue(true);
    spyOnProperty(ngrxStore, 'select').and.returnValues(mockSelect1);

    service.getAll().subscribe((results) => {
      expect(results).toEqual(mockActiveCurrencies);
      expect(results.length).toBe(2);
      expect(results.every((currency) => currency.active === true)).toBe(true);
    });
    expect(featureConfigService.isEnabled).toHaveBeenCalledWith(
      'showOnlyActiveCurrencies'
    );
  });

  it('should return all currencies when showOnlyActiveCurrencies is disabled', () => {
    featureConfigService.isEnabled.and.returnValue(false);
    spyOnProperty(ngrxStore, 'select').and.returnValues(mockSelect1);

    service.getAll().subscribe((results) => {
      expect(results).toEqual(mockCurrencies);
      expect(results.length).toBe(3);
    });
    expect(featureConfigService.isEnabled).toHaveBeenCalledWith(
      'showOnlyActiveCurrencies'
    );
  });

  it('should be able to get active currencies', () => {
    spyOnProperty(ngrxStore, 'select').and.returnValues(mockSelect2);
    service.getActive().subscribe((results) => {
      expect(results).toEqual(mockActiveCurr);
    });
  });

  describe('setActive(isocode)', () => {
    it('should be able to set active currency', () => {
      spyOnProperty(ngrxStore, 'select').and.returnValues(mockSelect2);
      service.setActive('JPY');
      expect(store.dispatch).toHaveBeenCalledWith(
        new SiteContextActions.SetActiveCurrency('JPY')
      );
    });

    it('should not dispatch action if isocode is currenyly actuve', () => {
      spyOnProperty(ngrxStore, 'select').and.returnValues(mockSelect2);
      service.setActive(mockActiveCurr);
      expect(store.dispatch).not.toHaveBeenCalledWith(
        new SiteContextActions.SetActiveCurrency(mockActiveCurr)
      );
    });
  });

  describe('isInitialized', () => {
    it('should return TRUE if a currency is initialized', () => {
      spyOnProperty(ngrxStore, 'select').and.returnValues(mockSelect1);
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
