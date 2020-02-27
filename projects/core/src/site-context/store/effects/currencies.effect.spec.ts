import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import { ConfigModule } from '../../../config/config.module';
import { Currency } from '../../../model/misc.model';
import { OccModule } from '../../../occ/occ.module';
import { SiteAdapter } from '../../connectors/site.adapter';
import { SiteConnector } from '../../connectors/site.connector';
import { SiteContextActions } from '../actions/index';
import * as fromEffects from './currencies.effect';

describe('Currencies Effects', () => {
  let actions$: Observable<SiteContextActions.CurrenciesAction>;
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

    connector = TestBed.inject(SiteConnector);
    effects = TestBed.inject(fromEffects.CurrenciesEffects);

    spyOn(connector, 'getCurrencies').and.returnValue(of(currencies));
  });

  describe('loadCurrencies$', () => {
    it('should populate all currencies from LoadCurrenciesSuccess', () => {
      const action = new SiteContextActions.LoadCurrencies();
      const completion = new SiteContextActions.LoadCurrenciesSuccess(
        currencies
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.loadCurrencies$).toBeObservable(expected);
    });
  });

  describe('activateCurrency$', () => {
    it('should change the active currency', () => {
      const action = new SiteContextActions.SetActiveCurrency('USD');
      const completion = new SiteContextActions.CurrencyChange();

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.activateCurrency$).toBeObservable(expected);
    });
  });
});
