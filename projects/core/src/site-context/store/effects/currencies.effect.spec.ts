import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { hot, cold } from 'jasmine-marbles';
// import { Observable, of } from 'rxjs';

// import { OccSiteService } from '../';

import * as fromEffects from './currencies.effect';
import * as fromActions from '../actions/currencies.action';
// import { provideMockActions } from '@ngrx/effects/testing';
// import { SiteContextStoreModule } from '../site-context-store.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { SiteContextModule } from '../../site-context.module';
import { ConfigModule } from 'projects/core/src/config';
import { of, Observable } from 'rxjs';
import { CurrencyService } from '../../currency.service';

// const MockOccConfig: OccConfig = {
//   server: {
//     baseUrl: '',
//     occPrefix: ''
//   }
// };

describe('Currencies Effects', () => {
  let actions$: Observable<any>;
  let service: CurrencyService;
  let effects: fromEffects.CurrenciesEffects;

  const data = {
    currencies: [
      { active: false, isocode: 'USD', name: 'US Dollar', symbol: '$' }
    ]
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ConfigModule.forRoot(),
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        SiteContextModule
      ]
      // providers: [
      //   // OccSiteService,
      //   // { provide: OccConfig, useValue: MockOccConfig },
      //   // fromEffects.CurrenciesEffects,
      //   // provideMockActions(() => actions$)
      // ]
    });

    service = TestBed.get(CurrencyService);
    effects = TestBed.get(fromEffects.CurrenciesEffects);

    spyOn(service, 'currencies$').and.returnValue(of(data));
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
});
