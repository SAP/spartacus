import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Store } from '@ngrx/store';
import { cold, hot } from 'jasmine-marbles';
import { BehaviorSubject, NEVER, Observable, of, Subject } from 'rxjs';
import { ConfigModule } from '../../../config/config.module';
import { Currency } from '../../../model/misc.model';
import { OccModule } from '../../../occ/occ.module';
import { SiteAdapter } from '../../connectors/site.adapter';
import { SiteConnector } from '../../connectors/site.connector';
import { SiteContextActions } from '../actions/index';
import * as fromEffects from './currencies.effect';
import { CurrenciesEffects } from './currencies.effect';

describe('Currencies Effects', () => {
  describe('loadCurrencies$', () => {
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
          { provide: Store, useValue: { select: () => NEVER } },
        ],
      });

      connector = TestBed.inject(SiteConnector);
      effects = TestBed.inject(fromEffects.CurrenciesEffects);

      spyOn(connector, 'getCurrencies').and.returnValue(of(currencies));
    });

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
    let actions$: Subject<SiteContextActions.CurrenciesAction>;
    let mockState: BehaviorSubject<string>;
    let currenciesEffects: CurrenciesEffects;

    beforeEach(() => {
      actions$ = new Subject();
      mockState = new BehaviorSubject(null);

      const mockStore: Partial<Store<any>> = {
        select: () => mockState,
      };

      TestBed.configureTestingModule({
        imports: [ConfigModule.forRoot(), HttpClientTestingModule, OccModule],
        providers: [
          fromEffects.CurrenciesEffects,
          { provide: SiteAdapter, useValue: {} },
          provideMockActions(() => actions$),
          { provide: Store, useValue: mockStore },
        ],
      });

      currenciesEffects = TestBed.inject(CurrenciesEffects);
    });

    describe('when currency is set for the first time', () => {
      it('should NOT dispatch language change action', () => {
        const results = [];
        currenciesEffects.activateCurrency$.subscribe(a => results.push(a));

        mockState.next('zh');
        const setActiveAction = new SiteContextActions.SetActiveCurrency('USD');
        actions$.next(setActiveAction);

        expect(results).toEqual([]);
      });
    });

    describe('when currency is set for the next time', () => {
      it('should dispatch language change action when language is activated again', () => {
        const results = [];
        currenciesEffects.activateCurrency$.subscribe(a => results.push(a));

        mockState.next('en');
        actions$.next(new SiteContextActions.SetActiveCurrency('USD'));

        mockState.next('zh');
        actions$.next(new SiteContextActions.SetActiveCurrency('GPB'));

        const changeAction = new SiteContextActions.CurrencyChange({
          previous: 'en',
          current: 'zh',
        });
        expect(results).toEqual([changeAction]);
      });
    });

    describe('when the same currency is set for the next time', () => {
      it('should NOT dispatch language change action', () => {
        const results = [];
        currenciesEffects.activateCurrency$.subscribe(a => results.push(a));

        mockState.next('en');
        actions$.next(new SiteContextActions.SetActiveCurrency('USD'));

        mockState.next('en');
        actions$.next(new SiteContextActions.SetActiveCurrency('USD'));

        expect(results).toEqual([]);
      });
    });
  });
});
