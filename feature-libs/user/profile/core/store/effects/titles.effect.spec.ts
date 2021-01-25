import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import { UserProfileAdapter } from '../../connectors/index';
import { UserProfileConnector } from '../../connectors/user-profile.connector';
import { Title } from '../../model/index';
import { UserProfileActions } from '../actions/index';
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
  let service: UserProfileConnector;
  let effect: TitlesEffects;
  let actions$: Observable<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TitlesEffects,
        { provide: UserProfileAdapter, useValue: {} },
        provideMockActions(() => actions$),
      ],
    });

    effect = TestBed.inject(TitlesEffects);
    service = TestBed.inject(UserProfileConnector);

    spyOn(service, 'getTitles').and.returnValue(of(mockTitles));
  });

  describe('loadTitles$', () => {
    it('should load the titles', () => {
      const action = new UserProfileActions.LoadTitles();
      const completion = new UserProfileActions.LoadTitlesSuccess(mockTitles);

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effect.loadTitles$).toBeObservable(expected);
    });
  });
});
