import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import { Title } from '../../../model/index';
import { UserAdapter } from '../../connectors/index';
import { UserConnector } from '../../connectors/user/user.connector';
import { UserActions } from '../actions/index';
import { TitlesEffects } from './titles.effect';

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

    effect = TestBed.inject(TitlesEffects);
    service = TestBed.inject(UserConnector);

    spyOn(service, 'getTitles').and.returnValue(of(mockTitles));
  });

  describe('loadTitles$', () => {
    it('should load the titles', () => {
      const action = new UserActions.LoadTitles();
      const completion = new UserActions.LoadTitlesSuccess(mockTitles);

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effect.loadTitles$).toBeObservable(expected);
    });
  });
});
