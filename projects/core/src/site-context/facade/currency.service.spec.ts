import { TestBed, inject } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import * as ngrxStore from '@ngrx/store';
import { of } from 'rxjs';
import createSpy = jasmine.createSpy;

import * as fromStore from '../store';
import { StateWithSiteContext } from '../store/state';
import { CurrencyService } from './currency.service';
import { OccConfig } from '../../occ/config/occ-config';
import { defaultOccConfig } from '../../occ/config/default-occ-config';
import { Currency } from '../../occ-models/occ.models';

import { SiteContextModule } from '../site-context.module';

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
    TestBed.configureTestingModule({
      imports: [SiteContextModule],
      providers: [{ provide: OccConfig, useValue: defaultOccConfig }]
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

  describe('set activeCurrency(isocode)', () => {
    it('should be able to set active currency', () => {
      service.setActive('USD');
      expect(store.dispatch).toHaveBeenCalledWith(
        new fromStore.SetActiveCurrency('USD')
      );
    });
  });
});
