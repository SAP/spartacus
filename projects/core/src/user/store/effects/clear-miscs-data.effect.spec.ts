import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { cold, hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';
import { SiteContextActions } from '../../../site-context/store/actions/index';
import { UserActions } from '../actions/index';
import { ClearMiscsDataEffect } from './clear-miscs-data.effect';

describe('ClearMiscsDataEffect', () => {
  let effect: ClearMiscsDataEffect;
  let actions$: Observable<Action>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClearMiscsDataEffect, provideMockActions(() => actions$)],
    });

    effect = TestBed.inject(ClearMiscsDataEffect);
  });

  describe('clearMiscsData$', () => {
    it('should return a reset action', () => {
      const action: Action = {
        type: SiteContextActions.LANGUAGE_CHANGE,
      };

      const completion = new UserActions.ClearUserMiscsData();

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effect.clearMiscsData$).toBeObservable(expected);
    });
  });
});
