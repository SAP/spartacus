import { TestBed } from '@angular/core/testing';
import { StoreModule, Store, combineReducers } from '@ngrx/store';

import * as fromRoot from '../../../../routing/store';
import * as fromReducers from '../reducers';
import * as fromActions from '../actions';
import * as fromSelectors from '../selectors/languages.selectors';

describe('Languages Selectors', () => {
  let store: Store<fromReducers.SiteContextState>;

  const languages: any[] = [{ active: true, isocode: 'ja', name: 'Japanese' }];

  const entities = {
    ja: languages[0]
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromRoot.reducers,
          siteContext: combineReducers(fromReducers.reducers)
        })
      ]
    });
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('getLanguagesEntities', () => {
    it('should return Languages entities', () => {
      let result;

      store
        .select(fromSelectors.getLanguagesEntities)
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
        .select(fromSelectors.getActiveLanguage)
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
        .select(fromSelectors.getAllLanguages)
        .subscribe(value => (result = value));

      expect(result).toEqual([]);

      store.dispatch(new fromActions.LoadLanguagesSuccess(languages));

      expect(result).toEqual(languages);
    });
  });

  describe('getLanguagesLoaded', () => {
    it('should return whether languages are loaded', () => {
      let result;

      store
        .select(fromSelectors.getLanguagesLoaded)
        .subscribe(value => (result = value));

      expect(result).toEqual(false);

      store.dispatch(new fromActions.LoadLanguagesSuccess(languages));

      expect(result).toEqual(true);
    });
  });
});
