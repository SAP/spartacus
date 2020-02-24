import { TestBed } from '@angular/core/testing';
import { select, Store, StoreModule } from '@ngrx/store';
import { Title } from '../../../model/misc.model';
import { UserActions } from '../actions/index';
import * as fromReducers from '../reducers/index';
import { UsersSelectors } from '../selectors/index';
import { StateWithUser, USER_FEATURE } from '../user-state';

describe('Titles Selectors', () => {
  let store: Store<StateWithUser>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(USER_FEATURE, fromReducers.getReducers()),
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
        .pipe(select(UsersSelectors.getAllTitles))
        .subscribe(value => (result = value));

      expect(result).toEqual([]);

      store.dispatch(new UserActions.LoadTitlesSuccess(mockTitles));

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
        .pipe(select(UsersSelectors.titleSelectorFactory(code)))
        .subscribe(value => (result = value));

      store.dispatch(new UserActions.LoadTitlesSuccess(mockTitles));
      expect(result).toEqual(mockTitles[0]);
    });
  });
});
