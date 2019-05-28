import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { hot, cold } from 'jasmine-marbles';
import { provideMockActions } from '@ngrx/effects/testing';
import { of, Observable } from 'rxjs';

import * as fromEffects from './currencies.effect';
import * as fromActions from '../actions/currencies.action';
import { OccModule } from '../../../occ/occ.module';
import { ConfigModule } from '../../../config/config.module';
import { Currency } from '../../../model/misc.model';
import { SiteConnector } from '../../connectors/site.connector';
import { SiteAdapter } from '../../connectors/site.adapter';

describe('Currencies Effects', () => {
  let actions$: Observable<fromActions.CurrenciesAction>;
  let connector: SiteConnector;
  let effects: fromEffects.CurrenciesEffects;

  const currencies: Currency[] = [
    { active: false, isocode: 'USD', name: 'US Dollar', symbol: '$' },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ConfigModule.forRoot(), HttpClientTestingModule, OccModule],
      providers: [
        fromEffects.CurrenciesEffects,
        { provide: SiteAdapter, useValue: {} },
        provideMockActions(() => actions$),
      ],
    });

    connector = TestBed.get(SiteConnector);
    effects = TestBed.get(fromEffects.CurrenciesEffects);

    spyOn(connector, 'getCurrencies').and.returnValue(of(currencies));
  });

  describe('loadCurrencies$', () => {
    it('should populate all currencies from LoadCurrenciesSuccess', () => {
      const action = new fromActions.LoadCurrencies();
      const completion = new fromActions.LoadCurrenciesSuccess(currencies);

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
