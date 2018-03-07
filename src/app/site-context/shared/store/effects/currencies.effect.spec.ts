import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { Actions } from '@ngrx/effects';

import { hot, cold } from 'jasmine-marbles';
import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/observable/empty';
import { of } from 'rxjs/observable/of';

import { OccSiteService } from '../../../../newocc/site-context/occ-site.service';
import { ConfigService } from '../../../../newocc/config.service';
import * as fromEffects from './currencies.effect';
import * as fromActions from '../actions/currencies.action';

@Injectable()
export class TestActions extends Actions {
  constructor() {
    super(empty());
  }

  set stream(source: Observable<any>) {
    this.source = source;
  }
}

export function getActions() {
  return new TestActions();
}

describe('Currencies Effects', () => {
  let actions$: TestActions;
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
        ConfigService,
        fromEffects.CurrenciesEffects,
        { provide: Actions, useFactory: getActions }
      ]
    });

    actions$ = TestBed.get(Actions);
    service = TestBed.get(OccSiteService);
    effects = TestBed.get(fromEffects.CurrenciesEffects);

    spyOn(service, 'loadCurrencies').and.returnValue(of(data));
  });

  describe('loadCurrencies$', () => {
    it('should populate all currencies from LoadCurrenciesSuccess', () => {
      const action = new fromActions.LoadCurrencies();
      const completion = new fromActions.LoadCurrenciesSuccess(data.currencies);

      actions$.stream = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.loadCurrencies$).toBeObservable(expected);
    });
  });
});
