import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { hot, cold } from 'jasmine-marbles';
import { provideMockActions } from '@ngrx/effects/testing';
import { of, Observable } from 'rxjs';

import { OccSiteService } from '../../occ';
import * as fromEffects from './currencies.effect';
import * as fromActions from '../actions/currencies.action';
import { OccModule } from '../../../occ/occ.module';
import { ConfigModule } from '../../../config/config.module';
import { Currency } from '../../../occ-models/occ.models';

describe('Currencies Effects', () => {
  let actions$: Observable<any>;
  let service: OccSiteService;
  let effects: fromEffects.CurrenciesEffects;

  const currencies: Currency[] = [
    { active: false, isocode: 'USD', name: 'US Dollar', symbol: '$' }
  ];

  const data = { currencies };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ConfigModule.forRoot(), HttpClientTestingModule, OccModule],
      providers: [
        OccSiteService,
        fromEffects.CurrenciesEffects,
        provideMockActions(() => actions$)
      ]
    });

    service = TestBed.get(OccSiteService);
    effects = TestBed.get(fromEffects.CurrenciesEffects);

    spyOn(service, 'loadCurrencies').and.returnValue(of(data));
  });

  describe('loadCurrencies$', () => {
    it('should populate all currencies from LoadCurrenciesSuccess', () => {
      const action = new fromActions.LoadCurrencies();
      const completion = new fromActions.LoadCurrenciesSuccess(data.currencies);

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.loadCurrencies$).toBeObservable(expected);
    });
  });

  describe('activateCurrency$', () => {
    it('should change the active currency', () => {
      const action = new fromActions.SetActiveCurrency('USD');
      const completion = new fromActions.CurrencyChange();

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.activateCurrency$).toBeObservable(expected);
    });
  });
});
