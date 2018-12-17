import { TestBed } from '@angular/core/testing';
import { Store, select, StoreModule } from '@ngrx/store';

import * as fromActions from '../actions';
import * as fromReducers from '../reducers';
import * as fromSelectors from '../selectors/languages.selectors';
import { StateWithSiteContext, SITE_CONTEXT_FEATURE } from '../state';
import { Language } from '../../../occ/occ-models/occ.models';

describe('Languages Selectors', () => {
  let store: Store<StateWithSiteContext>;

  const languages: Language[] = [
    { active: true, isocode: 'ja', name: 'Japanese' }
  ];

  const entities = {
    ja: languages[0]
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(SITE_CONTEXT_FEATURE, fromReducers.getReducers())
      ]
    });
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('getLanguagesEntities', () => {
    it('should return Languages entities', () => {
      let result;

      store
        .pipe(select(fromSelectors.getLanguagesEntities))
        .subscribe(value => (result = value));

      expect(result).toEqual({});

      store.dispatch(new fromActions.LoadLanguagesSuccess(languages));

      expect(result).toEqual(entities);
    });
  });

  describe('getActiveLanguage', () => {
    it('should return the active language', () => {
      let result;

      store
        .pipe(select(fromSelectors.getActiveLanguage))
        .subscribe(value => (result = value));

      expect(result).toEqual(null);

      store.dispatch(new fromActions.SetActiveLanguage('zh'));

      expect(result).toEqual('zh');
    });
  });

  describe('getAllLanguages', () => {
    it('should return all languages', () => {
      let result;

      store
        .pipe(select(fromSelectors.getAllLanguages))
        .subscribe(value => (result = value));

      expect(result).toEqual([]);

      store.dispatch(new fromActions.LoadLanguagesSuccess(languages));

      expect(result).toEqual(languages);
    });
  });
});
