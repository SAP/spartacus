import { inject, TestBed } from '@angular/core/testing';

import * as ngrxStore from '@ngrx/store';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import * as fromStore from '../store';
import { StateWithSiteContext } from '../store/state';
import { CurrencyService } from './currency.service';
import { SiteContextStoreModule } from '../store/site-context-store.module';
import { EffectsModule } from '@ngrx/effects';
import { Currency } from '../../model/misc.model';
import { SiteAdapter } from '../connectors/site.adapter';
import createSpy = jasmine.createSpy;

const mockCurrencies: Currency[] = [
  { active: false, isocode: 'USD', name: 'US Dollar', symbol: '$' },
];

const mockActiveCurr = 'USD';

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

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        SiteContextStoreModule,
      ],
      providers: [CurrencyService, { provide: SiteAdapter, useValue: {} }],
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

  it('should not load currencies when service is constructed', () => {
    expect(store.dispatch).toHaveBeenCalledTimes(0);
  });

  it('should be able to load currencies', () => {
    spyOnProperty(ngrxStore, 'select').and.returnValues(mockSelect0);
    service.getAll().subscribe();
    expect(store.dispatch).toHaveBeenCalledWith(new fromStore.LoadCurrencies());
  });

  it('should be able to get currencies', () => {
    spyOnProperty(ngrxStore, 'select').and.returnValues(mockSelect1);

    service.getAll().subscribe(results => {
      expect(results).toEqual(mockCurrencies);
    });
  });

  it('should be able to get active currencies', () => {
    spyOnProperty(ngrxStore, 'select').and.returnValues(mockSelect2);
    service.getActive().subscribe(results => {
      expect(results).toEqual(mockActiveCurr);
    });
  });

  describe('setActive(isocode)', () => {
    it('should be able to set active currency', () => {
      spyOnProperty(ngrxStore, 'select').and.returnValues(mockSelect2);
      service.setActive('EUR');
      expect(store.dispatch).toHaveBeenCalledWith(
        new fromStore.SetActiveCurrency('EUR')
      );
    });

    it('should not dispatch action if isocode is currenyly actuve', () => {
      spyOnProperty(ngrxStore, 'select').and.returnValues(mockSelect2);
      service.setActive(mockActiveCurr);
      expect(store.dispatch).not.toHaveBeenCalledWith(
        new fromStore.SetActiveCurrency(mockActiveCurr)
      );
    });
  });
});
