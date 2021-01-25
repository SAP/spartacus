import { TestBed } from '@angular/core/testing';
import { select, Store, StoreModule } from '@ngrx/store';
import { Title } from '../../model/user-profile.model';
import { UserProfileActions } from '../actions/index';
import * as fromReducers from '../reducers/index';
import { UserProfileSelectors } from '../selectors/index';
import {
  StateWithUserProfile,
  USER_PROFILE_FEATURE,
} from '../user-profile.state';

describe('Titles Selectors', () => {
  let store: Store<StateWithUserProfile>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(
          USER_PROFILE_FEATURE,
          fromReducers.getReducers()
        ),
      ],
    });

    store = TestBed.inject(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('getAllTitles', () => {
    it('should return all titles', () => {
      const mockTitles: Title[] = [
        {
          code: 'mr',
          name: 'Mr.',
        },
        {
          code: 'mrs',
          name: 'Mrs.',
        },
      ];

      let result: Title[];
      store
        .pipe(select(UserProfileSelectors.getAllTitles))
        .subscribe((value) => (result = value));

      expect(result).toEqual([]);

      store.dispatch(new UserProfileActions.LoadTitlesSuccess(mockTitles));

      expect(result).toEqual(mockTitles);
    });
  });

  describe('titleSelectorFactory', () => {
    it('should return title', () => {
      const code = 'mr';
      const mockTitles: Title[] = [
        {
          code: 'mr',
          name: 'Mr.',
        },
        {
          code: 'mrs',
          name: 'Mrs.',
        },
      ];

      let result: Title;

      store
        .pipe(select(UserProfileSelectors.titleSelectorFactory(code)))
        .subscribe((value) => (result = value));

      store.dispatch(new UserProfileActions.LoadTitlesSuccess(mockTitles));
      expect(result).toEqual(mockTitles[0]);
    });
  });
});
