import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { hot, cold } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';

import { OccSiteService } from '../../../../occ/site-context/occ-site.service';
import { OccModuleConfig } from '../../../../occ/occ-module-config';
import * as fromEffects from './currencies.effect';
import * as fromActions from '../actions/currencies.action';
import { provideMockActions } from '@ngrx/effects/testing';

describe('Currencies Effects', () => {
  let actions$: Observable<any>;
  let service: OccSiteService;
  let effects: fromEffects.CurrenciesEffects;

  const data = {
    currencies: [
      { active: false, isocode: 'USD', name: 'US Dollar', symbol: '$' }
    ]
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OccSiteService,
        OccModuleConfig,
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
});
