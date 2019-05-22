import { TestBed } from '@angular/core/testing';

import { provideMockActions } from '@ngrx/effects/testing';

import { Observable, of } from 'rxjs';

import { cold, hot } from 'jasmine-marbles';

import * as fromActions from './../actions';

import { RegionsEffects } from './regions.effect';
import { UserPaymentConnector } from '../../connectors/payment/user-payment.connector';
import { Region, UserPaymentAdapter } from '@spartacus/core';

const mockRegions: Region[] = [
  {
    isocode: 'CA-ON',
    name: 'Ontarion',
  },
  {
    isocode: 'CA-QC',
    name: 'Quebec',
  },
];

describe('', () => {
  let service: UserPaymentConnector;
  let effect: RegionsEffects;
  let actions$: Observable<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RegionsEffects,
        { provide: UserPaymentAdapter, useValue: {} },
        provideMockActions(() => actions$),
      ],
    });

    effect = TestBed.get(RegionsEffects);
    service = TestBed.get(UserPaymentConnector);

    spyOn(service, 'getRegions').and.returnValue(of(mockRegions));
  });

  describe('loadRegions$', () => {
    it('should load regions', () => {
      const action = new fromActions.LoadRegions('CA');
      const completion = new fromActions.LoadRegionsSuccess(mockRegions);

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effect.loadRegions$).toBeObservable(expected);
    });
  });
});
