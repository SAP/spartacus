import { TestBed } from '@angular/core/testing';

import { Action } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';

import { Observable } from 'rxjs';

import { hot, cold } from 'jasmine-marbles';

import { ClearMiscsData } from '../actions/index';
import { LANGUAGE_CHANGE } from '../../../site-context/store/actions/languages.action';

import { ClearMiscsDataEffect } from './clear-miscs-data.effect';

describe('ClearMiscsDataEffect', () => {
  let effect: ClearMiscsDataEffect;
  let actions$: Observable<Action>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClearMiscsDataEffect, provideMockActions(() => actions$)]
    });

    effect = TestBed.get(ClearMiscsDataEffect);
  });

  describe('clearMiscsData$', () => {
    it('should return a reset action', () => {
      const action: Action = {
        type: LANGUAGE_CHANGE
      };

      const completion = new ClearMiscsData();

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effect.clearMiscsData$).toBeObservable(expected);
    });
  });
});
