import { TestBed } from '@angular/core/testing';
import { StoreModule, Store, combineReducers, select } from '@ngrx/store';

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
          ...fromRoot.getReducers(),
          siteContext: combineReducers(fromReducers.getReducers())
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

  describe('getLanguagesLoadAttempted', () => {
    it('should return whether attempted to load languages', () => {
      let result;

      store
        .pipe(select(fromSelectors.getLanguagesLoadAttempted))
        .subscribe(value => (result = value));

      expect(result).toEqual(false);

      store.dispatch(new fromActions.LoadLanguagesSuccess(languages));
      expect(result).toEqual(true);

      store.dispatch(new fromActions.LoadLanguagesFail(languages));
      expect(result).toEqual(true);
    });
  });

  describe('getLanguagesLoading', () => {
    it('should return whether languages are loading', () => {
      let result;

      store
        .pipe(select(fromSelectors.getLanguagesLoading))
        .subscribe(value => (result = value));

      store.dispatch(new fromActions.LoadLanguagesFail({}));

      expect(result).toEqual(false);

      store.dispatch(new fromActions.LoadLanguages());

      expect(result).toEqual(true);
    });
  });
});
