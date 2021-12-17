import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Store } from '@ngrx/store';
import { BehaviorSubject, of, Subject } from 'rxjs';
import { ConfigModule } from '../../../config/config.module';
import { Currency } from '../../../model/misc.model';
import { BaseOccModule } from '../../../occ/base-occ.module';
import { SiteAdapter } from '../../connectors/site.adapter';
import { SiteConnector } from '../../connectors/site.connector';
import { SiteContextActions } from '../actions/index';
import * as fromEffects from './currencies.effect';

describe('Currencies Effects', () => {
  let actions$: Subject<SiteContextActions.CurrenciesAction>;
  let connector: SiteConnector;
  let effects: fromEffects.CurrenciesEffects;
  let mockState: BehaviorSubject<string>;

  let currencies: Currency[];

  beforeEach(() => {
    currencies = [{ active: true, isocode: 'ja', name: 'Japanese' }];
    actions$ = new Subject();
    mockState = new BehaviorSubject(null);
    const mockStore: Partial<Store<any>> = {
      select: () => mockState,
    };

    TestBed.configureTestingModule({
      imports: [ConfigModule.forRoot(), HttpClientTestingModule, BaseOccModule],
      providers: [
        fromEffects.CurrenciesEffects,
        { provide: SiteAdapter, useValue: {} },
        provideMockActions(() => actions$),
        { provide: Store, useValue: mockStore },
      ],
    });

    connector = TestBed.inject(SiteConnector);
    effects = TestBed.inject(fromEffects.CurrenciesEffects);

    spyOn(connector, 'getCurrencies').and.returnValue(of(currencies));
  });

  describe('loadCurrencies$', () => {
    it('should populate all currencies from LoadCurrenciesSuccess', () => {
      const results = [];
      effects.loadCurrencies$.subscribe((a) => results.push(a));
      actions$.next(new SiteContextActions.LoadCurrencies());
      expect(results).toEqual([
        new SiteContextActions.LoadCurrenciesSuccess(currencies),
      ]);
    });
  });

  describe('activateCurrency$', () => {
    describe('when currency is set for the first time', () => {
      it('should NOT dispatch currency change action', () => {
        const results = [];
        effects.activateCurrency$.subscribe((a) => results.push(a));
        mockState.next('zh');
        expect(results).toEqual([]);
      });
    });

    describe('when currency is set for the next time', () => {
      it('should dispatch currency change action', () => {
        const results = [];
        effects.activateCurrency$.subscribe((a) => results.push(a));

        mockState.next('en');
        mockState.next('zh');

        const changeAction = new SiteContextActions.CurrencyChange({
          previous: 'en',
          current: 'zh',
        });
        expect(results).toEqual([changeAction]);
      });
    });
  });
});
