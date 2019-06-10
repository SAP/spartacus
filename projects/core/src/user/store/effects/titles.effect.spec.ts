import { TestBed } from '@angular/core/testing';

import { provideMockActions } from '@ngrx/effects/testing';

import { Observable, of } from 'rxjs';

import { cold, hot } from 'jasmine-marbles';

import * as fromActions from './../actions';

import { TitlesEffects } from '.';
import { UserConnector } from '../../connectors/user/user.connector';
import { Title, UserAdapter } from '@spartacus/core';

const mockTitles: Title[] = [
  {
    code: 'mr',
    name: 'Mr.',
  },
  {
    code: 'mrs',
    name: 'Mrs.',
  },
  {
    code: 'dr',
    name: 'Dr.',
  },
  {
    code: 'rev',
    name: 'Rev.',
  },
];

describe('Titles effect', () => {
  let service: UserConnector;
  let effect: TitlesEffects;
  let actions$: Observable<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TitlesEffects,
        { provide: UserAdapter, useValue: {} },
        provideMockActions(() => actions$),
      ],
    });

    effect = TestBed.get(TitlesEffects);
    service = TestBed.get(UserConnector);

    spyOn(service, 'getTitles').and.returnValue(of(mockTitles));
  });

  describe('loadTitles$', () => {
    it('should load the titles', () => {
      const action = new fromActions.LoadTitles();
      const completion = new fromActions.LoadTitlesSuccess(mockTitles);

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effect.loadTitles$).toBeObservable(expected);
    });
  });
});
